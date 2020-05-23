import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { AppDispatch } from '../../App.bootstrap'
import { GetState } from '../reducers'
import {
  CHECKOUT_LOADING,
  CHECKOUT_DATA_FULFILLED,
  CHECKOUT_DATA_REJECT,
  RESET_STORE,
} from '../constants/checkout.constant'
import { Dispatch } from 'redux'
import { alertInfo } from '../../utils/common.util'
import { PLATFORM } from '../../styles/common.variables'

//Define your action create that set your loading state.
export const loadingCheckout = (bool: any) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: CHECKOUT_LOADING,
    payload: {
      loading: bool,
    },
  }
}

export const checkoutFulfilled = (data: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: CHECKOUT_DATA_FULFILLED,
    payload: {
      data,
    },
    loading: false,
  }
}

export const checkoutRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: CHECKOUT_DATA_REJECT,
    payload: {
      error,
    },
    loading: false,
  }
}

export const resetStore = () => {
  //Return a action type and a payload with a error
  return {
    type: RESET_STORE,
  }
}

export const checkout = (data: any) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(loadingCheckout(true))
    const [err, res] = await APIService.cart.checkout(data)
    if (res.status === SUCCESS_CODE) {
      dispatch(checkoutFulfilled(res.data))
    } else {
      throw new Error(res.message)
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    alertInfo(error.message)

    dispatch(checkoutRejected(error.message))
    throw new Error(error.message)
    console.log('====================================')
  }
}

const CheckoutAction = {
  loadingCheckout,
  checkoutFulfilled,
  checkoutRejected,
  resetStore,
  checkout,
}

export default CheckoutAction
