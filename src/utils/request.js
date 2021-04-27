import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: isDev ? 'http://121.89.205.189/admin' : 'http://121.89.205.189/admin'
})

request.interceptors.request.use(function(config){
  config.headers.common.token = localStorage.getItem('adminToken')
  return config
},function(err){
  return Promise.reject(err)
})

request.interceptors.response.use(function(response){
  if(response.data.data === '10119'){
    window.location.href('/login')
  }
  return response
},function(err){
  return Promise.reject(err)
})

export default request