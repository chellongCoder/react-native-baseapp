import {
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_RELATE_PRODUCT_FAIL,
  GET_RELATE_PRODUCT_SUCCESS,
} from '../constants/product.constant'
import { IProduct } from '../object/product.object'
const initialState = {
  product: {
    id: 0,
    price: 0,
    name: '',
  },
  relates: [],
}

export default function productReducer(state = initialState, action: any) {
  const { payload } = action
  switch (action.type) {
    case GET_PRODUCT_DETAIL_SUCCESS: {
      return {
        ...state,
        product: payload.data,
      }
    }
    case GET_PRODUCT_DETAIL_FAIL: {
      return {
        ...state,
      }
    }
    case GET_RELATE_PRODUCT_FAIL: {
      return {
        ...state,
      }
    }
    case GET_RELATE_PRODUCT_SUCCESS: {
      return {
        ...state,
        relates: payload.data,
      }
    }
    default:
      return state
  }
}
