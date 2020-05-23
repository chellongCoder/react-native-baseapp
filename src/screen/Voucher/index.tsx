import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import styles from './styles'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import I18n from '../../i18n/index'
import Header from '../../components/Header'
import Tabbar from './Tabbar'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
export default class Voucher extends Component<IProps> {
  render() {
    const { navigation } = this.props
    return (
      <NavigationContainer independent={true}>
        <View style={styles.container}>
          <Header navigation={navigation} title={I18n.t('voucher.title')} />
          <View style={{ flex: 1 }}>
            <Tabbar />
          </View>
        </View>
      </NavigationContainer>
    )
  }
}
