/*
    全局前置路由守卫--初始化的时候被调用、每次路由切换之前被调用
*/
router.beforeEach((to, from, next) => {
  // from.name 起点路由的名字
  // to.name   目标路由的名字
  const token = JSON.parse(window.localStorage.getItem('TOUTIAO_TOKEN'))
  if (!token && to.name !== 'login') {
    alert('请先登录')
    next({
      path: '/login'
    })
  } else {
    next()
  }
})
