import { APIBase } from '../api.service'
import { get_detailProduct, get_related_product } from '../api.config'

export class ProductAPI {
  API: APIBase = APIBase.getInstance()

  async getDetailProduct(productId: number) {
    const [err, res] = await this.API.get(get_detailProduct(productId))
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getRelatedProduct(productId: number) {
    const [err, res] = await this.API.get(get_related_product(productId))
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
