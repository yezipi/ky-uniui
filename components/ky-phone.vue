<!--悬浮电话按钮 首页、推荐产品页，产品详情页）-->
<template>
  <view class="float-icon-box">
    <view class="float-icon-wrap">
      <view class="float-item" @click.stop="toPage('/pages/User/Feedback/Create')">
        <text class="iconfont" style="font-size: 22rpx;">&#xe60e;</text>
        <text class="iconname">建议</text>
      </view>
      <view class="float-item" @click.stop="callPhone">
        <text v-if="noPhone" class="iconfont" >&#xe680;</text>
        <text v-else class="iconfont">&#xe8ab;</text>
        <text class="iconname">{{ !noPhone ? '客服' : '经纪人' }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  import { useUserInfo, useToken } from '@/stores/index.js'
	import config from '@/config.js'

  export default {
    data() {
      return {}
    },
		computed: {
			noPhone() {
				return useUserInfo().value && useUserInfo().value.customerOwnerPhone
			}
		},
    methods: {
      callPhone() {
				const user = useUserInfo().value
        const phoneNumber = user.customerOwnerPhone || config.CONTACT
        uni.makePhoneCall({ phoneNumber })
      },

      toPage(url) {
        this.$nav.push(useToken().value ? url : '/pages/Login')
      },
    }
  }
</script>

<style scoped lang="scss">
  .float-icon-box {
    position: fixed;
    bottom: calc(var(--window-bottom) + env(safe-area-inset-bottom) + 24rpx);
    right: 24rpx;
    z-index: 99;
    width: 75rpx;
  }
  .float-icon-menu {
    position: relative;
    z-index: 1;
  }
  .float-item {
    width: 100%;
    height: 75rpx;
    background: linear-gradient(to bottom, var(--color-light-primary), var(--color-primary));
    box-shadow: 0 0 12rpx rgba(0,0,0,.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    margin-bottom: 24rpx;
    &:active {
      filter: contrast(2);
    }
    .iconfont {
      display: block;
      color: #f5f5f5;
      font-size: 24rpx;
    }
    .iconname {
      font-size: 14rpx;
      color: #f5f5f5;
      line-height: 10rpx;
      margin-top: 8rpx;
      /* #ifdef H5 */
      transform: scale(0.7);
      /* #endif */
    }
  }
</style>
