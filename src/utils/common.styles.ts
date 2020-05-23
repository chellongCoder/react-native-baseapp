import { moderateScale, RED_TEXT, WIN_HEIGHT } from '../styles/common.variables'
import { Dimensions, StyleSheet } from 'react-native'
export const HEADER_EXPANDED_HEIGHT = WIN_HEIGHT / 9 + moderateScale(40)
export const HEADER_COLLAPSED_HEIGHT = WIN_HEIGHT / 12
export const BLACK = 0
export const RED = 1
export const CommonVariables = {
  borderColor: '#263C61',
  buttonColor: '#9a000d',
  grayColor: '#707070',
  whiteColor: '#FFFFFF',
  screenWidth: Dimensions.get('window').width,
  screenHeight: Dimensions.get('window').height,
  borderGrayColor: '#E2E8ED',
  facebookColor: '#405C9D',
  redColor: '#FF0000',
  fonts: {
    OPENSANS_BOLD: 'OpenSans-Bold',
    OPENSANS_BOLDITALIC: 'OpenSans-BoldItalic',
    OPENSANS_ITALIC: 'OpenSans-Italic',
    OPENSANS_LIGHT: 'OpenSans-Light',
    OPENSANS_REGULAR: 'OpenSans-Regular',
    OPENSANS_SEMIBOLD: 'OpenSans-SemiBold',
  },
  OPACITY_SHOW: 1,
  OPACITY_HIDE: 0,
  DURATION: 200,
}

const CommonStyles = StyleSheet.create({
  iconSize: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
  },
  iconSizeSmall: {
    width: moderateScale(10),
    height: moderateScale(10),
    resizeMode: 'contain',
  },
  iconSmallSmall: {
    width: moderateScale(5),
    height: moderateScale(5),
    resizeMode: 'contain',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  imageCover: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  headerTitle: {
    width: '100%',
    height: moderateScale(40),
    alignSelf: 'center',
  },
  headerStyle: {
    elevation: 0,
    borderBottomWidth: 0,
    height: moderateScale(80),
  },
  boldText: {
    fontWeight: 'bold',
  },
  redText: {
    color: CommonVariables.buttonColor,
  },
  titleText: {
    fontSize: moderateScale(20),
  },
  backgroundDrawer: {
    flex: 1,
    shadowColor: '#000000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
})

export default CommonStyles
