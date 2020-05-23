import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_CHECKOUT_OPTION,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { IOrder, IOrderStatus } from '../../stores/object/order.object'
import { getStatusOrder } from '../../utils/common.util'
interface IProps {}
export default () => {
  const order = useSelector((state: RootState) => state.order.orderDetail)
  const orderStatus: IOrderStatus[] = useSelector(
    (state: RootState) => state.order.orderStatus
  )
  const [image, color] = order
    ? getStatusOrder(orderStatus, order.status_code)
    : [null, undefined]
  return (
    <View style={styles.container}>
      <Text style={styles.lbl}>{I18n.t('orderDetail.status')}</Text>
      <Text style={[styles.txt, { color }]}>{order?.status_name}</Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: moderateScale(10),
  },
  lbl: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  txt: {
    color: '#FFCA54',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
})
