<!--简易的数字递增组件，没有动画效果，纯粹递增, 2021-12-20 zzc-->
<template>
  <view class="ky-countto-number">
    <template v-if="value">
      <text
				v-for="(item, index) in splitNumber"
				:key="index" 
				:style="itemStyle"
				:class="{ notNum: typeof item !== 'number' }"
				class="ky-countto-number-item"
			>
				{{ item }}
			</text>
    </template>
    <text v-else class="ky-countto-number-item">0</text>
		<text v-if="suffix && !$slots.suffix" class="ky-countto-number-item ky-countto-suffix ft-24">{{ suffix }}</text>
		<slot name="suffix"></slot>
  </view>
</template>

<script>
  export default {
		emits: ['update:value'],
    props: {
      value: {
        type: [String, Number],
        default: ''
      },
      multiple: {
        type: Boolean,
        default: false
      },
			itemStyle: {
				type: Object,
				defatlt: () => {
					return {
						width: '22rpx'
					}
				}
			},
			suffix: {
				type: String,
				default: ''
			},
    },
    data() {
      return {
        splitNumber: [],
        timer: ''
      }
    },
    watch: {
      value(v) {
        this.startCount(v)
      }
    },
    mounted() {
      this.startCount(this.value)
    },
    destroyed() {
      clearTimeout(this.timer)
      this.timer = ''
    },
    methods: {
      startCount(value) {
        if (!value) {
          return
        }
        clearTimeout(this.timer)
        this.timer = ''
        const target = String(value).split('').map(e => {
          if (e !== '.') {
            e = +e
          }
          return e
        })
        this.splitNumber = target.map(e => {
          if (e !== '.') {
            e = 0
          }
          return e
        })
        const len = this.splitNumber.length - 1
        const last = []
        // 递归循环
        const loop = (index) => {
          this.timer = setTimeout(() => {

            if (this.splitNumber[index] >= target[index]) {
              if (index <= 0) {
                clearTimeout(this.timer)
                this.timer = ''
                return
              }
              index --
            }

            if (target[index] === 0 || target[index] === '.') {
              index --
            }

            if (target[index] !== 0 && target[index] !== '.') {
              this.splitNumber[index] ++
            }

            loop(index)
          }, 50)
        }
        loop(len)
      },
    }
  }
</script>

<style scoped lang="scss">
	.ky-countto-number {
		.ky-countto-number-item {
			display: inline-block;
		  color: inherit;
			width: 22rpx;
			&.notNum {
				width: auto!important;
			}
		}
		.ky-countto-suffix {
			font-weight: normal;
		}
	}
  
</style>
