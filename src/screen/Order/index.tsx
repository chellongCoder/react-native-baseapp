import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import TabbarOrder from './TabbarOrder'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import I18n from '../../i18n/index'
import styles from './styles'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
export default class Order extends Component<IProps> {
  render() {
    const { navigation } = this.props
    return (
      <NavigationContainer independent={true}>
        <View style={styles.container}>
          <Header navigation={navigation} title={I18n.t('order.title')} />
          <View style={{ flex: 1 }}>
            <TabbarOrder />
          </View>
        </View>
      </NavigationContainer>
    )
  }
}
