import { createAppContainer } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Demo from '../screen/Demo'
import { View, Text } from 'react-native'
import { IconWithBadge } from '../components'
import { CommonVariables } from '../utils/common.styles'
import { moderateScale } from '../styles/common.variables'
import * as React from 'react'
import ShoppingStack from './shopping.navigator'
import UserInfomationStack from './user.navigator'
import {
  HOME,
  SHOPPING,
  CART_TABBAR,
  ACCOUNT,
  HOME_FOCUS,
  SHOPPING_FOCUS,
  CART_TABBAR_FOCUS,
  ACCOUNT_FOCUS,
} from '../utils/icon'
import HomeStack from './homestack.navigator'
import CartStack from './cart.navigator'
const BottomTabbar = createAppContainer(
  createBottomTabNavigator(
    {
      Home: {
        screen: HomeStack,
        navigationOptions: ({ navigation }) => ({
          tabBarVisible: navigation.state.index === 0 ? true : false,
          title: 'Trang chủ',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <IconWithBadge
                focused={focused}
                icon={HOME}
                iconFocus={HOME_FOCUS}
                badgeCount={3}
                name="home"
              />
            )
          },
        }),
      },
      Shopping: {
        screen: ShoppingStack,
        navigationOptions: ({ navigation }) => ({
          tabBarVisible: navigation.state.index === 0 ? true : false,
          title: 'Mua sắm',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <IconWithBadge
                focused={focused}
                icon={SHOPPING}
                iconFocus={SHOPPING_FOCUS}
                badgeCount={3}
                name="shopping"
              />
            )
          },
        }),
      },
      Cart: {
        screen: CartStack,
        navigationOptions: ({ navigation, screenProps }) => ({
          tabBarVisible: navigation.state.index === 0 ? true : false,
          title: 'Giỏ hàng',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <IconWithBadge
                icon={CART_TABBAR}
                iconFocus={CART_TABBAR_FOCUS}
                badgeCount={0}
                focused={focused}
                name="cart"
              />
            )
          },
        }),
      },
      UserInfomation: {
        screen: UserInfomationStack,
        navigationOptions: ({ navigation }) => ({
          tabBarVisible: navigation.state.index === 0 ? true : false,
          title: 'Tài khoản',
          tabBarIcon: ({ focused, horizontal, tintColor }) => {
            return (
              <IconWithBadge
                icon={ACCOUNT}
                iconFocus={ACCOUNT_FOCUS}
                focused={focused}
                badgeCount={3}
                name="user"
              />
            )
          },
        }),
      },
    },
    {
      initialRouteName: 'Home',
      tabBarOptions: {
        activeTintColor: CommonVariables.buttonColor,
      },
      lazy: true,
    }
  )
)
export default BottomTabbar
