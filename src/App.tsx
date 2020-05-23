import * as React from 'react'
import { View, Animated, Platform, Text, ActivityIndicator, StyleSheet } from 'react-native'
import NavigationServices from './services/NavigationServices'
import AppNavigator from './navigators/app.navigator'
import GlobalFont from 'react-native-global-font'
import Demo from './screen/Demo'
import { CommonVariables } from './utils/common.styles'
import { changeRefSwitchNavigator } from './stores/actions/ui.action'
import { connect } from 'react-redux'
import { NavigationContainerComponent } from 'react-navigation'
import { getAccessKey } from './utils/common.util'
import { RootState } from './stores/reducers'
import { getUniqueIdDevice, checkApplicationPermission, getFcmToken } from './stores/actions/system.action'
import firebase, { notifications } from 'react-native-firebase'
import NotificationService from './services/NotificationService'
import { receiveNotification } from './stores/actions/notification.action'
import { INotification } from './stores/object/notfication.object'

export interface AppProps {
  changeRefSwitchNavigator: (ref: any) => void;
  loading: boolean;
  getUniqueIdDevice: () => void;
  getFcmToken: (fcmToken: string) => void;
  receiveNotification: (notification: INotification) => void
}
export interface AppState { }
class App extends React.Component<AppProps, AppState> {
  onTokenRefreshListener: any
  constructor(props: AppProps) {
    super(props)
    this.state = {}
  }
  async componentDidMount() {
    const { getUniqueIdDevice, getFcmToken, receiveNotification } = this.props
    const fontName = CommonVariables.fonts.OPENSANS_REGULAR
    GlobalFont.applyGlobal(fontName)
    const apiKey = await getAccessKey()
    if (apiKey) {
      NavigationServices.navigate('AppDrawer')
    } else {
      NavigationServices.navigate('Login')
    }
    getUniqueIdDevice()
    NotificationService.onTokenRefresh(getFcmToken)
    checkApplicationPermission(receiveNotification)
    NotificationService.onNotificationOpened()
    NotificationService.createNotificationListeners()
  }

  componentWillUnmount() {
    // NotificationService.removeOnTokenRefreshListener();
  }

  // eslint-disable-next-line prettier/prettier
  public render() {
    const { changeRefSwitchNavigator, loading } = this.props
    return (
      <View style={{ flex: 1 }}>
        <AppNavigator
          ref={(navigatorRef: NavigationContainerComponent) => {
            changeRefSwitchNavigator(navigatorRef)
            !NavigationServices.getTopNavigator() && NavigationServices.setTopLevelNavigator(navigatorRef)
          }}
        />
        {loading ? <View style={styles.loadingWraper}>
          <ActivityIndicator size="large" />
        </View> : null}
      </View>
    )
  }
}
const styles = StyleSheet.create({
  loadingWraper: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
})

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.ui.loading,
  }
}
const mapDispatchToProps = {
  changeRefSwitchNavigator: changeRefSwitchNavigator,
  getUniqueIdDevice,
  getFcmToken,
  receiveNotification,
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
