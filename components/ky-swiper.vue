<template>
	<view :style="{ height: full ? '100%' : 'auto'}" class="wrap">
		<swiper
      class="swiper"
      :style="{ height: full ? '100%' : height + 'rpx'}"
      :autoplay="autoplay"
      :interval="interval"
      :duration="duration"
      :circular="loop"
      :previous-margin="previousMargin + 'rpx'"
      :next-margin="nextMargin + 'rpx'"
      @change="change"
      @touchmove.prevent=""
    >
			<swiper-item v-for="(item,index) in list" :key="index" @click="onItemClick(item, index)">
				<view
          v-if="list && list.length>0"
          :class="[!crown ? '' : current==index ? 'crown-active':'crown']"
          class="item"
        >
					<template v-if="!slots">
            <image
              v-if="item.type !== 'video'"
              class="item-img"
              :class="[imgShadow?'imgShadow':'']"
              :src="item[imgKey] || '/static/img/pro_0.jpg'"
              :style="{ borderRadius: imgRadius + 'px',width:imgWidth}"
              mode="aspectFill"
            >
            </image>
            <view 
              v-else
              :style="{ borderRadius: imgRadius + 'px',width:imgWidth}"
              :class="[imgShadow?'imgShadow':'']"
              class="item-img"
            >
              <view v-if="videoCtx.status !== 'play'" class="video-cover">
                <image
                  class="video-img"
                  :src="item.poster"
                  mode="aspectFill"
                >
                </image>
                <text class="video-btn iconfont" @click="onVideoClick(index)">&#xe64b;</text>
              </view>
              <video
                v-if="videoCtx.status === 'play'"
                class="video-comp"
                :id="'video_' + index"
                :src="item[imgKey]"
                :enable-progress-gesture="false"
                :autoplay="true"
                @touchmove="onVideoTouchMove"
                @play="onVideoPlay"
                @pause="onVideoPause"
                @ended="onVideoEnded"
                @error="onVideoError"
              >
              </video>
            </view>
          </template>
					<slot v-else :data='item'></slot>
				</view>
			</swiper-item>
		</swiper>
		<view class="dots flex" :style="{bottom: bottom + 'rpx'}" v-if="dots">
			<view class="dot" :class="[current == i ? 'curr-dot' : '']" v-for="(d,i) in list" :key='i'></view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			list: {
				type: Array,
				default: () => []
			},
			// 轮播图片key
			imgKey: {
				type: String,
				required: true
			},
			// 高度
			height: {
				type: Number,
				default: 300
			},
			// 图片圆角
			imgRadius: {
				type: Number,
				default: 0
			},
			// 图片阴影
			imgShadow: {
				type: Boolean,
				default: false
			},
			// 前边距
			previousMargin: {
				type: Number,
				default: 0
			},
			// 后边距
			nextMargin: {
				type: Number,
				default: 0
			},
			// 图片宽度
			imgWidth: {
				type: String,
				default: '100%'
			},
			// 是否循环
			loop: {
				type: Boolean,
				default: true
			},
			// 自动播放
			autoplay: {
				type: Boolean,
				default: true
			},
			// 播放时间间隔
			interval: {
				type: Number,
				default: 3000
			},
			// 滑动速度
			duration: {
				type: Number,
				default: 500
			},
			// 显示指示点
			dots: {
				type: Boolean,
				default: true
			},
			// 轮播点下边距
			bottom: {
				type: Number,
				default: 24
			},
			// 卡片特效
			crown: {
				type: Boolean,
				default: false
			},
      // 全屏
      full: {
      	type: Boolean,
      	default: false
      },
		},
		data() {
			return {
				current: 0,
				slots: false,
        videoCtx: { status: '' }, // 视频对象
			};
		},
		watch: {
			// 判断异步数据源，是否使用插槽自定义样式
			list: {
				handler(val) {
					if (val.length > 0 && this.$slots.default) {
						this.slots = true
					}
          // this.videoCtx = []
          // this.$nextTick(function() {
          //   val.forEach((e, i) => {
          //     if (e.type === 'video') {
          //       const videoEle = uni.createVideoContext(`video_${i}`, this)
          //       videoEle.index = i
          //       videoEle.status = ''
          //       this.videoCtx.push(videoEle)
          //     }
          //   })
          // })
				},
				immediate: true,
			}
		},
    computed: {
      // currVideoCtx() {
      //   return this.videoCtx.find(e => e.index === this.current)
      // }
    },
    mounted() {
    },
		methods: {
			change(event) {
				let current = event.detail.current
				this.current = current
				this.$emit('change', this.list[current])

        // 切换的时候把所有视频都暂停
        if (this.videoCtx.id) {
          this.videoCtx.pause()
          // this.videoCtx.forEach((e) => {
          //   if (current !== e.index) {
          //     console.log('切换暂停')
          //     e.pause()
          //   }
          // })
        }
			},

      onItemClick(el, index) {
        if (this.full) {
          if (index === this.list.length - 1) {
            this.$emit('selected', el)
          }
          return
        }
        this.$emit('selected', el)
      },

      onVideoClick(i) {
        this.setVideoStatus('play')
        const videoEle = uni.createVideoContext(`video_${i}`, this)
        videoEle.index = i
        videoEle.status = 'play'
        this.videoCtx = videoEle
        this.videoCtx.play()
        console.log('点击了', this.videoCtx.status)
      },

      setVideoStatus(status) {
        this.videoCtx.status =  status
      },

      onVideoPlay() {
        this.setVideoStatus('play')
      },

      onVideoPause() {
        this.setVideoStatus('pause')
        console.log('pause')
      },

      onVideoEnded() {
        this.setVideoStatus('ended')
        this.videoCtx.exitFullScreen()
        console.log('ended')
      },

      onVideoError() {
        this.$toast('播放失败！')
        this.setVideoStatus('error')
      },

      /**
       * 视频滑动监听
       * @description 因为video组件层级高，禁止了手势进度，所以没办法进行切换swiper
       * @version 2021-09-28 zzc
       */
      onVideoTouchMove(e) {
        console.log(e)
      }
		}
	}
</script>

<style lang="scss" scoped>
  .video-comp {
    width: 100%;
    height: 100%;
  }
  .video-cover {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &:after {
      content: '';
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      background: rgba(0,0,0,0.1);
    }
    .video-img {
      width: 100%;
      height: 100%;
    }
    .video-btn {
      position: absolute;
      z-index: 1;
      color: var(--color-dark);
      font-size: 150rpx;
    }
  }
	.wrap {
		position: relative;

		.crown {
			transform: scale(0.93, 0.9);
		}

		.item {
			height: 100%;
			transition: 1.2s;
		}

		.item-img {
			width: 100%;
			height: 100%;
		}

		.imgShadow {
			height: calc(100% - 10px);
			margin-bottom: 10px;
			box-shadow: 0 6px 6px rgba(0, 0, 0, .15);
		}

		.crown-active {
			transform: scale(1);
		}

		.dots {
			display: flex;
			position: absolute;
			left: 50%;
			transform: translateX(-50%);

			.dot {
				width: 10rpx;
				height: 10rpx;
				border-radius: 50%;
				background-color: #D6D6D6;
				margin-right: 10rpx;
        transition: all 0.3s;
			}

			.curr-dot {
				height: 10rpx;
				width: 30rpx;
				border-radius: 5rpx;
				background-color: #fff;
			}
		}

	}
</style>
