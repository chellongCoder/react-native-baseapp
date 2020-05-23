import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_CHECKOUT_OPTION,
  CHECKOUT_VOUCHER,
  CHECKOUT_RIGHT,
  CHECKOUT_NOTE,
  USER_VOUCHER,
  USER_SHARE,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import Mine from '../../stores/object/me.object'
import { IProfile } from '../../stores/object/user.object'
import { share } from '../../utils/common.util'

export default () => {
  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )

  const onShare = () => {
    user && share(user?.name)
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={USER_VOUCHER}
          style={[CommonStyles.iconSize, { marginRight: moderateScale(10) }]}
        />
        <Text style={styles.lbl}>{I18n.t('userInfo.voucher')}</Text>
      </View>
      <View style={styles.row}>
        <View style={styles.code}>
          <Text style={styles.txt}>{user?.name}</Text>
        </View>
        <View
          style={{
            width: 0.5,
            height: moderateScale(20),
            backgroundColor: '#747474',
            alignSelf: 'center',
            marginRight: moderateScale(10),
          }}
        />
        <TouchableOpacity onPress={onShare}>
          <Image source={USER_SHARE} style={[CommonStyles.iconSize]} />
        </TouchableOpacity>
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
