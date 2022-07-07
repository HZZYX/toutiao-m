<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.aut_name">
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d" slot="title">hello</span>
        <div slot="label">
          <p style="color: #363636">{{item.aut_name}}</p>
          <p>
            <span style="margin-right: 10px">{{item.content}}</span>
            <van-button size="mini" type="default">{{item.pubdate}}</van-button>
          </p>
        </div>
        <van-icon slot="right-icon" name="like-o" />
      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group>
    <!-- /发布评论 -->
  </div>
</template>

<script>
import { getComments } from '@/api/comment'

export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: undefined
    }
  },
  created () {
    this.onLoad()
  },
  methods: {
    async onLoad () {
      // 1.发送请求
      try {
        const { last_id: offet, results, total_count: total } = await getComments({
          type: 'a',
          source: this.source,
          offet: this.offset,
          limit: 10
        })
        // 2.追加数据
        this.offset = offet
        this.list.push(...results)
        this.$emit('set-total', total)
        // 3.改变状态值
        this.loading = false
        // 4.判断是否结束
        if (results.length === 0) {
          this.finished = true
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
  // ---
}
</script>

<style scoped lang="less">
.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

.van-list {
  margin-bottom: 45px;
}
</style>
