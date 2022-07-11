<template>
  <van-cell :title="item.aut_name">
    <van-image
      slot="icon"
      round
      width="30"
      height="30"
      style="margin-right: 10px"
      :src="item.aut_photo"
    />
    <span style="color: #466b9d" slot="title">{{ item.aut_name }}</span>
    <div slot="label">
      <p style="color: #363636">{{ item.content }}</p>
      <p>
        <span style="margin-right: 10px">{{
          item.pubdate | relativeTime
        }}</span>
        <!-- 调用爷爷组件的方法 -->
        <van-button
          size="mini"
          @click="articleIndex.onReplyShow(item)"
          type="default"
          v-if="isReply"
          >回复</van-button
        >
      </p>
    </div>
    <van-icon
      slot="right-icon"
      :color="item.is_liking ? 'red' : '#323233'"
      :name="item.is_liking ? 'like' : 'like-o'"
      @click="onLike"
    />
  </van-cell>
</template>

<script>
import { addCommentLike, deleteCommentLike } from '@/api/comment'
export default {
  name: 'comment-item',
  props: {
    item: {
      type: Object,
      required: true
    },
    isReply: {
      type: Boolean,
      default: true
    }
  },
  // 得到爷爷组件
  inject: ['articleIndex'],
  data () {
    return {
      isLoading: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onLike () {
      if (this.isLoading) return
      this.isLoading = true
      this.item.is_liking
        ? await deleteCommentLike(this.item.com_id)
        : await addCommentLike(this.item.com_id)
      this.$emit('revampLiking', !this.item.is_liking)
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
