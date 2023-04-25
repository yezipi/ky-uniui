<!--搜索高亮关键字组件， 2021-05-11, kingchem zzc-->
<template>
  <view class="keyword-select">
    <view style="padding-right: 36rpx;flex: 1;">
      <slot></slot>
    </view>
    <text v-if="content && showClear" class="form-clear iconfont" @click="clear">&#xe622;</text>
    <scroll-view v-if="showTips" :scroll-y="true" :style="{ top: top + 'rpx' }"  class="keyword-list">
      <view
        v-for="(item, index) in list"
        :key="index"
        class="keyword-item"
        @click.stop="select(item)"
      >
        {{ item[keyName] }}
        <!-- <text
          v-for="(str, idx) in item[keyName].split('')"
          :key="idx"
          :class="{ red: setRed(str) }"
        >
          {{ str }}
        </text> -->
      </view>
    </scroll-view>
  </view>
</template>

<script>
  import { debounce } from '@/utils/index.js'

  export default {
    props: {
      // 关键字
      value: {
        type: String,
        default: ''
      },

      // 询价位置
      searchPosition: {
        type: String,
        default: ''
      },

      // 要返回的键名名称
      keyName: {
        type: String,
        default: 'name'
      },

      // 查询列表的api地址
      api: {
        type: String,
        default: ''
      },

      // 显示清除按钮
      showClear: {
        type: Boolean,
        default: false
      },
      top: {
        type: String,
        default: '100'
      },
      // 初始化赋值的时候是否要显示，兼容小程序，小程序value会走watch
      noShow: {
        type: Boolean,
        default: false
      },
    },
    data() {
      return {
        content: '',
        list: [],
        curr: '',
        showTips: false,
        close: false
      }
    },
    watch: {
      value(newValue) {
        this.content = newValue
        this.onInput(newValue)
      },
      noShow(v) {
        this.close = v
      },
    },
    mounted() {
      this.content = this.value
      this.close = this.noShow
    },
    methods: {
      clear() {
        this.content = ''
        this.curr = {}
        this.showTips = false
        this.$emit('change', this.curr)
        this.$emit('input', '')
      },

      setRed(str) {
        return this.content.toLocaleUpperCase().indexOf(str.toLocaleUpperCase()) > -1
      },

      // 名称输入
      onInput(val) {
        if (!val) {
          this.clear()
          this.curr = {}
          this.showTips = false
          this.$emit('change', this.curr)
          this.$emit('input', '')
        } else {
          if (!this.curr[this.keyName]) {
            debounce(this.search, 1000)
          }
        }
        this.close = false
      },

      // 选中
      select(item) {
        this.showTips = false
        this.content = item[this.keyName]
        this.curr = item
        this.$emit('input', this.content)
        this.$emit('change', item)
        setTimeout(() => {
          this.curr = {}
        })
      },

      onFocus() {
        if (this.list.length) {
          this.showTips = true
        }
        if (!this.content) {
          this.list = []
        }
      },

      closeTip() {
        this.showTips = false
      },

      // 查找
      async search() {
        if (!this.api) {
          return
        }
        if (!this.content) {
          return
        }
        if (this.close) {
          return
        }
        try {
          const apiUrl = this.api.split('.')
          const { data } = await this.$api[apiUrl[0]][apiUrl[1]](this.content, '', this.searchPosition)
          this.list = data.lists || data.items || data || []
          if (!this.list.length) {
            this.$toast('未查找到相关内容')
          } else {
            this.showTips = true
          }
          this.$emit('finish', this.list)
        } catch (e) {
          this.curr = {}
          this.showTips = false
          this.$emit('change', this.curr)
          console.log(e)
        }
      },
    }
  }
</script>

<style scoped lang="scss">
  .keyword-select {
    position: relative;
    background: var(--bg-white);
    display: flex;
    .keyword-list {
      width: 100%;
      left: 0;
      right: 0;
      position: absolute;
      background: var(--bg-white);
      box-shadow: 0 12rpx 12rpx #dddddd;
      z-index: 3;
      max-height: 500rpx;
      overflow-y: auto;
      border-top: 1px solid var(--border-1);;
      .keyword-item {
        display: block;
        padding: 24rpx;
        color: #666666;
        border-bottom: 1px solid var(--border-1);;
        &:last-child {
          border: 0;
        }
        &:active {
          background-color: #EEEEEE;
        }
        &.kl-close {
          display: flex;
          justify-content: flex-end;
          border: 0;
          text {
            font-size: 26rpx;
            color: #999999;
          }
        }
      }
      .red {
        color: red;
        font-weight: bold;
      }
    }
    .form-clear {
      position: absolute;
      right: 24rpx;
      color: #999999;
      top: 40%;
    }
  }
</style>
