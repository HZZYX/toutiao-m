<template>
  <div class="home-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" fixed>
      <van-button
        class="search-btn"
        slot="title"
        type="info"
        size="small"
        round
        icon="search"
        @click="$router.push({ path: '/search' })"
        >搜索</van-button
      >
    </van-nav-bar>

    <!-- 频道列表 -->
    <van-tabs class="channel-tabs" v-model="active" animated swipeable>
      <van-tab
        v-for="channel in channels"
        :key="channel.id"
        :title="channel.name"
      >
        <!-- 文章列表 -->
        <ArticleList :channel="channel"></ArticleList>
      </van-tab>

      <!-- 图标 -->
      <div slot="nav-right" class="placeholder"></div>
      <div
        slot="nav-right"
        class="hamburger-btn"
        @click="isChennelEditShow = true"
      >
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>

    <!-- 频道编辑弹出层 -->
    <van-popup
      v-model="isChennelEditShow"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <channel-edit
        :my-channels="channels"
        :active="active"
        @update-active="onUpdateActive"
        @add="handleAddMyChannel"
        @DeleteMyChannel="homeDelete"
        @updateActive="handleUpdateActive"
      />
    </van-popup>
  </div>
</template>

<script>
// 1. 导入 获取频道列表的方法
import { getUserChannels } from '@/api/user.js'
import ArticleList from '@/views/home/compoents/article-list.vue'
import ChannelEdit from './compoents/channelEdit.vue'
import { updateChannels } from '@/api/channels'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList,
    ChannelEdit
  },
  props: {},
  data () {
    return {
      active: 0,
      channels: [], // 频道列表
      isChennelEditShow: false // 控制弹层显示
    }
  },
  computed: {},
  watch: {
    channels: {
      // immediate: true,
      async handler (val) {
        if (this.$store.state.login.token) {
          await updateChannels({ channels: val })
        } else {
        // 如果没有登录，就存储到本地
          localStorage.toutiao_channels = JSON.stringify(val)
        }
      }
    }
  },
  created () {
    /*
      调用获取频道列表
      getUserChannels登录时该用户的数据，没登陆时默认数据
    */
    if (this.$store.state.login.token) {
      this.loadChannels()
    } else {
      console.log('没有登录，获取默认数据')
      // 没有登录，获取本地
      try {
        this.channels = JSON.parse(localStorage.toutiao_channels)
      } catch (error) {
        // 如果本地没有数据，给默认数据
        this.loadChannels()
      }
    }
  },
  mounted () {},
  methods: {
    // 2. 定义加载频道列表数据的方法
    async loadChannels () {
      try {
        const res = await getUserChannels()
        this.channels = res.channels
      } catch (err) {
        this.$toast('获取频道列表数据失败')
      }
    },
    onUpdateActive (index, isChennelEditShow = true) {
      // 更新激活的频道项
      this.active = index

      // 关闭编辑频道弹层
      this.isChennelEditShow = isChennelEditShow
    },
    // 添加频道
    async handleAddMyChannel (item) {
      this.channels.push(item)
    },
    // 删更新选中状态
    async  homeDelete (index, isShow) {
      this.channels.splice(index, 1)
      if (isShow) {
        this.active -= 1
      } else {
        console.log('不管')
      }
    },
    handleUpdateActive (index) {
      this.active = index
      this.isChennelEditShow = false
    }
    // --
  }
}
</script>

<style scoped lang="less">
/*
  有scoped，生成的样式会给组件里面所有标签添加一个'data-v-组件id' 属性，例如：van-nav-bar__title[data-v-5954443]
  使用深度选择符  '/deep/'，例如：/deep/.van-nav-bar__title
*/
.home-container {
  padding-top: 174px;
  padding-bottom: 100px;
  /deep/.van-nav-bar__title {
    max-width: unset;
  }
  .search-btn {
    width: 555px;
    height: 64px;
    background-color: #5babfb;
    border: none;
    font-size: 28px;
    .van-icon {
      font-size: 32px;
      color: #fff;
    }
  }

  /deep/ .channel-tabs {
    .van-tabs__wrap {
      position: fixed;
      top: 92px;
      z-index: 1;
      left: 0;
      right: 0;
      height: 82px;
    }

    .van-tab {
      border-right: 1px solid #edeff3;
      min-width: 200px;
      font-size: 30px;
      color: #777777;
    }
    .van-tab--active .van-tab__text {
      color: #333 !important;
    }
    .van-tabs__line {
      width: 31px !important;
      height: 6px;
      background: rgba(50, 150, 250, 1);
      border-radius: 3px;
      bottom: 8px;
    }
    .van-tabs__nav {
      padding: 0;
    }
    .placeholder {
      flex-shrink: 0;
      width: 66px;
      height: 82px;
    }

    .hamburger-btn {
      position: fixed;
      right: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;
      i.toutiao {
        font-size: 33px;
      }
      &:before {
        content: "";
        position: absolute;
        left: 0;
        width: 1px;
        height: 100%;
        background-image: url(~@/assets/cat.jpg);
        background-size: contain;
      }
    }
  }
}
</style>
