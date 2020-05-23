import { StyleSheet } from 'react-native'
import { moderateScale, WIN_HEIGHT } from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cover: {
    width: '100%',
    height: WIN_HEIGHT / 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    left: 0,
  },
  userInfo: {
    position: 'absolute',
    top: moderateScale(WIN_HEIGHT / 5 / 2 - moderateScale(40)),
    alignItems: 'center',
    left: moderateScale(10),
  },
  avatar: {
    width: moderateScale(68),
    height: moderateScale(68),
    borderRadius: moderateScale(34),
  },
  name: {
    fontFamily: 'OpenSans-Bold',
    fontSize: moderateScale(18),
    color: CommonVariables.whiteColor,
    marginTop: moderateScale(5),
  },
})

export default styles
