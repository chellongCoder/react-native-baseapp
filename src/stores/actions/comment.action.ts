import APIService from '../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import { AppDispatch } from '../../App.bootstrap'
import { GetState } from '../reducers'
import {
  GET_COMMENT,
  GET_COMMENT_FULFILLED,
  GET_COMMENT_REJECTED,
  RESET_STORE,
  POST_COMMENT_LOADING,
  POST_COMMENT_FULFILLED,
  POST_COMMENT_REJECTED,
} from '../constants/comment.constant'
import { alertInfo } from '../../utils/common.util'
import { Dispatch } from 'redux'

//Define your action create that set your loading state.
export const fetchComment = (bool: any) => {
  //return a action type and a loading state indicating it is getting data.
  return {
    type: GET_COMMENT,
    payload: {
      loading: true,
    },
  }
}

export const fetchCommentFulfilled = (data: any) => {
  //Return a action type and a loading to false, and the data.
  return {
    type: GET_COMMENT_FULFILLED,
    payload: {
      data,
      loading: false,
    },
  }
}

export const fetchCommentRejected = (error: any) => {
  //Return a action type and a payload with a error
  return {
    type: GET_COMMENT_REJECTED,
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

export const getComments = (idProduct: number) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch(fetchComment(true))
    const [err, res] = await APIService.user.getComments(idProduct)
    if (res.status === SUCCESS_CODE) {
      dispatch(fetchCommentFulfilled(res.data))
    } else {
      throw new Error(err)
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch(fetchCommentRejected(error))
    console.log('====================================')
  }
}

export const postComments = (idProduct: number, data: any) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    dispatch({
      type: POST_COMMENT_LOADING,
      payload: {
        loading: true,
      },
    })
    const [err, res] = await APIService.user.postComments(idProduct, data)
    if (err) {
      throw new Error(err.content)
    }
    if (res.status === SUCCESS_CODE) {
      dispatch({
        type: POST_COMMENT_FULFILLED,
        payload: {
          loading: false,
        },
      })
      dispatch(getComments(idProduct))
    }
  } catch (error) {
    console.log('====================================')
    console.log(error)
    dispatch({
      type: POST_COMMENT_REJECTED,
      payload: {
        loading: false,
      },
    })
    alertInfo(error.message)
    console.log('====================================')
  }
}

const CommentAction = {
  fetchComment,
  fetchCommentFulfilled,
  fetchCommentRejected,
  resetStore,
  getComments,
}

export default CommentAction
