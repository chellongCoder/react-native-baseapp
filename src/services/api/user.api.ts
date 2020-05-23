import { APIBase } from '../api.service'
import {
  get_province,
  profile,
  get_comments,
  get_banks,
  user_device,
} from '../api.config'

export class UserAPI {
  API: APIBase = APIBase.getInstance()

  async getProvince() {
    const [err, res] = await this.API.get(get_province())
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async updateProfile(data: any) {
    const [err, res] = await this.API.post(profile(), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getProfile() {
    const [err, res] = await this.API.get(profile())
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getComments(idProduct: number) {
    const [err, res] = await this.API.get(get_comments(idProduct))
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async postComments(idProduct: number, data: any) {
    const [err, res] = await this.API.post(get_comments(idProduct), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getReplies(idProduct: number, commentId: number) {
    const [err, res] = await this.API.get(get_comments(idProduct, commentId))
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async postReplies(idProduct: number, data: any) {
    const [err, res] = await this.API.post(get_comments(idProduct), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getBanks() {
    const [err, res] = await this.API.get(get_banks())
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async postUserDevice(data: any) {
    const [err, res] = await this.API.post(user_device(), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
