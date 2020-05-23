import { Dimensions, Platform } from 'react-native'
import { isIphoneX } from 'react-native-iphone-x-helper'

export const WIN_WIDTH = Dimensions.get('window').width,
  WIN_HEIGHT = Dimensions.get('window').height
export const heightHeader =
  Platform.OS === 'android' ? 56 : isIphoneX() ? 88 : 64
export const [shortDimension, longDimension] =
  WIN_WIDTH < WIN_HEIGHT ? [WIN_WIDTH, WIN_HEIGHT] : [WIN_HEIGHT, WIN_WIDTH]
export const PLATFORM = {
  ANDROID: 'ANDROID',
  IOS: 'IOS',
}
export const guidelineBaseWidth = 350
export const guidelineBaseHeight = 680

export const scale = size => (shortDimension / guidelineBaseWidth) * size
export const verticalScale = size =>
  (longDimension / guidelineBaseHeight) * size
export const moderateScale = (size, factor = 0.5) =>
  size + (scale(size) - size) * factor

//color
export const PINK = 'rgb(252,148,154)'
export const GRAY_BACKGROUND = 'rgb(249,249,249)'
export const GRAY_TEXT = '#7F7F7F'
export const GRAY_BORDER = '#E2E2E2'
export const GRAY_BACKGROUND_NOTE = '#F2F2F2'
export const RED_TEXT = '#9a000d'
export const SUNSHINE_YELLOW = '#ffeb3b'
