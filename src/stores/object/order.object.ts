import I18n from '../../i18n/index'
import { IProductOrder } from './product.object'
export const TYPE_ORDER = {
  NEW: I18n.t('order.new'),
  FINISHED: I18n.t('order.finished'),
  TRANSPORTING: `${I18n.t('order.transporting')} ...`,
  CANCEL: `${I18n.t('order.cancel')}`,
}

export type MODE_ORDER = 1 | 2

interface IProduct {
  id: number;
  product_price: string;
  cover: string;
  quantity: number;
  product_name: string;
}

export interface IOrder {
  id: number;
  customer_id: number;
  order_status_id: number;
  contact_name: string;
  contact_phone: string;
  contact_address: string;
  total_shipping: string;
  total: string;
  total_paid: string;
  discounts: string;
  ship_service_name: string;
  payment_type: number;
  status_name: string;
  status_code: string;
  status_id: number;
  products: IProductOrder[];
  created_at: string;
}
export const [PAID, PENDING, ERROR, ON_DELIVERY, ORDERED] = [
  'paid',
  'pending',
  'error',
  'on-delivery',
  'ordered',
]

export interface IOrderStatus {
  id: number;
  name: string;
  color: string;
  created_at: string;
  updated_at: string;
  status_name: string;
}
