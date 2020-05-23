import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import styles from './styles'

import I18n from 'i18n-js'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  USER_ICON,
  PASS_ICON,
  EYE,
  AUTHBACKGROUND,
  LOGOICON,
  PHONE_ICON,
  EMAIL,
} from '../../utils/image'
import NavigationServices from '../../services/NavigationServices'
import {
  signInWithPhoneNumber,
  saveFormRegister,
  register,
} from '../../stores/actions/auth.action'
import { alertInfo } from '../../utils/common.util'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'

interface IProps {
  i18n: any;
  signInWithPhoneNumber: (phone: string) => void;
  saveFormRegister: (data: any) => void;
  register: (data: any) => void;
  errorRegister: any;
}
class Register extends Component<IProps> {
  // numberPhone: string = '+84962418543'
  numberPhone: string = '+84868177610'
  constructor(props: IProps) {
    super(props)
    this.state = {
      username: '',
      password: '',
      passwordConfirm: '',
      phone: '',
      showPass: false,
      showPassCfn: false,
      activeCode: '',
    }
  }
  onNavigateLogin = () => {
    NavigationServices.goBack()
  }
  onRegister = async () => {
    try {
      const { signInWithPhoneNumber, saveFormRegister, register } = this.props

      const data: any = {
        username: this.state.username,
        password: this.state.password,
        phone: this.state.phone,
        parent_aff_id: this.state.activeCode,
        // name: this.state.username
      }

      console.log('====================================')
      console.log('state', data)
      console.log('====================================')
      if (this.state.password !== this.state.passwordConfirm) {
        alertInfo('Mật khẩu xác nhận không khớp.')
        return
      }
      saveFormRegister(data)
      register(data)
    } catch (error) {
      console.log('====================================')
      console.log(error.message)
      console.log('====================================')
    }
    // signInWithPhoneNumber(this.numberPhone)
    // NavigationServices.navigate('OTP')
  }
  render() {
    const { errorRegister } = this.props
    return (
      <View style={styles.container}>
        <ImageBackground source={AUTHBACKGROUND} style={styles.image}>
          <View style={styles.logoView}>
            <Image source={LOGOICON} style={styles.logo} />
          </View>
          <KeyboardAwareScrollView>
            <View style={styles.infoView}>
              <View style={styles.inputView}>
                <View style={styles.iconView}>
                  <Image style={styles.icon} source={USER_ICON} />
                </View>
                <View style={styles.textView}>
                  <TextInput
                    style={styles.txtInput}
                    placeholder={I18n.t(['auth', 'username'])}
                    value={this.state.username}
                    onChangeText={value => this.setState({ username: value })}
                  />
                </View>
              </View>
              {errorRegister && errorRegister.username ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{errorRegister.username}</Text>
                </View>
              ) : null}
              <View style={styles.inputView}>
                <View style={styles.iconView}>
                  <Image style={styles.icon} source={PHONE_ICON} />
                </View>
                <View style={styles.textView}>
                  <TextInput
                    style={styles.txtInput}
                    placeholder={I18n.t(['auth', 'phoneNumber'])}
                    value={this.state.phone}
                    onChangeText={value => this.setState({ phone: value })}
                  />
                </View>
              </View>
              {errorRegister && errorRegister.phone ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{errorRegister.phone}</Text>
                </View>
              ) : null}
              <View style={[styles.inputView, { marginBottom: 5 }]}>
                <View style={styles.iconView}>
                  <Image style={styles.icon} source={PASS_ICON} />
                </View>
                <View style={styles.textView}>
                  <TextInput
                    secureTextEntry={!this.state.showPass}
                    style={styles.txtInput}
                    value={this.state.password}
                    onChangeText={value => this.setState({ password: value })}
                    placeholder={I18n.t(['auth', 'password'])}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ showPass: !this.state.showPass })
                  }
                  style={styles.iconView}
                >
                  <Image style={styles.icon} source={EYE} />
                </TouchableOpacity>
              </View>
              {errorRegister && errorRegister.password ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>{errorRegister.password}</Text>
                </View>
              ) : null}
              <View style={[styles.inputView, { marginBottom: 5 }]}>
                <View style={styles.iconView}>
                  <Image style={styles.icon} source={PASS_ICON} />
                </View>
                <View style={styles.textView}>
                  <TextInput
                    secureTextEntry={!this.state.showPassCfn}
                    style={styles.txtInput}
                    value={this.state.passwordConfirm}
                    onChangeText={value =>
                      this.setState({ passwordConfirm: value })
                    }
                    placeholder={I18n.t(['auth', 'confirmPassword'])}
                  />
                </View>
                <TouchableOpacity
                  onPress={() =>
                    this.setState({ showPassCfn: !this.state.showPassCfn })
                  }
                  style={styles.iconView}
                >
                  <Image style={styles.icon} source={EYE} />
                </TouchableOpacity>
              </View>
              <View style={styles.inputView}>
                <View style={styles.iconView}>
                  <Image style={styles.icon} source={EMAIL} />
                </View>
                <View style={styles.textView}>
                  <TextInput
                    style={styles.txtInput}
                    placeholder={I18n.t(['auth', 'suggestCode'])}
                    value={this.state.activeCode}
                    onChangeText={value => this.setState({ activeCode: value })}
                  />
                </View>
              </View>
              {errorRegister && errorRegister.parent_aff_id ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.error}>
                    {errorRegister.parent_aff_id}
                  </Text>
                </View>
              ) : null}
              <View style={styles.btnLogin}>
                <TouchableOpacity onPress={this.onRegister}>
                  <Text style={styles.loginTxt}>
                    {I18n.t(['auth', 'register'])}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.regisView}>
                <Text style={styles.regisTxt}>
                  {I18n.t(['auth', 'hadAccout'])}
                </Text>
                <TouchableOpacity onPress={this.onNavigateLogin}>
                  <Text
                    style={[
                      styles.regisTxt,
                      { paddingLeft: 5, fontWeight: 'bold' },
                    ]}
                  >
                    {I18n.t(['auth', 'login'])}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAwareScrollView>
        </ImageBackground>
      </View>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    errorRegister: state.auth.errorRegister,
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  signInWithPhoneNumber: (phone: string) =>
    dispatch(signInWithPhoneNumber(phone)),
  saveFormRegister: (data: any) => dispatch(saveFormRegister(data)),
  register: (data: any) => dispatch(register(data)),
})
export default connect(mapStateToProps, mapDispatchToProps)(Register)
