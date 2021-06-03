import request from '@/utils/request';

const { apiUrl } = process.env;

// 代理商列表
export async function queryAgents(params) {
  return request(`${apiUrl}/api/admin/agent`, { params });
}

// 添加代理商
export async function addAgents(data) {
  return request.post(`${apiUrl}/api/admin/agent`, { data });
}

// 编辑代理商
export async function updateAgents(data) {
  return request.put(`${apiUrl}/api/admin/agent/${data.id}`, { data });
}

// 删除代理商
export async function deleteAgents(id) {
  return request.delete(`${apiUrl}/api/admin/agent/${id}`);
}

// 上级代理商列表
export async function queryAllAgents(params) {
  return request(`${apiUrl}/api/admin/get-all-agent`, { params });
}
