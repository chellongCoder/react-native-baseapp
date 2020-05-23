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
  overView: {
    height: 0.4 * WIN_HEIGHT,
    // backgroundColor: 'yellow',
  },
  footer: {
    height: 0.1 * WIN_HEIGHT,
    width: WIN_WIDTH,
    //position: 'absolute',
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 10,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    zIndex: 99,
    //marginTop: WIN_HEIGHT - 0.1 * WIN_HEIGHT,
  },
  btnPurchaseView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPurchase: {
    backgroundColor: '#E55353',
    width: moderateScale(300),
    height: moderateScale(35),
    borderRadius: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtPurcharseBtn: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
})

export default styles
