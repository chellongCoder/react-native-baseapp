import { APIBase } from '../api.service'
import { get_Cart, putQuantity_Cart, shipping, checkout } from '../api.config'

export class CartAPI {
  API: APIBase = APIBase.getInstance()

  async getCart() {
    const [err, res] = await this.API.get(get_Cart())
    // console.log('res', res, 'err', err)
    return [err, res]
  }

  async putCart(rowId: string, quantity: number) {
    const [err, res] = await this.API.put(putQuantity_Cart(rowId), {
      quantity: quantity,
    })
    return [err, res]
  }

  async delCart(rowId: string) {
    const [err, res] = await this.API.delete(putQuantity_Cart(rowId))
    return [err, res]
  }

  async addCart(product: number, quantity: number) {
    const [err, res] = await this.API.post(get_Cart(), {
      product: product,
      quantity: quantity,
    })
    return [err, res]
  }

  async getShipping(addressId: number) {
    const [err, res] = await this.API.get(shipping(addressId))
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async checkout(data: any) {
    const [err, res] = await this.API.post(checkout(), data)
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
