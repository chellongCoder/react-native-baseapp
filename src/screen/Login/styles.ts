import { moderateScale, RED_TEXT } from '../../styles/common.variables'
import { Dimensions, StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  logoView: {
    flex: 1,
  },
  infoView: {
    flex: 2,
    alignItems: 'center',
    paddingTop: moderateScale(60),
  },
  inputView: {
    marginTop: moderateScale(5),
    marginBottom: moderateScale(5),
    backgroundColor: '#FFF',
    width: moderateScale(300),
    height: moderateScale(35),
    justifyContent: 'center',
    // alignItems: 'center',
    borderRadius: 6,
    flexDirection: 'row',
  },
  placeHolderSytle: {
    color: '#C2C2C2',
    textAlignVertical: 'center',
  },
  textView: {
    flex: 9,
    justifyContent: 'center',
    // alignItems: 'center',
  },
  txtInput: {
    textAlignVertical: 'center',
  },
  icon: {
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'contain',
  },
  iconView: {
    // marginTop: moderateScale(10),
    // marginLeft: moderateScale(5),
    // marginRight: moderateScale(10),
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotText: {
    color: '#FFF',
    marginRight: moderateScale(40),
  },
  forgotView: {
    marginTop: moderateScale(10),
    paddingRight: moderateScale(20),
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  btnLogin: {
    marginTop: moderateScale(40),
    marginBottom: moderateScale(10),
    backgroundColor: '#FFF',
    width: moderateScale(300),
    height: moderateScale(35),
    borderRadius: 34,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTxt: {
    color: '#E55353',
    fontWeight: 'bold',
  },
  regisView: {
    marginTop: moderateScale(50),
    flexDirection: 'row',
  },
  regisTxt: {
    color: '#FFF',
  },
})

export default styles
