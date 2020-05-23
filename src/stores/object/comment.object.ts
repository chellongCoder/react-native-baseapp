export interface IComment {
  id: number;
  content: string;
  count_reply: number;
  product_id: number;
  customer_id: number;
  created_at: string;
  customer_name: string;
}

export interface IReply {
  id: number;
  content: string;
  count_reply: number;
  product_id: number;
  customer_id: number;
  created_at: string;
  customer_name: string;
}
