<!--价格展示组件，2022-10-10-->
<template>
  <view class="ky-price-wrap">
    <view v-if="Number(data.unitPrice) > 0 && Number(data.priceType) !== 3" class="ky-price-main">
      <view class="ky-price-text price-color">
        <text class="ky-price-symbol">￥</text>
        <text :style="{ 'font-size': fontSize + 'rpx' }" class="ky-price-num">{{ data.unitPrice }}</text>
        <text v-if="data.unitName || data.unit || data.skuUnitName" class="ky-price-name">/{{ data.unitName || data.unit || data.skuUnitName }}</text>
      </view>
      <view v-if="Number(data.priceTrend) < 0" class="ky-price-trend price-trend-down">
        <text class="iconfont">&#xeb0a;</text>
        <text>{{ data.priceTrend }}%</text>
      </view>
      <view v-if="Number(data.priceTrend) > 0" class="ky-price-trend price-trend-up">
        <text class="iconfont">&#xeb0b;</text>
        <text>{{ data.priceTrend }}%</text>
      </view>
      <view v-if="Number(data.priceTrend) === 0" class="ky-price-trend price-trend-none gray-color">
        <text class="iconfont" style="transform: rotate(90deg);">&#xeb0b;</text>
        <text>{{ data.priceTrend }}%</text>
      </view>
    </view>
    <view
      v-if="Number(data.unitPrice) <= 0 || Number(data.priceType) === 3"
      :style="{ 'font-size': (fontSize * 0.8) + 'rpx' }"
    >
      <text v-if="Number(data.unitPrice) <= 0 && Number(data.priceType) !== 3" class="ky-price-invalid gray-color">暂无报价</text>
      <text v-else class="ky-price-callphone price-color">来电询价</text>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      /**
       * 价格对象data
       * @property { Number } data.unitPrice 价格
       */
      data: {
        type: Object,
        default: () => {
          return {
            unitPrice: 0, // 单位价格
            unitName: '', // 单位名称
            priceTrend: NaN, // 价格涨跌，百分比
            priceType: 0, // 价格类型，为3显示来电询价
            skuUnitName: '',
            unit: ''
          }
        }
      },
      fontSize: {
        type: Number,
        default: 28
      }
    },
    data() {
      return {

      }
    }
  }
</script>

<style scoped lang="scss">
  .ky-price-wrap {
    display: flex;
    align-items: center;
    .ky-price-main {
      display: flex;
      align-items: center;
      .ky-price-num {
        font-weight: bold;
        font-size: 32rpx;
      }
      .ky-price-name, .ky-price-symbol {
        font-size: 24rpx;
      }
    }
    .ky-price-trend {
      display: flex;
      align-items: center;
      margin-left: 12rpx;
      .iconfont {
        display: inline-block;
        margin-right: 12rpx;
      }
      &.price-trend-down {
        color: #07d007;
      }
      &.price-trend-up {
        color: #ff201c;
      }
    }
  }
</style>
