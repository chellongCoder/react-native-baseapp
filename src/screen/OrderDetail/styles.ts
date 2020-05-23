import { StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F4F4',
  },
  pnlIdOrder: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: CommonVariables.whiteColor,
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  lblIdOrder: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  txtIdOrder: {
    color: '#3EB968',
    fontSize: moderateScale(15),
  },
  txtCreateAt: {
    color: '#B6B6B6',
    fontSize: moderateScale(15),
  },
  lblCreateAt: {
    color: '#B6B6B6',
    fontFamily: CommonVariables.fonts.OPENSANS_LIGHT,
  },
  pnlRight: {
    alignItems: 'flex-end',
  },
  fraUser: {
    padding: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: CommonVariables.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  pnlUser: {
    flexDirection: 'row',
  },
  pnlInfoUser: {
    paddingLeft: moderateScale(10),
    flex: 1,
    alignItems: 'flex-start',
  },
  lblBuyingUser: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  txtBuyingUser: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_LIGHT,
  },
})

export default styles
