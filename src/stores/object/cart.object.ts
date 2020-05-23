import { IProduct } from './product.object'

export interface ICart {
  rowId: string;
  id: string;
  name: string;
  qty: number;
  price: number;
  options: object;
  tax: number;
  subtotal: number;
  cover: string;
  description: string;
}

export interface ICheckout {
  address_id: number;
  contact_address: string;
  contact_name: string;
  contact_phone: string;
  courier_id: number;
  created_at: string;
  customer_id: number;
  discounts: number;
  district_id: string;
  from_district_id: string;
  id: number;
  order_status_id: number;
  parent_customer_id: number;
  payment: string;
  payment_url: string;
  province_id: string;
  reference: string;
  ship_hub_id: number;
  ship_service_id: number;
  tax: string;
  total: number;
  total_paid: number;
  total_products: string;
  total_shipping: number;
  updated_at: string;
  user_note: string;
  ward_id: string;
}

export interface ISummary {
  total: string;
  total_paid: number;
  discount: number;
}

export interface CartState {
  products: ICart[];
  totalPrice: number;
  summary: ISummary | undefined;
  message: string;
  badge: number;
}
