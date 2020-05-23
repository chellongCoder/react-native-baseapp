import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Demo from '../screen/Demo'
import AppDrawer from './drawer.navigator'
import ProductList from '../screen/ProductList'
import DetailProduct from '../screen/DetailProduct'
import Cart from '../screen/Cart'
import SCREEN from '../utils/screen.constant'
import Notification from '../screen/Notification'
const ShoppingStack = createAppContainer(
  createStackNavigator(
    {
      ProductList: {
        screen: ProductList,
        navigationOptions: ({ navigation }) => ({
          title: 'ProductList',
          header: null,
        }),
      },
      DetailProduct: {
        screen: DetailProduct,
        navigationOptions: ({ navigation }) => ({
          title: 'DetailProduct',
          header: null,
        }),
      },
      Notification: {
        screen: Notification,
        navigationOptions: ({ navigation }) => ({
          title: 'Notification',
          header: null,
        }),
      },
    },
    {
      initialRouteName: 'ProductList',
      navigationOptions: {
        header: null,
      },
    }
  )
)
export default ShoppingStack
