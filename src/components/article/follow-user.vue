<template>
  <div>
    <van-button
      class="follow-btn"
      round
      size="small"
      v-if="isFollowed"
      @click="onClick"
    >
      已关注
    </van-button>
    <van-button
      v-else
      class="follow-btn"
      type="info"
      color="#3296fa"
      round
      size="small"
      icon="plus"
      @click="onClick"
      >关注</van-button
    >
  </div>
</template>

<script>
import { addFollow, deleteFollow } from '@/api/user'
export default {
  name: 'followUser',
  model: {
    prop: 'isFollowed',
    event: 'update-isFollowed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    userId: {
      type: [String, Number],
      required: true
    }
  },
  data () {
    return {
      isLoding: false
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onClick () {
      if (this.isLoding) return
      this.isLoding = true
      if (this.isFollowed) {
        // 取消
        await deleteFollow(this.userId)
        this.$emit('update-isFollowed', false)
      } else {
        // 关注
        await addFollow(this.userId)
        this.$emit('update-isFollowed', true)
      }
      this.isLoding = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
