import React, { useState, useEffect } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { Form, Row, Col, Select, Input, Button, Table, Divider, Popconfirm, message } from 'antd';
import { history } from 'umi';
import { useRequest } from 'ahooks';
import AgentModal from './components/AgentModal';
import { queryAgents, deleteAgents, addAgents, updateAgents, queryAllAgents } from './service';

const { Option } = Select;

const Manage = () => {
  const [form] = Form.useForm();
  const [agentVisible, setAgentVisible] = useState(false);
  const [agentObj, setAgentObj] = useState({});

  const { data: allAgentsData } = useRequest(queryAllAgents);

  const {
    data: agentsData,
    run: agentsRun,
    loading: agentsLoading,
  } = useRequest(queryAgents, {
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

  const { run: deleteAgentsRun } = useRequest(deleteAgents, {
    manual: true,
    onSuccess: (res) => {
      if (res.code === 0) {
        message.success(res.msg);
        agentsRun({
          ...history.location.state,
        });
      } else {
        message.error(res.msg);
      }
    },
  });

  useEffect(() => {
    agentsRun(history.location.state);
  }, []);

  const finishHandle = (values) => {
    agentsRun({
      ...values,
    });
  };

  const agentHandle = (e) => {
    if (e.id) {
      setAgentObj(e);
    } else {
      setAgentObj({});
    }
    setAgentVisible(true);
  };

  const deleteHandle = (e) => {
    deleteAgentsRun(e.id);
  };

  const columns = [
    {
      title: '代理商编号',
      dataIndex: 'no',
      key: 'no',
    },
    {
      title: '代理商名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '代理商级别',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: '上级代理商名称',
      dataIndex: 'p_name',
      key: 'p_name',
    },
    {
      title: '管理员姓名',
      dataIndex: 'admin_name',
      key: 'admin_name',
    },
    {
      title: '管理员手机号',
      dataIndex: 'admin_phone',
      key: 'admin_phone',
    },
    {
      title: '关联园区',
      dataIndex: 'zone_count',
      key: 'zone_count',
    },
    {
      title: '操作',
      key: 'operate',
      render: (text, row) => (
        <>
          <a onClick={() => agentHandle(row)}>编辑</a>
          <Divider type="vertical" />
          <Popconfirm
            title="是否删除?"
            onConfirm={() => deleteHandle(row)}
            okText="确定"
            cancelText="取消"
          >
            <a>删除</a>
          </Popconfirm>
        </>
      ),
    },
  ];

  const agentModalProps = {
    visible: agentVisible,
    setVisible: setAgentVisible,
    agentObj,
    onOk: async (val) => {
      if (!_.isEmpty(agentObj)) {
        const { code, msg } = await updateAgents({
          ...val,
          id: agentObj.id,
        });
        if (code === 0) {
          message.success('修改完成');
          agentsRun({
            ...history.location.state,
          });
          setAgentVisible(false);
        } else {
          message.error(msg);
        }
      } else {
        const { code, msg } = await addAgents({
          ...val,
        });
        if (code === 0) {
          message.success('添加完成');
          agentsRun({
            ...history.location.state,
          });
          setAgentVisible(false);
        } else {
          message.error(msg);
        }
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
      <AgentModal {...agentModalProps} />
      <div className="container">
        <div className="form-search">
          <Form form={form} initialValues={{ level: '', parent_name: '' }} onFinish={finishHandle}>
            <Row gutter={24}>
              <Col span={6}>
                <Form.Item label="代理商名称" name="name">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="代理商级别" name="level">
                  <Select>
                    <Option value="">全部</Option>
                    {allAgentsData &&
                      _.map(allAgentsData.data, (item) => (
                        <Option value={item.level} key={item.id}>
                          {item.level}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="上级代理商名称" name="parent_name">
                  <Select>
                    <Option value="">全部</Option>
                    {allAgentsData &&
                      _.map(allAgentsData.data, (item) => (
                        <Option value={item.name} key={item.id}>
                          {item.name}
                        </Option>
                      ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={6}>
                <Form.Item label="手机号" name="admin_phone">
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="form-search-btn-left">
                  <Button type="primary" onClick={agentHandle}>
                    添加代理商
                  </Button>
                </div>
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
          dataSource={agentsData && agentsData.data}
          pagination={{
            showSizeChanger: false,
            pageSize: agentsData && agentsData.meta && agentsData.meta.per_page,
            current: agentsData && agentsData.meta && agentsData.meta.current_page,
            total: agentsData && agentsData.meta && agentsData.meta.total,
            onChange: (page) => {
              agentsRun({
                ...history.location.state,
                page,
              });
            },
            showTotal: (total, rang) => `第 ${rang[0]}-${rang[1]} 条/总共 ${total} 条`,
          }}
          loading={agentsLoading}
        />
      </div>
    </PageContainer>
  );
};

export default Manage;
