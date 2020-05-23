import { IComment } from '../object/comment.object'
import { Action } from '../object'
import {
  GET_COMMENT,
  GET_COMMENT_FULFILLED,
  GET_COMMENT_REJECTED,
  RESET_STORE,
  POST_COMMENT_LOADING,
  POST_COMMENT_FULFILLED,
  POST_COMMENT_REJECTED,
} from '../constants/comment.constant'
interface IState {
  loading: boolean;
  comments: IComment[];
  error: any;
  loadingPost: boolean;
}
const initialState = {
  loading: false,
  comments: [
    {
      id: 10,
      content:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit...',
      count_reply: 0,
      product_id: 1,
      customer_id: 43,
      created_at: '2020-05-04T08:27:25.000000Z',
      customer_name: 'Longnn17',
    },
    {
      id: 9,
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean susc',
      count_reply: 0,
      product_id: 1,
      customer_id: 43,
      created_at: '2020-05-04T08:26:47.000000Z',
      customer_name: 'Longnn17',
    },
    {
      id: 2,
      content: 'hiii4a',
      count_reply: 4,
      product_id: 1,
      customer_id: 14,
      created_at: '2020-04-28T15:10:08.000000Z',
      customer_name: 'teo11',
    },
  ],
  error: undefined,

  loadingPost: false,
}

const commentReducer = (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case GET_COMMENT:
      return { ...state, loading: action.payload.loading }
    case GET_COMMENT_FULFILLED:
      return {
        ...state,
        comments: action.payload.data,
        loading: action.payload.loading,
      }
    case GET_COMMENT_REJECTED:
      return {
        ...state,
        error: action.payload.error,
        loading: action.payload.loading,
      }
    case POST_COMMENT_LOADING:
      return {
        ...state,
        loadingPost: action.payload.loading,
      }
    case POST_COMMENT_FULFILLED:
      return {
        ...state,
        loadingPost: action.payload.loading,
      }
    case POST_COMMENT_REJECTED:
      return {
        ...state,
        loadingPost: action.payload.loading,
      }
    case RESET_STORE:
      return initialState
    default:
      return state
  }
}

export default commentReducer
