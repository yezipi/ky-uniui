<!--底部弹出组件，2020-10-16 zzc-->
<template>
	<view v-if="showPopup" class="uni-popup" :class="[popupstyle, noFixed ? 'noFixed' : '']">
		<uni-transition
			v-if="maskShow"
			class="uni-mask--hook"
			:mode-class="['fade']"
			:styles="maskClass"
			:duration="duration"
			:show="showTrans"
			@click="onTap" 
		/>
		<uni-transition
			:class="{ hasTabbar }"
			:mode-class="ani"
			:styles="transClass"
			:duration="duration"
			:show="showTrans"
			@click="onTap"
		>
			<view class="uni-popup__wrapper-box" @click.stop="clear">
				<!--start-->
				<view
				:class="position"
				:style="{width: position !== 'center' ? false : width + 'rpx' }"
				class="lmy-pop gray-bg radius">

					<!--通用头部-->
					<view v-if="title" :class="{ noClose, 'white-bg': type === 'pop', txtLeft: titleAlign === 'left' }" class="pop-top">
						<text v-if="showTopBtn" class="pop-close" @click="close">{{ $t('cancel') }}</text>
						<text class="pop-title">{{ title }}</text>
						<text v-if="!noClose && !showTopBtn && position !== 'top'" class="pop-close iconfont" @click="close">&#xe634;</text>
						<button v-if="!noClose && showTopBtn" :disabled="disabled" :class="{ disabled }" class="pop-top-btn" @click="confirm">{{ confirmText }}</button>
					</view>

					<!--############## 一般提示框部分 ##############-->
					<view v-if="type === 'dialog'" :class="{noPadding: noPadding || (!hasSlots && !content)}" class="pop-content">
						<text v-if="!hasSlots && content" :class="{txtCenter: textAlign === 'center'}" class="msg-content">{{ content }}</text>
						<view v-if="hasSlots" class="msg-content pop-scroll">
							<slot></slot>
						</view>
					</view>
					<!--##############end 一般提示框部分 ##############-->


					<!--############## 底部弹出层 ##############-->
					<view v-if="type === 'pop'" class="pop-content" :style="{ padding: 0 }">
						<view v-if="$slots.header" class="pop-header">
							<slot name="header"></slot>
						</view>
						<view :class="{ noPadding, noScroll }" class="pop-scroll">
							<slot></slot>
						</view>
						<view v-if="$slots.footer" :class="{'white-bg': !noFooterBg}" class="pop-footer">
							<slot name="footer"></slot>
							<view :style="{height: $safeBottom - 15 + 'px'}"></view>
						</view>
						<!--iPhoneX等机型手势条底部高度-->
						<view v-if="!$slots.footer" :style="{height: $safeBottom - 15 + 'px'}"></view>
					</view>
					<!--############## end 底部弹出层 ##############-->


					<!--############## 输入框提示框 ##############-->
					<view v-if="type === 'input'" class="pop-content white-bg">
						<view class="pop-input">
							<!--由于不支持动态设置type，只能这样了-->
							<input
								v-if="inputType === 'text'"
								:placeholder="placeholder"
								:focus="true"
								:value="value"
								class="input-item"
								type="text"
								cursor-spacing="20"
								@input="getInputVal"/>
							<input
								v-if="inputType === 'number'"
								:placeholder="placeholder"
								:focus="true"
								:value="value"
								class="input-item"
								type="number"
								cursor-spacing="20"
								@input="getInputVal"
							/>
							<input
								v-if="inputType === 'digit'"
								:placeholder="placeholder"
								:focus="true"
								:value="value"
								class="input-item"
								type="digit"
								cursor-spacing="20"
								@input="getInputVal"
							/>
						</view>
						<slot></slot>
					</view>
					<!--############## end 输入框提示框 ##############-->

					<view v-if="(!noButton && type === 'dialog') || type === 'input'" class="pop-btngroup">
						<ky-btn
							v-if="!noCancel"
							:disabled="disabled"
							class="pop-btns cancel"
							radius="0"
							color="#999999!important"
							type="default"
							@click="cancel"
						>
							 {{ cancelText }}
						</ky-btn>
						<ky-btn
							:disabled="disabled"
							class="pop-btns confirm"
							color="#00b2a9!important"
							radius="0"
							type="default"
							@click="confirm"
						>
							{{ confirmText }}
						</ky-btn>
					</view>
				</view>
				<!--end-->
			</view>
		</uni-transition>
	</view>
</template>

<script>
	import i18n from '../utils/i18n.js'
	
	export default {
		emits: ['change', 'update:value', 'confirm', 'cancel', 'input'],
		props: {
			// 弹窗方式， top, bottom, center, relative
			position: {
				type: String,
				default: 'center',
			},
			// 弹窗类型 pop: 非居中弹出, dialog： 居中弹窗, input： 输入框
			type: {
				type: String,
				default: 'pop',
			},
			title: {
				type: String,
				default: '',
			},
			noClose: {
				type: Boolean,
				default: false,
			},
			content: {
				type: String,
				default: '',
			},
			noCancel: {
				type: Boolean,
				default: false,
			},
			cancelText: {
				type: String,
				default: i18n.global.t('cancel'),
			},
			confirmText: {
				type: String,
				default: i18n.global.t('confirm'),
			},
			// 输入框类型
			inputType: {
				type: String,
				default: 'text',
			},
			value: {
				type: [String, Number, Boolean],
				default: ''
			},
			placeholder: {
				type: String,
				default: i18n.global.t('inputTips'),
			},
			width: {
				type: String,
				default: '630'
			},
			noButton: {
				type: Boolean,
				default: false,
			},
			// 右上角确定按钮
			showTopBtn: {
				type: Boolean,
				default: false
			},
			// 按钮禁用
			disabled: {
				type: Boolean,
				default: false
			},
			maskClick: {
				type: Boolean,
				default: true
			},
			noPadding: {
				type: Boolean,
				default: false
			},
			noFooterBg: {
				type: Boolean,
				default: false
			},
			// 开启动画
			animation: {
				type: Boolean,
				default: true
			},

			// 文本对齐方式
			textAlign: {
				type: String,
				default: 'left'
			},
      // 是否自动关窗口
      autoClose: {
      	type: Boolean,
      	default: true
      },
      // 是否有tabbar
      hasTabbar: {
        type: Boolean,
        default: false
      },
      // 是否固定定位
      noFixed: {
        type: Boolean,
        default: false
      },
      titleAlign: {
        type: String,
        default: 'center'
      },
			noScroll: {
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				inputVal: '',
				duration: 300,
				ani: [],
				showPopup: false,
				showTrans: false,
				maskClass: {
					'position': 'fixed',
					'bottom': 0,
					'top': 0,
					'left': 0,
					'right': 0,
					'backgroundColor': 'rgba(0, 0, 0, 0.5)'
				},
				transClass: {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				},
				maskShow: true,
				popupstyle: 'top',
				config: {
					top:'top',
					bottom:'bottom',
					center:'center',
					message:'top',
					dialog:'center',
					share:'bottom',
				}
			}
		},
		computed: {
			hasSlots() {
				return Object.keys(this.$slots).length
			},
			$safeBottom() {
				return uni.getSystemInfoSync().safeAreaInsets.bottom
			}
		},
		watch: {
			value(v) {
				this.inputVal = v;
				if (this.type !== 'input') {
					if (!v) {
						this.close()
					} else {
						this.open()
					}
				}
			},
			position: {
				handler: function(newVal) {
					this[this.config[newVal]]()
				},
				immediate: true
			},
		},
		mounted() {
			this.inputVal = this.value;
		},
		methods: {
			clear(e) {
				e.stopPropagation()
			},
			open() {
				this.showPopup = true
				this.$nextTick(() => {
					new Promise(resolve => {
						clearTimeout(this.timer)
						this.timer = setTimeout(() => {
							this.showTrans = true
							// fixed by mehaotian 兼容 app 端
							this.$nextTick(() => {
								resolve();
							})
						}, 50);
					}).then(res => {
						// 自定义打开事件
						clearTimeout(this.msgtimer)
						this.msgtimer = setTimeout(() => {
							this.customOpen && this.customOpen()
						}, 100)
						this.$emit('change', {
							show: true,
							position: this.position
						})
					})
				})
				if (this.type !== 'input') {
					this.$emit('input', true)
				}
			},
			close() {
				this.showTrans = false
				this.$nextTick(() => {
					this.$emit('change', {
						show: false,
						position: this.position
					})
					clearTimeout(this.timer)
					// 自定义关闭事件
					this.customOpen && this.customClose()
					this.timer = setTimeout(() => {
						this.showPopup = false
						if (this.type !== 'input') {
							this.$emit('input', false)
						}
					}, 300)
				})
			},
			cancel() {
				this.$emit('cancel', true)
				this.close()
			},
			confirm() {
				console.log(this.inputVal)
				if (this.type === 'input' && this.inputVal === '') {
					this.$toast(this.$t('noContentTips'))
					return
				}
				this.$emit('confirm', this.type === 'input' ? this.inputVal : true)
        if (this.autoClose) {
          this.close()
        }
			},
			getInputVal({ detail }) {
				this.$emit('input', detail.value)
				this.inputVal = detail.value
			},
			onPopChange(e) {
				if (this.type !== 'input') {
					setTimeout(() => {
						this.$emit('update:value', e.show)
						this.$emit('input', e.show)
					})
				}
			},

			onTap() {
				if (!this.maskClick || this.noClose || this.noCancel) return
				this.close()
			},
			/**
			 * 顶部弹出样式处理
			 */
			top() {
				this.popupstyle = 'top'
				this.ani = ['slide-top']
				this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
				}
			},
			/**
			 * 底部弹出样式处理
			 */
			bottom() {
				this.popupstyle = 'bottom'
				this.ani = ['slide-bottom']
				this.transClass = {
					'position': 'fixed',
					'left': 0,
					'right': 0,
					'bottom': 0
				}
			},
			/**
			 * 中间弹出样式处理
			 */
			center() {
				this.popupstyle = 'center'
				this.ani = ['zoom-out', 'fade']
				this.transClass = {
					'position': 'fixed',
					/* #ifndef APP-NVUE */
					'display': 'flex',
					'flexDirection': 'column',
					/* #endif */
					'bottom': 0,
					'left': 0,
					'right': 0,
					'top': 0,
					'justifyContent': 'center',
					'alignItems': 'center'
				}
			}
		}
	}
</script>

<style scoped lang="scss">
  .hasTabbar {
    padding-bottom: calc(env(safe-area-inset-bottom) / 2)!important;
  }
	.lmy-pop {
		width: 100%;
		&.center {
			width: 630rpx;
			border-radius: 6rpx;
			overflow: hidden;
		}
		&.bottom {
			border-radius: 0!important;
			.pop-content {
				padding: 0;
				overflow: hidden;
			}
		}
		&.top {
			border-radius: 0!important;
		}
		&.dialog .pop-content {
			background: var(--bg-white);
		}
		.pop-top {
			padding: 24rpx 36rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
      border-bottom: 1px solid var(--border-1);
			background: var(--bg-white);
			.pop-top-btn {
				padding: 0;
				margin: 0;
				border: 0;
				color: var(--color-primary);
				height: auto;
				font-size: 28rpx;
				line-height: initial;
				background: none;
				&:after {
					display: none;
				}
				&.disabled {
					color: var(--color-gray);
				}
			}
			&.white-bg {
				background: var(--bg-white);
			}
			&.noClose {
				justify-content: center;
			}
      &.txtLeft {
        justify-content: space-between;
      }
			.pop-title {
				font-size: 32rpx;
			}
			.pop-close {
				color: var(--color-gray);
			}
		}
		.pop-content {
			padding: 36rpx;
			&.noPadding {
				padding: 0;
			}
			.msg-content {
				display: flex;
				align-items: center;
				min-height: 120rpx;
				padding: 0;
				font-size: 30rpx;
				&.txtCenter {
					text-align: center;
					justify-content: center;
				}
			}
		}
		.pop-btngroup {
			display: flex;
			align-items: center;
			position: relative;
			border-top: 1px solid var(--border-1);;
			.pop-btns {
				flex: 1;
				position: relative;
				&.confirm {
					&:after {
						content: '';
						display: block;
						position: absolute;
						height: 100%;
						width: 1px;
						background: var(--border-1);
						left: 0;
						top: 0;
						bottom: 0;
						margin: auto;
					}
				}
			}
		}
		.pop-input {
			.input-item {
				display: block;
				height: 90rpx;
				background: var(--border-1);
				border-radius: 12rpx;
				text-indent: 24rpx;
			}
		}
		.pop-scroll {
			max-height: 80vh;
			overflow-y: auto;
			padding: 24rpx;
			position: relative;
			&.noPadding {
				padding: 0;
			}
			&.noScroll {
				overflow: hidden;
				display: flex;
				flex-direction: column;
			}
		}
		.pop-footer {
			padding: 24rpx;
			background: var(--bg-gray);
		}
	}
	:deep(.pop-btngroup) .btn-main { font-weight: bold; }
	.uni-popup {
		position: fixed;
		/* #ifndef APP-NVUE */
		z-index: 99;
		/* #endif */
    &.noFixed {
      position: relative;
    }
	}

	.uni-popup__mask {
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		background-color: $uni-bg-color-mask;
		opacity: 0;
	}

	.mask-ani {
		transition-property: opacity;
		transition-duration: 0.2s;
	}

	.uni-top-mask {
		opacity: 1;
	}

	.uni-bottom-mask {
		opacity: 1;
	}

	.uni-center-mask {
		opacity: 1;
	}

	.uni-popup__wrapper {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: absolute;
	}

	.top {
		/* #ifdef H5 */
		top: var(--window-top);
		/* #endif */
		/* #ifndef H5 */
		top: 0;
		/* #endif */
	}

	.bottom {
		bottom: 0;
	}

	.uni-popup__wrapper-box {
		/* #ifndef APP-NVUE */
		display: block;
		/* #endif */
		position: relative;
	}

	.content-ani {
		// transition: transform 0.3s;
		transition-property: transform, opacity;
		transition-duration: 0.2s;
	}


	.uni-top-content {
		transform: translateY(0);
	}

	.uni-bottom-content {
		transform: translateY(0);
	}

	.uni-center-content {
		transform: scale(1);
		opacity: 1;
	}
</style>
