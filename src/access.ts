/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: any) {
  const { user } = initialState || {};
  return {
    manage: user && user.type === 'system',
    agentList: (user && user.type === 'system') || (user && user.type === 'agent'),
    informationShow: (user && user.type === 'system') || (user && user.type === 'agent'),
  };
}
