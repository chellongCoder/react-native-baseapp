import { SystemState, SystemActionTypes, IBank } from '../object/system.object'
import {
  GET_BANKS,
  GET_UNIQUE_DEVICE_ID,
  GET_FCM_TOKEN,
  POST_USER_DEVICE,
} from '../constants/system.constant'
import { GetState } from '../reducers'
import APIService from '../../services/api'
import { Dispatch } from 'redux'
import DeviceInfo from 'react-native-device-info'
import firebase from 'react-native-firebase'
import NotificationService from '../../services/NotificationService'
import { PLATFORM } from '../../styles/common.variables'
import { isAndroid } from '../../utils/common.util'
import { INotification } from '../object/notfication.object'

export const getBanks = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const crud = () => APIService.user.getBanks()
  console.log('====================================')
  console.log('crud', crud)
  console.log('====================================')
  dispatch({
    type: GET_BANKS,
    crud,
  })
}

export const getUniqueIdDevice = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const uniqueId = DeviceInfo.getUniqueId()
  console.log('====================================')
  console.log('uniqueId', uniqueId)
  console.log('====================================')
  dispatch({
    type: GET_UNIQUE_DEVICE_ID,
    payload: {
      uniqueId,
    },
  })
}

export const getFcmToken = (fcmToken: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({
    type: GET_FCM_TOKEN,
    payload: {
      fcmToken,
    },
  })
  const accessToken = getState().auth.access_token
  if (accessToken) {
    const deviceId = getState().system.deviceId
    dispatch(postUserDevice(fcmToken, deviceId))
  }
}

export const postUserDevice = (fcmToken: string, deviceId: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const data = {
    device_token: deviceId,
    registration_token: fcmToken,
    os: isAndroid() ? PLATFORM.ANDROID : PLATFORM.IOS,
  }
  const crud = () => APIService.user.postUserDevice(data)
  dispatch({
    type: POST_USER_DEVICE,
    crud,
  })
}

export async function checkApplicationPermission(
  receiveNotification?: (notification: INotification) => void
) {
  const isGrant = NotificationService.requestPermissionNotification()
  console.log('Permission status:', isGrant)

  if (!isGrant) {
    await firebase.messaging().requestPermission()
  }

  NotificationService.listenNotification(receiveNotification)
  NotificationService.listenMessage()
}
