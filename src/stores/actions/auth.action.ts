import {
  AUTHENTICATION,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  RESET_STORE,
  SET_COMFIRMATION_OTP,
  SET_USER_AUTHPHONE,
  SAVE_FORM_REGISTER,
  REGISTER_REJECTED,
} from '../constants/auth.constant'
import { APIBase } from '../../services/api.service'
import firebase, { RNFirebase } from 'react-native-firebase'
import { AppDispatch } from '../../App.bootstrap'
import { GetState } from '../reducers'
import APIService from '../../services/api'
import { isLoading } from './ui.action'
import NavigationServices from '../../services/NavigationServices'
import { formatNumberPhone } from '../../utils/common.util'
import { login } from '../../screen/Login'
import { Dispatch } from 'redux'

export const loginSuccess = (data: any) => {
  //Return a action type and a loading to false, and the data.
  console.log('loginSuccess', data)
  APIBase.getInstance().setAPIKey(data.access_token)
  return {
    type: LOGIN_SUCCESS,
    payload: data,
  }
}

export const loginError = () => {
  return {
    type: LOGIN_ERROR,
  }
}

export const resetStore = () => {
  return {
    type: RESET_STORE,
  }
}

// Handle the button press
export const signInWithPhoneNumber = (phoneNumber: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  const confirmation: RNFirebase.ConfirmationResult = await firebase
    .auth()
    .signInWithPhoneNumber(phoneNumber)
  dispatch({
    type: SET_COMFIRMATION_OTP,
    payload: {
      confirmation,
    },
  })
  await new Promise((resolve, reject) => {
    autoVerified(dispatch)
    resolve()
  })
  // console.log('====================================')
  // console.log('VERIFY OK')
  // console.log('====================================')
}

let unsubscribeAuth: () => void = () => undefined
export const confirmCode = (code: string) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const result = await getState().auth.confirmationOTP.confirm(code)
    console.log('result', result)
    dispatch({
      type: SET_USER_AUTHPHONE,
      payload: {
        user: result.user,
      },
    })
    // unsubscribeAuth()
  } catch (error) {
    console.log('Invalid code.', error)
    throw new Error(error.message)
  }
}

export const autoVerified = (dispatch: Dispatch) => {
  unsubscribeAuth = firebase
    .auth()
    .onAuthStateChanged(
      async (user: RNFirebase.auth.OrNull<RNFirebase.User>) => {
        console.log('user', user)
        const token = await user?.getIdToken()
        console.log('token', token)
        token && APIBase.getInstance().setAPIKey(token, false)
        // dispatch({
        //   type: SET_USER_AUTHPHONE,
        //   payload: {
        //     user,
        //   },
        // })
      }
    )
}

export const saveFormRegister = (data: any) => ({
  type: SAVE_FORM_REGISTER,
  payload: {
    data,
  },
})

export const register = (data: any) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  dispatch(isLoading(true))
  const [err, res] = await APIService.auth.register(data)
  dispatch(isLoading(false))
  if (err) {
    dispatch({
      type: REGISTER_REJECTED,
      payload: {
        errors: err,
      },
    })
    return
  }
  const formDataRegister: any = getState().auth.formDataRegister
  console.log('====================================')
  console.log(formDataRegister)
  console.log('====================================')
  formDataRegister &&
    dispatch(signInWithPhoneNumber(formatNumberPhone(formDataRegister.phone)))
  NavigationServices.navigate('OTP')
}

export const verify = (data: any) => async (
  dispatch: Dispatch,
  getState: GetState
) => {
  try {
    const [err, res] = await APIService.auth.verify(data)
    if (err) {
      throw new Error(err.phone)
    }
    APIBase.getInstance().setAPIKey(res.data.access_token)
  } catch (error) {
    console.log('====================================')
    console.log(error)
    console.log('====================================')
    throw new Error(error.message)
  }
}

const AuthAction = {
  loginError,
  resetStore,
  loginSuccess,
}

export default AuthAction
