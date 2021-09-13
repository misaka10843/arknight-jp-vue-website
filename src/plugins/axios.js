import axios from 'axios'

// 创建axios实例
var Axios = axios.create({
  timeout: 10000, // 10s超时
  headers: { 'Content-Type': 'application/json;charset=UTF-8' }
})

// 请求拦截
Axios.interceptors.request.use(
  // 请求发送前
  config => {
    return config
  }
)

// 添加响应拦截器
Axios.interceptors.response.use(
  response => {
    return response.data
  },
  error => {
    return Promise.reject(error.response)
  }
)

export default Axios
