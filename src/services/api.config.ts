export function get_category() {
  return `/api/category/filter`
}

export function get_Login() {
  return `/api/login`
}

export function get_products(pageNumber: number = 1, pageSize: number = 10) {
  return `/api/product/filter?page[size]=${pageSize}&page[number]=${pageNumber}`
}

export function get_productsByCategory(
  categoryId: number,
  pageNumber: number = 1,
  pageSize: number = 10
) {
  return `/api/product/filter?category=${categoryId}&page[size]=${pageSize}&page[number]=${pageNumber}`
}

export function get_productsByQuery(
  query: string = '',
  pageNumber: number = 1,
  pageSize: number = 10
) {
  return `/api/product/filter?page[size]=${pageSize}&page[number]=${pageNumber}&query=${query}`
}

export function get_Cart() {
  return `/api/cart`
}

export function putQuantity_Cart(rowID: string) {
  return `/api/cart/${rowID}`
}

export function get_me() {
  return `/api/user/me`
}

export function get_province() {
  return `/api/settings/province`
}

export function register() {
  return `/api/register`
}

export function get_detailProduct(productId: number) {
  return `/api/product/detail/${productId}`
}

export function profile() {
  return `/api/user/profile`
}

export function shipping(addressId: number) {
  return `/api/cart/shipping?address_id=${addressId}`
}

export function checkout() {
  return `/api/order/checkout`
}

export function detail_order(orderId: number) {
  return `/api/order/${orderId}`
}

export function verify() {
  return `/api/verify`
}

export function get_comments(idProduct: number, commentId?: number) {
  return !commentId
    ? `/api/comment/product/${idProduct}`
    : `/api/comment/product/${idProduct}?comment_id=${commentId}`
}

export function get_orders(
  page: number,
  order_status_id?: number, //Id trạng thái, lấy từ GET /api/settings/order_status
  mode?: number //Đơn hàng trực tiếp = 1, Đơn hàng Thanh viên = 2
) {
  return `/api/order?page=${page}${
    order_status_id ? `&order_status_id=${order_status_id}` : ``
    }${mode ? `&mode=${mode}` : ``}`
}

export function get_related_product(rowID: number) {
  return `/api/product/related/${rowID}`
}

export function get_order_status() {
  return `/api/settings/order_status`
}

export function get_banks() {
  return `/api/settings/bank`
}

export function user_device() {
  return `/api/user-device`
}
