import axios from 'axios'
import store from '@/store/index.js'

// 引入进度条
import nprogress from 'nprogress'
// start：进度条开始 done：进度条结束
// 引入进度条样式
import 'nprogress/nprogress.css'
import router from '@/router'
const requests = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 5000
})

// 请求拦截器：在发送请求之前，请求拦截器可以检测到，可以在请求发出去之前做一些事情
requests.interceptors.request.use((config) => {
  const token = store.state.login.token
  if (token && token.token) {
    config.headers.Authorization = `Bearer ${token.token}`
  }
  /*
    config: 配置对象，而这个对象里有一个属性很重要，就是header请求头
    所以说咱们会把它原封不动返回即可
  */
  // 进度条开始动
  nprogress.start()
  return config
}, (error) => {
  // 如果请求出错了（此时：请求还没发出去），会进入到这里
  return Promise.reject(error)
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
  if (error.response && error.response.status === 401) {
    router.push('/login')
  }
  return Promise.reject(error.response)
})

export default requests

/*
      1.&&
        1.1两边条件都为true时，结果才为true；
        1.2如果有一个为false，结果就为false；
        1.3当第一个条件为false时，就不再判断后面的条件
      2.||
        2.1只要有一个条件为true时，结果就为true；
        2.2当两个条件都为false时，结果才为false；
        2.3当一个条件为true时，后面的条件不再判断
*/
