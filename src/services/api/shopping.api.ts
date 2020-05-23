import { APIBase } from '../api.service'
import {
  get_category,
  get_products,
  get_productsByCategory,
  get_productsByQuery,
} from '../api.config'

export class ShoppingAPI {
  API: APIBase = APIBase.getInstance()

  async getCategory() {
    const [err, res] = await this.API.get(get_category())
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getProducts(pageNumber?: number, categoryId?: number) {
    const [err, res] = !categoryId
      ? await this.API.get(get_products(pageNumber))
      : await this.API.get(get_productsByCategory(categoryId, pageNumber))
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getProductsByQuery(query: string, pageNumber?: number) {
    const [err, res] = await this.API.get(
      get_productsByQuery(query, pageNumber)
    )
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
