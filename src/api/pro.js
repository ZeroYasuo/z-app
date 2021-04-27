import request from './../utils/request'

export function getProList (params) {
  return request.get('/pro/list',{params})
}

export function getCategory(params){
  return request.get('/pro/getCategory',{params})
}

export function updateFlag(params){
  return request.post('/pro/updateFlag',params)
}

export function showdata(params){
  return request.post('/pro/showdata',params)
}

export function searchPro(params){
  return request.post('/pro/searchPro',params)
}