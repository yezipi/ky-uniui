<!--基本的选型按钮和表单左右排列的-->
<template>
	<view
		:class="{
			top: align === 'top',
			left: align === 'left',
			'left-top': align === 'left top',
			'no-border': noBorder,
      'no-arrow': noArrow || isInput,
      textarea: type === 'textarea',
			small,
			gray,
			slots: Object.keys($slots).length || isInput,
		}"
		:style="{ background }"
		class="opt-item"
		@click.stop="onClick"
	>

		<view class="opt-item-main">
			<view class="opt-left">
				<text v-if="icon && icon.indexOf('img') < 0" :style="{color: iconColor}" class="opt-icon iconfont">{{ icon }}</text>
				<image v-if="icon && icon.indexOf('img') > -1" :src="icon" class="opt-img"></image>
				<view :style="{width: labelWidth + 'rpx'}" class="opt-txt">
					<text v-if="required" class="opt-require">*</text>
					<text class="opt-label">{{ label }}</text>
				</view>
			</view>
			
			<view class="opt-right">
			
				<template v-if="!hasSlots">
					<text v-if="right !== '' && type !== 'date'" class="opt-val">{{ right }}</text>
					<!--由于不支持动态设置type，只能这样了-->
					<view v-if="!right && isInput" class="opt-val opt-input">
						<input
							v-if="type === 'text'"
							:placeholder="placeholder || `请输入${label}`"
							:disabled="disabled"
						  :maxlength="maxlength"
							type="text"
							v-model="content"
							placeholder-class="input-placeholder"
							class="opt-uni-input"
							@input="onInput"
						  @focus="$emit('focus')"
						  @blur="$emit('blur')"
						/>
						<input
							v-if="type === 'number'"
							:placeholder="placeholder || `请输入${label}`"
							:disabled="disabled"
						  :maxlength="maxlength"
							type="number"
							v-model="content"
							placeholder-class="input-placeholder"
							class="opt-uni-input"
							@input="onInput"
						   @focus="$emit('focus')"
						  @blur="$emit('blur')"
						/>
						<input
							v-if="type === 'digit'"
							:placeholder="placeholder || `请输入${label}`"
							:disabled="disabled"
						  :maxlength="maxlength"
							type="digit"
							v-model="content"
							placeholder-class="input-placeholder"
							class="opt-uni-input"
							@input="onInput"
						  @focus="$emit('focus')"
						  @blur="$emit('blur')"
						/>
						<view v-if="type === 'textarea'" class="opt-textarea">
							<textarea
							  :placeholder="placeholder || `请输入${label}`"
							  :disabled="disabled"
							  :maxlength="maxlength"
							  placeholder-class="input-placeholder"
							  v-model="content"
							  class="opt-uni-textarea"
							  @input="onInput"
							  @focus="$emit('focus')"
							  @blur="$emit('blur')"
							>
							</textarea>
						</view>
					</view>
					
					<!--日期-->
					<picker
						v-if="type === 'date'"
						:start="start"
						:end="end"
						:value="content"
						mode="date"
						style="width: 100%;"
						@change="onDateChange"
					>
						<text class="opt-val">{{ content || placeholder || `请选择${label}` }}</text>
					</picker>
					
				</template>
				
				<view v-else class="opt-val">
					<slot></slot>
				</view>
				
				<text v-if="suffix && !$slots.suffix" class="opt-suffix">{{ suffix }}</text>
				<view v-if="$slots.suffix" class="opt-suffix">
					<slot name="suffix"></slot>
				</view>
				
				<text v-if="!isInput && !noArrow" :class="{'rotate': rotate}" class="opt-arrow iconfont">&#xe62a;</text>
			</view>
		</view>
		
	</view>
</template>

<script>
	export default {
		emits:['click', 'focus', 'blur', 'update:value', 'change'],
		props: {
			// 左边显示的文本
			label: {
				type: String,
				default: ''
			},
			// 右边显示的文本
			right: {
				default: ''
			},
			icon: {
				type: String,
				default: '',
			},
      iconColor: {
      	type: String,
      	default: '#999999',
      },
			value: {
				type: [String, Number, Object, Array, Date],
				default: '',
			},
			placeholder: {
				type: String,
				default: '',
			},
			noArrow: {
				default: false,
				type: Boolean
			},
			// 箭头旋转
			rotate: {
				default: false,
				type: Boolean
			},
			disabled: {
				default: false,
				type: Boolean
			},
			align: {
				type: String,
				default: 'center',
			},
			noBorder: {
				type: Boolean,
				default: false,
			},
			small: {
				type: Boolean,
				default: false,
			},
			gray: {
				type: Boolean,
				default: false,
			},
			required: {
				type: Boolean,
				default: false,
			},
			/**
			 * 组件类型, text, number, digit, textarea, date
			 */
			type: {
				type: String,
				default: 'text',
			},
			background: {
				type: String,
				default: '',
			},
      maxlength: {
        type: [ String, Number],
        default: 99,
      },
      labelWidth: {
        type: [String, Number],
        default: '',
      },
      // 兼容小程序，判断是否输入框，不然没法玩
      isInput: {
        type: Boolean,
        default: false,
      },
			suffix: {
				type: String,
				default: '',
			},
			start: {
				type: String,
				default: '',
			},
			end: {
				type: String,
				default: (new Date().getFullYear() + 1) + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate(),
			}
		},
		data() {
			return {
				content: '',
				hasSlots: false,
			}
		},
		mounted() {

      this.$nextTick(function() {
        this.hasSlots = Object.keys(this.$slots).filter(e => e !== 'suffix').length
      })

		  this.content = this.value
		},
		watch: {
			value(newVal) {
			  this.content = newVal
			}
		},
		methods: {
			onInput({ detail }) {
				this.$emit('update:value', detail.value)
			},
			onClick() {
				this.$emit('click')
			},
			onDateChange({ detail }) {
				const val = detail.value.replace(/-/g, '/')
				this.content = val
				this.$emit('update:value', val)
				this.$emit('change', val)
			},
		}
	}
</script>

<style scoped lang="scss">
	.opt-item {
		padding: 0 24rpx;
		background: var(--bg-white);
		.opt-item-main {
			padding: 12rpx 0;
			flex: 1;
			display: flex;
			flex-direction: row;
			align-items: center;
			position: relative;
			justify-content: space-between;
			border-bottom: 1px solid var(--border-1);
		}
		.opt-suffix {
			display: inline-block;
			margin-left: 12rpx;
			color: var(--color-gray);
			flex-shrink: 0;
		}

    &.textarea {
      &.left {
        .opt-item-main {
					align-items: flex-start;
				}
        .opt-textarea {
          margin-top: 0;
          flex: 1;
					text-align: left;
        }
        .opt-right {
          display: flex;
          flex: 1;
        }
      }
      .opt-textarea {
        padding: 24rpx;
        display: flex;
        background-color: var(--bg-gray);
        border-radius: 12rpx;
				flex: 1;
        .opt-uni-textarea {
          flex: 1;
          height: 120rpx;
          width: 100%;
					line-height: normal
        }
      }
      .opt-left {
        flex-shrink: 0;
      }
			.opt-right {
			  display: flex;
			  flex: 1;
			}
    }

		&:active {
			background-color: var(--bg-gray);
		}
		&.slots {
			&:active {
				background-color: var(--bg-gray)!important;
			}
			.opt-val {
				width: 100%;
			}
		}
		&.no-arrow {
			&:active {
				background-color: var(--bg-white)!important;
			}
			.opt-val {
				margin-right: 0;
			}
		}
		&.small {
			padding: 0 20rpx;
			.opt-txt, .opt-val {
				font-size: 24rpx;
			}
			.opt-icon, .opt-img {
				font-size: 30rpx;
				width: 30rpx;
			}
			.opt-right {
				min-height: 50rpx;
			}
			.opt-input {
				min-height: 55rpx;
				line-height: 55rpx;
			}
			&.left .opt-txt {
				width: 120rpx;
			}
		}
		&.gray {
			.opt-txt {
				color: var(--color-gray);
			}
			.opt-val {
				color: var(--color-dark);
			}
		}
		&.left-top {
			align-items: flex-start;
			justify-content: flex-start;
			.opt-right {
				justify-content: flex-start;
			}
		}
		&.top .opt-item-main {
			align-items: flex-start;
		}
		&.end .opt-item-main {
			align-items: flex-end;
		}
		&.left .opt-item-main {
			justify-content: flex-start;
      .opt-txt {
        width: 140rpx;
      }
			.opt-right {
				justify-content: flex-start;
			}
      .opt-val {
        text-align: left;
      }
		}
    /* #ifndef MP-WEIXIN */
    &:last-child .opt-item-main {
			border: 0;
		}
    /* #endif */

		&.no-border .opt-item-main {
			border: 0;
		}
		.opt-left {
			flex-shrink: 0;
			display: flex;
			align-items: center;
			margin-right: 24rpx;
		}
		.opt-right {
			flex: 1;
			display: flex;
			align-items: center;
			position: relative;
			justify-content: flex-end;
			min-height: 65rpx;
		}
		.opt-icon, .opt-img {
			display: inline-block;
			font-size: 38rpx;
			width: 38rpx;
			color: var(--color-gray);
			margin-right: 12rpx;
		}
		.opt-img {
			height: 38rpx;
		}
		.opt-txt {
			display: flex;
			align-items: center;
			color: var(--color-dark);
		}
		.opt-arrow {
			display: block;
			font-size: 26rpx;
			color: var(--color-gray);
			position: absolute;
			right: 0;
			transition: all 0.3s;
			&.rotate {
				transform: rotate(90deg)
			}
		}
		.opt-val{
			flex: 1;
			display: block;
			text-align: right;
			margin-right: 48rpx;
			color: var(--color-gray);
		}
		.opt-require {
			color: #FF152D;
		}
		.opt-date {
			display: flex;
			align-items: center;
		}
		.opt-input {
			margin-right: 0;
			height: 100%;
			min-height: 65rpx;
			line-height: 65rpx;
			background: var(--bg-gray);
			color: inherit;
			display: flex;
			align-items: center;
			border-radius: 8rpx;
			.opt-uni-input {
				flex: 1;
				padding: 0 1em;
			}
		}
	}
</style>
