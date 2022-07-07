<template>
  <van-cell class="article-item" @click="pushArticle(article.art_id)">
    <div slot="title" class="title van-multi-ellipsis--l2">
      {{ article.title }}
    </div>
    <div slot="label">
      <div v-if="article.cover.type === 3" class="cover-wrap">
        <div
          class="cover-item"
          v-for="(img, index) in article.cover.images"
          :key="index"
        >
          <van-image class="cover-item-img" fit="cover" :src="img" />
        </div>
      </div>
      <div class="label-info-wrap">
        <span>{{ article.aut_name }}</span>
        <span>{{ article.comm_count }}评论</span>
        <span>{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>

    <van-image
      v-if="article.cover.type === 1"
      slot="default"
      class="right-cover"
      fit="cover"
      :src="article.cover.images[0]"
    />
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  components: {},
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {
  },
  mounted () {
  },
  methods: {
    pushArticle (id) {
      this.$router.push({
        path: '/article',
        query: {
          articleId: id
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }
  // 标题
  .van-cell__title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  // 1张照片

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 100%;
    height: 146px;
  }

  // 底部作者
  .label-info-wrap {
    span {
      font-size: 22px;
      color: #b4b4b4;
      margin-right: 25px;
    }
  }

  // 3张照片
  .cover-wrap {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    padding: 30px 0;
    .van-image {
      flex: 1;
      height: 146px;
    }
  }
}
</style>
