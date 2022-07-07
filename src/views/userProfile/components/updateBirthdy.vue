<template>
  <div class="update-birthdy">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    ></van-datetime-picker>
  </div>
</template>

<script>
import { updateUserName } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'updateBirthdy',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      minDate: new Date(1900, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await updateUserName({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        this.$emit('close')
        this.$toast('更新成功')
      } catch (error) {
        console.log(error)
        this.$toast('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
