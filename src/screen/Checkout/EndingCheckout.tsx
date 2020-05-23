import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import ProductItem from './ProductItem'
import I18n from '../../i18n/index'
import { moderateScale } from '../../styles/common.variables'
import { formatCurrency } from '../../utils/common.util'
import { ISummary } from '../../stores/object/cart.object'

interface IProps {}

export default ({}: IProps) => {
  const totalPrice = useSelector((state: RootState) => state.cart.totalPrice)

  const summary: any = useSelector((state: RootState) => state.cart.summary)

  const shippingFee = useSelector(
    (state: RootState) => state.delivery.choicedDeliveryOption?.fee
  )

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: CommonVariables.whiteColor,
          borderBottomWidth: 0.5,
          borderBottomColor: '#CFCFCF',
          // padding: moderateScale(10),
        }}
      >
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('orderDetail.totalPayment')}</Text>
          <Text style={styles.txt}>
            {totalPrice && formatCurrency(totalPrice)} VNĐ
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('orderDetail.discount')}</Text>
          <Text style={styles.txt}>
            {formatCurrency(summary?.discount)} VNĐ
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>
            {I18n.t('orderDetail.shippingSubtotal')}
          </Text>
          <Text style={styles.txt}>
            {shippingFee ? formatCurrency(shippingFee) : 0} VNĐ
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('orderDetail.voucher')}</Text>
          <Text style={styles.txt}>{formatCurrency(0)} VNĐ</Text>
        </View>
      </View>

      <View
        style={[
          styles.row,
          {
            // paddingHorizontal: moderateScale(10),
          },
        ]}
      >
        <Text style={styles.checkout}>Thanh toán</Text>
        <Text style={styles.checkout}>
          {shippingFee
            ? formatCurrency(Number(summary?.total_paid) + Number(shippingFee))
            : formatCurrency(Number(summary?.total_paid))}{' '}
          VNĐ
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,

    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(10),
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: moderateScale(3),
  },
  txt: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  lbl: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  checkout: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
