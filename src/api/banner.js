import request from './../utils/request'

export function add (params) {
  return request.post('/banner/add', params)
}

export function removeItem (params) {
  return request.get('/banner/delete', {params})
}

export function removeAll (params) {
  return request.get('/banner/removeAll', {params})
}

export function getBannerList (params) {
  return request.get('/banner/list', {params})
}
