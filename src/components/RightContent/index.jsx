import { Dropdown, Space, Menu, Avatar, Spin } from 'antd';
import { SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import React from 'react';
import store from 'store';
import { history, useModel } from 'umi';
import styles from './index.less';

const GlobalHeaderRight = () => {
  const { initialState, loading } = useModel('@@initialState');

  const { user } = initialState || {};

  const systemHandle = async () => {
    history.push('/manage');
  };

  const loginOut = async () => {
    store.remove('access_token');
    history.push('/user/login');
  };

  // const switchRoles = async () => {
  //   history.push('/switch-roles');
  // };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]}>
      {/* <Menu.Item key="switch" onClick={switchRoles}>
        <SyncOutlined />
        切换角色
      </Menu.Item> */}
      <Menu.Item key="logout" onClick={loginOut}>
        <LogoutOutlined />
        退出登录
      </Menu.Item>
    </Menu>
  );
  return (
    <Space className={styles.right}>
      <SettingOutlined onClick={systemHandle} />
      <Dropdown overlay={menuHeaderDropdown}>
        {!loading ? (
          <span className={`${styles.action} ${styles.account}`}>
            <Avatar
              size="small"
              className={styles.avatar}
              src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
              alt="avatar"
            />
            <span className={`${styles.name} anticon`}>{user ? `${user.name}` : ''}</span>
          </span>
        ) : (
          <Spin />
        )}
      </Dropdown>
    </Space>
  );
};
export default GlobalHeaderRight;
