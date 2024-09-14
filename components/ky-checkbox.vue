<!--cchekbox组件 2020-9-28 zzc添加-->
<template>
	<view :class="{
      small: size === 'small',
      large: size === 'large',
      normal: size === 'normal',
      disabled,
    }"
      class="pop-check">
		<text v-if="!active" class="no iconfont" >&#xe619;</text>
		<text v-else class="primary-color yes iconfont">&#xe61b;</text>
		<text v-if="label" :class="{ 'primary-color': active }" class="check-label">{{ label }}</text>
	</view>
</template>

<script>
	export default {
		props: {
			checked: {
				type: Boolean,
				default: false,
			},
			label: {
				type: String,
				default: ''
			},
			// small, normal, large
			size: {
				type: String,
				default: ''
			},
      disabled: {
        type: Boolean,
        default: false,
      }
		},
		data() {
			return {
				active: false
			}
		},
		mounted() {
			this.active = this.checked
		},
		watch: {
			checked(v) {
				this.active = v
			}
		},
	}
</script>

<style scoped lang="scss">
.pop-check {
		display: flex;
		align-items: center;
		min-height: 40rpx;
    &.disabled {
      text {
        color: var(--color-gray);
      }
    }
		&.small {
			min-height: 34rpx;
			.iconfont {
				font-size: 34rpx;
			}
			.check-label {
				font-size: 24rpx;
			}
		}
		&.large {
			min-height: 60rpx;
			.iconfont {
				font-size: 60rpx;
			}
			.check-label {
				font-size: 32rpx;
			}
		}
		.iconfont {
			display: inline-block;
			font-size: 40rpx;
			&.no {
				color: var(--color-light-gray);
			}
		}
		.check-label {
			display: inline-block;
			margin-left: 12rpx;
		}
	}
</style>
