<template>
  <div>
    <!--
      1.如果不写include，以后只要在keep-alive这块展示的组件，都被缓存
      2.include：要缓存哪些组件，不出现在include里的组件不缓存
      3.include里面填写的是组件名，.Vue文件中的name属性值
      4.让不展示的路由组件保持挂载，不被销毁
      5.当缓存的多个组件时数组写法  ==> :include="['HomeIndex']"
      6.缓存一个组件写法  ==>  include="HomeIndex"
     -->
    <keep-alive :include="['HomeIndex']">
      <router-view></router-view>
    </keep-alive>

    <!-- 底部导航栏 -->
    <van-tabbar route>
      <van-tabbar-item :to="tab.path" v-for="tab in tabBarList" :key="tab.id">
        <span class="text">{{ tab.text }}</span>
        <i :class="`toutiao toutiao-${tab.icon}`" slot="icon"></i>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { tabBarAPI } from '@/api/mockTabBar.js'
import { mapState } from 'vuex'
export default {
  name: 'LayoutPage',
  data () {
    return {
      tabBarList: []
    }
  },
  computed: {
    ...mapState('login', ['token'])
  },
  created () {
    this.getTabBar()
  },
  methods: {
    async getTabBar () {
      const res = await tabBarAPI()
      if (this.token) {
        this.tabBarList = res
      } else {
        const index = res.findIndex((item) => {
          return item.text === '我的'
        })
        res[index].text = '未登录'
        this.tabBarList = res
      }
    }
  }
}
</script>

<style scoped>
i.toutiao {
  font-size: 40px;
}
span.text {
  font-size: 20px;
}
</style>
