import { NavigationActions, StackActions } from 'react-navigation'
import { DrawerActions } from '@react-navigation/native'

let _navigator: any

function setTopLevelNavigator(navigatorRef: any) {
  console.log('set ref', navigatorRef)
  if (!navigatorRef) return
  _navigator = navigatorRef
}

function getTopNavigator() {
  return _navigator
}

function navigate(routeName: string, params: any = null) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    })
  )
}

function push(routeName: string, params: any = null) {
  const pushAction = StackActions.push({
    routeName,
    params,
  })

  _navigator.dispatch(pushAction)
}
function replace(routeName: string, params: any = null) {
  const pushAction = StackActions.replace({
    routeName,
    params,
  })

  _navigator.dispatch(pushAction)
}

function toogleDrawer() {
  _navigator.dispatch(DrawerActions.toggleDrawer())
}

function goBack() {
  _navigator && _navigator.dispatch(NavigationActions.back())
}

function dispatch(action: any) {
  _navigator.dispatch(action)
}

function resetStack(route: string, params: any = null, offset = 0) {
  const goToLogin = StackActions.reset({
    index: offset,
    actions: [NavigationActions.navigate({ routeName: route, params: params })],
  })
  dispatch(goToLogin)
}

function popToTop() {
  _navigator && _navigator.dispatch(StackActions.popToTop())
}
// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator,
  dispatch,
  goBack,
  resetStack,
  push,
  toogleDrawer,
  getTopNavigator,
  replace,
  popToTop,
}
