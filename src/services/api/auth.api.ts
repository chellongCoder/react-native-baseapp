import { APIBase } from '../api.service'
import { get_Login, register, verify } from '../api.config'

export class AuthAPI {
  API: APIBase = APIBase.getInstance()

  async login(username: any, password: any) {
    const [err, res] = await this.API.post(get_Login(), {
      username: username,
      password: password,
    })
    // console.log('res', res, 'err', err)
    return [err, res]
  }

  async register(data: any) {
    const [err, res] = await this.API.post(register(), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async verify(data: any) {
    const [err, res] = await this.API.post(verify(), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
