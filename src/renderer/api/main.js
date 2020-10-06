import request from '@/utils/request';

export function getList() {
  return request({
    url: '/note/list',
    method: 'get',
  });
}
export function updateItem(data) {
  return request({
    url: '/note/update',
    method: 'post',
    data,
  });
}
