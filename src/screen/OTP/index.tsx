import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import CommonButton from '../../components/CommonButton'
import { SafeAreaView } from 'react-navigation'
import Header from './Header'
import {
  moderateScale,
  WIN_WIDTH,
  WIN_HEIGHT,
} from '../../styles/common.variables'
import InputFields from './InputFields'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import CountDown from './CountDown'
import BackgroundDefault from '../../components/BackgroundDefault'
import { connect } from 'react-redux'
import {
  confirmCode,
  signInWithPhoneNumber,
  register,
  verify,
} from '../../stores/actions/auth.action'
import {
  alertInfo,
  alertInfoOption,
  formatNumberPhone,
} from '../../utils/common.util'
import { RootState } from '../../stores/reducers'
import { RNFirebase } from 'react-native-firebase'
import { IFormRegister } from '../../stores/object/me.object'
import { login } from '../Login/index'
import NavigationServices from '../../services/NavigationServices'
import SCREEN from '../../utils/screen.constant'

interface OTPProps {
  navigation: any;
  confirmCode: (code: string) => void;
  userAuthPhone: RNFirebase.auth.OrNull<RNFirebase.User>;
  formDataRegister: IFormRegister | null;
  register: (data: any) => void;
  signInWithPhoneNumber: (phone: string) => void;
  verify: (data: any) => void;
  login: (username: string, password: string) => void;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: moderateScale(10),
  },
  header: {
    height: CommonVariables.screenHeight / 4,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  field: {
    alignItems: 'center',
  },
  button: {
    // height: CommonVariables.screenHeight / 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  change: {
    color: CommonVariables.buttonColor,
    fontSize: moderateScale(15),
  },
  notify: {
    textAlign: 'center',
    marginHorizontal: moderateScale(30),
    marginTop: moderateScale(30),
    color: CommonVariables.whiteColor,
  },
  resend: {
    color: CommonVariables.buttonColor,
    fontFamily: 'OpenSans-SemiBold',
  },
  successRegister: {
    fontFamily: 'OpenSans-SemiBold',
    paddingVertical: moderateScale(10),
  },
  ok: {
    fontFamily: 'OpenSans-SemiBold',
    color: CommonVariables.buttonColor,
  },
})

class OTP extends Component<OTPProps> {
  refCountDown: any
  otp: string = ''
  numberPhone: string = '+84868177610'
  refButton: any

  setRefButton = (ref: any) => {
    this.refButton = ref
  }

  setRefCountDown = (ref: any) => {
    this.refCountDown = ref
  }
  changeOtp = (otp: string) => {
    this.otp = otp
  }

  onContinue = async () => {
    try {
      const {
        userAuthPhone,
        formDataRegister,
        register,
        confirmCode,
        verify,
        login,
      } = this.props
      if (!this.otp || this.otp.length < 6) {
        alertInfo('Bạn phải nhập đủ 6 kí tự')
        return
      }
      this.refButton.current.onAnimate()
      await confirmCode(this.otp)
      formDataRegister &&
        (await verify({
          phone: formDataRegister.phone,
        }))
      alertInfoOption(
        'Đăng ký thành công!',
        '',
        () => {
          formDataRegister &&
            login(formDataRegister.username, formDataRegister.password)
        },
        false
      )
      this.refButton.current.endAnimated()
    } catch (error) {
      console.log('====================================')
      console.log(error)
      alertInfoOption(error.message, '', () => {
        NavigationServices.resetStack(SCREEN.AUTH.LOGIN)
      })
      this.refButton.current.endAnimated()
      console.log('====================================')
    }
  }

  toggleModal = (bool: boolean) => {}

  endCountDown = () => {
    const { signInWithPhoneNumber, formDataRegister } = this.props
    formDataRegister &&
      signInWithPhoneNumber(formatNumberPhone(formDataRegister.phone))
  }

  componentWillUnmount() {
    this.refCountDown.current.clearCountDown()
  }

  render() {
    const {
      userAuthPhone,
      formDataRegister,
      register,
      confirmCode,
    } = this.props
    return (
      <View style={{ flex: 1 }}>
        <BackgroundDefault />
        <KeyboardAwareScrollView>
          <SafeAreaView style={styles.container}>
            <View style={styles.header}>
              <Header />
            </View>
            <View style={styles.field}>
              <View>
                <Text style={styles.notify}>
                  Mã xác nhận đã được gửi về số điện thoại{' '}
                  <Text style={{ fontWeight: 'bold' }}>
                    {formDataRegister?.phone}
                  </Text>{' '}
                  của bạn. Vui lòng nhập mã xác nhận để hoàn tất đăng ký tài
                  khoản.
                </Text>
              </View>
              <InputFields
                onContinue={this.onContinue}
                changeOtp={this.changeOtp}
              />
              <CommonButton
                onPress={this.onContinue}
                text={'Xác nhận'.toUpperCase()}
                isAnimated={true}
                width={WIN_WIDTH - 70}
                styleProps={{
                  backgroundColor: CommonVariables.whiteColor,
                }}
                textStyle={{
                  color: '#E55353',
                }}
                setRefButton={this.setRefButton}
              />
            </View>

            <View style={styles.button}>
              <Text
                style={{
                  fontFamily: 'OpenSans-SemiBold',
                  color: CommonVariables.whiteColor,
                }}
              >
                {`Chưa nhận được mã? `}
                <CountDown
                  setRef={this.setRefCountDown}
                  endCountDown={this.endCountDown}
                />
              </Text>
            </View>
          </SafeAreaView>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    userAuthPhone: state.auth.userAuthPhone,
    formDataRegister: state.auth.formDataRegister,
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  confirmCode: async (phone: string) => await dispatch(confirmCode(phone)),
  signInWithPhoneNumber: (phone: string) =>
    dispatch(signInWithPhoneNumber(phone)),
  verify: async (data: any) => await dispatch(verify(data)),
  login: (username: string, password: string) =>
    dispatch(login(username, password)),
})
export default connect(mapStateToProps, mapDispatchToProps)(OTP)
