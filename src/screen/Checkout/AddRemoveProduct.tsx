import React, { useState } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'
import { moderateScale } from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
interface IProps {
  rowId: string;
  quantity: number;
  putCart: Function;
}

export default ({ rowId, quantity, putCart }: IProps) => {
  //const [value, setValue] = useState(quantity)
  const onDecrease = () => {
    let amount = quantity
    // setValue(--amount)
    putCart(rowId, --amount)
  }
  const onIncrease = () => {
    let amount = quantity
    // setValue(++amount)
    putCart(rowId, ++amount)
  }
  return (
    <View style={styles.container}>
      <View
        style={{
          borderWidth: 0.5,

          borderColor: '#CFCFCF',
          borderTopLeftRadius: moderateScale(2),
          borderBottomLeftRadius: moderateScale(2),
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(5),
          }}
          onPress={onDecrease}
        >
          <Text style={styles.operator}>-</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingHorizontal: moderateScale(10),
          borderTopWidth: 0.5,
          borderBottomWidth: 0.5,
          borderColor: '#CFCFCF',
        }}
      >
        <Text style={styles.operator}>{quantity}</Text>
      </View>
      <View
        style={{
          backgroundColor: '#E55353',
          borderTopEndRadius: moderateScale(2),
          borderBottomEndRadius: moderateScale(2),
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            paddingHorizontal: moderateScale(5),
          }}
          onPress={onIncrease}
        >
          <Text
            style={[styles.operator, { color: CommonVariables.whiteColor }]}
          >
            +
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  operator: {
    fontSize: moderateScale(12),
    color: '#909090',
  },
})
