import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { MEMBER_AVATAR } from '../../utils/image'

import {
  MEMBER_RASING,
  MEMBER_DECLINE,
  MEMBER_STABILITY,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import { formatCurrency } from '../../utils/common.util'
interface IProps {
  item: any;
}
export default ({ item }: IProps) => {
  let image: any
  switch (item.compare) {
    case 1:
      image = MEMBER_RASING
      break
    case -1:
      image = MEMBER_DECLINE
      break
    case 0:
      image = MEMBER_STABILITY
    // eslint-disable-next-line no-fallthrough
    default:
      break
  }
  return (
    <View style={styles.container}>
      <View
        style={[
          {
            flex: 4 / 10,
            backgroundColor: CommonVariables.whiteColor,
            flexDirection: 'row',
            padding: moderateScale(10),
          },
        ]}
      >
        <View style={{ width: moderateScale(50), height: moderateScale(50) }}>
          <Image style={CommonStyles.image} source={MEMBER_AVATAR} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            flex: 9 / 10,
            marginLeft: moderateScale(10),
          }}
        >
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.level}>
            {' '}
            Cấp bậc{': '}
            <Text
              style={[
                styles.level,
                { fontFamily: CommonVariables.fonts.OPENSANS_BOLD },
              ]}
            >
              {item.level}
            </Text>
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.row,
          {
            flex: 2.5 / 10,
            backgroundColor: '#F8F8F8',
            alignItems: 'flex-end',
            padding: moderateScale(10),
          },
        ]}
      >
        <Text style={styles.monthlyTurnover}>
          {formatCurrency(item.monthlyTurnover)} đ
        </Text>
      </View>
      <View
        style={[
          styles.row,
          {
            flex: 2.5 / 10,
            backgroundColor: CommonVariables.whiteColor,
            alignItems: 'flex-end',
            padding: moderateScale(10),
          },
        ]}
      >
        <Text style={styles.currentTurnover}>
          {formatCurrency(item.currentTurnover)} đ
        </Text>
      </View>
      <View style={[styles.row, { flex: 1 / 10, backgroundColor: '#F8F8F8' }]}>
        <Image style={CommonStyles.iconSize} source={image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'red',
    borderBottomWidth: 0.5,
    borderBottomColor: '#C2C2C2',
    flex: 1,
  },
  row: {
    alignItems: 'center',
    backgroundColor: 'blue',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  name: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  level: {
    color: '#707070',
  },
  monthlyTurnover: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: '#777777',
  },
  currentTurnover: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
