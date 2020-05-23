import {
  CHECKOUT_LOADING,
  CHECKOUT_DATA_FULFILLED,
  CHECKOUT_DATA_REJECT,
  RESET_STORE,
} from '../constants/checkout.constant'
interface IState {
  loadingCheckout: boolean;
  checkoutData: undefined;
  errorCheckout: undefined;
}
const initialState = {
  loadingCheckout: false,
  checkoutData: undefined,
  errorCheckout: undefined,
}

const checkoutReducer = (state: IState = initialState, action: any) => {
  switch (action.type) {
    case CHECKOUT_LOADING:
      return { ...state, loadingCheckout: action.payload.loading }
    case CHECKOUT_DATA_FULFILLED:
      return {
        ...state,
        checkoutData: action.payload.data,
        loadingCheckout: action.payload.loading,
      }
    case CHECKOUT_DATA_REJECT:
      return {
        ...state,
        errorCheckout: action.payload.error,
        loadingCheckout: action.payload.loading,
      }
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default checkoutReducer
