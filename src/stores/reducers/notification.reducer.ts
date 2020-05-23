import {
  NotificationState,
  NotificationAction,
} from '../object/notfication.object'
import { SAVE_NOTIFICATION } from '../constants/notification.constant'

const initialState = {
  notifications: [
    // {
    //   title: 'Bạn có 1 đơn hàng đang được giao',
    //   note:
    //     'Mã đơn hàng #00163 của bạn đang được giao hàng. Bạn vui lòng kiểm tra và chú ý tới điện thoại để nhận thông tin giao nhận hàng. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi',
    //   createAt: new Date(),
    // },
    // {
    //   title: 'Đơn hàng hoàn tất',
    //   note:
    //     'Mã đơn hàng #00163 của bạn đã hoàn tất. Cảm ơn bạn đã sử dụng dịch vụ của chúng tôi',
    //   createAt: new Date(),
    // },
    // {
    //   title: 'Thông báo',
    //   note: 'Mô tả',
    //   createAt: new Date(),
    // },
    // {
    //   title: 'Thông báo',
    //   note: 'Mô tả',
    //   createAt: new Date(),
    // },
    // {
    //   title: 'Thông báo',
    //   note: 'Mô tả',
    //   createAt: new Date(),
    // },
    // {
    //   title: 'Thông báo',
    //   note: 'Mô tả',
    //   createAt: new Date(),
    // },
    // {
    //   title: 'Thông báo',
    //   note: 'Mô tả',
    //   createAt: new Date(),
    // },
  ],
  badge: 0,
}

export function notificationReducer(
  state = initialState,
  action: NotificationAction
): NotificationState {
  switch (action.type) {
    case SAVE_NOTIFICATION:
      return {
        ...state,
        notifications: [action.payload.notification, ...state.notifications],
        badge: ++state.badge,
      }
    default: {
      return state
    }
  }
}
