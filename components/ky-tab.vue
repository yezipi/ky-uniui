<template>
	<scroll-view
    :scroll-x="scrollX"
    :class="{
      fixed: position === 'fixed',
      sticky: position === 'sticky',
      iphonex: $safeBottom > 0 && position === 'fixed',
      icon: hasIcon,
      scroll: scrollX,
			card: type === 'card',
			'white-bg': !noBg
    }"
    class="ky-tab-wrap"
  >
		<view id="ky-tab-parent" class="ky-tab-components">
      <view class="ky-tab-box">
      	<view
      		v-for="(tab, i) in menu"
      		:style="{ color: activeColor && i === tabIndex ? activeColor : color }"
      		:key="i"
      		:class="{ active: i === tabIndex, icon: tab.icon }"
      		:id="'ky_tab_'+i"
      		class="ky-tab-item"
      		@click="onTabClick(tab, i)"
        >
          <text v-if="tab.icon" class="ky-tab-icon iconfont">{{ tab.icon }}</text>
          <text class="ky-tab-text">{{ tab[label] }}</text>
        </view>
      </view>
      <!-- <view
      	v-if="tabItemWidth > 0 && !hasIcon"
      	:style="{ left: tabItemOffsetLeft + 'px', width:  tabItemWidth + 'px', 'background-color': activeColor }"
      	class="tab-slider"
      >
      </view> -->
    </view>
	</scroll-view>
</template>

<script>
	export default {
		emits: ['update:value', 'change'],
		props: {
      // 显示字体图标传入icon: '\'
			menu: {
				type: Array,
				default: () => [],
				required: true
			},
			index: {
				type: Number,
				default: 0
			},
			activeColor: {
				type: String,
			},
			color: {
				type: String,
			},

      // fixed, sticky
      position: {
        type: String,
        default: 'relative'
      },

      scrollX: {
        type: Boolean,
        default: false,
      },
      value: {
        type: [ String, Number, Boolean ],
        default: undefined
      },
      label: {
        type: String,
        default: 'name',
      },
      val: {
        type: String,
        default: 'id',
      },
			/** line: 边框样式，card，选项卡样式 */
			type: {
				type: String,
				default: 'line',
			},
			noBg: {
			  type: Boolean,
			  default: false,
			},
			disabled: {
				type: Boolean,
				default: false,
			}
		},
		data() {
			return {
				tabItemOffsetLeft: 0,
				tabItemWidth: 0,
				tabIndex: 0,
			}
		},
    watch: {
      value(v) {
        this.tabIndex = v
      }
    },
    computed: {
      hasIcon() {
        return this.menu.find(e => e.icon)
      },
      $safeBottom() {
      	return uni.getSystemInfoSync().safeAreaInsets.bottom
      }
    },
		mounted() {
      if (!this.hasIcon) {
        this.onTabClick(this.menu[this.index], this.index)
      } else {
        this.tabIndex = typeof this.value !== 'undefined' ? this.value : this.index
      }
		},
		methods: {
			onTabClick(item, index) {
				if (this.disabled) {
					return
				}
        if (this.hasIcon) {
          this.tabIndex = index
          this.$emit('change', index)
          this.$emit('update:value', index)
          return
        }
				const query = uni.createSelectorQuery().in(this)
				const parent = query.select('#ky-tab-parent')
				// vue3版本在真机上不能同时获取两个元素
				parent.boundingClientRect(data => {
					// console.log(data)
					this.tabItemWidth = data.width / (this.menu.length * 2)
					this.tabItemOffsetLeft = index * this.tabItemWidth * 2 + (data.left || (this.tabItemWidth/2.75))
					if (this.tabIndex === index) {
						return
					}
					this.tabIndex = index
					this.$emit('change', index)
				  this.$emit('update:value', index)
				}).exec()
			}
		}
	}
</script>

<style scoped lang="scss">
  .ky-tab-wrap {
    width: auto;
		&.white-bg {
			background: var(--bg-white);
		}
    &.scroll {
      padding: 0 24rpx;
      .ky-tab-components {
        white-space: nowrap;
        .ky-tab-box {
          justify-content: flex-start;
					position: relative;
        }
      }
    }
		.ky-tab-text {
			white-space: nowrap;
		}
		&.card {
			.ky-tab-components {
				.ky-tab-box {
					justify-content: space-between;
					border: 1px solid var(--color-primary);
					box-sizing: border-box;
					border-radius: 6rpx;
					.ky-tab-item {
						flex: 1;
						margin: 0;
						border: 0;
						display: flex;
						align-items: center;
						justify-content: center;
						border-right: 1px solid var(--color-primary);
						box-sizing: border-box;
						&:last-child {
							border-right: 0;
						}
						&.active {
							background: var(--color-primary);
							color: #ffffff;
						}
					}
				}
			}
		}
    &.icon {
      padding: 12rpx 24rpx;
    }
    &.fixed {
      position: fixed;
      z-index: 9;
      left: 0;
      right: 0;
      bottom: 0;
      &.iphonex {
        padding-bottom: 50rpx;
      }
    }
    &.sticky {
      position: sticky;
      z-index: 999;
      top: 0;
    }
		.ky-tab-components {
			position: relative;
			z-index: 1;
			.ky-tab-box {
				display: flex;
				justify-content: space-around;
				.ky-tab-item {
					margin: 0 12rpx;
					padding: 12rpx 0;
					transition: all 0.3s;
					color: var(--color-gray);
					border-bottom: 2px solid rgba(255,255,255,0);
					box-sizing: border-box;
					&.active {
						font-weight: bold;
						color: var(--color-primary);
						border-color: var(--color-primary);
					}
		      &.icon {
		        font-weight: normal;
		        .tab-text {
		          font-size: 22rpx;
		        }
		      }
		      .tab-icon, .tab-text {
		        display: block;
		        text-align: center;
		        color: inherit;
		      }
		      .tab-icon {
		        font-size: 48rpx;
		      }
				}
			}
			.ky-tab-slider {
				position: absolute;
				background-color: var(--color-primary);
				height: 6rpx;
				border-radius: 12rpx;
				width: 50rpx;
				left: 15%;
				bottom: 0;
		    transition: all 0.5s;
			}
		}
  }
</style>
