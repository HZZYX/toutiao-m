<template>
  <div>
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="确定"
      @click-left="$emit('close')"
      @click-right="onClickRight"
    ></van-nav-bar>

    <van-field
      v-model="localNmae"
      rows="2"
      autosize
      type="textarea"
      maxlength="10"
      placeholder="请输入新昵称"
      show-word-limit
    ></van-field>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
export default {
  name: 'update-name',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localNmae: ''
    }
  },
  components: {},
  created () {
    this.localNmae = this.value
  },
  mounted () {},
  methods: {
    async onClickRight () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        if (this.localNmae.trim() === '') {
          return this.$toast('请输入昵称')
        }
        await updateUserName({
          name: this.localNmae
        })
        this.$emit('input', this.localNmae)
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        if (error.response && error.response.status === 409) {
          return this.$toast('用户名已存在')
        }
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-field__control {
  padding-top: 10px;
  padding-left: 10px;
  background: #f5f7f9;
}
</style>
