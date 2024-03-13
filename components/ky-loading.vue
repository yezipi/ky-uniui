<template>
	<view :class="{ isRelative }" class="ky-loading-box">
		<image v-if="type === 1" src="https://yangpin.shop/kaiyinzhicai_app/ky-loading_202403131641.gif"
			class="ky-loading1"></image>
		<view v-else-if="type === 2" class="ky-loading2">
			<view class="ky-loading-shape shape1"></view>
			<view class="ky-loading-shape shape2"></view>
			<view class="ky-loading-shape shape3"></view>
		</view>
		<view v-else class="ky-loading3">
			<view class="ky-loading-shape shape1"></view>
			<view class="ky-loading-shape shape2"></view>
			<view class="ky-loading-shape shape3"></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			isRelative: {
				type: Boolean,
				default: false,
			},
			/**
			 * 动画类型，1三个点，2gif，3方块
			 */
			type: {
				type: Number,
				default: 1,
			}
		}
	}
</script>

<style scoped lang="scss">
	.ky-loading-box {
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
			margin: 24rpx;
		}
	}

	.ky-loading1 {
		width: 180rpx;
		height: 180rpx;
	}

	.ky-loading2 {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 25rpx;
		.ky-loading-shape {
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
	}
	
	.ky-loading3 {
		position: relative;
		width: 75px;
		height: 75px;
		overflow: visible;
	
		.ky-loading-shape {
			position: absolute;
			width: 20px;
			height: 20px;
			border-radius: 0;
			background-color: var(--color-primary);
			display: block;
			background-color: var(--color-primary);
			border-radius: 3px;
	
			&:nth-child(1) {
				left: 0px;
				top: 0;
				animation: amove 2s infinite linear;
			}
		}
	
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

	@keyframes amove {
		0% {
			left: 0px;
			top: 0;
		}

		8% {
			left: 0px;
			top: 0;
		}

		16% {
			left: 25px;
			top: 0;
		}

		24% {
			left: 25px;
			top: 0;
		}

		32% {
			left: 25px;
			top: 0;
		}

		40% {
			left: 25px;
			top: 25px;
		}

		48% {
			left: 25px;
			top: 25px;
		}

		56% {
			left: 25px;
			top: 25px;
		}

		64% {
			left: 0px;
			top: 25px;
		}

		72% {
			left: 0px;
			top: 25px;
		}

		80% {
			left: 0px;
			top: 25px;
		}

		88% {
			left: 0px;
			top: 0;
		}

		100% {
			left: 0px;
			top: 0;
		}
	}

	.ky-loading3 .ky-loading-shape:nth-child(2) {
		left: 25px;
		top: 0;
		animation: bmove 2s infinite linear;
	}

	@keyframes bmove {
		0% {
			left: 25px;
			top: 0;
		}

		8% {
			left: 25px;
			top: 25px;
		}

		16% {
			left: 25px;
			top: 25px;
		}

		24% {
			left: 25px;
			top: 25px;
		}

		32% {
			left: 0px;
			top: 25px;
		}

		40% {
			left: 0px;
			top: 25px;
		}

		48% {
			left: 0px;
			top: 25px;
		}

		56% {
			left: 0px;
			top: 0;
		}

		64% {
			left: 0px;
			top: 0;
		}

		72% {
			left: 0px;
			top: 0;
		}

		80% {
			left: 25px;
			top: 0;
		}

		88% {
			left: 25px;
			top: 0;
		}

		100% {
			left: 25px;
			top: 0;
		}
	}

	.ky-loading3 .ky-loading-shape:nth-child(3) {
		left: 50px;
		top: 0;
	}

	.ky-loading3 .ky-loading-shape:nth-child(3) {
		left: 0px;
		top: 25px;
	}

	.ky-loading3 .ky-loading-shape:nth-child(3) {
		animation: cmove 2s infinite linear;
	}

	@keyframes cmove {
		0% {
			left: 0px;
			top: 25px;
		}

		8% {
			left: 0px;
			top: 25px;
		}

		16% {
			left: 0px;
			top: 25px;
		}

		24% {
			left: 0px;
			top: 0;
		}

		32% {
			left: 0px;
			top: 0;
		}

		40% {
			left: 0px;
			top: 0;
		}

		48% {
			left: 25px;
			top: 0;
		}

		56% {
			left: 25px;
			top: 0;
		}

		64% {
			left: 25px;
			top: 0;
		}

		72% {
			left: 25px;
			top: 25px;
		}

		80% {
			left: 25px;
			top: 25px;
		}

		88% {
			left: 25px;
			top: 25px;
		}

		100% {
			left: 0px;
			top: 25px;
		}
	}
</style>