<template>
  <div class="article-comments">
    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :immediate-check="false"
    >
      <comment-item
        v-for="(item, index) in list"
        :key="index"
        :item="item"
        :isReply="isReply"
        @revampLiking="item.is_liking = $event"
      />
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
import commentItem from './comment-item.vue'
export default {
  name: 'ArticleComment',
  props: {
    source: {
      type: [String, Number],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    },
    isReply: {
      type: Boolean,
      default: true
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
  components: { commentItem },
  created () {
    this.onLoad()
    this.$bus.$on('onPostSucces', data => {
      // this.list.unshift(data)
    })
  },
  methods: {
    async onLoad () {
      // 1.发送请求
      try {
        const res = await getComments({
          type: this.type,
          source: this.source,
          offset: this.offset,
          limit: 10
        })
        // 2.追加数据
        this.list.push(...res.results)
        this.$emit('setTotal', res.total_count)
        // 3.改变状态值
        this.loading = false
        // 4. 判断是否还有数据
        if (res.results.length === 0 || this.list.length >= res.total_count) {
          // 没有就将 finished 设置结束
          this.finished = true
        } else {
          // 有就更新获取下一页的数据页码
          this.offset = res.last_id
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
