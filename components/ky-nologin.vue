<template>
	<!--未登录遮罩-->
	<view class="nologin-mask">
		<view class="nologin-btn">
			<slot></slot>
			<text class="block ft-24 mb-12 gray-color">{{ msg }}</text>
			<ky-btn size="mini" width="200rpx" round @click="$nav.push('Login')">去登录</ky-btn>
		</view>
	</view>
	<!--end 未登录遮罩-->
</template>

<script>
	export default {
		props: {
			msg: {
				type: String,
				default: ''
			}
		}
	}
</script>

<style scoped lang="scss">
	.nologin-mask {
		position: fixed;
		z-index: 2;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(to top, var(--color-white) 45%, rgba(var(--rgb-white), 0.25));
		display: flex;
		align-items: center;
		justify-content: center;
		.nologin-btn {
			margin-top: 100rpx;
			width: 480rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
	}
</style>