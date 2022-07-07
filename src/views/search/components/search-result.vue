<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item.art_id" :title="item.title" />
    </van-list>
  </div>
</template>

<script>
import { getResult } from '@/api/search'
export default {
  name: 'search-result',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      page: 1,
      finished: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onLoad () {
      // 1.异步更新数据
      const res = await getResult({
        page: this.page,
        per_page: 10,
        q: this.searchText
      })
      // 2.追加数据
      this.list.push(...res.results)
      this.page++
      // 3.改变加载状态
      this.loading = false
      // 4.判断是否结束
      if (res.results.length === 0) {
        // 不再触发，上拉刷新
        this.finished = true
      }
    }
  }
  // --
}
</script>

<style lang="less" scoped>
.van-cell {
  // border-bottom: 1px solid #ccc;
  // x轴、y轴、阴影大小、模糊度
  box-shadow: 0px 0px 1px 0 rgba(51, 150, 252,0.5);
}
</style>
