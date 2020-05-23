import React from 'react'
import App from './App'
import SplashScreen from 'react-native-splash-screen'
import CodePush from 'react-native-code-push'
import firebase from 'react-native-firebase'
import NavigationServices from './services/NavigationServices'
import { APIBase } from './services/api.service'

import configureStore from './stores'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const [store, persistor] = configureStore()

export type AppDispatch = typeof store.dispatch

console.disableYellowBox = true
const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
}
class Root extends React.Component {
  unsubscribe: any
  checkForUpdate = async () => {
    const syncOption = {
      // deploymentKey: "_wwMGJR-5c3IDheTDnxpsLa7B3AiWOdmLxZ6i",
      updateDialog: {
        appendReleaseDescription: true,
      },
      installMode: CodePush.InstallMode.IMMEDIATE,
    }
    await CodePush.sync(
      syncOption,
      this.codePushStatusDidChange,
      this.codePushDownloadDidProgress
    )
  }
  codePushStatusDidChange(status) {
    switch (status) {
      case CodePush.SyncStatus.CHECKING_FOR_UPDATE:
        console.log('Checking for updates.')
        break
      case CodePush.SyncStatus.DOWNLOADING_PACKAGE:
        console.log('Downloading package.')
        break
      case CodePush.SyncStatus.INSTALLING_UPDATE:
        console.log('Installing update.')
        break
      case CodePush.SyncStatus.UP_TO_DATE:
        console.log('Up-to-date.')
        break
      case CodePush.SyncStatus.UPDATE_INSTALLED:
        console.log('Update installed.')
        break
    }
  }
  codePushDownloadDidProgress(progress) {
    console.log(
      progress.receivedBytes + ' of ' + progress.totalBytes + ' received.'
    )
  }
  handleDynamicLink = async (link: string) => {
    const arr = link.split('=')
    const token = arr[1]
    APIBase.getInstance().setAPIKey(token)

    NavigationServices.navigate('DeeplinkChangePassword')
  }
  dynamicLink = () => {
    this.unsubscribe = firebase.links().onLink(this.handleDynamicLink)
  }

  async componentDidMount() {
    await this.checkForUpdate()
    SplashScreen.hide()
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    )
  }
}

export default CodePush(codePushOptions)(Root)
