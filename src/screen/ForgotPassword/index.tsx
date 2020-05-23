import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native'
import styles from './styles'
const userIcon = require('../../../assets/images/user_icon.png')
const phoneIcon = require('../../../assets/images/Phone_Icon.png')
const imageBottom = require('../../../assets/images/bottomImage.png')
import I18n from 'i18n-js'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
interface IProps {
  i18n: any;
}
class ForgotPassword extends Component<IProps> {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      phone: '',
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={styles.titleTxt}>
            {I18n.t(['auth', 'fillUsernameAndPhone'])}
          </Text>
          <View style={styles.inputView}>
            <Image style={styles.iconView} source={userIcon} />
            <TextInput
              style={styles.textView}
              placeholder={I18n.t(['auth', 'username'])}
              value={this.state.username}
              onChangeText={value => this.setState({ username: value })}
            />
          </View>
          <View style={styles.inputView}>
            <Image style={styles.iconView} source={phoneIcon} />
            <TextInput
              style={styles.textView}
              placeholder={I18n.t(['auth', 'phoneNumber'])}
              value={this.state.username}
              onChangeText={value => this.setState({ phone: value })}
            />
          </View>
          <TouchableOpacity style={styles.btnLogin}>
            <Text style={styles.loginTxt}>{I18n.t(['auth', 'submit'])}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.imageBottom}>
          <Image style={styles.image} source={imageBottom} />
        </View>
      </View>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    i18n: state.language.i18n,
  }
}

export default connect(mapStateToProps, null)(ForgotPassword)
