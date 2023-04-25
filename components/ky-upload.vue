<!--批量上传，采用递归的方式-->
<template>
	<view
    :class="{ start: align === 'left', noMargin }"
    class="batch-pic">
		<view v-for="(img, i) in imageUrls" :key="i" :style="{ width: width + 'rpx', height: width + 'rpx' }" class="batch-items" >
			<image
				:src="img"
				class="batch-img"
				mode="aspectFill"
			 @click.stop="viewImg(img, imageUrls)"
			>
			</image>
			<text v-if="!disabled" class="iconfont batch-remove" @click="removeImage(i)">&#xe631;</text>
		</view>
		<text
			v-if="count !== imageUrls.length && !disabled && !$slots.default"
			:style="{'font-size': width + 'rpx', width: width + 'rpx', height: width + 'rpx'}"
			class="batch-items batch-btns iconfont"
			@click="addImage"
		>&#xe8be;</text>
		<slot></slot>
	</view>
</template>

<script>

	export default {
		emits: ['update:value', 'change'],
		props: {
			width: {
				type: String,
				default: '120',
			},
			value: {
				type: [Array, String],
				default: () => [],
			},
			count: {
				type: Number,
				default: 6,
			},
			disabled: {
				type: Boolean,
				default: false,
			},
			// 对其方式
			align: {
				type: String,
				default: 'right',
			},
			noMargin: {
				type: Boolean,
				default: false,
			},
			tableId: {
				type: String,
				default: '',
			}
		},
		data() {
			return {
				imageUrls: [],
			}
		},
		mounted() {
			this.imageUrls = this.setUrls(this.value)
		},
		watch: {
			value(v) {
				this.imageUrls = this.setUrls(v)
			}
		},
		methods: {
			setUrls(v) {
				if (!v) {
					return []
				}
				if (typeof v === 'string') {
					return [v]
				}
				return v
			},
			removeImage(i) {
				this.imageUrls.splice(i, 1)
				this.$emit('update:value', this.count === 1 ? '' : this.imageUrls)
				console.log(this.imageUrls)
			},
			addImage() {
				uni.chooseImage({
					count: this.count, // 默认 9
					sizeType: ['original', 'compressed'],
					sourceType: ['album', 'camera'],
					success: async (res) => {
           console.log(res)
           const filePath = res.tempFilePaths
           const length = filePath.length
           if (length + this.imageUrls.length > this.count) {
           	return this.$toast(`最多可上传${this.count}张图片`)
           }
           // this.imageUrls = filePath
           const data = await this.loopUpload(filePath, 0)
           this.$emit('update:value', this.count > 1 ? this.imageUrls : this.imageUrls[0])
					},
          fail: (res) => {
            console.log(res)
          }
				})
			},

			/**
			 * 递归上传多张图片
			 * @param { Array } filePath 文件路径
			 * @param { Number } counter 计数
			 */
			async loopUpload(filePath, counter) {
				console.log(filePath[counter])
				if (counter === filePath.length) {
					return
				}
				try {
					const url = await this.$api.common.upload(filePath[counter], this.tableId)
					console.log(url)
					if (!url) throw { msg: 'upload fail' }
					counter++
					this.loopUpload(filePath, counter)
					let lastUrl = url
					this.imageUrls.push(lastUrl)
					return lastUrl
				} catch (e) {
					console.log(e)
					return Promise.reject(e)
				}
			},
			viewImg(current, urls) {
				uni.previewImage({ current, urls })
			}
		},
	}
</script>

<style scoped lang="scss">
	.batch-pic {
		display: flex;
		flex-wrap: wrap;
		margin-right: -15rpx;
		justify-content: flex-end;
		&.end {
			justify-content: flex-end;
		}
		&.start {
			justify-content: flex-start;
		}
		.batch-items {
			display: flex;
			margin-right: 15rpx;
			margin-bottom: 15rpx;
			width: 120rpx;
			height: 120rpx;
			border-radius: 6rpx;
			position: relative;
      justify-content: center;
      align-items: center;
			.batch-img {
				width: 100%;
				height: 100%;
				border-radius: 6rpx;
			}
      &:last-child {
        margin: 0;
      }
			.batch-remove {
				color: red;
				font-size: 36rpx;
				position: absolute;
				top: -15rpx;
				right: -15rpx;
				display: block;
				width: 36rpx;
				height: 36rpx;
				border-radius: 50%;
				background: var(--bg-white);
			}
		}
		.batch-btns {
			font-size: 120rpx;
			color: var(--border-1);
			line-height: 120rpx;
		}
	}
</style>
