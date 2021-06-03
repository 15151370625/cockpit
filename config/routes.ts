export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/login',
          },
        ],
      },
    ],
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './welcome',
    hideInMenu: true,
  },
  {
    name: '总管理员',
    path: '/manage',
    hideChildrenInMenu: true,
    access: 'manage',
    routes: [
      {
        path: '/manage',
        redirect: '/manage/lists',
      },
      {
        path: '/manage/lists',
        name: '列表',
        component: './manage',
      },
    ],
  },
  {
    name: '代理商账号',
    path: '/agent-list',
    hideChildrenInMenu: true,
    access: 'agentList',
    routes: [
      {
        path: '/agent-list',
        redirect: '/agent-list/lists',
      },
      {
        path: '/agent-list/lists',
        name: '列表',
        component: './agent-list',
      },
    ],
  },
  {
    name: '园区数据展示',
    path: '/information-show',
    hideChildrenInMenu: true,
    access: 'informationShow',
    routes: [
      {
        path: '/information-show',
        redirect: '/information-show/lists',
      },
      {
        path: '/information-show/lists',
        name: '列表',
        component: './information-show',
      },
    ],
  },
  {
    component: './404',
  },
];
