import React from 'react'
import { View, Text, StyleSheet, Image, Vibration } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_LOCATION,
  CHECKOUT_RIGHT,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import NavigationServices from '../../services/NavigationServices'
import { IAddress } from '../../stores/object/delivery.object'

export default () => {
  const navigateDeliveryAddress = () => {
    NavigationServices.navigate('DeliveryAddress')
  }
  const address: IAddress | undefined = useSelector(
    (state: RootState) => state.delivery.address
  )

  return (
    <TouchableWithoutFeedback onPress={navigateDeliveryAddress}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', flex: 9 / 10 }}>
          <View>
            <Image
              style={CommonStyles.iconSize}
              source={ORDERDETAIL_LOCATION}
            />
          </View>
          <View
            style={{
              marginLeft: moderateScale(10),
              flex: 1,
            }}
          >
            <Text style={styles.lbl}>{I18n.t('checkout.address')}</Text>
            {address && address.address_id ? (
              <Text style={styles.txt}>
                {`${address.address_name}, ${address.province_name} -  ${address.district_name} -  ${address.ward_name}`}
              </Text>
            ) : (
              <Text style={styles.updateAddress}>Cập nhật địa chỉ</Text>
            )}
          </View>
        </View>
        <View style={{ flex: 1 / 10, alignItems: 'flex-end' }}>
          <Image style={CommonStyles.iconSizeSmall} source={CHECKOUT_RIGHT} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    flexDirection: 'row',
    alignItems: 'center',
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
  updateAddress: {
    color: '#E65353',
    fontStyle: 'italic',
  },
})
