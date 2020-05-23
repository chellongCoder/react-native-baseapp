import React, { Component } from 'react'

import { createSwitchNavigator, createAppContainer } from 'react-navigation'
import Splash from '../screen/Splash'
import AppDrawer from './drawer.navigator'
import UserInfomationStack from './user.navigator'
import ShoppingStack from './shopping.navigator'
import Test from '../Test'
import SCREEN from '../utils/screen.constant'
import AuthStack from './authstack.navigator'

const AppNavigatorSwitch = createSwitchNavigator(
  {
    Test,
    Splash,
    AuthStack,
    AppDrawer,
    UserInfomationStack,
    ShoppingStack,
  },
  {
    initialRouteName: 'Splash',
  }
)

const AppNavigator = createAppContainer(AppNavigatorSwitch)
export default AppNavigator
