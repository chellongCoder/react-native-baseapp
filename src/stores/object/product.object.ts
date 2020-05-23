export interface IProduct {
  id: number;
  name: string;
  price: string;
  cover: string;
}

export interface IProductOrder {
  id: number;
  product_name: string;
  product_price: string;
  cover: string;
  quantity: number;
}
