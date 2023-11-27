<template>
	<view class="ky-fetch-wrap">
		
		<view v-show="loadState === 1"  class="ky-fetch-content">
			<slot v-if="!noLoadmore" :list="list"></slot>
			<slot v-else :data="data"></slot>
			<view v-if="loadState === 1 && !noLoadmore" class="ky-fetch-more-nodata" @click="reload">
				<text class="ky-fetch-more-tips">{{ tips }}</text>
				<image v-if="!noMore && !loadError" class="ky-fetch-more-loading" src="/static/img/load.gif"></image>
			</view>
		</view>
		
		<view v-if="loadState === 0 || !loadState" :class="{ isRelative }" class="ky-fetch-loading">
			<ky-loading v-if="!$slots.loading"></ky-loading>
			<slot name="loading"></slot>
		</view>
		
		<view v-if="loadState !== 0 && loadState !== 1" :class="{ isRelative }" class="ky-fetch-error">
			
			<view v-if="!$slots.nodata || !$slots.error" class="ky-fetch-error-tip" @click="reload">
				<template v-if="!noIcon">
					<image v-if="loadState === -1" class="ky-fetch-err-img" src="@/static/img/nodata.png"></image>
					<image v-else-if="loadState === -2" class="ky-fetch-err-img" src="@/static/img/request_error.png"></image>
					<image v-else class="ky-fetch-err-img" src="@/static/img/network_error.png"></image>
				</template>
				<text class="ky-fetch-err-txt">{{ msg || noDataMsg || (loadState === -1 ? '暂无相关内容' : '加载失败，请点击重试') }}</text>
			</view>
			
			<view v-if="$slots.nodata && loadState === -1" class="ky-fetch-error-tip">
			  <slot name="nodata" ></slot>
			</view>
			
			<view v-if="$slots.error && loadState === -2" class="ky-fetch-error-tip">
			  <slot name="error" ></slot>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	export default {
		emits: ['load', 'error', 'all'],
		props: {
			// 是否加载列表
			noLoadmore: {
				type: Boolean,
				default: false
			},
			// api地址
			api: {
				type: String,
				default: '',
				required: false,
			},
			// status 1：请求成功, -1：暂无数据, -2：请求失败， -3: 无网络
			status: {
				type: Number,
				default: 0
			},
			// 筛选条件
			condition: {
				type: Object,
				default: () => {}
			},
			// 不主动执行请求
			manual: {
				type: Boolean,
				default: false
			},
			// 是否相对定位
			isRelative: {
				type: Boolean,
				default: false,
			},
			// 是否请求完成就隐藏loading
			autoHideLoading: {
				type: Boolean,
				default: true
			},
			// 是否返回合并后的数据
			concat: {
				type: Boolean,
				default: true
			},
      noDataMsg: {
        type: String,
        default: '',
      },
			errMsg: {
			  type: String,
			  default: '',
			},
			// 无内容或者错误时不显示图标
			noIcon: {
			  type: Boolean,
			  default: false
			}
		},
		data() {
			return {
				noMore: false,
				loadState: 0,
				filter: {
					page: 1,
					size: 10
				},
				data: {},
				list: [],
				tips: '没有更多了',
				loadError: false,
				loading: false,
				isChangeCondition: false,
        msg: '',
			}
		},
		watch: {
			status(v) {
				this.loadState = v
			},
		},
		mounted() {
			if (!this.manual && this.api) {
				this.init()
			}
			this.msg = this.errMsg
			this.loadState = this.status
			this.setFilters(this.condition)
		},
		methods: {
			async init() {
				this.filter.page = 1
				this.list = []
				return await this.getList()
			},
			// 为了条件查询后使用的, noReload是否设置loadState为1
			refresh(noReload) {
				this.filter.page = 1
				this.list = []
				// 不延迟的话，condition里面的东西拿不到
				setTimeout(() => {
					this.getList(noReload)
				})
			},
			reload() {
				if (this.loading || this.noMore) {
					return
				}
				this.loading = false
				this.getList()
			},
			hideLoading() {
				this.loadState = 1
			},
      setErrMsg(msg) {
      	this.msg = msg
        this.loadState = -2
      },
			setFilters(data = {}) {
				const obj = { ...this.filter, ...data, }
				for (let a in obj) {
					if (!obj[a] && typeof obj[a] !== 'number') {
						delete obj[a]
					}
				}
				this.filter = obj
			},
			async getList(noReload) {
				if (!this.api) {
					return
				}
				this.loading = true
				this.setFilters(this.condition)
				let rows = []
				const params = { ...this.filter }
				const { page, size } = params
				
				if (page === 1 && !noReload) {
					this.loadState = 0
				}
				
				if (params.requestBodyDic && !this.noLoadmore) {
					params.requestBodyDic.page = page
					params.requestBodyDic.size = size
					delete params.page
					delete params.size
				}
				
				try {
					const apiUrl = this.api.split('.')
					const res = await this.$api[apiUrl[0]][apiUrl[1]](params)
          const { data, lists, list, count } = res
					
					if (this.noLoadmore) {
						this.data = data || res
						this.loadState = 1
						this.$emit('load', this.data)
						return this.data
					}
					
          if (!data) {
            rows = lists || list || []
          } else {
            rows = Array.isArray(data) ? data : data.lists
          }
					
					if (Array.isArray(res)) {
						rows = res
					}
					
					const newList = rows
					const isNoData = !newList.length && page === 1
					
					this.list = this.concat ? [...this.list, ...newList] : newList

          this.noMore = newList.length < size

          if (data && data.count) {
             this.noMore = this.list.length >= data.count
          }

          if (count) {
            this.noMore = this.list.length >= count
          }

					this.tips = this.noMore ? '没有更多了' : '加载中...'
					
					if (this.autoHideLoading) {
						this.loadState = isNoData ? -1 : 1
					}
					
					this.loadError = false
					this.$emit('load', this.list)
					
					if (page === 1 && data) {
						const obj = { ...data }
						delete obj.lists
						this.$emit('all', obj)
					}
					
				} catch(e) {
					if (page === 1) {
						this.loadState = -2
					}
					if (e.code === 504) {
						this.loadState = -3
					}
					this.tips = e.msg || '加载失败，请点击重试'
          this.msg = this.tips
					this.loadError = true
          this.$emit('error', e)
          return Promise.reject(e)
				} finally {
					this.loading = false
				}
			},
			loadMore() {
				if (this.noMore) {
					return
				}
				if (this.loading) {
					return
				}
        if (this.loadError) {
        	return
        }
				this.filter.page ++
				this.getList()
			}
		},
	}
</script>

<style scoped lang="scss">
	.ky-fetch-more-nodata {
	  text-align: center;
	  padding: 24rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		.ky-fetch-more-tips {
			font-size: 24rpx;
			color: var(--color-gray);
		}
		.ky-fetch-more-loading {
			width: 40rpx;
			height: 40rpx;
			display: inline-block;
			margin-left: 12rpx;
		}
	}
	.ky-fetch-loading {
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
		padding: 24rpx;
		&.isRelative {
			position: relative;
			min-height: 100rpx;
		}
	}
	.ky-fetch-error {
		position: absolute;
		top: 24rpx;
		left: 24rpx;
		right: 24rpx;
		bottom: 24rpx;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 0;
		&.ky-fetch-error {
			position: relative;
			margin-bottom: 24rpx;
		}
		.ky-fetch-error-tip {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
		}
		.ky-fetch-err-img {
			width: 500rpx;
			height: 333rpx;
		}
		.ky-fetch-err-txt {
			font-size: 24rpx;
			color: var(--color-gray);
			word-break: break-all;
		}
	}
</style>
