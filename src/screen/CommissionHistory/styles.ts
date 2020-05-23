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
  sectionHeader: {
    backgroundColor: '#E5E5E5',
    height: 0.06 * WIN_HEIGHT,
    width: WIN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    paddingLeft: moderateScale(20),
    paddingBottom: 0.015 * WIN_HEIGHT,
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
    //borderBottom: 0.8 * WIN_WIDTH,
  },
  txtSection: {
    color: '#C6C6C6',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  leftItem: {
    flex: 1,
    // backgroundColor: 'red',
  },
  aboveLeftRow: {
    flex: 1,
    //justifyContent: 'flex-end',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  belowLeftRow: {
    flex: 1,
    //justifyContent: 'flex-start',
    //alignItems: 'center',
    flexDirection: 'row',
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentView: {
    flex: 4,
    justifyContent: 'flex-end',
  },
  rightItem: {
    flex: 1,
  },
  contentTxt: {
    color: '#565656',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: moderateScale(14),
  },
  dateView: {
    flex: 4,
  },
  dateTxt: {
    color: '#ACACAC',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  rightAboveRow: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  rightBelowRow: {
    flex: 1,
  },
  priceTxt: {
    color: '#565656',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: moderateScale(18),
    textAlign: 'right',
  },
  statusTxt: {
    color: '#3EB968',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: moderateScale(12),
    textAlign: 'right',
  },
})
export default styles
