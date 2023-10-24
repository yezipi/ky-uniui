<template>
  <view class="btn-comp">
    <view
    	:class="{
    		fixed,
    		slotContent: $slots.content,
    		noContent: !$slots.content,
    		iphoneX: safeBottom > 0,
    		noPadding,
    		hasLeft: $slots.left
    	}"
    	:style="{height}"
      class="btn-wrap"
    >
    	<view v-if="$slots.left" class="btn-left">
    		<slot name="left"></slot>
    	</view>
    	<button
    		v-if="!$slots.content"
        :style="{
    			width,
    			height,
    			background,
          border,
    			'border-radius': radius + 'rpx',
          'font-size': fontSize ? (fontSize + 'rpx') : ''
    		}"
        :class="{
    			small: size === 'small',
    			mini: size === 'mini',
    			disabled: loading || disabled,
    			primary: type === 'primary',
    			success: type === 'success',
    			info: type === 'info',
    			warning: type === 'warning',
    			danger: type === 'danger',
    			text: type === 'text',
    			default: type === 'default',
    			plain,
    			round,
    			reverse,
    			circle
    		}"
        :open-type="openType"
    		:disabled="loading || disabled"
        class="btn-main"
    		@click.stop="onClick"
        @getuserinfo="getuserinfo"
        @getphonenumber="getphonenumber"
    	>
    		<image v-if="loading && !circle" class="btn-loading" src="/static/img/load.gif"></image>
    		<text v-if="icon && icon.indexOf('icon') > -1" :class="icon" class="btn-icon iconfont"></text>
    		<text v-if="icon && icon.indexOf('icon') < 0" class="btn-icon iconfont">{{ icon }}</text>
    		<slot v-if="!circle"></slot>
      </button>
    	<slot v-else name="content"></slot>
    </view>
    <!--位置占位-->
    <view
      v-if="fixed"
      :class="{ iphoneX: safeBottom > 0, noPadding }"
      class="btn-space">
    </view>
  </view>
</template>

<script>
 export default {
	 emits:['click', 'getphonenumber', 'getuserinfo'],
   props: {
     // 是否固定在下方
     fixed: {
       type: Boolean,
       default: false
     },
     width: {
       type: String,
       default: ''
     },
		 height: {
		   type: String,
		   default: ''
		 },
     background: {
       type: String,
       default: ''
     },
     radius: {
       type: String,
       default: '12'
     },
     size: {
       type: String,
       default: 'normal'
     },
		 disabled: {
			 type: Boolean,
			 default: false
		 },
		 loading: {
			 type: Boolean,
			 default: false
		 },
		 border: {
		   type: String,
		   default: ''
		 },
		 // 按钮类型 primary, success, info, warning, danger, text，
		 type: {
			 type: String,
			 default: 'primary'
		 },
		 // 朴素按钮
		 plain: {
			 type: Boolean,
			 default: false
		 },
		 // 圆角
		 round: {
			 type: Boolean,
			 default: false
		 },
		 // 圆形
		 circle: {
			 type: Boolean,
			 default: false
		 },
		 // 图标
		 icon: {
			 type: String,
			 default: ''
		 },
		 // 背景色左右调换
		 reverse: {
			 type: Boolean,
			 default: false
		 },
		 // fixed的时候是否有边距
		 noPadding: {
			 type: Boolean,
			 default: true
		 },
     // 微信小程序按钮类型
     openType: {
       type: String,
       default: ''
     },

     fontSize: {
       type: String,
       default: ''
     }

   },
	 computed: {
		hasSlots() {
			return Object.keys(this.$slots).length
		},
		safeBottom() {
			return uni.getSystemInfoSync().safeAreaInsets.bottom
		}
	 },
   methods: {
     onClick(e) {
       this.$emit('click', e)
     },
     getphonenumber(res) {
			 this.$emit('getphonenumber', res)
		 },
		 getuserinfo(res) {
			 this.$emit('getuserinfo', res)
		 }
   },
 }
</script>

<style scoped lang="scss">
	@mixin linear-gradient($direction, $color1, $color2) {
	  background: linear-gradient(to $direction, $color1, $color2);
	}
	.btn-main {
		font-size: 28rpx;
		height: 85rpx;
		line-height: 28rpx;
		border-radius: 12rpx;
		border: none;
		color: #ffffff;
		text-align: center;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: 0;
		margin: 0;
		min-width: 150rpx;
		&:after {
			display: none
		}
		&:active {
			box-shadow: none;
			filter: brightness(0.8);
			opacity: 0.8;
		}
		&.nobg {
			background: none!important;
			&.disabled {
				background: none!important;
			}
		}
		&.small {
			height: 65rpx;
			line-height: 65rpx;
			font-size: 26rpx;
      width: auto;
		}
		&.mini {
			height: 50rpx;
			line-height: 50rpx;
			font-size: 22rpx;
		}
		&.round {
			border-radius: 45rpx!important;
			&.small {
				border-radius: 35rpx!important;
			}
			&.mini {
				border-radius: 25rpx!important;
			}
		}
		&.primary {
			$color2: #b3d8ff;
			$color3: var(--color-light-primary);
      $color4: #dbf6f5;
			background: var(--color-primary);
			@include linear-gradient(right, $color3, var(--color-primary));
			&.reverse {
				@include linear-gradient(left, $color3, var(--color-primary));
			}
			&.plain {
				border: 1px solid var(--color-primary);
				background: $color4;
				color: var(--color-primary)!important;
			}
		}
		&.success {
			$color1: #34e064;
			$color2: #2fbe54;
			$color3: #def9e5;
			background: $color1;
			@include linear-gradient(right, $color1, $color2);
			&.reverse {
				@include linear-gradient(left, $color1, $color2);
			}
			&.plain {
				border: 1px solid $color1;
				background: $color3;
				color: $color2!important;
			}
		}
		&.info {
			$color1: #d3d4d6;
			$color2: #909399;
      $color3: #f4f4f5;
			background: $color1;
			@include linear-gradient(right, $color1, $color2);
			&.reverse {
				@include linear-gradient(left, $color1, $color2);
			}
			&.plain {
				border: 1px solid $color1;
				background: $color3;
				color: $color2!important;
			}
		}
		&.warning {
			$color1: #ffcb00;
      $color2: #ff9402;
			$color3: #fdf6ec;
			background: $color1;
			@include linear-gradient(right, $color1, $color2);
			&.reverse {
				@include linear-gradient(left, $color1, $color2);
			}
			&.plain {
				border: 1px solid $color1;
				background: $color3;
				color: $color2!important;
			}
		}
		&.danger {
			$color1: #ff7700;
			$color2: #ff4900;
      $color3: #ffefef;
			background: $color1;
			@include linear-gradient(right, $color1, $color2);
			&.reverse {
				@include linear-gradient(left, $color1, $color2);
			}
			&.plain {
				border: 1px solid $color1;
				background: $color3;
				color: $color2!important;
			}
		}
		&.default {
			$color1: var(--bg-white);
			$color2: var(--bg-white);
      $color3: var(--bg-white);
			background: $color1;
			color: var(--color-dark)!important;
      border: 1px solid var(--border-1);
		}
		&.circle {
			width: 90rpx!important;
			border-radius: 50%!important;
			padding: 0;
			.btn-icon {
				margin-right: 0;
			}
			&.small {
				width: 65rpx!important;
			}
			&.mini {
				width: 50rpx!important;
			}
		}
		&.disabled {
      background: linear-gradient(to right, var(--border-1), var(--border-2))!important;
			cursor: not-allowed!important;
			color: var(--color-gray)!important;
			&:active {
				filter: brightness(1);
				opacity: 1;
			}
		}
    &.text {
    	background: none!important;
    	width: auto!important;
    	color: var(--color-primary)!important;
    	height: auto!important;
    	line-height: initial!important;
      &.disabled {
        color: var(--color-gray)!important;
      }
    }
		.btn-loading {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			margin-right: 12rpx;
		}
		.btn-icon {
			display: inline-block;
			margin-right: 12rpx;
		}
	}
	.btn-wrap {
		background: none;
		&.fixed {
			position: fixed;
			height: 120rpx;
			background: var(--bg-white);
			z-index: 1;
			left: 0;
			bottom: 0;
			right: 0;
			display: flex;
			align-items: center;
			justify-content: space-between;
			&.hasLeft {
				height: 90rpx;
				.btn-main {
					width: 200rpx;
					margin: 0;
					padding: 0;
				}
				.btn-left {
					flex: 1;
					padding-left: 24rpx;
				}
			}
			.btn-main {
				width: 690rpx;
			}
			&.iphoneX {
				height: 150rpx;
			}
		}
		&.slotContent {
			&.fixed {
				height:auto;
				.btn-wrap {
					width: auto;
					flex: 1;
				}
			}
		}
		&.noPadding {
			&.fixed {
				height: auto;
				.btn-wrap {
					margin: 0;
				}
        .btn-main {
        	width: 100%;
          border-radius: 0!important;
        }
        &.iphoneX {
          .btn-main {
          	height: 120rpx;
          }
        }
			}
		}
	}
  .btn-space {
    height: 120rpx;
    &.iphoneX {
    	height: 150rpx;
    }
    &.noPadding {
      height: 90rpx;
      &.iphoneX {
      	height: 120rpx;
      }
    }
  }
	
	@media (prefers-color-scheme: dark) {
		.btn-main {
			color: #f5f5f5;
			&.primary {
				&.plain {
					background: #233838;
				}
			}
			&.warning {
				&.plain {
					background: #434530;
				}
			}
			&.danger {
				&.plain {
					background: #532222;
				}
			}
			&.success {
				&.plain {
					background: #1a3d24;
				}
			}
		}
	}
</style>
