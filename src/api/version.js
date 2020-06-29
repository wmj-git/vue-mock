import request from '@/utils/request'

export function fetchList(obj) {
  return request({
    url: '/version/queryVersionList',
    method: 'post',
    data: obj.params
  })
}

export function add(obj) {
  return request({
    url: '/version/add',
    method: 'post',
    data: obj.params
  })
}

export function edit(obj) {
  return request({
    url: '/version/edit',
    method: 'get',
    data: obj.params
  })
}

export function del(obj) {
  return request({
    url: '/version/delete',
    method: 'get',
    data: obj.params
  })
}
