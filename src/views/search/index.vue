<template>
  <div>
    <van-search
      v-model="value"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
      background="#3396FC"
      @focus="isResultShow = false"
    />
    <!-- isResultShow为真就显示，不为真就不显示 -->
    <searchResult v-if="isResultShow" :search-text="value" />
    <!-- 在isResultShow为假的基础上，value为真就显示 -->
    <searchSuggestion
      v-else-if="value"
      :searchText="value"
      @search="onSearch"
    />
    <!-- 在前两者都为假时，显示，即：isResultShow，value都为假 -->
    <searchHistory
      v-else
      :searchHistories="searchHistories"
      @singleDelete="singleDelete"
      @allDelete="allDelete"
    />
  </div>
</template>

<script>
import searchHistory from './components/search-history.vue'
import searchResult from './components/search-result.vue'
import searchSuggestion from './components/search-suggestion.vue'
export default {
  name: 'SearchPage',
  props: {
  },
  data () {
    return {
      value: '',
      isResultShow: false, // 控制搜索结果的显示
      searchHistories: JSON.parse(localStorage.searchHistories || '[]')
    }
  },
  components: {
    searchHistory,
    searchResult,
    searchSuggestion
  },
  created () {},
  watch: {
    searchHistories: {
      immediate: true,
      handler (val) {
        localStorage.searchHistories = JSON.stringify(this.searchHistories)
      }
    }
  },
  mounted () {},
  methods: {
    onSearch (item) {
      if (item.trim() === '') return
      // 存储 val
      this.value = item
      const index = this.searchHistories.findIndex(t => t === item)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(item)
      // 显示搜索结果组件
      this.isResultShow = true
    },
    onCancel () {
      console.log('取消')
      // this.value = ''
      this.isResultShow = false
      this.$router.back()
    },
    singleDelete (index) {
      this.searchHistories.splice(index, 1)
    },
    allDelete () {
      this.searchHistories.splice(0)
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
</style>
