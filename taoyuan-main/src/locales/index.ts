import { createI18n } from 'vue-i18n'
import vi from './vi'
import zh from './zh'

const i18n = createI18n({
  legacy: false,
  locale: 'vi', // default locale
  fallbackLocale: 'zh',
  messages: {
    vi,
    zh
  }
})

export default i18n
