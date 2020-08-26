import axios from 'axios'

const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
})

service.interceptors.request.use(

  config => {
    // 携带token, 设置请求头
    // config.headers['Authorization'] = localStorage.getItem('token') || ''
    return config
  },

  error => {
    return Promise.reject(error)
  }

)

service.interceptors.response.use(

  response => {
    const res = response.data
    return res
  },

  error => {
    return Promise.reject(error)
  }

)

export default service