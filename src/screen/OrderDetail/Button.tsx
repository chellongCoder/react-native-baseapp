import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import I18n from '../../i18n/index'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import { useDispatch, useSelector } from 'react-redux'
import { addCart } from '../../stores/actions/cart.action'
import { RootState } from '../../stores/reducers'
import { IOrder } from '../../stores/object/order.object'

export default () => {
  const order: IOrder = useSelector(
    (state: RootState) => state.order.orderDetail
  )

  const dispatch = useDispatch()
  const buyAgain = () => {
    for (let index = 0; index < order.products.length; index++) {
      const element = order.products[index]
      dispatch(addCart(element.id, 1))
    }
  }
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={buyAgain} style={styles.buy}>
        <Text style={styles.txtBuy}>
          {I18n.t('orderDetail.buyAgain').toUpperCase()}
        </Text>
      </TouchableOpacity>
      <View style={styles.contact}>
        <Text style={styles.txtContact}>
          {I18n.t('orderDetail.contact').toUpperCase()}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WIN_WIDTH,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(15),
  },
  buy: {
    backgroundColor: '#E55353',
    width: WIN_WIDTH / 2.2,
    paddingVertical: moderateScale(7),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  txtBuy: {
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  contact: {
    borderWidth: 0.5,
    borderColor: '#E55353',
    width: WIN_WIDTH / 2.2,
    paddingVertical: moderateScale(7),
    borderRadius: moderateScale(5),
    alignItems: 'center',
  },
  txtContact: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
