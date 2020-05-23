import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import Filter from './Filter'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  TYPE_ORDER,
  IOrder,
  IOrderStatus,
} from '../../stores/object/order.object'
import {
  formatDate,
  formatMoney,
  formatCurrency,
  getStatusOrder,
} from './../../utils/common.util'

import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import NavigationServices from '../../services/NavigationServices'
import { getOrders, loadmoreOrders } from '../../stores/actions/order.action'
import ListLoading from '../../components/ListLoading'
import I18n from '../../i18n/index'
const navigateOrderDetail = (orderId: number) => {
  NavigationServices.navigate('OrderDetail', { orderId })
}
const renderOrder = (
  isFavorite: boolean,
  item: IOrder,
  index: number,
  onPress: any
) => {
  // let image: any
  // let color = ''
  const orderStatus: IOrderStatus[] = useSelector(
    (state: RootState) => state.order.orderStatus
  )

  const [image, color] = getStatusOrder(orderStatus, item.status_code)

  return (
    <TouchableWithoutFeedback onPress={() => navigateOrderDetail(item.id)}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 1 / 10 }}>
          <Image source={image} style={CommonStyles.iconSize} />
        </View>
        <View style={{ flex: 6 / 10 }}>
          <Text style={styles.name}>{item.contact_name}</Text>
          <Text style={styles.phone}>{item.contact_phone}</Text>
          <Text style={styles.date}>
            Ngày tạo: {formatDate(new Date(item.created_at), 'dd/mm/yyyy')}
          </Text>
        </View>
        <View style={{ flex: 3 / 10, alignItems: 'flex-end' }}>
          <Text style={styles.price}>
            {formatCurrency(item.total_paid)} VNĐ
          </Text>
          <Text style={[styles.type, { color: color }]}>
            {item.status_name}
          </Text>
        </View>
      </View>
    </TouchableWithoutFeedback>
  )
}

let pageNumber = 1
export default () => {
  const orders = useSelector((state: RootState) => state.order.liveOrders)
  const loading = useSelector((state: RootState) => state.order.loadingOrders)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getOrders(1, undefined, 1))
  }, [])

  const onLoadMore = async () => {
    pageNumber++
    dispatch(loadmoreOrders(pageNumber, undefined, 1))
  }

  const onRefresh = async () => {
    pageNumber = 1
    dispatch(getOrders(pageNumber, undefined, 1))
  }

  return (
    <View style={styles.container}>
      <View style={{ position: 'absolute', width: WIN_WIDTH, zIndex: 999 }}>
        <Filter mode={1} />
      </View>
      {loading ? (
        <ListLoading />
      ) : (
        <ListFullOption
          scrollEnabled={true}
          data={orders}
          renderSubItem={renderOrder}
          style={{
            paddingTop: moderateScale(40),
          }}
          loadMore={true}
          onLoadMore={onLoadMore}
          onRefreshEvent={onRefresh}
          ListEmptyComponent={() => (
            <View style={styles.empty}>
              <Text style={styles.txtEmpty}>{I18n.t('order.empty')}</Text>
            </View>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonVariables.whiteColor,
  },
  itemContainer: {
    backgroundColor: CommonVariables.whiteColor,
    borderBottomWidth: 0.5,
    borderBottomColor: '#A7A7A7',
    flexDirection: 'row',
    padding: moderateScale(10),
  },
  type: {
    fontSize: moderateScale(10),
  },
  price: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  name: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  phone: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  date: {
    color: '#ACACAC',
    fontSize: moderateScale(10),
  },
  empty: {
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  txtEmpty: {
    color: '#ACACAC',
  },
})
