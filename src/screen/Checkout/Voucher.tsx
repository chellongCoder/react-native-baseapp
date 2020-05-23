import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_CHECKOUT_OPTION,
  CHECKOUT_VOUCHER,
  CHECKOUT_RIGHT,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'

export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={CHECKOUT_VOUCHER}
          style={[CommonStyles.iconSize, { marginRight: moderateScale(10) }]}
        />
        <Text style={styles.lbl}>{I18n.t('checkout.voucher')}</Text>
      </View>
      <View style={styles.row}>
        <View style={[styles.button, { marginRight: moderateScale(10) }]}>
          <Text style={styles.txt}>Nhập hoặc chọn voucher</Text>
        </View>
        <Image source={CHECKOUT_RIGHT} style={CommonStyles.iconSizeSmall} />
      </View>
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
    color: '#C8C8C8',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  button: {
    backgroundColor: '#EFEFEF',
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
