import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Cart from '../screen/Cart'
import SCREEN from '../utils/screen.constant'
import Checkout from '../screen/Checkout'
import DeliveryAddress from '../screen/DeliveryAddress'
import DeliveryOption from '../screen/DeliveryOption'
import Notification from '../screen/Notification'
const CartStack = createAppContainer(
  createStackNavigator(
    {
      Cart: {
        screen: Cart,
        navigationOptions: ({ navigation }) => ({
          title: 'Cart',
          header: null,
        }),
      },
      Checkout: {
        screen: Checkout,
        navigationOptions: ({ navigation }) => ({
          title: 'Checkout',
          header: null,
        }),
      },
      DeliveryAddress: {
        screen: DeliveryAddress,
        navigationOptions: ({ navigation }) => ({
          title: 'DeliveryAddress',
          header: null,
        }),
      },
      DeliveryOption: {
        screen: DeliveryOption,
        navigationOptions: ({ navigation }) => ({
          title: 'DeliveryOption',
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
      initialRouteName: 'Cart',
      navigationOptions: {
        header: null,
      },
    }
  )
)
export default CartStack
