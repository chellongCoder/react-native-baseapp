import {
  LOGIN_ERROR,
  LOGIN_SUCCESS,
  RESET_STORE,
  SET_COMFIRMATION_OTP,
  SET_USER_AUTHPHONE,
  SAVE_FORM_REGISTER,
  REGISTER_REJECTED,
  GET_USER_FULLFILLED,
} from '../constants/auth.constant'
import { PURGE } from 'redux-persist'
import { IFormRegister } from '../object/me.object'
import { IProfile } from '../object/user.object'
interface IState {
  user: IProfile | null;
  access_token: string;
  loading: boolean;
  loginError: boolean;

  confirmationOTP: null;
  userAuthPhone: null;

  formDataRegister: IFormRegister | null;
  errorRegister: null;
}
const initialState = {
  user: null,
  access_token: '',
  loading: false,
  loginError: false,

  confirmationOTP: null,
  userAuthPhone: null,

  formDataRegister: null,
  errorRegister: null,
}
export function authReducer(state: IState = initialState, action: any) {
  const { payload } = action
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: payload.user,
        access_token: payload.access_token,
        loginError: false,
      }
    case LOGIN_ERROR:
      return {
        ...state,
        loginError: true,
      }

    case SET_COMFIRMATION_OTP:
      return {
        ...state,
        confirmationOTP: payload.confirmation,
      }
    case SET_USER_AUTHPHONE:
      return {
        ...state,
        userAuthPhone: payload.user,
      }

    case SAVE_FORM_REGISTER:
      return {
        ...state,
        formDataRegister: payload.data,
      }
    case REGISTER_REJECTED:
      return {
        ...state,
        errorRegister: payload.errors,
      }
    case GET_USER_FULLFILLED:
      return {
        ...state,
        user: action.payload.user,
      }
    case PURGE:
      return initialState
  }
  return state
}
