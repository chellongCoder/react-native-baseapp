import i18n from './../../i18n'
import { CHANGE_LANGUAGE } from '../constants/language.constant'

const initialState = {
  i18n: i18n,
}

const languageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case CHANGE_LANGUAGE: {
      return { i18n: action.payload }
    }
    default:
      return state
  }
}

export default languageReducer
