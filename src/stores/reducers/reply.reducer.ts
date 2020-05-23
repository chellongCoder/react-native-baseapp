import { IReply } from '../object/comment.object'
import { Action } from '../object'

import {
  GET_REPLY,
  GET_REPLY_FULFILLED,
  GET_REPLY_REJECTED,
  POST_REPLY_LOADING,
  POST_REPLY_FULFILLED,
  RESET_STORE,
} from '../constants/reply.constant'
interface IState {
  loading: boolean;
  replies: Map<number, IReply[]>;
  error: any;
  loadingPost: boolean;
}
const initialState = {
  loading: false,
  replies: new Map<number, IReply[]>([
    [1, []],
    [2, []],
  ]),
  error: undefined,

  loadingPost: false,
}

const replyReducer = (state: IState = initialState, action: Action) => {
  switch (action.type) {
    case GET_REPLY:
      return {
        ...state,
        loading: action.payload.loading,
      }
    case GET_REPLY_FULFILLED: {
      return {
        ...state,
        replies: state.replies.set(
          action.payload.idComment,
          action.payload.data
        ),
        loading: action.payload.loading,
      }
    }

    case GET_REPLY_REJECTED:
      return {
        ...state,
        error: action.payload.error,
        loading: action.payload.loading,
      }
    case POST_REPLY_LOADING:
      return {
        ...state,
        loadingPost: action.payload.loading,
      }
    case POST_REPLY_FULFILLED:
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

export default replyReducer
