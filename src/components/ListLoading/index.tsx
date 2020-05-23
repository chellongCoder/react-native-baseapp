import React from 'react'
import { View, ScrollView, StyleSheet, ActivityIndicator } from 'react-native'
import ContentLoader from '../ContentLoader'
import { WIN_WIDTH, WIN_HEIGHT } from '../../styles/common.variables'
const size = [1, 2, 3, 4, 5]
export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color="#cdc9cc" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: WIN_HEIGHT - 100,
    width: WIN_WIDTH,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
