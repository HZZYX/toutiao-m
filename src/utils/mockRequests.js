import axios from 'axios'

// 引入进度条
import nprogress from 'nprogress'
// start：进度条开始 done：进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'
const requests = axios.create({
  baseURL: '/mock',
  timeout: 5000
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use(config => {
  /*
    config: 配置对象，而这个对象里有一个属性很重要，就是header请求头
    所以说咱们会把它原封不动返回即可
  */
  // 进度条开始动
  nprogress.start()
  return config
})

// 响应拦截器：
requests.interceptors.response.use((res) => {
  // 成功的回调函数：服务器响应数据回来以后，响应拦截器可以监测到，可以做一些事情。
  // 进度条结束
  nprogress.done()
  return res.data.data
}, (error) => {
  /*
    响应失败的回调函数,在这里我们可以
    打印一些错误的信息，或者终止咱们的promise链
  */
  // 终结promise链
  return Promise.reject(error.response)
})

export default requests
