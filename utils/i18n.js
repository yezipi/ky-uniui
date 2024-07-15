import { createI18n } from 'vue-i18n'
import en from '@/locale/en.json'
import zhHans from '@/locale/zh-Hans.json'

export default createI18n({
  locale: uni.getLocale(), // 获取已设置的语言
  messages: {
    en,
    'zh-Hans': zhHans,
  }
})
