import axios from 'axios'

const isDev = process.env.NODE_ENV === 'development'

const request = axios.create({
  baseURL: isDev ? 'http://121.89.205.189/admin' : 'http://121.89.205.189/admin'
})

export default request