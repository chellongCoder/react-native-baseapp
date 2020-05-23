import React, { useEffect } from 'react'
import {
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native'
import CommonStyles, {
  CommonVariables,
  HEADER_EXPANDED_HEIGHT,
  HEADER_COLLAPSED_HEIGHT,
} from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'
import { HOME_ROSE_WALLET, HOME_USERS, HOME_ORDER } from '../../utils/icon'
import NavigationServices from '../../services/NavigationServices'
import SCREEN from '../../utils/screen.constant'
import { AppDispatch } from '../../App.bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import APIService from '../../services/api'
import { fetchMeFulfilled, getMe } from '../../stores/actions/home.action'
import { RootState } from '../../stores/reducers'
import Mine from '../../stores/object/me.object'
import { Dispatch } from 'redux'
import { IOrder } from '../../stores/object/order.object'
interface IProps {
  scrollY: Animated.Value;
}
export default ({ scrollY }: IProps) => {
  const dispatch: Dispatch = useDispatch()
  const me: Mine = useSelector((state: RootState) => state.home.me)

  useEffect(() => {
    if (!Object.keys(me).length) {
      dispatch(getMe())
    }
  }, [me])

  const margin = scrollY.interpolate({
    inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
    outputRange: [0, moderateScale(-50)],
    extrapolate: 'clamp',
  })
  const navigateDetailWallet = () => {
    NavigationServices.navigate(
      SCREEN.BOTTOM_TABBAR.DETAIL_WALLET.DETAIL_WALLET
    )
  }
  const navigateOrders = () => {
    NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.ORDER)
  }
  const navigateMember = () => {
    NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.MEMBER)
  }
  return (
    <Animated.View style={[styles.card, { marginTop: margin }]}>
      <TouchableOpacity onPress={navigateDetailWallet} style={styles.cardItem}>
        <Image style={CommonStyles.iconSize} source={HOME_ROSE_WALLET} />
        <View
          style={{
            marginLeft: moderateScale(10),
          }}
        >
          <Text style={styles.nameService}>Ví hoa hồng</Text>
          <Text style={styles.note}>{me.point ? me.point : 0} VNĐ</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.separate} />
      <TouchableOpacity onPress={navigateOrders} style={styles.cardItem}>
        <Image style={CommonStyles.iconSize} source={HOME_ORDER} />
        <View
          style={{
            marginLeft: moderateScale(10),
          }}
        >
          <Text style={styles.nameService}>Đơn hàng</Text>
          <Text style={styles.note}>{me.totalOrder ? me.totalOrder : 0}</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.separate} />
      <TouchableOpacity onPress={navigateMember} style={styles.cardItem}>
        <Image style={CommonStyles.iconSize} source={HOME_USERS} />
        <View
          style={{
            marginLeft: moderateScale(10),
          }}
        >
          <Text style={styles.nameService}>Số người</Text>
          <Text style={styles.note}>{me.totalMember ? me.totalMember : 0}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: CommonVariables.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(15),
    zIndex: 999,
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    alignItems: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    marginTop: 0,
  },
  separate: {
    height: moderateScale(41),
    width: 0.5,
    backgroundColor: '#B0B0B0',
  },
  cardItem: {
    flexDirection: 'row',
    flex: 1,
    paddingVertical: moderateScale(20),
    justifyContent: 'center',
  },
  nameService: {
    fontSize: moderateScale(12),
    color: '#565656',
  },
  note: {
    fontFamily: 'OpenSans-Bold',
    color: '#565656',
    fontSize: moderateScale(15),
  },
})
