<template>
	<view class="index-demo">
		<view class="demo-btns">
			<ky-btn class="btn-item" @click="$refs.pop.open()">按钮</ky-btn>
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
		
		<ky-pop ref="pop" :disabled="test" position="bottom" noPadding showTopBtn title="选择产品">
		  <view class="koa-skus">
		    <view
		      v-for="(item, index) in skus"
		      class="koa-skus-item flex click-bg"
		      @click="selectSku(item)"
		    >
		      <view class="mr-24">
		        <ky-checkbox :checked="item.checked"></ky-checkbox>
		      </view>
		      <view class="flex flex-column">
		        <text class="block">巴斯夫10101</text>
		        <view class="ft-22">
		          <text class="price-color">¥200/斤</text>
		          <text class="gray-color ml-12 mr-12 inline-block">2000公斤/吨 </text>
		          <text class="gray-color">韩国</text>
		        </view>
		      </view>
		    </view>
		  </view>
		</ky-pop>
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				skus: [
				  { id: 0, name: 'aaa', checked: false },
				  { id: 1, name: 'bbb', checked: false },
				  { id: 2, name: 'ccc', checked: false },
				  { id: 3, name: 'ddd', checked: false },
				  { id: 4, name: 'eee', checked: false }
				],
				test: true
			}
		},
		computed: {
		  checkedSkus() {
		    return this.skus.filter(e => e.checked)
		  },
		},
		methods: {
		  selectSku(item) {
		    item.checked = !item.checked
		  }
		}
	}
</script>

<style scoped lang="scss">
	.demo-btns {
		margin: 24rpx;
	}
	.btn-item {
		margin: 12rpx;
	}
	.koa-skus {
	  .koa-skus-item {
	    align-items: center;
	    border-bottom: 1px solid var(--border-1);
	    padding: 12rpx 24rpx;
	    &:last-child {
	      border: 0;
	    }
	    .ft-22 {
	      margin: 5rpx 0;
	    }
	  }
	}
</style>
