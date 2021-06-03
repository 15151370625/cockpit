import React, { useState } from 'react';
import { Modal, Form, Input } from 'antd';

const SetCustomerModal = ({ visible, setVisible, onOk, customerObj }) => {
  const [form] = Form.useForm();
  const [prev, setPrev] = useState();

  if (prev !== customerObj) {
    setPrev(customerObj);
    form.setFieldsValue({
      customer_name: customerObj.customer_name,
      customer_phone: customerObj.customer_phone,
    });
  }

  const handleOk = () => {
    form.validateFields().then((values) => {
      onOk(values);
    });
  };

  return (
    <Modal
      title="设置客户经理"
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
        initialValues={{ level: 2, parent_id: 1 }}
      >
        <Form.Item
          label="客户经理"
          name="customer_name"
          rules={[{ required: true, message: '请输入客户经理' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="customer_phone"
          rules={[{ required: true, message: '请输入手机号' }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SetCustomerModal;
