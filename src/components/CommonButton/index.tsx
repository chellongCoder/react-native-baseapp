import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E55353',
    height: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(20),
    borderColor: '#E55353',
    borderWidth: 0.5,
    
  },
  textButton: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: CommonVariables.whiteColor
  }
})
interface ICommonButton {
  text: string
  onPress: () => void
  isAnimated?: boolean
  isActive?: boolean
  styleProps?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
  width?: number
  setRefButton?: (ref: any) => void
}
export default ({
  text,
  onPress,
  isAnimated,
  isActive,
  styleProps,
  textStyle,
  width,
  setRefButton,
}: ICommonButton) => {
  const [animatedButtonWidth, setAnimatedButtonWidth] = useState(
    width
      ? new Animated.Value(width)
      : new Animated.Value(CommonVariables.screenWidth - 20)
  )
  const [isLoading, setIsLoading] = useState(false)
  const opacity = new Animated.Value(1)

  const onAnimate = async () => {
    console.log('onPress', onPress)
    if (isAnimated) {
      Animated.timing(animatedButtonWidth, {
        toValue: moderateScale(30),
        duration: 250,
      }).start()
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          setIsLoading(true)
          resolve()
        }, 240)
      })
    }
  }
  const endAnimated = async () => {
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        setIsLoading(false)
        Animated.timing(animatedButtonWidth, {
          toValue: width ? width : CommonVariables.screenWidth - 20,
          duration: 250,
        }).start()
        resolve()
      }, 1000)
    })
  }
  const ref = useRef({ onAnimate, endAnimated })
  useEffect(() => {
    console.log('effect')
    setRefButton && setRefButton(ref)
    if (isActive) {
      onAnimate()
    }
  }, [isActive])
  return (
    <TouchableOpacity
      style={{
        alignItems: 'center',
      }}
      onPress={onPress}
    >
      <Animated.View
        style={[styles.container, styleProps, { width: animatedButtonWidth }]}
      >
        {!isLoading ? (
          <Animated.Text
            style={[styles.textButton, textStyle, { opacity: opacity }]}
          >
            {text}
          </Animated.Text>
        ) : (
          <ActivityIndicator />
        )}
      </Animated.View>
    </TouchableOpacity>
  )
}
