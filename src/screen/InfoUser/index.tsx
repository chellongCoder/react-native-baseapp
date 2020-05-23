import React, { Component } from 'react'
import { Text, StyleSheet, View, ScrollView } from 'react-native'
import styles from './styles'
import Header from './Header'
import Voucher from './Voucher'
import Wallet from './Wallet'
import MySystem from './MySystem'
import UpdateIdentifier from './UpdateIdentifier'
import UserInfo from './UserInfo'
import Bank from './Bank'
import { connect } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { getUser } from '../../stores/actions/delivery.action'
interface IProps {}
class InfoUser extends Component<IProps> {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <ScrollView>
          <Voucher />
          <Wallet />
          <MySystem />
          <UpdateIdentifier />
          <UserInfo />
          <Bank />
        </ScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {}
}
const mapDispatchToProps = (dispatch: any) => ({})

export default connect(mapStateToProps, mapDispatchToProps)(InfoUser)
