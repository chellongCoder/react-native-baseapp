import { StyleSheet, PixelRatio } from 'react-native'
import { WIN_WIDTH, moderateScale } from '../styles/common.variables'
import CommonStyles from '../utils/common.styles'

const styles = StyleSheet.create({
  item: {
    height: moderateScale(100),
    width: WIN_WIDTH / 7 + 2,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flex: 4 / 10,
    justifyContent: 'flex-start',
  },
  textContent: {
    fontSize: 10,
    textAlign: 'center',
  },
  image: {
    width: moderateScale(34),
    height: moderateScale(34),
    backgroundColor: '#eeeeee',
    borderRadius: 3,
    padding: 5,
  },
  badge: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
    top: 35,
    right: 0,
    zIndex: 999,
  },
})

export default styles
