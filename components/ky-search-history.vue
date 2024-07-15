<template>
	<view class="ky-search-history">
		<!-- #ifdef MP-WEIXIN -->
		<view class="ky-search-top">
		  <view class="ky-search-box">
				<view class="ky-search-main flex-start">
				  <text class="iconfont gray-color">&#xe64d;</text>
				  <input
				    v-model="str"
						:placeholder="placeholder"
						:auto-focus="autoFocus"
				    type="text"
				    class="ky-search-input"
				    @confirm="handleSearch"
						@focus="handleFocus"
						@input="handleInput"
				  />
				  <text v-if="str" class="iconfont gray-color ky-search-clear" @click.stop="handleClear">&#xe634;</text>
				</view>
				<ky-btn width="150rpx" height="75rpx" radius="0" size="small" @click="handleSearch">{{ $t('search') }}</ky-btn>
			</view>
		</view>
		<!-- #endif -->
		
		<!--历史展示-->
		<view v-if="historyList.length && state" class="ky-search-history-wrap white-bg">
		  <view class="ky-search-history-main">
		    <view class="ky-search-history-head">
		      <text class="ky-search-history-title">{{ $t('searchHistory') }}</text>
		      <text class="iconfont" @click="clearHistory">&#xe614;</text>
		    </view>
		    <view class="ky-search-history-list">
		      <view v-for="(item, index) in historyList" :key="index" class="ky-search-history-item" @click="selectKeyword(item)">
		        <text class="ky-search-history-name">{{ item }}</text>
		        <text class="iconfont"  @click.stop="clearSignle(index)">&#xe634;</text>
		      </view>
		    </view>
		  </view>
		</view>
		<!--end历史展示-->
	</view>
</template>

<script>
	import i18n from '@/utils/i18n.js'
	
	export default {
		emits: ['select', 'search', 'update:keyword', 'update:visible'],
		props: {
			keyword: {
				type: String,
				default: ''
			},
			visible: {
				type: Boolean,
				default: false,
			},
			autoFocus: {
				type: Boolean,
				default: false,
			},
			// 本地存储的键名
			keyName: {
				type: String,
				default: ''
			},
			placeholder: {
				type: String,
				default: i18n.global.t('inputTips')
			},
		},
		data() {
			return {
				str: '',
				historyList: [],
				state: false,
			}
		},
		watch: {
			keyword(val) {
				this.str = val
			},
			visible(val) {
				this.state = val
			}
		},
		computed: {
			keyStr() {
				return `${this.keyName}KeywordsHistory`
			}
		},
		mounted() {
			const loaclKeywords = uni.getStorageSync(this.keyStr) || [] 
			this.str = this.keyword
			this.state = this.visible
			this.historyList = loaclKeywords.reverse()
		},
		methods: {
			show() {
				this.state = true
				this.$emit('update:visible', true)
			},
			hide() {
				this.state = false
				this.$emit('update:visible', false)
			},
			save() {
				const hasSame = this.historyList.some(e => e === this.str)
				if (!hasSame) {
				  this.historyList.push(this.str)
				  this.$db.set(this.keyStr, this.historyList)
				}
			  this.hide()
			  uni.hideKeyboard()
			},
			handleClear() {
			  this.str = undefined
				this.hide()
			},
			handleSearch() {
				this.$emit('search', this.str)
			},
			handleInput() {
				this.$emit('update:keyword', this.str)
			},
			handleFocus() {
				if (!this.str) {
					this.show()
				}
			},
			selectKeyword(str) {
			  this.str = str
			  this.$emit('select', str)
			},
			clearSignle(index) {
			  this.historyList.splice(index, 1)
			  this.$db.set(this.keyStr, this.historyList)
				if (!this.historyList.length) {
					this.hide()
				}
			},
			clearHistory() {
			  this.$confirm({ content: i18n.global.t('confirmClearHistory') }, (res) => {
			    if (res.confirm) {
			      this.historyList = []
			      this.$db.set(this.keyStr, [])
						this.hide()
			    }
			  })
			},
		},
	}
</script>

<style scoped lang="scss">
	.ky-search-top {
	  position: fixed;
	  top: 0;
	  left: 0;
	  right: 0;
	  background-color: var(--bg-white);
	  padding: 24rpx;
	  z-index: 100;
		display: flex;
		align-items: center;
		.ky-search-box {
			border-radius: 12rpx;
			overflow: hidden;
			display: flex;
			align-items: center;
			flex: 1;
		}
	  .ky-search-main {
	    flex: 1;
	    background-color: var(--bg-gray);
			height: 78rpx;
			border-bottom-right-radius: 0;
			border-top-right-radius: 0;
			overflow: hidden;
			.iconfont {
				display: inline-block;
				margin-left: 24rpx;
			}
	  }
	
	  .ky-search-input {
	    flex: 1;
	    margin-left: 24rpx;
	  }
		.ky-search-clear {
			padding: 0 24rpx;display: inline-block;font-size: 32rpx;
		}
	
	}
	
	.ky-search-history-wrap {
	  position: fixed;
	  left: 0;
	  right: 0;
	  top: 0;
		/* #ifdef MP-WEIXIN */
		top: 118rpx;
		/* #endif */
		/* #ifdef H5 */
		top: 44px;
		/* #endif */
		z-index: 100;
	  bottom: 0;
	  width: 100%;
	  height: 100%;
	  .ky-search-history-main {
	    padding: 36rpx;
	  }
	  .ky-search-history-head {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    margin-bottom: 12rpx;
	    .ky-search-history-title {
	      font-size: 32rpx;
	    }
	    .iconfont {
	      color: var(--color-gray);
	      font-size: 32rpx;
	    }
	  }
	  .ky-search-history-item {
	    display: flex;
	    justify-content: space-between;
	    padding: 24rpx 0;
	    border-bottom: 1px solid var(--border-1);;
	  }
	  .iconfont {
	    font-size: 24rpx;
	    color: var(--color-gray);
	  }
	}
	
</style>