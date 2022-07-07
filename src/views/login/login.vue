<template>
  <div class="login-container">
     <!-- 导航栏 -->
    <van-nav-bar class="page-nav" :title="title">
      <van-icon slot="left" name="cross" v-if="$route.query.isShowLeft" @click="$router.back()" />
    </van-nav-bar>
    <van-form @submit="onSubmit" ref="formRef">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        v-model="user.mobile"
        :rules="rules.mobile"
        autofocus
        clearable
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        v-model="user.code"
        :rules="rules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="mini"
            type="default"
            @click="onSendCode(user.mobile)"
            native-type="button"
          >
            <!-- 事件修饰符prevent：阻止浏览器的默认事件 -->
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { mapMutations, mapState } from 'vuex'
export default {
  name: 'LoginPage',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '18482622157',
        code: '246810'
      },
      isCountDownShow: false,
      rules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|4|5|6|7|8|9]\d{9}$/, message: '请输入正确的手机号' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '请输入正确的验证码' }
        ]
      }
    }
  },
  computed: {
    /*
      '...'把一个对象里每一组key:value，都展开放入到computed里
      mapState返回的是一个对象，对象里面是一个一个函数，每个函数的返回值，就是从state中读取该属性的值
      借助mapState生成计算属性，从state中读取数据
    */
    ...mapState('login', ['title', 'token'])
  },
  watch: {},
  created () {},
  mounted () {
    if (this.token) {
      console.log('token验证成功')
      // this.$router.push({
      //   path: '/home'
      // })
    }
  },
  methods: {
    async onSubmit (values) {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '登录中...' // 提示消息
      })

      try {
        const res = await login(values)
        console.log('登录成功,请求已返回')
        // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
        this.$toast.success('登录成功')
        this.setToken(res)
        this.$router.push({
          path: '/my'
        })
      } catch (err) {
        if (err.status === 400) {
          this.$toast.fail(err.data.message)
        }
      }
    },
    async onSendCode (value) {
      // 校验手机号
      try {
        await this.$refs.formRef.validate('mobile')
        console.log('校验成功')
      } catch (error) {
        console.log('校验失败')
      }

      // 发送验证码
      try {
        await sendSms(value)
        this.$toast('发送成功')
        // 验证通过，显示倒计时
        this.isCountDownShow = true
      } catch (error) {
        if (error.response && error.response.status === 429) {
          this.$toast('请稍后重试')
        } else {
          this.$toast(error.data.message)
        }
      }
    },
    /*
      通过mapActions、mapMutations批量生成方法
      简单讲解：  ...mapMutations(['setToken'])

      它会帮我们生成一个函数，这个函数名为：ad,
      即：setToken(value){
            this.$store.commit('setToken',value);
      }
      'setToken'表示事件名，value表示要传的参数
    */
    ...mapMutations('login', ['setToken', 'removeToken'])
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
    margin-right: 15px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
    }
  }
}
</style>
