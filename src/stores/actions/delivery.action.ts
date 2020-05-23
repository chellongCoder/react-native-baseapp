import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { Dispatch } from 'redux'
import { GetState } from '../reducers'
import {
  GET_ADDRESS_FULLFILLED,
  RESET_STORE,
  GET_ADDRESS_REJECTED,
  UPDATE_ADDRESS_LOADING,
  UPDATE_ADDRESS_FULLFILLED,
  UPDATE_ADDRESS_REJECTED,
  GET_USER_FULLFILLED,
  GET_SHIPPING_FULLFILLED,
  CHOICE_DELIVERY_OPTION,
  GET_ADDRESS,
} from '../constants/delivery.constant'
import * as AUTH from '../constants/auth.constant'
import { alertInfo } from '../../utils/common.util'
import { IDeliveryOption } from '../object/delivery.object'
import NavigationServices from '../../services/NavigationServices'
import { ThunkDispatch } from 'redux-thunk'

export const fetchProvinceFulfilled = (data: any) => {
  return {
    type: GET_ADDRESS_FULLFILLED,
    payload: data,
  }
}
export const fetchProvinceFailed = (error: any) => {
  return {
    type: GET_ADDRESS_REJECTED,
    payload: error,
  }
}

export const resetStore = () => {
  //Return a action type and a payload with a error
  return {
    type: RESET_STORE,
  }
}

export const getProvince = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const crud = () => APIService.user.getProvince()
    dispatch({
      type: GET_ADDRESS,
      crud,
    })
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const updateAddressLoading = (bool: boolean) => {
  return {
    type: UPDATE_ADDRESS_LOADING,
    payload: {
      updateLoading: bool,
    },
  }
}

export const updateAddressFullfilled = (data: any) => {
  return {
    type: UPDATE_ADDRESS_FULLFILLED,
    payload: {
      data,
      updateLoading: false,
    },
  }
}

export const updateAddressRejected = (data: any) => {
  return {
    type: UPDATE_ADDRESS_REJECTED,
    payload: {
      errors: data,
      updateLoading: false,
    },
  }
}

export const updateAddress = (data: any) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(updateAddressLoading(true))
    const [err, res] = await APIService.user.updateProfile(data)
    if (err) {
      dispatch(updateAddressRejected(err))
    } else {
      alertInfo(res.message)
      dispatch(updateAddressFullfilled(res.data))
      dispatch(getShipping())
      NavigationServices.goBack()
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const getUser = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const [err, res] = await APIService.user.getProfile()
    dispatch({
      type: GET_USER_FULLFILLED,
      payload: {
        address: res.data,
      },
    })
    dispatch({
      type: AUTH.GET_USER_FULLFILLED,
      payload: {
        user: res.data,
      },
    })
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const getShipping = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const address: any = getState().delivery.address
    console.log('address', address)
    if (!address.address_id) return
    const [err, res] = await APIService.cart.getShipping(address.address_id)
    if (err) throw new Error(err.message)
    dispatch({
      type: GET_SHIPPING_FULLFILLED,
      payload: {
        shipping: res.data,
      },
    })
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

export const choiceDeliveryOption = (deliveryOption: IDeliveryOption) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch({
    type: CHOICE_DELIVERY_OPTION,
    payload: {
      deliveryOption,
    },
  })
}

const DeliveryAction = {
  resetStore,
  getProvince,
}

export default DeliveryAction
