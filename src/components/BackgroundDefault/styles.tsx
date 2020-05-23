import { StyleSheet } from 'react-native'
import { WIN_HEIGHT, WIN_WIDTH } from '../../styles/common.variables'

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
  },
  topImage: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomImage: {
    position: 'absolute',
    bottom: 0,
  },
})

export default styles
