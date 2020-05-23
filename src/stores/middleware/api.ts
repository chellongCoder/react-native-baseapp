import { alertInfo, alertInfoOption } from '../../utils/common.util'
import { APIBase, SUCCESS_CODE } from './../../services/api.service'

const apiService = (store: any) => (next: any) => (action: any) => {
  const { crud } = action
  console.log('====================================')
  console.log(crud)
  console.log('====================================')

  if (!crud) {
    const result = next(action)
    return result
  }

  return crud()
    .then(([err, res]: any[]) => {
      console.log('====================================')
      console.log('err, res', err, res)
      console.log('====================================')
      if (res.status !== SUCCESS_CODE) {
        return handleErrors(err, action, next)
      } else {
        return handleResponse(res, action, next)
      }
    })
    .catch((err: any) => {
      return handleErrors(err, action, next)
    })
}

export default apiService

function handleErrors(err: any, action: any, next: any) {
  // if (err.status === '500') {
  // EventEmitter.emit(Config.EVENT_NAMES.user_reactive, err)
  // alertInfo('Thông báo', err.message, () => {})
  alertInfoOption('Thông báo', err.message, () => { })
  // }
  next({
    type: `${action.type}_REJECTED`,
    payload: { err },
  })

  return err
}

function handleResponse(res: any, action: any, next: any) {
  // if (loginTypes.AUTH_USER === action.type) {
  //   storeService.setTokenNo(res.tokenNo)
  // } else if (loginTypes.ACTIVE === action.type) {
  //   storeService.setTokenNo(res.userInfo.tokenNo)
  // }
  next({
    type: `${action.type}_FULLFILLED`,
    payload: { res },
  })

  return res
}
