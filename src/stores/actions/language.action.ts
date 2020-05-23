import { CHANGE_LANGUAGE } from '../constants/language.constant'

export const changeLanguage = (i18n: any) => {
  return {
    type: CHANGE_LANGUAGE,
    payload: i18n,
  }
}
