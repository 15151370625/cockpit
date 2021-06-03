import React, { useState } from 'react';
import { Modal, Form, Input, Select } from 'antd';
import _ from 'lodash';
import { useRequest } from 'ahooks';
import SelectZoneInput from '@/components/SelectZoneModal';
import { queryAllAgents } from '../service';

const { Option } = Select;

const AgentModal = ({ visible, setVisible, agentObj, onOk }) => {
  const [form] = Form.useForm();
  const [prev, setPrev] = useState();

  const { data: allAgentsData } = useRequest(queryAllAgents);

  if (prev !== agentObj) {
    setPrev(agentObj);
    form.setFieldsValue({
      ...agentObj,
      parent_id: agentObj.parent_id === 0 ? null : agentObj.parent_id,
      zone: _.map(agentObj.zone, (item) => item.zone_id),
    });
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      const newValues = {
        ...values,
        zone: _.map(values.zone, (item) => ({ zone_id: item })),
      };
      if (allAgentsData && allAgentsData.data.length === 0) {
        newValues.parent_id = 0;
      }
      onOk(newValues);
    });
  };

  return (
    <Modal
      title={!_.isEmpty(agentObj) ? '编辑代理商' : '添加代理商'}
      visible={visible}
      onOk={handleOk}
      onCancel={() => {
        setVisible(false);
        form.resetFields();
        setPrev();
      }}
    >
      <Form
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 14 }}
        form={form}
        initialValues={{
          level: 1,
          parent_id: allAgentsData && allAgentsData.data.length > 0 && allAgentsData.data[0].level,
        }}
      >
        <Form.Item
          label="代理商编号"
          name="no"
          rules={[{ required: true, message: '请填写代理商编号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="代理商名称"
          name="name"
          rules={[{ required: true, message: '请填写代理商名称' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="代理商级别"
          name="level"
          rules={[{ required: true, message: '请填写代理商级别' }]}
        >
          <Input disabled />
        </Form.Item>
        <Form.Item label="上级代理商" name="parent_id">
          <Select
            onSelect={(value, option) => form.setFieldsValue({ level: Number(option.key) + 1 })}
          >
            {allAgentsData &&
              _.map(allAgentsData.data, (item) => (
                <Option value={item.id} key={item.level}>
                  {item.name}
                </Option>
              ))}
          </Select>
        </Form.Item>
        <Form.Item
          label="管理员姓名"
          name="admin_name"
          rules={[{ required: true, message: '请填写管理员姓名' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="管理员手机号"
          name="admin_phone"
          rules={[{ required: true, message: '请填写管理员手机号' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="发展园区"
          name="zone"
          rules={[{ required: true, message: '请选择发展园区' }]}
        >
          <SelectZoneInput placeholder="选择发展园区" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AgentModal;
