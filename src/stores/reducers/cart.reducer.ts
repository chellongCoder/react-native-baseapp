import {
  GET_CART_SUCCESS,
  GET_CART_FAIL,
  PUT_PRODUCT_CART_FAIL,
  PUT_PRODUCT_CART_SUCCESS,
  DEL_PRODUCT_CART_FAIL,
  DEL_PRODUCT_CART_SUCCESS,
  ADD_PRODUCT_CART_FAIL,
  ADD_PRODUCT_CART_SUCCESS,
  RESET_STORE,
} from '../constants/cart.constant'
import { ICart, CartState } from '../object/cart.object'
import { delCartFail } from '../actions/cart.action'
import { PURGE } from 'redux-persist'

const initialState = {
  products: [],
  totalPrice: 0,
  summary: undefined,
  message: '',
  badge: 0,
}

export function cartReducer(state = initialState, action: any): CartState {
  const { payload } = action
  switch (action.type) {
    case GET_CART_SUCCESS: {
      return {
        ...state,
        products: payload.products,
        summary: payload.summary,
        totalPrice: payload.total,
        badge: payload.badge,
      }
    }
    case GET_CART_FAIL:
      return {
        ...state,
      }
    case PUT_PRODUCT_CART_FAIL:
      return {
        ...state,
        message: payload.message,
      }
    case PUT_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        message: payload.res.message,
      }
    case DEL_PRODUCT_CART_FAIL:
      return {
        ...state,
        message: payload.message,
      }
    case DEL_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        message: payload.res.message,
        badge: state.badge - payload.badge,
      }
    case ADD_PRODUCT_CART_FAIL:
      return {
        ...state,
        message: payload.message,
      }
    case ADD_PRODUCT_CART_SUCCESS:
      return {
        ...state,
        message: payload.res.message,
        badge: state.badge + payload.badge,
      }
    case PURGE:
      return initialState
  }
  return state
}
