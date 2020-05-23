import { StyleSheet } from 'react-native'
import CommonStyles, { CommonVariables } from '../utils/common.styles'
import { moderateScale } from '../styles/common.variables'

const styles = StyleSheet.create({
  labelBottom: {
    fontSize: 11,
  },
  labelHome: {
    position: 'absolute',
    marginTop: moderateScale(45),
    alignSelf: 'center',
    fontSize: 14,
  },
  itemTab: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'flex-end',
    // marginTop: 10
  },
  iconHome: {
    width: moderateScale(43.5),
    height: moderateScale(43.5),
    backgroundColor: CommonVariables.buttonColor,
    borderRadius: moderateScale(43.5) / 2,
    shadowColor: CommonVariables.buttonColor,
    shadowOffset: {
      width: 1,
      height: -1,
    },
    elevation: 5,
    borderWidth: 1,
    borderColor: CommonVariables.whiteColor,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    marginBottom: moderateScale(40),
  },
})

export default styles
