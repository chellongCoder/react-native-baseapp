import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_CHECKOUT_OPTION,
  CHECKOUT_VOUCHER,
  CHECKOUT_RIGHT,
  CHECKOUT_NOTE,
  USER_VOUCHER,
  USER_SHARE,
  USER_EDIT,
  USER_IDENTIFIER,
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
          source={USER_IDENTIFIER}
          style={[CommonStyles.iconSize, { marginRight: moderateScale(10) }]}
        />
        <Text style={styles.lbl}>{I18n.t('userInfo.update_identifier')}</Text>
      </View>
      <View style={styles.row}>
        <Image source={USER_EDIT} style={[CommonStyles.iconSize]} />
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
    marginBottom: moderateScale(10),
    marginTop: moderateScale(10),
  },
  lbl: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  code: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#747474',
    marginRight: moderateScale(20),
  },
  txt: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  row: {
    flexDirection: 'row',
  },
})
