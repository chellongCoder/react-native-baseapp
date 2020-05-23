import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { AppDispatch } from '../../App.bootstrap'
import { GetState } from '../reducers'
import { alertInfo } from '../../utils/common.util'
import {
  POST_REPLY_LOADING,
  POST_REPLY_FULFILLED,
  GET_REPLY,
  GET_REPLY_FULFILLED,
  GET_REPLY_REJECTED,
  RESET_STORE,
} from '../constants/reply.constant'

//Define your action create that set your loading state.
export const fetchReply = (bool: any, idComment: number) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_REPLY,
    payload: {
      loading: true,
      idComment,
    },
  }
}

export const fetchReplyFulfilled = (data: any, idComment: number) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_REPLY_FULFILLED,
    payload: {
      data,
      idComment,
      loading: false,
    },
  }
}

export const fetchReplyRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_REPLY_REJECTED,
    payload: {
      error,
      loading: false,
    },
  }
}

export const resetStore = () => {
  //Return a action type and a payload with a error
  return {
    type: RESET_STORE,
  }
}

export const getReplies = (idProduct: number, commentId: number) => async (
  dispatch: AppDispatch,
  getState: GetState
) => {
  try {
    dispatch(fetchReply(true, commentId))
    const [err, res] = await APIService.user.getReplies(idProduct, commentId)
    if (res.status === SUCCESS_CODE) {
      dispatch(fetchReplyFulfilled(res.data, commentId))
    } else {
      throw new Error(err)
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(fetchReplyRejected(error))
    console.log('====================================')
  }
}

export const postReply = (idProduct: number, data: any) => async (
  dispatch: AppDispatch,
  getState: GetState
) => {
  try {
    dispatch({
      type: POST_REPLY_LOADING,
      payload: {
        loading: true,
      },
    })
    const [err, res] = await APIService.user.postReplies(idProduct, data)
    if (res.status === SUCCESS_CODE) {
      dispatch({
        type: POST_REPLY_FULFILLED,
        payload: {
          loading: false,
        },
      })
      dispatch(getReplies(idProduct, data.comment_id))
    } else {
      throw new Error(err)
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    alertInfo(error.message)
    dispatch(fetchReplyRejected(error))
    console.log('====================================')
  }
}

const ReplyAction = {
  fetchReply,
  fetchReplyFulfilled,
  resetStore,
}

export default ReplyAction
