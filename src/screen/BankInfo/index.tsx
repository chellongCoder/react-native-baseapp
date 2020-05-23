import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import I18n from '../../i18n/index'
import Info from './Info'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import Button from './Button'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
class BankInfo extends Component<IProps> {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={I18n.t('bank.title')} />
        <KeyboardAwareScrollView>
          <Info />
          <Button />
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    address: state.delivery.address,
  }
}
const mapDispatchToProps = (dispatch: any) => ({})
export default connect(mapStateToProps, mapDispatchToProps)(BankInfo)
