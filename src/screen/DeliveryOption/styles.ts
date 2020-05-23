import { StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
import {
  moderateScale,
  WIN_WIDTH,
  WIN_HEIGHT,
} from '../../styles/common.variables'

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    flex: 1,
  },
  cover: {
    width: (WIN_WIDTH * 2) / 3,
    height: WIN_HEIGHT / 3,
    alignSelf: 'center',
  },
  title: {
    alignItems: 'center',
    paddingBottom: moderateScale(10),
  },
  txtTitle: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: '#707070',
  },
})

export default styles
