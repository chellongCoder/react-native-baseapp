import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ImageBackground,
  TextInput,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native'
import styles from './styles'

import I18n from 'i18n-js'
import { RootState, GetState } from '../../stores/reducers'
import { connect } from 'react-redux'
import { USER_ICON, PASS_ICON, EYE, LOGIN_BACKGROUND } from '../../utils/image'
import NavigationServices from '../../services/NavigationServices'
import { loginError, loginSuccess } from '../../stores/actions/auth.action'
import APIService from '../../services/api'
import { isLoading } from '../../stores/actions/ui.action'
import { postUserDevice } from '../../stores/actions/system.action'
export const login = (username: string, password: string) => {
  return async (dispatch: Function, getState: GetState) => {
    try {
      dispatch(isLoading(true))
      const [err, res] = await APIService.auth.login(username, password)
      dispatch(isLoading(false))
      if (err) {
        //  console.log('loi nay', err)
        dispatch(loginError())
        if (err.username && err.username[0]) Alert.alert(err.username[0])
      } else {
        dispatch(loginSuccess(res.data))
        dispatch(
          postUserDevice(getState().system.fcmToken, getState().system.deviceId)
        )
        NavigationServices.navigate('AppDrawer')
      }
    } catch (err) {
      dispatch(loginError())
      console.log('====================================')
      console.log('loginErr', err)
      console.log('====================================')
    }
  }
}

interface IProps {
  i18n: any;
  login: Function;
  loginError: boolean;
}
class Login extends Component<IProps> {
  constructor(props) {
    super(props)
    this.state = {
      showPass: false,
      username: '',
      password: '',
      // isError: false,
    }
  }
  onRegister = () => {
    NavigationServices.navigate('Register')
  }
  onNavigateForgotPassword = () => {
    NavigationServices.navigate('ForgotPassword')
  }
  onLogin = () => {
    const { login } = this.props
    if (this.state.username != '' && this.state.password != '') {
      login(this.state.username, this.state.password)
    } else {
      //const xyz =
      Alert.alert(I18n.t(['auth', 'fillInfo']))
    }
    //NavigationServices.navigate('AppDrawer')
  }
  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={LOGIN_BACKGROUND} style={styles.image}>
          <View style={styles.logoView}></View>
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
            <View style={styles.forgotView}>
              <TouchableOpacity onPress={this.onNavigateForgotPassword}>
                <Text style={styles.forgotText}>
                  {I18n.t(['auth', 'forgotPassword'])}
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.btnLogin}>
              <TouchableOpacity onPress={this.onLogin}>
                <Text style={styles.loginTxt}>{I18n.t(['auth', 'login'])}</Text>
              </TouchableOpacity>
            </View>
            {this.props.loginError ? (
              <View style={[styles.regisView, { marginTop: 15 }]}>
                <Text style={[styles.regisTxt]}>
                  {I18n.t(['auth', 'loginError'])}
                </Text>
              </View>
            ) : null}
            <View style={styles.regisView}>
              <Text style={styles.regisTxt}>
                {I18n.t(['auth', 'noAccount'])}
              </Text>
              <TouchableOpacity onPress={this.onRegister}>
                <Text
                  style={[
                    styles.regisTxt,
                    { paddingLeft: 5, fontWeight: 'bold' },
                  ]}
                >
                  {I18n.t(['auth', 'register'])}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    i18n: state.language.i18n,
    loginError: state.auth.loginError,
  }
}
const mapDispatchToProps = {
  login,
}
export default connect(mapStateToProps, mapDispatchToProps)(Login)
