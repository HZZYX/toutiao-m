<template>
  <div style="padding-top: 50px">
    <van-cell title="我的频道">
      <van-button
        type="danger"
        round
        size="small"
        plain
        @click="isEdit = !isEdit"
        >{{ isEdit ? "完成" : "编辑" }}</van-button
      >
    </van-cell>

    <van-grid :gutter="10">
      <van-grid-item
        v-for="(value, index) in myChannels"
        :key="value.id"
        :text="value.name"
        :class="{ newActive: index === active }"
        @click="handleClickMyChannel(index)"
      >
        <van-icon name="close" slot="icon" v-if="isEdit" />
      </van-grid-item>
    </van-grid>

    <van-cell title="频道推荐" />

    <van-grid :gutter="10">
      <van-grid-item
        v-for="value in recommendChannel"
        :key="value.id"
        :text="value.name"
        icon="plus"
        @click="handleAddMyChannel(value)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'

export default {
  name: 'channelEdit',
  props: {
    myChannels: {
      type: Array,
      required: true
    },
    active: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      // 所有频道
      allChannels: [],
      isEdit: false // 编辑状态
    }
  },
  async created () {
    const res = await getAllChannels()
    this.allChannels = res.channels
  },
  computed: {
    recommendChannel () {
      // 从所有频道里面筛选出没有出现在我的频道里面的数据
      return this.allChannels.filter(item => {
        const f = this.myChannels.find(i => i.id === item.id)
        /*
          如果找到了，就返回false，如果没有找到就返回true
        */
        return !f
      })
    }
  },
  methods: {
    handleClickMyChannel (index) {
      if (this.isEdit) {
        if (index >= this.active) {
          // 当前删除元素索引大于我选中的元素的索引，不用考虑选中的状态
          this.$emit('DeleteMyChannel', index, false)
        } else {
          /*
            当前删除的元素索引小于我选中的元素的索引，需要考虑选中的状态
            一个数组删除了一个元素，这个元素后面的元素的索引值，都减了 1
            此时我们就需要将，根据索引的active减1

            例如：当前选中元素 channel[5],删除了channel[4]元素
            此时原先channel[5]变成了channel[4]，要想选中元素不发生改变，就必须将索引减1变成4
          */
          this.$emit('DeleteMyChannel', index, true)
        }
      } else {
        this.$emit('updateActive', index)
      }
    },
    handleAddMyChannel (value) {
      this.$emit('add', value)
      // this.myChannels.push(value)
    }

  }
}
</script>

<style scoped lang="less">
.van-cell__title {
  font-size: 32px;
  color: #333333;
}
.van-button--danger {
  width: 104px;
  height: 48px;
}
/deep/ .van-grid {
  margin-top: 25px;
  .newActive {
    .van-grid-item__text {
      color: red;
    }
  }
  .van-grid-item__content {
    background-color: #f4f5f6;
    display: flex;
    justify-content: center;
    flex-direction: row;
    position: relative;
    .van-icon-plus {
      font-size: 28px;
      // margin-right: 6px;
    }
    .van-grid-item__text {
      margin-left: 1px; //将外边距改成这个也可以
      margin-top: 2px !important;
    }
    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-close {
      position: absolute;
      top: -12px;
      right: -12px;
      font-size: 32px;
    }
  }
}
</style>
