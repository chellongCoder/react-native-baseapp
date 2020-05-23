import { createDrawerNavigator } from '@react-navigation/drawer'
import Demo from '../screen/Demo'
import * as React from 'react'
import BottomTabbar from './bottomtab.navigator'
import { NavigationContainer } from '@react-navigation/native'
// import Drawer from 'react-native-drawer'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import DrawerComponent from '../components/DrawerComponent'
import PotentialCustomer from '../screen/PotentialCustomer'
import AgencyBenefit from '../screen/AgencyBenefit'
import VideoList from '../screen/VideoList'
import NavigationServices from '../services/NavigationServices'
import Order from '../screen/Order'
import Animated from 'react-native-reanimated'
import CommonStyles from '../utils/common.styles'
import DrawerScreen from '../components/DrawerScreen'
const Drawer = createDrawerNavigator()

const AppDrawer = () => {
  const [progress, setProgress] = React.useState(new Animated.Value(0))

  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  })
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  })
  const animatedStyle = { borderRadius, transform: [{ scale }] }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props: any) => {
          setProgress(props.progress)
          return <DrawerComponent {...props} />
        }}
        sceneContainerStyle={{
          backgroundColor: '#FFFFFF',
        }}
        drawerStyle={{ width: '65%' }}
        drawerType="slide"
        drawerPosition="right"
      >
        <Drawer.Screen
          name="Bottom"
          component={() => (
            <DrawerScreen animatedStyle={animatedStyle}>
              <BottomTabbar
                ref={navigatorRef => {
                  NavigationServices.setTopLevelNavigator(navigatorRef)
                }}
                screenProps={{ cartNumber: 0 }}
              />
            </DrawerScreen>
          )}
        />
        <Drawer.Screen
          name="AgencyBenefit"
          component={(props: any) => {
            return (
              <DrawerScreen animatedStyle={animatedStyle}>
                <AgencyBenefit {...props} />
              </DrawerScreen>
            )
          }}
        />
        <Drawer.Screen
          name="PotentialCustomer"
          component={(props: any) => {
            return (
              <DrawerScreen animatedStyle={animatedStyle}>
                <PotentialCustomer {...props} />
              </DrawerScreen>
            )
          }}
        />
        <Drawer.Screen
          name="Order"
          component={(props: any) => {
            return (
              <DrawerScreen animatedStyle={animatedStyle}>
                <Order {...props} />
              </DrawerScreen>
            )
          }}
        />
        <Drawer.Screen
          name="VideoList"
          component={(props: any) => {
            return (
              <DrawerScreen animatedStyle={animatedStyle}>
                <VideoList {...props} />
              </DrawerScreen>
            )
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default AppDrawer
