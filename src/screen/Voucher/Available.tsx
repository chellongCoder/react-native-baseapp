import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ListFullOption from '../../components/ListFullOption'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { CommonVariables } from '../../utils/common.styles'
import VoucherItem from './VoucherItem'

export default () => {
  const vouchers = useSelector((state: RootState) => state.voucher.vouchers)

  const renderNotification = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: any
  ) => {
    return <VoucherItem item={item} />
  }
  return (
    <View style={styles.container}>
      <ListFullOption
        scrollEnabled={true}
        data={vouchers}
        renderSubItem={renderNotification}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})
