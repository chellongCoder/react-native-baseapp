import I18n from 'react-native-i18n'
import en from './locales/en'
import vi from './locales/vi'

I18n.fallbacks = true
I18n.locale = 'vi'
I18n.translations = {
  en,
  vi,
}
export const strings = (name: string, params = {}) => I18n.t(name, params)
export const switchLanguage = (lang: string, component: any) => {
  I18n.locale = lang
  component.forceUpdate()
}

export default I18n
