import { moderateScale, RED_TEXT } from '../../styles/common.variables'
import { Dimensions, StyleSheet } from 'react-native'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F4F4F4',
    //justifyContent: 'center',
    alignItems: 'center',
  },
  titleTxt: {
    marginTop: moderateScale(200),
    marginBottom: moderateScale(20),
    color: '#565656',
  },
  image: {
    height: moderateScale(200),
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
    marginTop: moderateScale(10),
    marginBottom: moderateScale(10),
    backgroundColor: '#FFF',
    width: moderateScale(300),
    height: moderateScale(35),
    alignItems: 'center',
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.32,
    shadowRadius: 4.59,
  },
  textView: {
    flex: 10,
  },
  iconView: {
    marginLeft: moderateScale(5),
    marginRight: moderateScale(10),
    height: moderateScale(15),
    width: moderateScale(15),
    resizeMode: 'stretch',
  },
  btnLogin: {
    marginTop: moderateScale(40),
    marginBottom: moderateScale(10),
    backgroundColor: '#E55353',
    width: moderateScale(300),
    height: moderateScale(35),
    borderRadius: moderateScale(34),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginTxt: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  imageBottom: {
    marginBottom: moderateScale(0),
  },
})

export default styles
