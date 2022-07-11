<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <template v-else>
        <!-- 加载完成-文章详情 -->
        <div class="article-detail" v-if="article.title">
          <!-- 文章标题 -->
          <h1 class="article-title">{{ article.title }}</h1>
          <!-- /文章标题 -->

          <!-- 用户信息 -->
          <van-cell class="user-info" center :border="false">
            <van-image
              class="avatar"
              slot="icon"
              round
              fit="cover"
              :src="article.aut_photo"
            />
            <div slot="title" class="user-name">{{ article.aut_name }}</div>
            <div slot="label" class="publish-date">{{ article.pubdate }}</div>

            <followUser
              v-model="article.is_followed"
              :userId="article.aut_id"
            />
          </van-cell>
          <!-- /用户信息 -->

          <!-- 文章内容 -->
          <div
            class="article-content markdown-body"
            ref="contentRef"
            v-html="article.content"
          ></div>
          <van-divider>正文结束</van-divider>
          <articleComment
            :source="article.art_id"
            @setTotal="totalComment = $event"
            ref="listRef"
          />
        </div>

        <template v-else>
          <!-- 加载失败：404 -->
          <div class="error-wrap" v-if="errorStatus === 404">
            <van-icon name="failure" />
            <p class="text">该资源不存在或已删除！</p>
          </div>

          <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
          <div class="error-wrap" v-else>
            <van-icon name="failure" />
            <p class="text">内容加载失败！</p>
            <van-button class="retry-btn" @click="getArticleDetail"
              >点击重试</van-button
            >
          </div>
        </template>
      </template>
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom" v-if="article.title">
      <van-button
        class="comment-btn"
        type="default"
        round
        size="small"
        @click="isPostShow = true"
        >写评论</van-button
      >
      <van-icon name="comment-o" :badge="totalComment" color="#777" />
      <collectArticle
        v-model="article.is_collected"
        :articleId="article.art_id"
      />
      <likeArticle v-model="article.attitude" :articleId="article.art_id" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->

    <!-- 发布评论 -->
    <van-popup v-model="isPostShow" position="bottom">
      <comment-post
        :target="article.art_id"
        @success="onSuccess"
      ></comment-post>
    </van-popup>

    <van-popup v-model="isReplyShow" position="bottom" style="height: 100%">
      <comment-reply
        v-if="isReplyShow"
        :comment="currentComment"
        @close="isReplyShow = false"
      />
    </van-popup>
    <!-- /评论回复 -->
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import 'github-markdown-css/github-markdown.css'
import 'github-markdown-css/github-markdown-light.css'
import { getArticleDetail } from '@/api/article'
import followUser from '@/components/article/follow-user.vue'
import likeArticle from '@/components/article/like-article.vue'
import collectArticle from '@/components/article/collect-article.vue'
import articleComment from './components/articleComment.vue'
import commentPost from './components/comment-post.vue'
import commentReply from './components/comment-reply.vue'
export default {
  name: 'ArticleIndex',
  components: { followUser, likeArticle, collectArticle, articleComment, commentPost, commentReply },
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data () {
    return {
      article: {},
      isLoading: true,
      errorStatus: '',
      totalComment: 0,
      isPostShow: false, // 新增评论弹出显示
      isReplyShow: false,
      currentComment: {}
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleDetail()
  },
  mounted () {},
  // 提供给子组件
  provide () {
    return {
      articleIndex: this
    }
  },
  methods: {
    onReplyShow (item) {
      // 显示弹层
      this.isReplyShow = true
      // 保存查看的评论
      this.currentComment = item
    },
    onSuccess (item) {
      // 关闭弹层
      this.isPostShow = false
      // 把新的评论添加到列表里面
      this.$refs.listRef.list.unshift(item)
    },
    async getArticleDetail () {
      try {
        // if (Math.random() > 0.5) {
        //   throw new function (status) {
        //     this.response = { status }
        //   }(500)
        // }
        const res = await getArticleDetail(this.articleId)
        this.article = res
        this.isLoading = false // 关闭加载状态

        this.$nextTick(() => {
          const images = []
          this.$refs.contentRef.querySelectorAll('img').forEach((item, index) => {
            images.push(item.src)
            item.onclick = () => {
              ImagePreview({ images, startPosition: index })
            }
          })
        })
      } catch (error) {
        this.isLoading = false // 关闭加载状态
        this.errorStatus = error.response.status
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-container {
  /deep/ .van-icon-arrow-left:before {
    color: #fff;
  }
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
