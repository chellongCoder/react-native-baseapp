import {
  GET_ADDRESS_FULLFILLED,
  GET_ADDRESS_REJECTED,
  RESET_STORE,
  UPDATE_ADDRESS_LOADING,
  UPDATE_ADDRESS_REJECTED,
  GET_USER_FULLFILLED,
  GET_SHIPPING_FULLFILLED,
  CHOICE_DELIVERY_OPTION,
  UPDATE_ADDRESS_FULLFILLED,
} from '../constants/delivery.constant'
import { PURGE } from 'redux-persist'
import { Action } from '../object'
import { IAddress, IDeliveryOption, IProvince } from '../object/delivery.object'
interface IState {
  provinces: IProvince[];
  error: null;

  updateLoading: boolean;
  errorsUpdate: null;

  address?: IAddress;
  shipping: any[];
  choicedDeliveryOption?: IDeliveryOption;
}
const initialState = {
  provinces: [],
  error: null,

  updateLoading: false,
  errorsUpdate: null,

  address: undefined,
  shipping: [],
  choicedDeliveryOption: undefined,
}

const deliveryReducer = (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case GET_ADDRESS_FULLFILLED:
      return {
        ...state,
        provinces: action.payload.res.data,
      }
    case GET_ADDRESS_REJECTED:
      return {
        ...state,
        error: action.payload,
      }

    case UPDATE_ADDRESS_LOADING:
      return {
        ...state,
        updateLoading: action.payload.updateLoading,
      }

    case UPDATE_ADDRESS_FULLFILLED:
      return {
        ...state,
        address: action.payload.data,
        updateLoading: action.payload.updateLoading,
      }

    case UPDATE_ADDRESS_REJECTED:
      return {
        ...state,
        errorsUpdate: action.payload.errors,
        updateLoading: action.payload.updateLoading,
      }

    case GET_USER_FULLFILLED:
      return {
        ...state,
        address: action.payload.address,
      }

    case GET_SHIPPING_FULLFILLED:
      return {
        ...state,
        shipping: action.payload.shipping,
      }

    case CHOICE_DELIVERY_OPTION:
      return {
        ...state,
        choicedDeliveryOption: action.payload.deliveryOption,
      }

    case PURGE:
      return initialState
    default:
      return state
  }
}

export default deliveryReducer
