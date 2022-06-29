import Vue from 'vue'
import Vuex from 'vuex'

import login from '@/store/login/login.js'
// 需要使用插件一次
Vue.use(Vuex)

// 对外暴露Store类的一个实例
export default new Vuex.Store({
  modules: {
    login
  }
})
