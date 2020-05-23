import React, { Component } from 'react'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Cart from '../screen/Cart'
import Home from '../screen/Home'
import DetailWallet from '../screen/DetailWallet'
import Order from '../screen/Order'
import Member from '../screen/Member'
import OrderDetail from '../screen/OrderDetail'
import { handleCustomTransition } from '../utils/common.util'
import Checkout from '../screen/Checkout'
import Notification from '../screen/Notification'
import Voucher from '../screen/Voucher'
import Search from '../screen/Search'
import DeliveryAddress from '../screen/DeliveryAddress'
import DeliveryOption from '../screen/DeliveryOption'
import DetailProduct from '../screen/DetailProduct'
import WithDrawalHistory from '../screen/WithdrawalHistory'
import CommissionHistory from '../screen/CommissionHistory'

const HomeStack = createAppContainer(
  createStackNavigator(
    {
      Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
          title: 'Home',
          header: null,
          headerShown: false,
        }),
      },
      DetailWallet: {
        screen: DetailWallet,
        navigationOptions: ({ navigation }) => ({
          title: 'DetailWallet',
          header: null,
        }),
      },
      Order: {
        screen: Order,
        navigationOptions: ({ navigation }) => ({
          title: 'Order',
          header: null,
        }),
      },
      Member: {
        screen: Member,
        navigationOptions: ({ navigation }) => ({
          title: 'Member',
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
      OrderDetail: {
        screen: OrderDetail,
        navigationOptions: ({ navigation }) => ({
          title: 'OrderDetail',
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
      Voucher: {
        screen: Voucher,
        navigationOptions: ({ navigation }) => ({
          title: 'Voucher',
          header: null,
        }),
      },
      Search: {
        screen: Search,
        navigationOptions: ({ navigation }) => ({
          title: 'Voucher',
          header: null,
        }),
      },
      WithDrawalHistory: {
        screen: WithDrawalHistory,
        navigationOptions: ({ navigation }) => ({
          title: 'Lịch sử rút tiền',
          header: null,
        }),
      },
      CommissionHistory: {
        screen: CommissionHistory,
        navigationOptions: ({ navigation }) => ({
          title: 'Lịch sử nhận hoa hồng',
          header: null,
        }),
      },
    },
    {
      initialRouteName: 'Home',
      transitionConfig: nav => handleCustomTransition(nav),
      navigationOptions: {
        header: null,
      },
      mode: 'modal',
      headerMode: 'float',
    }
  )
)
export default HomeStack
