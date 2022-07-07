<template>
  <div class="update-avatar">
    <img :src="imgUrl" />
    <div class="toolbar">
        <span>取消</span>
        <span></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'update-avatar',
  props: {
    imgUrl: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {

    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {

  }
}
</script>

<style lang="less" scoped>
</style>
