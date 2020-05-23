import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
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
import NavigationServices from '../../services/NavigationServices'
import { IDeliveryOption, IAddress } from '../../stores/object/delivery.object'
import { formatCurrency, alertInfoOption } from '../../utils/common.util'

export default () => {
  const address: IAddress | undefined = useSelector(
    (state: RootState) => state.delivery.address
  )
  const onnavigateDeliveryOption = () => {
    if (!address?.address_id) {
      alertInfoOption(
        I18n.t('checkout.addressYet'),
        '',
        () => {
          NavigationServices.navigate('DeliveryAddress')
        },
        false
      )
      return
    }
    NavigationServices.navigate('DeliveryOption')
  }
  const choicedDeliveryOption: IDeliveryOption | undefined = useSelector(
    (state: RootState) => state.delivery.choicedDeliveryOption
  )

  console.log('====================================')
  console.log(choicedDeliveryOption)
  console.log('====================================')

  return (
    <TouchableWithoutFeedback onPress={onnavigateDeliveryOption}>
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
            <Text style={styles.lbl}>
              {I18n.t('orderDetail.shippingOption')}
            </Text>
            {!choicedDeliveryOption ? (
              <Text style={styles.choiceDelivery}>
                chọn phương thức vận chuyển
              </Text>
            ) : (
              <Text style={styles.txt}>
                {choicedDeliveryOption.name}:{' '}
                <Text style={styles.price}>
                  {formatCurrency(choicedDeliveryOption.fee)} VNĐ
                </Text>
              </Text>
            )}
          </View>
        </View>
        <View
          style={{
            flex: 1 / 10,
            alignItems: 'flex-end',
          }}
        >
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
    paddingRight: 10,
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
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  price: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  choiceDelivery: {
    fontStyle: 'italic',
    color: '#E55353',
  },
})
