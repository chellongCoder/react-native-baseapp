import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import CommonStyles from '../../utils/common.styles'
interface IProps {
  children: any;
  animatedStyle: any;
}
export default ({ children, animatedStyle }: IProps) => {
  return (
    <Animated.View
      style={[styles.container, CommonStyles.backgroundDrawer, animatedStyle]}
    >
      {children}
    </Animated.View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
