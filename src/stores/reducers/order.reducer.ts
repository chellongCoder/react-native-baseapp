import { Animated } from 'react-native'
import { TYPE_ORDER, IOrder, IOrderStatus } from '../object/order.object'
import {
  GET_DETAIL_ORDER_FULFILLED,
  GET_DETAIL_ORDER_REJECT,
  RESET_STORE,
  GET_ORDERS_FULFILLED,
  GET_ORDERS_LOADING,
  GET_ORDERS_STATUS,
  DELETE_DETAIL_ORDER_FULFILLED,
  GET_ORDERS_LOADMORE,
  GET_LIVE_ORDERS_FULFILLED,
  GET_MEMBER_ORDERS_FULFILLED,
} from '../constants/order.constant'
import { Action } from '../object'
import { alertInfo } from '../../utils/common.util'
interface IState {
  liveOrders: IOrder[];
  memberOrders: IOrder[];
  orderDetail: IOrder | undefined;
  error: any;
  order: any;
  loadingOrders: boolean;
  orderStatus: IOrderStatus[];
  choicedLiveOrderStatusId: number | undefined;
}
const initialState = {
  liveOrders: [],
  memberOrders: [],
  orderStatus: [],
  order: {
    user: {
      name: 'MIING',
      numberPhone: '0855266311',
      address: '117 Hoàng Quốc Việt, Phường Nghĩa Đô - Cầu Giấy - Hà Nội',
    },
    products: [
      {
        name: 'SẢN PHẨM 1',
        quantum: 1,
        price: 70000,
      },
      {
        name: 'SẢN PHẨM 1',
        quantum: 2,
        price: 70000,
      },
      {
        name: 'SẢN PHẨM 1',
        quantum: 3,
        price: 70000,
      },
      {
        name: 'SẢN PHẨM 1',
        quantum: 4,
        price: 70000,
      },
    ],
    shippingOption: 'Nhanh',
    paymentOption: 'VNPAY',
    totalPayment: 320000,
    discount: -96000,
    shippingSubtotal: 31000,
    voucher: -15000,
    status: TYPE_ORDER.TRANSPORTING,
  },
  orderDetail: undefined,
  error: undefined,
  loadingOrders: false,
  choicedLiveOrderStatusId: undefined,
}

export function orderReducer(
  state: IState = initialState,
  action: Action
): IState {
  switch (action.type) {
    case GET_DETAIL_ORDER_FULFILLED:
      return {
        ...state,
        orderDetail: action.payload.data,
      }
    case GET_DETAIL_ORDER_REJECT:
      return {
        ...state,
        error: action.payload.error,
      }
    case GET_ORDERS_LOADING:
      return {
        ...state,
        loadingOrders: action.payload.loading,
      }
    case GET_LIVE_ORDERS_FULFILLED:
      return {
        ...state,
        liveOrders: action.payload.data,
        loadingOrders: action.payload.loading,
        choicedLiveOrderStatusId: action.payload.orderStatusId,
      }
    case GET_MEMBER_ORDERS_FULFILLED:
      return {
        ...state,
        memberOrders: action.payload.data,
        loadingOrders: action.payload.loading,
      }
    case GET_ORDERS_LOADMORE:
      return {
        ...state,
        liveOrders: [...state.liveOrders, ...action.payload.data],
        loadingOrders: action.payload.loading,
      }
    case GET_ORDERS_STATUS:
      return {
        ...state,
        orderStatus: action.payload.data,
      }
    case DELETE_DETAIL_ORDER_FULFILLED:
      alertInfo(action.payload.res.message)
      return {
        ...state,
      }
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}
