export default [{
  path: '/',
  // redirect: '/login',
  redirect: '/home',
  component: () => import('@/views/layout/layout.vue'),
  children: [{
    path: 'home',
    name: 'home',
    component: () => import('@/views/home/home.vue')
  },
  {
    path: 'my',
    name: 'my',
    meta: {
      isAuth: true
    }, // 路由元信息
    component: () => import('@/views/my/my.vue')
  },
  {
    path: 'qa',
    name: 'qa',
    component: () => import('@/views/qa/qa.vue')
  },
  {
    path: 'video',
    name: 'video',
    component: () => import('@/views/video/index.vue')
  }
  ]
},
{
  path: '/login',
  name: 'login',
  component: () => import('@/views/login/login.vue')
},
{
  path: '/search',
  name: 'search',
  component: () => import('@/views/search/index.vue')
},
{
  path: '/user/profile',
  name: 'userProfile',
  component: () => import('@/views/userProfile/index.vue')
}, {
  path: '/article',
  name: 'article',
  component: () => import('@/views/article/index.vue'),
  props ({
    query
  }) {
    return {
      articleId: query.articleId
    }
  }
}
]
