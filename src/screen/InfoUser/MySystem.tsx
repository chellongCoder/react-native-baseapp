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
  USER_SYSTEM,
  USER_ORDER,
  USER_ORDER_FINISHED,
  USER_EXCHANGE_AGENCY,
  USER_REVENUE,
  USER_MEMBER,
  USER_LOGOUT,
  CHECKOUT_RIGHT,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import NavigationServices from '../../services/NavigationServices'
import I18n from '../../i18n/index'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import AuthAction from '../../stores/actions/auth.action'
import CategoryAction from '../../stores/actions/category.action'
import HomeAction from '../../stores/actions/home.action'
import ShoppingAction from '../../stores/actions/shopping.action'
import { alertInfoOption } from '../../utils/common.util'
import { APIBase } from './../../services/api.service'
import { PURGE } from 'redux-persist'
import DeliveryAction from '../../stores/actions/delivery.action'
import CheckoutAction from '../../stores/actions/checkout.action'
import OrderAction from '../../stores/actions/order.action'
import CartAction from '../../stores/actions/cart.action'
import Mine from '../../stores/object/me.object'
import { IProfile } from '../../stores/object/user.object'

export default () => {
  const refSwitchNavigator = useSelector(
    (state: RootState) => state.ui.refSwitchNavigator
  )
  const dispatch = useDispatch()

  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )
  const fields = [
    {
      name: `Số đơn (${user ? user.total_order : 0})`,
      icon: USER_ORDER,
    },
    {
      name: `Số đơn thành công (${user ? user.total_success_order : 0})`,
      icon: USER_ORDER_FINISHED,
    },
    {
      name: 'Chuyển đổi quyền đại lý',
      icon: USER_EXCHANGE_AGENCY,
      navigate: 'ChangeAgency',
    },
    {
      name: 'Doanh thu ',
      icon: USER_REVENUE,
      navigate: 'Revenue',
    },
    {
      name: 'Số thành viên trực thuộc',
      icon: USER_MEMBER,
      navigate: 'Members',
    },
    {
      name: 'Đăng xuất',
      icon: USER_LOGOUT,
    },
  ]

  const onLogout = () => {
    alertInfoOption('Bạn có chắc chắn muốn logout?', '', () => {
      NavigationServices.setTopLevelNavigator(refSwitchNavigator)
      NavigationServices.resetStack('Login')
      dispatch(AuthAction.resetStore())
      dispatch(CategoryAction.resetStore())
      dispatch(HomeAction.resetStore())
      dispatch(ShoppingAction.resetStore())
      dispatch(DeliveryAction.resetStore())
      dispatch(CheckoutAction.resetStore())
      dispatch(OrderAction.resetStore())
      dispatch({
        type: PURGE,
        key: 'root', // Whatever you chose for the "key" value when initialising redux-persist in the **persistCombineReducers** method - e.g. "root"
        result: () => null,
      })
      APIBase.getInstance().resetAPIKey()
    })
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', padding: moderateScale(10) }}>
        <Image source={USER_SYSTEM} style={CommonStyles.iconSize} />
        <Text
          style={{
            color: '#707070',
            fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
            marginLeft: moderateScale(10),
          }}
        >
          {I18n.t('userInfo.my_system')}{' '}
        </Text>
      </View>
      <View
        style={{
          marginHorizontal: moderateScale(10),
        }}
      >
        {fields.map((value, index) => {
          if (!value.navigate) {
            return (
              <TouchableWithoutFeedback
                key={index}
                onPress={index === fields.length - 1 ? onLogout : undefined}
              >
                <View
                  style={[
                    styles.item,
                    {
                      borderBottomWidth: index === fields.length - 1 ? 0 : 0.5,
                    },
                  ]}
                >
                  <Image
                    source={value.icon}
                    style={[
                      CommonStyles.iconSizeSmall,
                      { paddingHorizontal: moderateScale(10) },
                    ]}
                  />
                  <Text style={styles.name}>{value.name}</Text>
                </View>
              </TouchableWithoutFeedback>
            )
          }
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => {
                NavigationServices.navigate(value.navigate)
              }}
            >
              <View style={styles.item}>
                <Image
                  source={value.icon}
                  style={[
                    CommonStyles.iconSizeSmall,
                    { paddingHorizontal: moderateScale(10) },
                  ]}
                />
                <Text style={styles.name}>{value.name}</Text>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'flex-end',
                  }}
                >
                  <Image
                    style={CommonStyles.iconSizeSmall}
                    source={CHECKOUT_RIGHT}
                  />
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
    paddingVertical: moderateScale(10),
  },
  name: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
    marginLeft: moderateScale(10),
  },
})
