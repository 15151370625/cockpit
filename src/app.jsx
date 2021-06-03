import React from 'react';
// import { message } from 'antd';
// import { history } from 'umi';
// import store from 'store';
import { me } from '@/services/global';
import RightContent from '@/components/RightContent';
import Footer from '@/components/Footer';

export const layout = {
  rightContentRender: () => <RightContent />,
  footerRender: () => <Footer />,
  menuHeaderRender: undefined,
  onPageChange: () => {
    // const token = store.get('access_token');
    // const { location } = history;
    // if (!token && location.pathname !== '/user/login') {
    //   history.push('/user/login');
    //   message.error('登录信息已过期，请重新登录');
    // }
    // history.push('/welcome');
  },
};

export async function getInitialState() {
  const data = await me();
  return {
    user: data.data,
  };
}
