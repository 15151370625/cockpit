import React from 'react';
import { Form, Input, Button, message } from 'antd';
import { history, useModel } from 'umi';
import store from 'store';
import { useRequest } from 'ahooks';
import { login } from './service';
import styles from './login.less';

const Login = () => {
  const [form] = Form.useForm();
  const { setInitialState } = useModel('@@initialState');
  const { run: loginRun } = useRequest(login, {
    manual: true,
    onSuccess: (data) => {
      if (data.code === 0) {
        if (data.data.access_token) {
          store.set('access_token', data.data.access_token);
          setInitialState({
            user: data.me,
          });
          history.push('/welcome');
          message.success('登陆成功');
        }
      } else {
        message.error(data.msg);
      }
    },
  });

  const onFinish = (values) => {
    if (values) {
      loginRun({
        ...values,
      });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <h1>欢迎登陆</h1>
      </div>
      <div className={styles.form}>
        <Form
          form={form}
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item name="username" rules={[{ required: true, message: '请输入用户名!' }]}>
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item name="password" rules={[{ required: true, message: '请输入密码!' }]}>
            <Input type="password" placeholder="请输入密码" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className={styles.subBtn}>
              登陆
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
