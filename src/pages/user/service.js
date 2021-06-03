import request from '@/utils/request';

const { apiUrl } = process.env;

// 登陆
export async function login(data) {
  return request.post(`${apiUrl}/api/admin/login`, { data });
}
