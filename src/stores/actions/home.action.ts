import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { Dispatch } from 'redux'
import {
  GET_PRODUCT,
  GET_PRODUCT_FULFILLED,
  REFRESH_PRODUCT_FULFILLED,
  GET_PRODUCT_REJECTED,
  RESET_STORE,
  GET_ME,
  RESET_PRODUCT,
} from '../constants/home.constant'
import { GetState } from '../reducers'
import { AppDispatch } from '../../App.bootstrap'
import Mine from '../object/me.object'

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

export const resetProducts = () => {
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

export const fetchMeFulfilled = (data: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_ME,
    payload: data,
  }
}

export const getMe = () => async (dispatch: Dispatch, getState: GetState) => {
  try {
    const [err, res] = await APIService.home.getMe()
    if (err) {
      throw new Error(err)
    }
    const me = new Mine()
    me.fromJSON(res.data)
    dispatch(fetchMeFulfilled(me))
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
  }
}

const HomeAction = {
  resetStore,
  resetProducts,
  fetchProduct,
  fetchProductFulfilled,
  fetchProductRejected,
  getProduct,
}

export default HomeAction
