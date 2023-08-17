<template>
  <view class="ky-empty-wrap">
    <view class="ky-empty-box">
      <image v-if="icon" class="ky-empty-icon" src="/static/img/nodata.png"></image>
      <text v-if="msg" class="ky-empty-msg">{{ msg }}</text>
      <slot></slot>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      icon: {
        type: Boolean,
        default: true
      },
      msg: {
        type: String,
        default: '暂无数据'
      },
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .ky-empty-wrap {
    display: flex;
    justify-content: center;
    padding: 24rpx;
    .ky-empty-box {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    .ky-empty-icon {
      width: 146rpx;
      height: 146rpx;
    }
    .ky-empty-msg {
      display: inline-block;
      font-size: 28rpx;
      color: var(--color-gray)
    }
  }
</style>
