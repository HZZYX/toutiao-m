<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <template v-if="isEdit">
        <span style="margin-right: 10px" @click.self="$emit('allDelete')"
          >全部删除</span
        >
        <span @click="isEdit = false">完成</span>
      </template>
      <van-icon name="delete-o" v-else @click="isEdit = true" />
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, index) in searchHistories"
      :key="index"
    >
      <van-icon
        v-if="isEdit"
        name="close"
        @click.self="$emit('singleDelete', index)"
      ></van-icon>
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'search-history',
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      isEdit: false
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
