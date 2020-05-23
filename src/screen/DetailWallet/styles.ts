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
  },
  cover: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT / 9,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
    height: isIphoneX()
      ? WIN_HEIGHT / 16
      : isAndroid()
      ? WIN_HEIGHT / 9
      : WIN_HEIGHT / 12,
  },
  backBtn: {
    flex: 1 / 10,
  },
  txtTitle: {
    flex: 6 / 10,
    color: CommonVariables.whiteColor,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  balanceWalletView: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingLeft: moderateScale(5),
    alignItems: 'center',
    height: isIphoneX()
      ? WIN_HEIGHT / 14
      : isAndroid()
      ? WIN_HEIGHT / 10
      : WIN_HEIGHT / 10,
  },
  walletTxt: {
    flex: 4 / 10,
    color: CommonVariables.redColor,
    paddingLeft: moderateScale(15),
  },
  currBaltxt: {
    flex: 5 / 10,
    color: CommonVariables.redColor,
    textAlign: 'right',
    paddingRight: 10,
    fontWeight: 'bold',
    fontSize: moderateScale(20),
  },
  mainView: {
    flex: 1,
    backgroundColor: '#F4F4F4',
    justifyContent: 'space-between',
  },
  imgView: {
    backgroundColor: '#F4F4F4', // #CFCFCF
    height: isIphoneX()
      ? 0.5 * WIN_HEIGHT
      : isAndroid()
      ? 0.35 * WIN_HEIGHT
      : 0.35 * WIN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    height: isIphoneX()
      ? WIN_HEIGHT / 4
      : isAndroid()
      ? WIN_HEIGHT / 5
      : WIN_HEIGHT / 5,
    width: 0.8 * WIN_WIDTH,
    resizeMode: 'contain',
  },
  historyView: {
    flexDirection: 'row',
    paddingLeft: moderateScale(5),
    alignItems: 'center',
    height: isIphoneX()
      ? WIN_HEIGHT / 14
      : isAndroid()
      ? WIN_HEIGHT / 8
      : WIN_HEIGHT / 10,
    backgroundColor: CommonVariables.whiteColor,
  },
  detailBtn: {
    width: WIN_HEIGHT / 6,
    marginRight: moderateScale(30),
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 7.36,
    borderColor: '#E65353',
  },
  btnTxt: {
    color: '#E55353',
    fontWeight: 'bold',
    fontSize: 12,
  },
  footer: {
    backgroundColor: '#FFF',
    marginTop: moderateScale(10),
    width: WIN_WIDTH,
    height: WIN_HEIGHT / 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  drwalBtn: {
    width: 0.8 * WIN_WIDTH,
    backgroundColor: '#E55353',
    borderRadius: 34,
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'center',
  },
  drwalTxt: {
    color: CommonVariables.whiteColor,
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
})

export default styles
