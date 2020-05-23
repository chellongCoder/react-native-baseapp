import { Animated } from 'react-native'
import { TYPE_ORDER } from '../object/order.object'
import {
  SAVE_SEARCH_TEXT,
  RESET_STORE,
  REMOVE_ITEM_HISTORY,
  REMOVE_ALL_HISTORY,
} from '../constants/search.constant'
import { Action } from '../object'
import { PURGE } from 'redux-persist'
interface IState {
  history: any[];
  popular: any[];
}
const initialState = {
  history: [],

  popular: [
    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },

    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },
    {
      content: 'Sản phẩm 5',
    },
  ],
}

export function searchReducer(state: IState = initialState, action: Action) {
  switch (action.type) {
    case SAVE_SEARCH_TEXT:
      return {
        ...state,
        history: [
          ...state.history,
          {
            content: action.payload.data,
          },
        ],
      }
    case REMOVE_ITEM_HISTORY:
      return {
        ...state,
        history: state.history.filter((item, index) => {
          return index !== action.payload.data
        }),
      }
    case REMOVE_ALL_HISTORY:
      return {
        ...state,
        history: [],
      }
    case PURGE:
      return initialState
    default:
      return state
  }
}
