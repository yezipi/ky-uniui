<template>
	<view class="index-demo">
		<view class="demo-btns">
			<ky-btn class="btn-item">按钮</ky-btn>
			<ky-btn class="btn-item" round>按钮</ky-btn>
			<ky-btn class="btn-item" plain>按钮</ky-btn>
			<ky-btn class="btn-item" plain round>按钮</ky-btn>
		</view>
		<view class="demo-btns">
			<ky-btn class="btn-item" type="success">按钮</ky-btn>
			<ky-btn class="btn-item" round type="success">按钮</ky-btn>
			<ky-btn class="btn-item" plain type="success">按钮</ky-btn>
			<ky-btn class="btn-item" plain round type="success">按钮</ky-btn>
		</view>
		<view class="demo-btns">
			<ky-btn class="btn-item" type="warning">按钮</ky-btn>
			<ky-btn class="btn-item" round type="warning">按钮</ky-btn>
			<ky-btn class="btn-item" plain type="warning">按钮</ky-btn>
			<ky-btn class="btn-item" plain round type="warning">按钮</ky-btn>
		</view>
		<view class="demo-btns">
			<ky-btn class="btn-item" type="danger">按钮</ky-btn>
			<ky-btn class="btn-item" round type="danger">按钮</ky-btn>
			<ky-btn class="btn-item" plain type="danger">按钮</ky-btn>
			<ky-btn class="btn-item" plain round type="danger">按钮</ky-btn>
		</view>
		<view class="demo-btns">
			<ky-btn class="btn-item" type="info">按钮</ky-btn>
			<ky-btn class="btn-item" round type="info">按钮</ky-btn>
			<ky-btn class="btn-item" plain type="info">按钮</ky-btn>
			<ky-btn class="btn-item" plain round type="info">按钮</ky-btn>
		</view>
		<view class="demo-btns">
			<ky-btn class="btn-item" type="default">按钮</ky-btn>
			<ky-btn class="btn-item" round type="default">按钮</ky-btn>
			<ky-btn class="btn-item" plain type="default">按钮</ky-btn>
			<ky-btn class="btn-item" plain round type="default">按钮</ky-btn>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad() {

		},
		methods: {

		}
	}
</script>

<style>
	.demo-btns {
		margin: 24rpx;
	}
	.btn-item {
		margin: 12rpx;
	}
</style>
