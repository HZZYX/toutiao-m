<template>
  <div class="post-comment">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="优质评论将会被优先展示"
      show-word-limit
    />
    <van-button type="primary" size="small" @click="onPost">发布</van-button>
  </div>
</template>

<script>
import { addComment } from '@/api/comment'
export default {
  name: 'CommentPost',
  components: {},
  props: {
    // 回复 ID
    target: {
      type: [String, Number],
      required: true
    },
    // 文章 ID
    articleId: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      message: ''
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onPost () {
      if (this.message.trim() === '') return
      const res = await addComment({
        target: this.target,
        content: this.message,
        art_id: this.articleId
      })
      // this.$bus.$emit('onPostSucces', res.new_obj)
      // 提示成功
      this.message = ''
      this.$toast.success('新增成功')
      this.$emit('success', res.new_obj)
    }
  }
}
</script>

<style scoped lang="less">
.van-button--primary {
  height: 176px;
}
.post-comment {
  display: flex;
  padding: 15px;
  align-items: flex-end;
  .post-field {
    background: #f5f7f9;
    margin-right: 15px;
  }
}
</style>
