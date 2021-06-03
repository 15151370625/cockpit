import request from '@/utils/request';

const { apiUrl } = process.env;

// 代理商列表
export async function queryZoneUsers(params) {
  return request(`${apiUrl}/api/admin/zone-user`, { params });
}

// 代理商列表
export async function setCustomer(data) {
  return request.post(`${apiUrl}/api/admin/set-customer/${data.id}`, { data });
}

// 获取选择园区
export async function querySelectZones(params) {
  return request(`${apiUrl}/api/admin/get-selection-zone`, { params });
}

// 获取选择代理商
export async function querySelectAgents(params) {
  return request(`${apiUrl}/api/admin/get-selection-agent`, { params });
}

// 上级代理商列表
export async function queryAllAgents(params) {
  return request(`${apiUrl}/api/admin/get-all-agent`, { params });
}
