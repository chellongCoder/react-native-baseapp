import { StyleSheet } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import { isAndroid } from './../../utils/common.util'
import { isIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  cover: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT / 9,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    flex: 1,
  },
  header: {
    width: (WIN_WIDTH * 7) / 10,
    flexDirection: 'row',
    backgroundColor: CommonVariables.whiteColor,
    borderRadius: moderateScale(15),
    alignItems: 'center',
    paddingHorizontal: moderateScale(5),
    height: moderateScale(30),
  },
  filter: {
    backgroundColor: CommonVariables.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    zIndex: 999,
  },
  list: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: WIN_WIDTH,
    justifyContent: 'center',
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(50),
  },
  empty: {
    color: '#8E8E8E',
  },
  badge: {
    position: 'absolute',
    top: moderateScale(-5),
  },
})

export default styles
