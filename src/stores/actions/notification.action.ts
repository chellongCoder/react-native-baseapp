import {
  GET_PEOPLE,
  GET_PEOPLE_FULFILLED,
  GET_PEOPLE_REJECTED,
} from '../constants/people.constant'
import { INotification, NotificationAction } from '../object/notfication.object'
import { Dispatch } from 'redux'
import { GetState } from '../reducers'
import { SAVE_NOTIFICATION } from '../constants/notification.constant'

//Define your action create that set your loading state.
export const fetchData = (bool: any) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_PEOPLE,
    payload: bool,
  }
}

export const saveNotificationFulfilled = (
  notification: INotification
): NotificationAction => {
  //Return a action type and a loading to false, and the data.
  return {
    type: SAVE_NOTIFICATION,
    payload: {
      notification,
      badge: 1,
    },
  }
}

export const fetchDataRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_PEOPLE_REJECTED,
    payload: error,
    loading: false,
  }
}

export const receiveNotification = (notification: INotification) => (
  dispatch: Dispatch,
  getState: GetState
) => {
  console.log('====================================')
  console.log(notification)
  console.log('====================================')
  dispatch(saveNotificationFulfilled(notification))
}
