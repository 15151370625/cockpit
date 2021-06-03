import React, { useEffect, useState } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Row, Col, Select, Button, Table, message } from 'antd';
import { useRequest } from 'ahooks';
import { history } from 'umi';
import _ from 'lodash';
import { EditOutlined } from '@ant-design/icons';
import {
  queryZoneUsers,
  setCustomer,
  querySelectZones,
  querySelectAgents,
  queryAllAgents,
} from './service';
import SetCustomerModal from './components/SetCustomerModal';

const { Option } = Select;

const AgentList = () => {
  const [form] = Form.useForm();
  const [customerVisible, setCustomerVisible] = useState(false);
  const [customerObj, setCustomerObj] = useState({});

  const { data: selectZonesData } = useRequest(querySelectZones);

  const { data: selectAgentsData } = useRequest(querySelectAgents);

  const { data: allAgentsData } = useRequest(queryAllAgents);

  const {
    data: zoneUsersData,
    run: zoneUsersRun,
    loading: zoneUsersLoading,
  } = useRequest(queryZoneUsers, {
    manual: true,
    // defaultParams: history.location.state,
    onSuccess: (_data, currParams) => {
      history.replace({
        ...history.location,
        state: currParams[0],
      });
      form.setFieldsValue({
        ...currParams[0],
      });
    },
  });

  useEffect(() => {
    zoneUsersRun(history.location.state);
  }, []);

  const finishHandle = (values) => {
    zoneUsersRun({
      ...values,
    });
  };

  const setCustomerHandle = (e) => {
    if (e.id) {
      setCustomerObj(e);
    } else {
      setCustomerObj({});
    }
    setCustomerVisible(true);
  };

  const columns = [
    {
      title: '园区编号',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '园区名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '所属代理商',
      dataIndex: 'agent_name',
      key: 'agent_name',
    },
    {
      title: '代理商级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '客户经理',
      dataIndex: 'customer_name',
      key: 'customer_name',
      render: (text, row) =>
        text && row.customer_phone ? (
          <>
            <span>
              {text};{row.customer_phone}{' '}
            </span>
            <EditOutlined
              onClick={() => setCustomerHandle(row)}
              style={{ color: 'rgba(56, 148, 255, 100)' }}
            />
          </>
        ) : (
          <a onClick={() => setCustomerHandle(row)}>设置</a>
        ),
    },
  ];

  const setCustomerModalProps = {
    visible: customerVisible,
    setVisible: setCustomerVisible,
    customerObj,
    onOk: async (data) => {
      const { code, msg } = await setCustomer({
        ...data,
        id: customerObj.id,
      });
      if (code === 0) {
        message.success('设置成功');
        zoneUsersRun(history.location.state);
        setCustomerVisible(false);
      } else {
        message.error(msg);
      }
    },
  };

  return (
    <PageContainer
      header={{
        title: false,
        extra: [],
      }}
      ghost
      className="page-header"
    >
      <SetCustomerModal {...setCustomerModalProps} />
      <div className="container">
        <div className="form-search">
          <Form
            form={form}
            initialValues={{ level: '', agent_id: '', zone_id: '' }}
            onFinish={finishHandle}
          >
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="园区编号" name="zone_id">
                  <Select>
                    <Option value="">全部</Option>
                    {selectZonesData &&
                      _.map(selectZonesData.data, (item) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="所属代理商" name="agent_id">
                  <Select>
                    <Option value="">全部</Option>
                    {selectAgentsData &&
                      _.map(selectAgentsData.data, (item) => (
                        <Option value={item.id} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="代理商级别" name="level">
                  <Select>
                    <Option value="">全部</Option>
                    {allAgentsData &&
                      _.map(allAgentsData.data, (item) => (
                        <Option value={item.level} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="form-search-btn-left"></div>
                <div className="form-search-btn-right">
                  <Button type="primary" htmlType="submit">
                    查询
                  </Button>
                  <Button
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    重置
                  </Button>
                </div>
              </Col>
            </Row>
          </Form>
        </div>
        <Table
          rowKey="id"
          columns={columns}
          dataSource={zoneUsersData && zoneUsersData.data}
          pagination={{
            showSizeChanger: false,
            pageSize: zoneUsersData && zoneUsersData.meta && zoneUsersData.meta.per_page,
            current: zoneUsersData && zoneUsersData.meta && zoneUsersData.meta.current_page,
            total: zoneUsersData && zoneUsersData.meta && zoneUsersData.meta.total,
            onChange: (page) => {
              zoneUsersRun({
                ...history.location.state,
                page,
              });
            },
            showTotal: (total, rang) => `第 ${rang[0]}-${rang[1]} 条/总共 ${total} 条`,
          }}
          loading={zoneUsersLoading}
        />
      </div>
    </PageContainer>
  );
};

export default AgentList;
