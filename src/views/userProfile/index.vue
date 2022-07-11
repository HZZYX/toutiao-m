<template>
  <div class="user-profile">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- /导航栏 -->
    <input type="file" hidden ref="inputFile" @change="inputChange" />
    <van-cell title="头像" is-link @click="$refs.inputFile.click()">
      <van-image class="avatar" fit="cover" round :src="user.photo" />
    </van-cell>

    <!-- 昵称 -->
    <van-cell
      title="昵称"
      :value="user.name"
      is-link
      @click="isShowUpdateName = true"
    />

    <!-- 性别 -->
    <van-cell
      title="性别"
      :value="user.gender === 0 ? '男' : '女'"
      is-link
      @click="isUpdateGenderShow = true"
    />

    <!-- 生日 -->
    <van-cell
      title="生日"
      :value="user.birthday || '1997-00-00'"
      is-link
      @click="isShowUpdateBirthdy = true"
    />

    <!-- 编辑昵称弹出层 -->
    <van-popup
      v-model="isShowUpdateName"
      style="height: 100%"
      position="bottom"
    >
      <updateName
        @close="isShowUpdateName = false"
        v-model="user.name"
        v-if="isShowUpdateName"
      ></updateName>
    </van-popup>

    <!-- 编辑生日弹层 -->
    <van-popup
      v-model="isShowUpdateBirthdy"
      style="height: 100%"
      position="bottom"
    >
      <updateBirthdy
        @close="isShowUpdateBirthdy = false"
        v-model="user.birthday"
        v-if="isShowUpdateBirthdy"
      ></updateBirthdy>
    </van-popup>

    <!-- 编辑头像的弹出层 -->
    <van-popup
      v-model="isShowUpdateAvatar"
      style="height: 100%"
      position="bottom"
    >
      <updateAvatar
        @update-avatar="user.photo = $event"
        @close="isShowUpdateAvatar = false"
        :imgUrl="imgUrl"
      />
    </van-popup>

    <!-- 编辑性别 -->
    <van-popup v-model="isUpdateGenderShow" position="bottom">
      <update-gender
        v-if="isUpdateGenderShow"
        v-model="user.gender"
        @close="isUpdateGenderShow = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updateName from './components/update-name.vue'
import updateBirthdy from './components/updateBirthdy.vue'
import updateAvatar from './components/update-avatar'
import updateGender from './components/update-gender.vue'
export default {
  name: 'userProfile',
  data () {
    return {
      user: [],
      isShowUpdateName: false,
      isShowUpdateBirthdy: false,
      isShowUpdateAvatar: false,
      imgUrl: '',
      isUpdateGenderShow: false
    }
  },
  components: {
    updateName,
    updateBirthdy,
    updateAvatar,
    updateGender
  },
  created () {
    this.loadProfile()
  },

  methods: {
    async loadProfile () {
      try {
        const res = await getUserProfile()
        this.user = res
      } catch (error) {
        this.$toast('获取数据失败')
      }
    },
    inputChange () {
      // 获取文件对象
      const file = this.$refs.inputFile.files[0]
      // 获取blob数据
      this.imgUrl = window.URL.createObjectURL(file)
      this.isShowUpdateAvatar = true
      this.$refs.inputFile.value = ''
    }
  }
  // ---
}
</script>

<style scoped lang='less'>
.user-profile {
  /deep/ .van-icon-arrow-left {
    color: #fff;
  }
  .avatar {
    width: 60px;
    height: 60px;
  }
}
</style>
