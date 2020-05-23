// @flow
import firebase from 'react-native-firebase'
import { RemoteMessage } from 'react-native-firebase/messaging'
import { CommonVariables } from '../utils/common.styles'
// Optional flow type

export default async (message: RemoteMessage) => {
  // handle your message
  console.log('message', message)
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
  firebase.notifications().displayNotification(newNotification)
  return Promise.resolve()
}
