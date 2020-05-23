import { ShoppingAPI } from './shopping.api'
import { AuthAPI } from './auth.api'
import { CartAPI } from './cart.api'
import { HomeAPI } from './home.api'
import { UserAPI } from './user.api'
import { ProductAPI } from './product.api'
import { OrderAPI } from './order.api'
const shopping = new ShoppingAPI()
const auth = new AuthAPI()
const cart = new CartAPI()
const home = new HomeAPI()
const user = new UserAPI()
const product = new ProductAPI()
const order = new OrderAPI()
const APIService = {
  shopping,
  auth,
  cart,
  home,
  user,
  product,
  order,
}
export default APIService
