import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { PRODUCT1 } from '../../utils/image'
import CommonStyles from '../../utils/common.styles'
import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import {
  formatDateString,
  formatDate,
  getHours,
} from './../../utils/common.util'
import { INotification } from '../../stores/object/notfication.object'
interface IProps {
  item: INotification;
}
export default ({ item }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={{ width: moderateScale(50), height: moderateScale(50) }}>
        <Image style={CommonStyles.imageCover} source={PRODUCT1} />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.note}>{item.body}</Text>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.date}>{getHours(item.create_at)}</Text>
          <Text style={styles.date}> - </Text>
          <Text style={styles.date}>
            {formatDate(item.create_at, 'dd/mm/yyyy')}
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: moderateScale(10),
    borderBottomColor: '#A7A7A7',
    borderBottomWidth: 0.5,
    marginHorizontal: moderateScale(10),
  },
  content: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  title: {
    color: '#565656',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  note: {
    color: '#9C9C9C',
    paddingVertical: moderateScale(5),
  },
  border: {
    width: WIN_WIDTH,
    height: 1,
    backgroundColor: 'red',
  },
  date: {
    color: '#D4D4D4',
    fontSize: moderateScale(12),
  },
})
