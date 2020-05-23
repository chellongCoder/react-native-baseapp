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
import { IOrder } from '../../stores/object/order.object'

export default () => {
  const order: IOrder | undefined = useSelector(
    (state: RootState) => state.order.orderDetail
  )
  return (
    <View style={styles.container}>
      <View>
        <Image style={CommonStyles.iconSize} source={ORDERDETAIL_SHIPPING} />
      </View>
      <View
        style={{
          marginLeft: moderateScale(10),
        }}
      >
        <Text style={styles.lbl}>{I18n.t('orderDetail.shippingOption')}</Text>
        <Text style={styles.txt}>{order?.ship_service_name}</Text>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    flexDirection: 'row',
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
    color: '#B6B6B6',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
})
