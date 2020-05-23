import {
  GET_PRODUCT,
  GET_PRODUCT_FULFILLED,
  GET_PRODUCT_REJECTED,
  REFRESH_PRODUCT_FULFILLED,
  RESET_STORE,
  RESET_PRODUCT,
} from '../constants/shopping.constant'
import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { Dispatch } from 'redux'
import { RootState, GetState } from '../reducers'
import { AppDispatch } from '../../App.bootstrap'

//Define your action create that set your loading state.
export const fetchProduct = (bool: any) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_PRODUCT,
    payload: bool,
  }
}

export const fetchProductFulfilled = (data: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_PRODUCT_FULFILLED,
    payload: data,
    loading: false,
  }
}

export const fetchProductRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_PRODUCT_REJECTED,
    payload: error,
    loading: false,
  }
}

export const refreshProductFulfilled = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: REFRESH_PRODUCT_FULFILLED,
    payload: error,
    loading: false,
  }
}

export const resetStore = () => {
  //Return a action type and a payload with a error
  return {
    type: RESET_STORE,
  }
}

export const resetProduct = () => {
  //Return a action type and a payload with a error
  return {
    type: RESET_PRODUCT,
  }
}

export const getProduct = (pageNumber?: number, categoryId?: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(fetchProduct(true))
    const [err, res] = await APIService.shopping.getProducts(
      pageNumber,
      categoryId
    )
    if (res.status === SUCCESS_CODE) {
      dispatch(fetchProductFulfilled(res.data.data))
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(fetchProductRejected(error))
    console.log('====================================')
  }
}

export const loadmore = (pageNumber?: number, categoryId?: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const [err, res] = await APIService.shopping.getProducts(
      pageNumber,
      categoryId
    )
    if (res.status === SUCCESS_CODE) {
      dispatch(fetchProductFulfilled(res.data.data))
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
    dispatch(fetchProductRejected(error))
  }
}

export const refresh = (pageNumber?: number, categoryId?: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const [err, res] = await APIService.shopping.getProducts(
      pageNumber,
      categoryId
    )
    if (res.status === SUCCESS_CODE) {
      dispatch(refreshProductFulfilled(res.data.data))
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(fetchProductRejected(error))
    console.log('====================================')
  }
}

const ShoppingAction = {
  resetStore,
  fetchProduct,
  fetchProductFulfilled,
  fetchProductRejected,
  getProduct,
  loadmore,
  refresh,
  resetProduct,
}

export default ShoppingAction
