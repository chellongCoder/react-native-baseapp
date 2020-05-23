import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import DrawerScreen from '../../components/DrawerScreen'
import { CommonVariables } from '../../utils/common.styles'
interface IProps {
  navigation: any;
}
export default class AgencyBenefit extends Component<IProps> {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Lợi ích đại lý" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonVariables.whiteColor,
  },
})
