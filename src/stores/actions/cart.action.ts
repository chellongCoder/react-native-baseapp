import {
  GET_CART,
  GET_CART_FAIL,
  GET_CART_SUCCESS,
  PUT_PRODUCT_CART,
  PUT_PRODUCT_CART_FAIL,
  PUT_PRODUCT_CART_SUCCESS,
  DEL_PRODUCT_CART,
  DEL_PRODUCT_CART_FAIL,
  DEL_PRODUCT_CART_SUCCESS,
  ADD_PRODUCT_CART,
  ADD_PRODUCT_CART_FAIL,
  ADD_PRODUCT_CART_SUCCESS,
  RESET_STORE,
} from '../constants/cart.constant'
import APIService from '../../services/api'
import { Dispatch } from 'redux'
import { RootState, GetState } from '../reducers'
import { isLoading } from '../actions/ui.action'
import { ICart } from '../object/cart.object'
import { Alert } from 'react-native'
import NavigationServices from '../../services/NavigationServices'
import SCREEN from '../../utils/screen.constant'
import { PURGE } from 'redux-persist'
export const getCartSuccess = (res: any) => {
  //Return a action type and a loading to false, and the data.
  const products = res.data
  const summary = res.summary
  const total = products.reduce((acc, item: ICart) => {
    return acc + item.subtotal
  }, 0)
  return {
    type: GET_CART_SUCCESS,
    payload: {
      products,
      total,
      badge: products.length,
      summary,
    },
  }
}

export const getCartFail = () => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_CART_FAIL,
  }
}

export const resetStore = () => {
  //Return a action type and a loading to false, and the data.
  return {
    type: PURGE,
  }
}

export const getCart = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    dispatch(isLoading(true))
    const [err, res] = await APIService.cart.getCart()
    dispatch(isLoading(false))
    if (err) {
      dispatch(getCartFail())
    } else if (res) {
      console.log('getCart', res)
      dispatch(getCartSuccess(res))
    }
  } catch (error) {
    console.log('====================================')
    console.log('getCart', error)
    dispatch(getCartFail())
    console.log('====================================')
  }
}

export const putCartFail = (res: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: PUT_PRODUCT_CART_FAIL,
    payload: res,
  }
}

export const putCartSuccess = (res: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: PUT_PRODUCT_CART_SUCCESS,
    payload: {
      res,
    },
  }
}
export const putCart = (rowId: string, quantity: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(isLoading(true))
    const [err, res] = await APIService.cart.putCart(rowId, quantity)
    dispatch(isLoading(false))
    if (err) {
      dispatch(putCartFail(err))
    } else if (res) {
      console.log('putCart', res)
      dispatch(putCartSuccess(res))
      dispatch(getCart())
    }
  } catch (error) {
    console.log('====================================')
    console.log('putCart', error)
    dispatch(putCartFail(error))
    console.log('====================================')
  }
}

export const delCartFail = (res: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: DEL_PRODUCT_CART_FAIL,
    payload: res,
  }
}

export const delCartSuccess = (res: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: DEL_PRODUCT_CART_SUCCESS,
    payload: {
      res,
      badge: 1,
    },
  }
}
export const delCart = (rowId: string, quantity: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(isLoading(true))
    const [err, res] = await APIService.cart.delCart(rowId)
    dispatch(isLoading(false))
    if (err) {
      dispatch(delCartFail(err))
    } else if (res) {
      console.log('putCart', res)
      dispatch(delCartSuccess(res))
      dispatch(getCart())
    }
  } catch (error) {
    console.log('====================================')
    console.log('delCart', error)
    dispatch(dispatch(delCartFail(error)))
    console.log('====================================')
  }
}

export const addCartFail = (res: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: ADD_PRODUCT_CART_FAIL,
    payload: res,
  }
}

export const addCartSuccess = (res: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: ADD_PRODUCT_CART_SUCCESS,
    payload: {
      res,
      badge: 1,
    },
  }
}
export const addCart = (product: number, quantity: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(isLoading(true))
    const [err, res] = await APIService.cart.addCart(product, quantity)
    dispatch(isLoading(false))
    if (err) {
      Alert.alert(err.message)
      dispatch(addCartFail(err))
    } else if (res) {
      console.log('putCart', res)
      Alert.alert(res.message, '', [
        {
          text: 'OK',
          onPress: () => {
            NavigationServices.goBack()
            NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.CART_STACK.CART)
          },
        },
      ])
      dispatch(addCartSuccess(res))
      dispatch(getCart())
    }
  } catch (error) {
    console.log('====================================')
    console.log('delCart', error)
    dispatch(dispatch(addCartFail(error)))
    console.log('====================================')
  }
}

const CartAction = {
  resetStore,
}

export default CartAction
