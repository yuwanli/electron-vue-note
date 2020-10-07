import request from '@/utils/request';

export function getList() {
  return request({
    url: '/note/list',
    method: 'get',
  });
}

export function createItem() {
  return request({
    url: '/note/create',
    method: 'post',
  });
}

export function deleteItem(id) {
  return request({
    url: '/note/delete',
    method: 'post',
    data: {
      id,
    },
  });
}

export function getItem(id) {
  return request({
    url: '/note/item',
    method: 'get',
    params: {
      id,
    },
  });
}

export function updateItem(data) {
  return request({
    url: '/note/update',
    method: 'post',
    data,
  });
}
