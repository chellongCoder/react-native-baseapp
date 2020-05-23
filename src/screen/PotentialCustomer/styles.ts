import { StyleSheet } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import { isAndroid } from './../../utils/common.util'
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
  itemContainer: {
    backgroundColor: '#FFFFFF',
    height: 0.08 * WIN_HEIGHT,
    width: 0.9 * WIN_WIDTH,
    borderColor: '#A7A7A7',
    borderBottomWidth: moderateScale(0.5),
    borderStyle: 'solid',
    alignSelf: 'center',
    flexDirection: 'row',
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
    //borderBottom: 0.8 * WIN_WIDTH,
  },
  iconView: {
    flex: 1.5,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  icon: {
    width: 0.04 * WIN_HEIGHT,
    height: 0.04 * WIN_HEIGHT,
    resizeMode: 'contain',
  },
  contentView: {
    flex: 8.5,
    justifyContent: 'center',
  },
  nameTxt: {
    color: '#4D4D4D',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: moderateScale(14),
  },
  rankTxt: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
})
export default styles
