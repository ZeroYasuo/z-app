import request from './../utils/request'

export function getAdminList(params) {
  return request.get('/admin/list',{params})
}

export function addmin(params) {
  return request.post('/admin/add',params)
}

export function deleteadmin(params) {
  return request.post('/admin/delete',params)
}

export function updateadmin(params) {
  return request.post('/admin/update',params)
}