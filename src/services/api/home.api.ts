import { APIBase } from '../api.service'
import { get_me } from '../api.config'

export class HomeAPI {
  API: APIBase = APIBase.getInstance()

  async getMe() {
    const [err, res] = await this.API.post(get_me())
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
