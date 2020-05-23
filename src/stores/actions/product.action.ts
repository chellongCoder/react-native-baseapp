import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_RELATE_PRODUCT,
  GET_RELATE_PRODUCT_FAIL,
  GET_RELATE_PRODUCT_SUCCESS,
} from '../constants/product.constant'
import { RootState, GetState } from '../reducers'
import { AppDispatch } from '../../App.bootstrap'
import { isLoading } from '../actions/ui.action'
import APIService from '../../services/api'
import { Dispatch } from 'redux'

export const getDetailProductSuccess = (data: any) => {
  //Return a action type and a loading to false, and the data.
  console.log('getDetailProductSuccess', data)
  return {
    type: GET_PRODUCT_DETAIL_SUCCESS,
    payload: data,
  }
}

export const getDetailProductFail = () => {
  //Return a action type and a loading to false, and the data.
  console.log('getDetailProductFail')
  return {
    type: GET_PRODUCT_DETAIL_FAIL,
  }
}

export const getDetailProduct = (productId: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(isLoading(true))
    const [err, res] = await APIService.product.getDetailProduct(productId)
    dispatch(isLoading(false))
    if (err) {
      dispatch(getDetailProductFail())
    } else if (res) {
      console.log('getDetailProduct', res)
      dispatch(getDetailProductSuccess(res))
    }
  } catch (error) {
    console.log('====================================')
    console.log('getDetailProduct', error)
    dispatch(getDetailProductFail())
    console.log('====================================')
  }
}
export const getRelatedProductSuccess = (data: any) => {
  //Return a action type and a loading to false, and the data.
  console.log('getDetailProductSuccess', data)
  return {
    type: GET_RELATE_PRODUCT_SUCCESS,
    payload: data,
  }
}

export const getRelatedProductFail = () => {
  //Return a action type and a loading to false, and the data.
  console.log('getDetailProductFail')
  return {
    type: GET_RELATE_PRODUCT_FAIL,
  }
}
export const getRelateProduct = (productId: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    console.log('getRelateProduct')
    dispatch(isLoading(true))
    const [err, res] = await APIService.product.getRelatedProduct(productId)
    dispatch(isLoading(false))
    if (err) {
      dispatch(getRelatedProductFail())
    } else if (res) {
      console.log('getRelateProduct', res)
      dispatch(getRelatedProductSuccess(res))
    }
  } catch (error) {
    dispatch(isLoading(false))
    console.log('====================================')
    console.log('getRelateProduct', error)
    dispatch(getDetailProductFail())
    console.log('====================================')
  }
}
