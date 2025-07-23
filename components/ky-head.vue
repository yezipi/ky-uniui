<template>
  <view class="top-bar">
    <!--noSpace为false时可以把页面内容顶下来-->
    <view v-if="!noSpace" class="space">
      <view v-if="!noBar" class="status-height"></view>
      <view v-if="!noMenuBtn" :style="{ height: menuButtonTop + 'px' }" class="menu-height"></view>
      <view :style="{ height: height + 'px' }" class="nav-height"></view>
    </view>
    <!--头部-->
    <view class="tb-main">
      <view class="tb-bg" :class="{ blur }" :style="{ opacity, background: noBg ? 'transparent' : bgColor }"></view>
      <!--电量条高度-->
      <view v-if="!noBar" class="status-height"></view>
      <view v-if="!noMenuBtn" :style="{ height: menuButtonTop + 'px' }" class="menu-height"></view>
      <!--end 电量条高度-->
      <view :class="{ 'white-color': transparent && !isScrollTo }" class="top-nav" :style="{ height: height + 'px' }">

        <view class="tn-left">
          <text v-if="!noBack" class="iconfont inline-block" style="transform: rotate(180deg);" @click="goBack">&#xe62a;</text>
          <slot name="left"></slot>
        </view>

        <view :class="{ hasCenter: $slots.center }" class="tn-center">
          <text v-if="title && !$slots.center" :style="{ opacity }">{{ title }}</text>
          <slot name="center"></slot>
        </view>

        <view class="tn-right">
          <text v-if="right" @click="onRightClick">{{ right }}</text>
          <slot name="right"></slot>
        </view>
      </view>
    </view>
    <!--电量条背景-->
  </view>
</template>

<script>
	const isDark = uni.getAppBaseInfo().theme !== 'light'
	const windowInfo = uni.getWindowInfo()

  export default {
		emits: ['rightClick', 'scrollTo'],
    props: {
      /**
       * 标题
       */
      title: {
        type: String,
        default: ''
      },
      /**
       * 背景颜色
       */
      background: {
        type: String,
        default: isDark ? 'rgba(55,55,55, 0.9)' : 'rgba(255,255,255, 0.9)'
      },
      /**
       * 右侧文字
       */
      right: {
        type: String,
        default: ''
      },
      /**
       * 是否显示后退按钮
       */
      noBack: {
        type: Boolean,
        default: false
      },
      /**
       * 是否把导航部分的间距顶下来
       */
      noSpace: {
        type: Boolean,
        default: false
      },
      /**
       * 不显示statusBar高度
       */
      noBar: {
        type: Boolean,
        default: false
      },
      /**
       * 不显示小程序胶囊高度
       */
      noMenuBtn: {
        type: Boolean,
        default: false
      },
      /**
       * 是否只在网页显示
       */
      onlyH5: {
        type: Boolean,
        default: false
      },
      /**
       * 是否透明背景
       */
      transparent: {
        type: Boolean,
        default: false
      },
      /**
       * 标题栏高度，px
       */
      height: {
        type: Number,
        default: 45
      },
      /**
       * 背景高斯模糊
       */
      blur: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        sLoad: false,
        isLogin: false,
        messageNum: 0,
        barTop: windowInfo.statusBarHeight,
        opacity: 0,
        isScrollTo: false,
        menuButtonTop: 0, // 小程序胶囊按钮高度
				isDark
      };
    },
    computed: {
      noBg() {
        return this.opacity <= 0
      },
			bgColor() {
				if (!this.background) {
				  return this.color
				}
				return this.isDark ? 'rgba(55,55,55, 0.9)' : 'rgba(255,255,255, 0.9)'
			}
    },
    mounted() {
      // #ifdef MP-WEIXIN
      const button = uni.getMenuButtonBoundingClientRect()
      this.menuButtonTop = button.top - 5
      // #endif
      this.opacity = this.transparent ? 0 : 1
			uni.onThemeChange(res => {
				this.isDark = res.theme === 'dark'
			})
    },
		destroyed() {
			uni.offThemeChange()
		},
    methods: {
      goBack() {
        this.$nav.back()
      },
      onRightClick() {
        this.$emit('rightClick')
      },
      setOpacity(scrollTop) {
        const barTop = this.barTop + this.menuButtonTop
        let opacity = Number((1 / barTop) * scrollTop).toFixed(2)

        if (opacity >= 1) {
          this.opacity = 1
          if (!this.isScrollTo) {
            this.isScrollTo = true
            this.$setBarStyle(!this.isDark ? 'dark' : 'light');
            this.$emit('scrollTo', true)
          }
        } else {
          if (opacity <= 0.5 && this.isScrollTo) {
            this.isScrollTo = false
            this.$setBarStyle(!this.isDark ? 'light' : 'dark')
            this.$emit('scrollTo', false)
          }
          this.opacity = opacity
        }
      },
    },
  }
</script>

<style scoped lang="scss">
  $barheight: var(--status-bar-height);
  $navheight: 45px;
  $txtcolor: var(--color-dark);

  .tb-main {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 99;
    background: none;

    .tb-bg {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      &.blur {
        backdrop-filter: saturate(100%) blur(10rpx);
      }
    }

    .top-nav {
      background: none;
      height: $navheight;
      display: flex;
      justify-content: space-between;
      align-items: center;
      position: relative;
      z-index: 1;

      &.hasOneRight {
        width: 100%;
        justify-content: flex-end;
      }
    }

    .status-height {
      height: $barheight;
      background: none;
      position: relative;
      z-index: 1;
    }

    .tn-left,
    .tn-right {
      position: absolute;
      min-width: 32rpx;
      display: block;
      height: 32px;
      text-align: center;
      line-height: 32px;
      color: inherit;
      font-size: 18px;
      z-index: 2;
    }

    .tn-left {
      left: 15px;
      &:active {
        opacity: 0.8;
      }
    }

    .tn-right {
      right: 15px;
      font-size: 16px;
    }

    .tn-center {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto 15px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: inherit;
      font-size: 16px;
      text-align: center;
      &.hasCenter {
        flex: none;
        margin: auto;
      }
    }
  }

  .space {
    background: none;

    .status-height {
      height: $barheight;
    }

    .nav-height {
      height: $navheight;
    }
  }
</style>
