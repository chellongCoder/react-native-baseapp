import { PRODUCT1 } from '../../utils/image'

import {
  GET_PRODUCT,
  GET_PRODUCT_FULFILLED,
  REFRESH_PRODUCT_FULFILLED,
  GET_PRODUCT_REJECTED,
  RESET_STORE,
  GET_ME,
  RESET_PRODUCT,
} from '../constants/home.constant'

const initialState = {
  loadingProducts: false,
  products: [],
  errorProduct: null,
  isLoadMore: true,

  me: {},
}

const homeReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case GET_PRODUCT:
      return { ...state, loadingProducts: action.payload }
    case GET_PRODUCT_FULFILLED:
      return {
        ...state,
        products: [...state.products, ...action.payload],
        isLoadMore: action.payload.length ? state.isLoadMore : false,
        loadingProducts: action.loading,
      }
    case REFRESH_PRODUCT_FULFILLED:
      return {
        ...state,
        isLoadMore: true,
        products: action.payload,
        loadingProducts: action.loading,
      }
    case GET_PRODUCT_REJECTED:
      return {
        ...state,
        errorProduct: action.payload,
        loadingProducts: action.loading,
      }
    case RESET_PRODUCT:
      return {
        ...state,
        products: [],
      }

    case GET_ME:
      return {
        ...state,
        me: action.payload,
      }

    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default homeReducer
