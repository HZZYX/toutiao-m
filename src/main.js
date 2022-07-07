import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'
import 'amfe-flexible'
import '@/mock/mockServe.js'
// 导入时间过滤器
import './utils/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store, // 挂载store，会在Vue实例对象上添加一个$store
  render: h => h(App)
}).$mount('#app')
