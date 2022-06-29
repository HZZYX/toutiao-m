import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import './style/index.less'
import 'amfe-flexible'
import '@/mock/mockServe.js'

Vue.use(Vant)
Vue.config.productionTip = false

// 前置路由守卫
router.beforeEach((to, from, next) => {
  // from.name 来的时候的路由名字
  // to.name   去的路由名字，当前路由的名字
  const token = JSON.parse(window.localStorage.getItem('TOUTIAO_TOKEN'))
  if (!token && to.name !== 'login') {
    alert('请先登录')
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

new Vue({
  router,
  store, // 挂载store，会在Vue实例对象上添加一个$store
  render: h => h(App)
}).$mount('#app')
