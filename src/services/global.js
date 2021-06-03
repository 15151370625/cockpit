import request from '@/utils/request';

const { apiUrl } = process.env;

// me
export async function me() {
  return request(`${apiUrl}/api/admin/me`, {
    IGNORE_401: true,
  });
}

// 园区列表
export async function queryZoneLists(params) {
  return request(`${apiUrl}/api/admin/get-zone-list`, { params });
}
