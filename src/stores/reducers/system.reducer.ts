import {
  GET_BANKS,
  GET_BANKS_FULLFILLED,
  GET_UNIQUE_DEVICE_ID,
  GET_FCM_TOKEN,
} from '../constants/system.constant'
import { SystemState } from '../object/system.object'
import { Action } from '../object'

const initialState: SystemState = {
  banks: [],
  deviceId: '',
  fcmToken: '',
}

export function systemReducer(
  state = initialState,
  action: Action
): SystemState {
  switch (action.type) {
    case GET_BANKS_FULLFILLED: {
      return {
        ...state,
        banks: action.payload.res.data,
      }
    }
    case GET_UNIQUE_DEVICE_ID: {
      return {
        ...state,
        deviceId: action.payload.uniqueId,
      }
    }
    case GET_FCM_TOKEN: {
      return {
        ...state,
        fcmToken: action.payload.fcmToken,
      }
    }
    default:
      return state
  }
}
