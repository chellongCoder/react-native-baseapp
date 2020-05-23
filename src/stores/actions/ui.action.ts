import {
  REF_BOTTOMTAB,
  REF_SWITCH_NAVIGATOR,
  IS_LOADING,
  NAVIGATION_DRAWER,
} from '../constants/ui.constant'

export const changeRefBottomTab = (ref: any) => {
  return {
    type: REF_BOTTOMTAB,
    payload: ref,
  }
}

export const changeRefSwitchNavigator = (ref: any) => {
  return {
    type: REF_SWITCH_NAVIGATOR,
    payload: ref,
  }
}

export const isLoading = (loading: boolean) => {
  return {
    type: IS_LOADING,
    payload: loading,
  }
}

export const changeNavigationDrawer = (navigation: any) => {
  return {
    type: NAVIGATION_DRAWER,
    payload: navigation,
  }
}
