<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in list"
      :key="index"
      @click="$emit('search', item)"
    >
      <span v-html="highLight(item)" slot="title"></span>
    </van-cell>
  </div>
</template>

<script>
import { getSuggestion } from '@/api/search'
// import { debounce } from 'lodash'
// 方式3-防抖-手写能够及格防抖
function debounce (callback, num) {
  // 闭包，延长的timer的生命周期
  let timer = null
  // 高阶函数，一个函数返回另外一个函数
  return function (val) {
    const that = this
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(() => {
      // 使用call/bind/apply改变this指向
      callback.call(that, val)
    }, num)
  }
}
/*
  1.call可以调用函数，call可以改变函数中的this指向，传多个参数时用','间隔
  2.apply可以调用函数，可以改变函数中的this指向，传多个参数的时候，用[]
  3.bind可以改变this指向，返回一个函数，传多个参数时用','间隔
*/
export default {
  name: 'search-suggestion',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      timer: null
    }
  },
  components: {},
  async created () {

  },
  mounted () {},
  methods: {
    highLight (item) {
      return item.replace(new RegExp(this.searchText, 'gi'), '<span style="color: #3296fa">' + this.searchText + '</span>')
    }
  },
  watch: {
    searchText: {
      immediate: true,
      // 防抖方法1
      /*
      handler (val) {
          // 防抖原理：
          //   触发该事件，通过判断延时器是否开启，若开启，就关掉，若没开启，就开启一个延时器，让代码在多少秒后执行。若此时又触发了该事件，将重复上述操作
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(async () => {
          const res = await getSuggestion(val)
          this.list = res.options
        }, 500)
      }
      */
      handler: debounce(async function (val) {
        const res = await getSuggestion(val)
        if (res.options[0] === null) {
          this.list = []
        } else {
          this.list = res.options
        }
      }, 500)
    }
  }
}
</script>

<style lang="less" scoped>
</style>
