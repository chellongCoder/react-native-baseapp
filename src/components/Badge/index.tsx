import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
interface IProps {
  number: number;
}
export default ({ number }: IProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{number}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: CommonVariables.whiteColor,
    width: 15,
    height: 15,
    borderRadius: 7.5,
    borderColor: CommonVariables.redColor,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // top: -5,
    // right: -5,
  },
  number: {
    color: CommonVariables.redColor,
    fontWeight: 'bold',
    fontSize: 10,
  },
})
