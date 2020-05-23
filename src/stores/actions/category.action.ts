import {
  GET_CATEGORY,
  GET_CATEGORY_FULFILLED,
  GET_CATEGORY_REJECTED,
  RESET_STORE,
} from '../constants/category.constant'
import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { Dispatch } from 'redux'
import { AppDispatch } from '../../App.bootstrap'
import { GetState } from '../reducers'
import { refresh } from './home.action'

//Define your action create that set your loading state.
export const fetchCategory = (bool: any) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_CATEGORY,
    payload: bool,
    key: 0,
  }
}

export const fetchCategoryFulfilled = (data: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_CATEGORY_FULFILLED,
    payload: data,
    loading: false,
  }
}

export const fetchCategoryRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_CATEGORY_REJECTED,
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

export const getCategory = () => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(fetchCategory(true))
    const [err, res] = await APIService.shopping.getCategory()
    if (res.status === SUCCESS_CODE) {
      dispatch(fetchCategoryFulfilled(res.data))
      dispatch(refresh(1, getState().category.categoriesProduct[0].id))
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(fetchCategoryRejected(error))
    console.log('====================================')
  }
}

const CategoryAction = {
  fetchCategory,
  fetchCategoryFulfilled,
  fetchCategoryRejected,
  resetStore,
  getCategory,
}

export default CategoryAction
