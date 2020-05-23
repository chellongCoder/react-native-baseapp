import firebase from 'react-native-firebase'
import {
  Notification,
  NotificationOpen,
} from 'react-native-firebase/notifications'
import { alertInfo, alertInfoOption, formatDate } from '../utils/common.util'
import { Linking } from 'react-native'
import { RemoteMessage } from 'react-native-firebase/messaging'
import { CommonVariables } from '../utils/common.styles'
import { INotification } from '../stores/object/notfication.object'
import { receiveNotification } from '../stores/actions/notification.action'
import NavigationServices from './NavigationServices'
import SCREEN from '../utils/screen.constant'

let onTokenRefreshListener: any
let removeNotificationListener: any
let messageListener: any
export default {
  async onTokenRefresh(callback: (fcmToken: string) => void) {
    try {
      const fcm = await firebase.messaging().getToken()
      callback && callback(fcm)
      // console.log('====================================')
      // console.log(fcm)
      // console.log('====================================')
      // onTokenRefreshListener = firebase
      //   .messaging()
      //   .onTokenRefresh((fcmToken: string) => {
      //     // Process your token as required
      //     console.log('====================================')
      //     console.log('fcmToken', fcmToken)
      //     console.log('====================================')

      //   })
    } catch (error) {
      throw new Error(error.message)
    }
  },

  removeOnTokenRefreshListener() {
    onTokenRefreshListener()
  },

  listenNotification(callback?: (notification: INotification) => void) {
    removeNotificationListener = firebase
      .notifications()
      .onNotification((notification: Notification) => {
        console.log('notification', notification)
        const localNotification = new firebase.notifications.Notification()
          .setNotificationId(notification.notificationId)
          .setTitle(notification.title)
          .setSound('default')
          .setBody(notification.body)
          .setData(notification.data)
        firebase
          .notifications()
          .displayNotification(localNotification)
          .catch(err => console.error(err))

        const data: any = notification.data
        console.log('notification open', notification.data)
        const noti: INotification = {
          order_id: data.order_id,
          body: data.body,
          order_status: data.order_status,
          create_at: new Date(),
          order_status_name: data.order_status_name,
          title: data.title,
          type_notify: data.type_notify,
        }
        callback && callback(noti)
      })
  },

  listenMessage() {
    messageListener = firebase
      .messaging()
      .onMessage((message: RemoteMessage) => {
        // Process your message as required
        console.log('message', message)
        console.log('Message', message)
        const channel = new firebase.notifications.Android.Channel(
          'test-channel',
          'Test Channel',
          firebase.notifications.Android.Importance.Max
        ).setDescription('My apps channel')

        // Create the channel
        firebase.notifications().android.createChannel(channel)
        console.log('channelId', channel)

        const newNotification = new firebase.notifications.Notification().android
          .setChannelId(channel.channelId)
          .setTitle(message.data.title)
          .android.setAutoCancel(true)
          .setSound('default')
          .setNotificationId(message.messageId)
          .setBody(message.data.body)
          .setData(message.data)
          .android.setColorized(true)
          .android.setColor(CommonVariables.buttonColor)
          .android.setPriority(firebase.notifications.Android.Priority.High)

        console.log('newNotification', newNotification)
        firebase
          .notifications()
          .displayNotification(newNotification)
          .catch(err => console.error(err))
      })
  },

  removeListenNotification() {
    removeNotificationListener()
  },

  async requestPermissionNotification() {
    let enable = await firebase.messaging().hasPermission()
    console.log('enable notification', enable)
    if (!enable) {
      await firebase.messaging().requestPermission()
      enable = await firebase.messaging().hasPermission()
      if (!enable) {
        alertInfoOption('Cho phép ứng dụng gửi thông báo?', '', () => {
          Linking.canOpenURL('app-settings:')
            .then(supported => {
              if (!supported) {
                console.log("Can't handle settings url")
              } else {
                return Linking.openURL('app-settings:')
              }
            })
            .catch(err => console.error('An error occurred', err))
        })
      }
    }
    console.log('enable notification', enable)
    return enable
  },

  onNotificationOpened(callback?: (notification: INotification) => void) {
    firebase
      .notifications()
      .onNotificationOpened((notificationOpen: NotificationOpen) => {
        // notificationOpen.action will equal 'test_action'
        NavigationServices.navigate(
          SCREEN.BOTTOM_TABBAR.HOME_STACK.NOTIFICATION
        )
      })
  },

  async createNotificationListeners() {
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
    if (notificationOpen) {
      console.log('anhlvv.this.notificationOpen: ', notificationOpen)
      NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.HOME_STACK.NOTIFICATION)
      // console.group('notificationOpen', this.notificationOpen.notification)
      // const notification = this.notificationOpen.notification
      // this.navigateToNotificationDetail(notification.data.notificationID)
    }
  },
}
