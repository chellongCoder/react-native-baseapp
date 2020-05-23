import { PRODUCT1 } from '../../utils/image'
import {
  GET_PRODUCT,
  GET_PRODUCT_FULFILLED,
  GET_PRODUCT_REJECTED,
  REFRESH_PRODUCT_FULFILLED,
  RESET_STORE,
  RESET_PRODUCT,
} from '../constants/shopping.constant'

interface IState {
  loadingProducts: boolean;
  products: any[];
  errorProduct: any;
  isLoadMore: boolean;
}
const initialState = {
  loadingProducts: false,
  products: [],
  errorProduct: {},
  isLoadMore: true,
}

const shoppingReducer = (state: IState = initialState, action: any): IState => {
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
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default shoppingReducer
