import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { AppDispatch } from '../../App.bootstrap'
import { GetState } from '../reducers'
import {
  GET_DETAIL_ORDER_FULFILLED,
  GET_DETAIL_ORDER_REJECT,
  RESET_STORE,
  GET_ORDERS_FULFILLED,
  GET_ORDERS_REJECT,
  GET_ORDERS_LOADING,
  GET_ORDERS_STATUS,
  DELETE_DETAIL_ORDER,
  GET_ORDERS_LOADMORE,
  GET_LIVE_ORDERS_FULFILLED,
  GET_MEMBER_ORDERS_FULFILLED,
} from '../constants/order.constant'
import { Dispatch } from 'redux'
import { MODE_ORDER } from '../object/order.object'

export const resetStore = () => {
  //Return a action type and a payload with a error
  return {
    type: RESET_STORE,
  }
}

export const getDetailOrderFullfilled = (data: any) => {
  return {
    type: GET_DETAIL_ORDER_FULFILLED,
    payload: {
      data,
    },
  }
}

export const getDetailOrderRejected = (error: any) => {
  return {
    type: GET_DETAIL_ORDER_FULFILLED,
    payload: {
      error,
    },
  }
}

export const getLiveOrdersFullfilled = (data: any, orderStatusId: number) => {
  return {
    type: GET_LIVE_ORDERS_FULFILLED,
    payload: {
      data,
      loading: false,
      orderStatusId,
    },
  }
}

export const getMemberOrdersFullfilled = (data: any, orderStatusId: number) => {
  return {
    type: GET_MEMBER_ORDERS_FULFILLED,
    payload: {
      data,
      loading: false,
      orderStatusId,
    },
  }
}

export const getOrdersLoadmore = (data: any) => {
  return {
    type: GET_ORDERS_LOADMORE,
    payload: {
      data,
      loading: false,
    },
  }
}

export const getOrdersRejected = (error: any) => {
  return {
    type: GET_ORDERS_REJECT,
    payload: {
      error,
      loading: false,
    },
  }
}

export const getOrdersLoading = (bool: boolean) => {
  return {
    type: GET_ORDERS_LOADING,
    payload: {
      loading: bool,
    },
  }
}

export const getOrdersStatus = (data: any) => {
  return {
    type: GET_ORDERS_STATUS,
    payload: {
      data,
    },
  }
}

export const getOrderDetail = (orderId: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const [err, res] = await APIService.order.getOrderDetail(orderId)
    if (res.status === SUCCESS_CODE) {
      dispatch(getDetailOrderFullfilled(res.data))
    } else {
      throw new Error(err)
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(getDetailOrderRejected(error))
    console.log('====================================')
  }
}

export const getOrders = (
  pageNumber: number = 1,
  orderStatusId?: number,
  mode?: MODE_ORDER
) => async (dispatch: Dispatch, getState: GetState) => {
  try {
    dispatch(getOrdersLoading(true))
    const [err, res] = await APIService.order.getOrders(
      pageNumber,
      orderStatusId,
      mode
    )
    if (err) {
      throw new Error(err)
    }
    if (mode === 1) {
      dispatch(getLiveOrdersFullfilled(res.data, orderStatusId))
    } else {
      dispatch(getMemberOrdersFullfilled(res.data, orderStatusId))
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const loadmoreOrders = (
  pageNumber: number = 1,
  orderStatusId?: number,
  mode?: number
) => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const { choicedLiveOrderStatusId } = getState().order
    const [err, res] = await APIService.order.getOrders(
      pageNumber,
      choicedLiveOrderStatusId,
      mode
    )
    if (err) {
      throw new Error(err)
    }
    dispatch(getOrdersLoadmore(res.data))
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const getOrderStatus = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const [err, res] = await APIService.order.getOrderStatus()
    dispatch(getOrdersStatus(res.data))
    if (err) {
      throw new Error(err)
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const deleteOrder = (orderId: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const crud = async () => await APIService.order.deleteOrder(orderId)
    await dispatch({
      type: DELETE_DETAIL_ORDER,
      crud,
    })
    dispatch(getOrders(1))
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(getDetailOrderRejected(error))
    console.log('====================================')
  }
}

const OrderAction = {
  resetStore,
  getOrderDetail,
}

export default OrderAction
