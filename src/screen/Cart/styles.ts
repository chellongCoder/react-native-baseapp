import { StyleSheet } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import { isAndroid } from './../../utils/common.util'
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper'
import RowLoader from '../../components/ContentLoader/row_loader'

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
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: WIN_WIDTH,
  },
  imgView: {
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'red',
    // width: moderateScale(80),
    // height: moderateScale(80),
  },
  img: {
    width: moderateScale(80),
    height: moderateScale(80),
    backgroundColor: '#F4F4F4',
    resizeMode: 'contain',
    borderRadius: moderateScale(40),
  },
  emptyTxt: {
    marginTop: moderateScale(15),
    //  height: moderateScale(35),
    // width: WIN_WIDTH,
    // textAlign: 'center',
    color: '#565656',
    fontSize: moderateScale(12),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  itemView: {
    height: 0.15 * WIN_HEIGHT,
    width: WIN_WIDTH,
    flexDirection: 'row',
    backgroundColor: '#F9F9F9',
    borderWidth: 0.5,
    //borderStyle: 'solid',
    //borderBottomColor: '#CFCFCF',
    borderColor: '#CFCFCF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgProduct: {
    //marginLeft: moderateScale(15),
    height: '80%',
    width: '80%',
  },
  infoView: {
    flex: 3,
    // height: 0.25 * WIN_WIDTH,
    // width: 0.7 * WIN_WIDTH,
    flexDirection: 'column',
  },
  nameView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: moderateScale(10),
  },
  quantityView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: moderateScale(15),
    // backgroundColor: 'blue',
  },
  nameAndPrice: {
    flex: 4,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  trashView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  nameTxt: {
    color: '#565656',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    textTransform: 'uppercase',
    fontSize: moderateScale(14),
    paddingLeft: moderateScale(15),
  },
  priceTxt: {
    color: '#E65353',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    fontSize: 14,
    paddingLeft: moderateScale(15),
    paddingBottom: moderateScale(5),
    letterSpacing: 0.5,
  },
  footer: {
    height: 0.2 * WIN_HEIGHT,
    width: WIN_WIDTH,
    position: 'relative',
    marginBottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 20,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 3,
    backgroundColor: '#FFFFFF',
    // borderTopWidth: moderateScale(0.25),
    // borderTopColor: '#000000',
    // borderStyle: 'solid',
  },
  infoCart: {
    flex: 1,
    flexDirection: 'row',
  },
  totalView: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: moderateScale(20),
  },
  totalPriceView: {
    flex: 1,
    justifyContent: 'center',

    //alignItems: 'flex-end',
    //  flexDirection: 'row',
  },
  totalTxt: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 14,
  },
  totalPriceTxt: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'right',
    paddingRight: moderateScale(30),
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
  btnAdd: {
    backgroundColor: '#FFF',
    width: moderateScale(300),
    height: moderateScale(35),
    borderRadius: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'red',
    borderWidth: 0.5,
  },
  txtPurcharseBtn: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
})

export default styles
