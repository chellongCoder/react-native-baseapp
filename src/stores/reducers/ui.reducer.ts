import { Animated } from 'react-native'
import {
  REF_BOTTOMTAB,
  REF_SWITCH_NAVIGATOR,
  IS_LOADING,
  NAVIGATION_DRAWER,
  SET_REPLY_CMT,
} from '../constants/ui.constant'
import { Action } from '../object'

const initialState = {
  scrollY: new Animated.Value(0),
  refBottomTab: null,
  refSwitchNavigator: null,
  loading: false,
  navigationDrawer: null,

  mapReplies: new Map<number, boolean>(),
}

export function uiReducer(state = initialState, action: Action) {
  switch (action.type) {
    case REF_BOTTOMTAB:
      return { ...state, refBottomTab: action.payload }
    case REF_SWITCH_NAVIGATOR:
      return { ...state, refSwitchNavigator: action.payload }
    case IS_LOADING:
      return { ...state, loading: action.payload }
    case NAVIGATION_DRAWER:
      return { ...state, navigationDrawer: action.payload }
    default:
      return state
  }
}
