import { APIBase } from '../api.service'
import {
  get_me,
  shipping,
  detail_order,
  get_orders,
  get_order_status,
} from '../api.config'

export class OrderAPI {
  API: APIBase = APIBase.getInstance()

  async getOrderDetail(orderId: number) {
    const [err, res] = await this.API.get(detail_order(orderId))
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getOrders(pageNumber: number, orderStatusId?: number, mode?: number) {
    const [err, res] = await this.API.get(
      get_orders(pageNumber, orderStatusId, mode)
    )
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async getOrderStatus() {
    const [err, res] = await this.API.get(get_order_status())
    console.log('res', res, 'err', err)
    return [err, res]
  }

  async deleteOrder(orderId: number) {
    const [err, res] = await this.API.delete(detail_order(orderId))
    console.log('res', res, 'err', err)
    return [err, res]
  }
}
