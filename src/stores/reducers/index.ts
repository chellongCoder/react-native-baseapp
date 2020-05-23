import { systemReducer } from './system.reducer'
import { chatReducer } from './chat.reducer'
import { combineReducers } from 'redux'
import peopleReducer from './people.reducer'
import languageReducer from './language.reducer'
import shoppingReducer from './shopping.reducer'
import { uiReducer } from './ui.reducer'
import { orderReducer } from './order.reducer'
import { memberReducer } from './member.reducer'
import { notificationReducer } from './notification.reducer'
import { voucherReducer } from './voucher.reducer'
import { searchReducer } from './search.reducer'
import { authReducer } from './auth.reducer'
import { cartReducer } from './cart.reducer'
import homeReducer from './home.reducer'
import categoryReducer from './category.reducer'
import deliveryReducer from './delivery.reducer'
import productReducer from './product.reducer'
import AsyncStorage from '@react-native-community/async-storage'
import { persistReducer } from 'redux-persist'
import checkoutReducer from './checkout.reducer'
import commentReducer from './comment.reducer'
import replyReducer from './reply.reducer'
const authPersistConfig = {
  key: 'auth',
  storage: AsyncStorage,
  whitelist: ['access_token'],
}
const deliveryPersistConfig = {
  key: 'delivery',
  storage: AsyncStorage,
  whitelist: ['provinces'],
}
const searchPersistConfig = {
  key: 'search',
  storage: AsyncStorage,
  whitelist: ['history'],
}
const cartPersistConfig = {
  key: 'cart',
  storage: AsyncStorage,
  whitelist: ['badge'],
}

export const rootReducer = combineReducers({
  system: systemReducer,
  chat: chatReducer,
  people: peopleReducer,
  language: languageReducer,
  shopping: shoppingReducer,
  home: homeReducer,
  ui: uiReducer,
  order: orderReducer,
  member: memberReducer,
  notification: notificationReducer,
  voucher: voucherReducer,
  search: persistReducer(searchPersistConfig, searchReducer),
  auth: persistReducer(authPersistConfig, authReducer),
  category: categoryReducer,
  cart: persistReducer(cartPersistConfig, cartReducer),
  delivery: persistReducer(deliveryPersistConfig, deliveryReducer),
  product: productReducer,
  checkout: checkoutReducer,
  comment: commentReducer,
  reply: replyReducer,
})
const reducer = rootReducer
export default reducer
export type RootState = ReturnType<typeof rootReducer>
export type GetState = () => ReturnType<typeof rootReducer>
