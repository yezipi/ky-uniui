<template>
  <view class="count-num" :class="size" @click="$emit('click')">
    <text
      :class="{ disabled: disabled || Number(count) <= Number(min) }"
      class="iconfont cn-min"
      @click.stop="countNum(0)"
    >
      &#xe643;
    </text>
    <input
      type="digit"
      :disabled="disabled"
      :focus="focus"
      :class="{disabled}"
      :cursor-spacing="20"
      class="cn-count"
      v-model="count"
      @blur="onInput"
      @focus="onFocus"
    />
    <text
      :class="{ disabled: disabled || Number(count) >= Number(max) }"
      class="iconfont cn-add"
      @click.stop="countNum(1)"
    >
      &#xe611;
    </text>
  </view>
</template>

<script>
  export default {
		emits: ['update:value', 'click'],
    props: {
      value: {
        type: [Number, String],
        default: 0
      },
      max: {
        type: [Number, String],
        default: 9999999
      },
      min: {
        type: [Number, String],
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      // 是否倍数递增
      multiple: {
        type: Boolean,
        default: false
      },
      focus: {
        type: Boolean,
        default: false,
      },
      size: {
        type: String,
        default: 'small', // small, large
      },
      step: {
        type: Number,
        default: 1
      }
    },
    data() {
      return {
        count: 1,
        isErrorNumber: false,
      }
    },
    watch: {
      value(v) {
        this.count = v
      }
    },
    mounted() {
      this.count = this.value || this.min

      // 如果是按倍数，最大数值自动乘以1000
      // if (this.multiple) {
      //   this.max = this.min * 1000
      // }
    },
    methods: {
      onFocus() {
        this.isFocus = true
      },
      onInput() {
        const max = Number(this.max)
        const count = Number(this.count)
        const min = Number(this.min)

        if (!this.isFocus) {
          return
        }
        this.isFocus = false

        // 如果输入的不是倍数，自动调整成最小的数值
        if (this.multiple) {
          if ((Number((count % min).toFixed(3)) % min) !== 0) {
            this.count = min
            this.$toast('请输入规格的倍数')
          }
          this.emit()
        } else {
          if (count < min) {
						this.count = min
            this.$toast('超出最小数值')
          }

          if (count > max) {
						this.count = max
            this.$toast('超出最大数值')
          }
          this.emit()
        }
      },
      countNum(isAdd) {
        const max = +this.max
        const min = +this.min
        this.count = +this.count
        if (this.multiple && Number.isNaN(min)) {
          this.$toast('数量异常')
          return
        }

        if (this.multiple && (Number((this.count % min).toFixed(3)) % min) !== 0) {
          this.count = min
          this.$toast('只能是规格的倍数')
          this.emit()
          return
        }

        if (this.disabled) {
          this.emit()
          return
        }
        if (isAdd) {
          if (this.count >= max) {
            return
          }
          this.count = this.multiple ? this.count += min : this.count + Number(this.step)
          this.emit()
        } else {
          if (this.count <= min) {
            return
          }
          this.count = this.multiple ? this.count -= min : this.count - Number(this.step)
          this.emit()
        }
      },
      emit() {
        const count = this.multiple ? Number(this.count).toFixed(3) : this.count
        this.$emit('update:value', Number(count))
      }
    }
  }
</script>

<style scoped lang="scss">
  .count-num {
    display: flex;
    border: 1px solid var(--border-1);;
    border-radius: 6rpx;
    align-items: center;
    overflow: hidden;
    &.large {
      .cn-count {
        height: 65rpx;
      }
      .iconfont {
        width: 65rpx;
        height: 65rpx;
        line-height: 65rpx;
      }
    }

    .iconfont {
      text-align: center;
      font-size: 26rpx;
      color: var(--color-gray);
      display: block;
      width: 52rpx;
      height: 52rpx;
      line-height: 52rpx;
      background: var(--border-1);

      &:active {
        background: var(--bg-gray);
      }

      &.disabled {
        color: var(--color-light-gray);
        background: rgba(var(--rgb-light-gray), 0.2);

        &:active {
          background: rgba(var(--rgb-light-gray), 0.2);
        }
      }
    }

    .cn-min {
      border-top-left-radius: 6rpx;
      border-bottom-left-radius: 6rpx;
    }

    .cn-add {
      border-top-right-radius: 6rpx;
      border-bottom-right-radius: 6rpx;
    }

    .cn-count {
      text-align: center;
      min-width: 100rpx;
      font-size: 28rpx;
      height: 52rpx;
			flex: 1;
			background: var(--bg-wite);
      &.disabled {
        color: var(--color-light-gray);
        background: rgba(var(--rgb-light-gray), 0.2);
      }
    }
  }
	@media (prefers-color-scheme: dark) {
		.count-num .cn-count {
			background: #222222;
		}
	}
</style>
