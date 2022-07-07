<template>
  <div>
    <van-icon
      :color="value ? '#ffa500' : '#777'"
      :name="value ? 'star' : 'star-o'"
      @click="onClick"
    />
  </div>
</template>

<script>
import { addCollect, deleteCollect } from '@/api/user'
export default {
  name: 'collectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isLoading: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onClick () {
      if (this.isLoading) return
      this.isLoading = true
      if (this.value) {
        await deleteCollect(this.articleId)
      } else {
        await addCollect(this.articleId)
      }
      this.$emit('input', !this.value)
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
