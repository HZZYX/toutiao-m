/*
  action：可以书写自己的业务逻辑，也可以处理异步，而且可以使用context.dispatch指定多个action处理当前业务
  业务逻辑越复杂就越能体现action的作用
  $store.dispatch('事件名', 传参) ==> mapActions(['事件名'])
  模块化：...mapState('login', ['title'])
  模块化：$store.dispatch('login/事件名',传参)

  context：1.一个迷你版本的store,跟store身上东西差不多，但是没有store全。
           2.上下文，vuex觉得此时此刻你好像需要一些东西，那就这样吧，我把你所有可能需要的东西都给你包成一个对象，然后我给你，这个对象就叫做上下文对象
*/
const actions = {}

/*
    mutations：修改state的唯一手段
    $store.commit('事件名', 传参) ==> mapMutations(['事件名'])
    模块化：...mapMutations('login',['事件名'])
    模块化：$store.commit('login/setToken',传参)
  */
const mutations = {
  setToken (state, value) {
    state.token = value
    localStorage.setItem('TOUTIAO_TOKEN', JSON.stringify(value))
    console.log('调用了store-login模块中的mutations-setToken方法')
  },
  removeToken () {
    state.token = null
    localStorage.removeItem('TOUTIAO_TOKEN')
  }
}

/*
    state：仓库存储数据的地方 this.$store.state.num
    $store.state ==> mapState(['属性名'])
    模块化：...mapState('login', ['title', 'token'])
    模块化：$store.login.state
  */
const state = {
  title: '登录',
  token: JSON.parse(window.localStorage.getItem('TOUTIAO_TOKEN')) // 当用户信息，因为多个页面/组合会用到token数据
}
/*
    getters：理解为计算属性，用于简化仓库数据，将state中的数据进行加工，让组件获取仓库的数据更加方便
    与计算属性的区别：计算属性不能跨组件使用，只适用于当前组件，别人想用或者别的组件想用，用不了

    如果逻辑复杂，并且逻辑还想复用那么推荐你使用getter
    $store.getters ==> mapGetters(['属性名'])
    模块化：...mapGetterse('login', ['bigTest'])
    模块化： $store.getters['login/bigTest']
  */
const getters = {
  bigTest (state) {
    return state.test * 10
  }
}

export default {
  namespaced: true,
  actions,
  mutations,
  state,
  getters
}
