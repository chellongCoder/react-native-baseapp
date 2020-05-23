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
  USER_WALLET,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import NavigationServices from '../../services/NavigationServices'
import Mine from '../../stores/object/me.object'

export default () => {
  const me: Mine = useSelector((state: RootState) => state.home.me)

  const onNavigateWallet = () => {
    NavigationServices.navigate('DetailWallet')
  }
  return (
    <TouchableWithoutFeedback onPress={onNavigateWallet}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', flex: 9 / 10 }}>
          <View>
            <Image style={CommonStyles.iconSize} source={USER_WALLET} />
          </View>
          <View
            style={{
              marginLeft: moderateScale(10),
              flex: 1,
            }}
          >
            <Text style={styles.lbl}>{I18n.t('userInfo.wallet')}</Text>
            <Text style={styles.txt}>
              <Text style={styles.price}>{me.point ? me.point : 0} VNĐ</Text>
            </Text>
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
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
