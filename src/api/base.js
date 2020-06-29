import request from '@/utils/request'

export function query(params) {
  return request({
    url: '/version/query',
    method: 'get',
    params
  })
}

export function add(params) {
  return request({
    url: '/version/add',
    method: 'post',
    params
  })
}

export function edit(params) {
  return request({
    url: '/version/edit',
    method: 'get',
    params
  })
}

export function del(params) {
  return request({
    url: '/version/del',
    method: 'delete',
    params
  })
}
