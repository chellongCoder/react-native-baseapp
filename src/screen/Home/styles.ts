import { StyleSheet } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import { isAndroid } from './../../utils/common.util'
import { isIphoneX } from 'react-native-iphone-x-helper'
const HEADER_EXPANDED_HEIGHT = WIN_HEIGHT / 9 + moderateScale(40)
const HEADER_COLLAPSED_HEIGHT = WIN_HEIGHT / 15
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonVariables.whiteColor,
  },
  cover: {
    width: WIN_WIDTH,
    height: HEADER_COLLAPSED_HEIGHT,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    height: isIphoneX()
      ? WIN_HEIGHT / 16
      : isAndroid()
      ? WIN_HEIGHT / 9
      : WIN_HEIGHT / 12,
  },
  inputSearch: {
    // flex: 7 / 10,
    flexDirection: 'row',
    backgroundColor: CommonVariables.whiteColor,
    borderRadius: moderateScale(15),
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
    height: moderateScale(30),
  },
  iconHome: {
    width: WIN_WIDTH / 10,
    height: WIN_WIDTH / 10,
    marginRight: moderateScale(10),
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    right: moderateScale(15),
    top: moderateScale(-5),
  },
})

export default styles
