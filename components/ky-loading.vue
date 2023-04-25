<template>
	<view :class="{ isRelative }" class="ky-loading-box loading5">
		<view class="shape shape1"></view>
		<view class="shape shape2"></view>
		<view class="shape shape3"></view>
	</view>
</template>

<script>
	export default {
		props: {
			isRelative: {
				type: Boolean,
				default: false,
			}
		}
	}
</script>

<style scoped lang="scss">
	.ky-loading-box {
		height: 25rpx;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 0;
		&.isRelative {
			position: relative;
			min-height: 100rpx;
		}
	}
	.shape {
	  width: 25rpx;
	  height: 25rpx;
	  border-radius: 50%;
	  background-color: var(--color-primary);
		margin: 0 6rpx;
	}
	.shape1 {
	  animation: pulse .4s ease 0s infinite alternate;
	}
	.shape2 {
	  animation: pulse .4s ease .2s infinite alternate;
	}
	.shape3 {
	  animation: pulse .4s ease .4s infinite alternate;
	}
	@keyframes pulse {
	  from {
	    opacity: 1;
	    transform: scale(1);
	  }
	  to {
	    opacity: .25;
	    transform: scale(.5);
	  }
	}
</style>
