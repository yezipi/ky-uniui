<!--radio组件 2020-9-28 zzc添加-->
<template>
	<view
    :class="{ small: size === 'small', large: size === 'large', normal: size === 'normal' }"
     class="ky-radiocheck"
		 @click="$emit('click')"
    >
		<text v-if="!active" class="no iconfont" >&#xe618;</text>
		<text v-else class="primary-color yes iconfont">&#xe61a;</text>
		<text v-if="label" :class="{ 'primary-color': active }" class="check-label">{{ label }}</text>
	</view>
</template>

<script>
	export default {
		emits: ['click'],
		props: {
			checked: {
				type: [Boolean, Number],
				default: false,
			},
			label: {
				type: String,
				default: ''
			},
			// small, normal, large
			size: {
				type: String,
				default: 'normal'
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
	.ky-radiocheck {
		display: flex;
		align-items: center;
		&.small {
			.iconfont {
				font-size: 34rpx;
			}
			.check-label {
				font-size: 24rpx;
			}
		}
		&.large {
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
				color: var(--border-2);
			}
		}
		.check-label {
			display: inline-block;
			margin-left: 12rpx;
		}
	}
</style>
