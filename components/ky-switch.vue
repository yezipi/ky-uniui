<!--莉美易 switch组件-->
<template>
	<view class="lmy-switch">
		<text v-if="label" :style="{ color }" class="ls-label">{{ label }}</text>
		<view :style="{ 'background-color': checked ? actColor : inactColor }" class="ls-parent" @click="onSwitchClick">
			<view :class="{ active: checked }" class="ls-pointer"></view>
		</view>
	</view>
</template>

<script>
	const isDark = uni.getSystemInfoSync().theme === 'dark'
	
	export default {
		emits: ['update:value', 'change'],
		props: {
			/**
			 * @param { String }  label 提示文字
			 */
			label: {
				type: String,
				default: ''
			},
			/**
			 * @param { String }  color 文本颜色
			 */
			color: {
				type: String,
				default: '#666666'
			},
			/**
			 * @param { String }  activeColor 激活的背景色
			 */
			activeColor: {
				type: String,
				default: ''
			},
			/**
			 * @param { String }  inactiveColor 未激活的背景色
			 */
			inactiveColor: {
				type: String,
				default: ''
			},
			/**
			 * @param { Boolean, Number, String }  value v-model 目前仅支持布尔值
			 */
			value: {
				type: [Boolean, Number, String],
				default: false
			},
			/**
			 * @param { Boolean, Number, String }  inactiveValue 关闭的时候的值，值不是布尔值的时候使用的
			 */
			inactiveValue: {
				type: [Boolean, Number, String],
				default: false
			},
			/**
			 * @param { Boolean, Number, String }  activeValue 打开的时候的值
			 */
			activeValue: {
				type: [Boolean, Number, String],
				default: true
			}
		},
		computed: {
			inactColor() {
				if (this.inactiveColor) {
					return this.inactiveColor
				}
				return this.isDark ? '#666666' : '#dddddd'
			},
			actColor() {
				if (this.activeColor) {
					return this.activeColor
				}
				return this.isDark ? '#067272' : '#00B2A9'
			}
		},
		data() {
			return {
				actVal: false,
				checked: false,
				isDark
			}
		},
		mounted() {
			this.setValue(this.value !== this.activeValue, true)
			uni.onThemeChange(res => {
				this.isDark = res.theme === 'dark'
			})
		},
		destroyed() {
			uni.offThemeChange()
		},
		methods: {
			onSwitchClick() {
				this.setValue(this.checked)
				this.$emit('update:value', this.actVal)
				this.$emit('change', this.actVal)
			},
			setValue(flag, isInit) {
				const inact = typeof this.inactiveValue !== 'undefined'
				const act = typeof this.activeValue !== 'undefined'
				if (inact || act) {
          this.actVal = !this.checked ? this.activeValue : this.inactiveValue
          this.checked = !flag
				} else {
          if (isInit) {
            this.actVal = !!this.value
            this.checked = !!this.value
          } else {
            this.actVal = !this.value
            this.checked = !this.checked
          }
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.lmy-switch {
		display: flex;
		align-items: center;
	}
	.ls-label {
		display: inline-block;
		margin-right: 12rpx;
		color: var(--color-gray);
		font-size: 24rpx;
	}
	.ls-parent {
		width: 80rpx;
		height: 40rpx;
		background-color: var(--bg-gray);
		border-radius: 40rpx;
		position: relative;
		display: flex;
		align-items: center;
		transition: all 0.3s;
		.ls-pointer {
			position: absolute;
			width: 25rpx;
			height: 25rpx;
			border-radius: 50%;
			background: var(--bg-white);
			top: 0;
			bottom: 0;
			margin: auto;
			left: 10rpx;
			transition: left 0.3s;
			&.active {
				left: 50rpx;
			}
		}
	}
</style>
