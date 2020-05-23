import { RootState, GetState } from '../reducers'
import { AppDispatch } from '../../App.bootstrap'
import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import HomeAction from './home.action'

import {
  SAVE_SEARCH_TEXT,
  REMOVE_ITEM_HISTORY,
  REMOVE_ALL_HISTORY,
} from '../constants/search.constant'
import ShoppingAction from './shopping.action'
import { Dispatch } from 'redux'

export const getProductsByQuery = (query: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(HomeAction.resetProducts())
    dispatch(HomeAction.fetchProduct(true))
    const [err, res] = await APIService.shopping.getProductsByQuery(query)
    if (res.status === SUCCESS_CODE) {
      dispatch(HomeAction.fetchProductFulfilled(res.data.data))
      dispatch(saveTextInHistorySearch(query))
    }
  } catch (error) {
    console.log('====================================')
    console.log('getCart', error)
    dispatch(HomeAction.fetchProductRejected(error))
    console.log('====================================')
  }
}

export const getProductsByQueryShopping = (query: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(ShoppingAction.resetProduct())
    dispatch(ShoppingAction.fetchProduct(true))
    const [err, res] = await APIService.shopping.getProductsByQuery(query)
    if (res.status === SUCCESS_CODE) {
      dispatch(ShoppingAction.fetchProductFulfilled(res.data.data))
      dispatch(saveTextInHistorySearch(query))
    }
  } catch (error) {
    console.log('====================================')
    console.log('getCart', error)
    dispatch(ShoppingAction.fetchProductRejected(error))
    console.log('====================================')
  }
}

export const saveTextInHistorySearch = (text: string) => {
  return {
    type: SAVE_SEARCH_TEXT,
    payload: {
      data: text,
    },
  }
}

export const removeItemHistory = (index: number) => {
  return {
    type: REMOVE_ITEM_HISTORY,
    payload: {
      data: index,
    },
  }
}

export const removeAllHistory = () => {
  return {
    type: REMOVE_ALL_HISTORY,
  }
}
