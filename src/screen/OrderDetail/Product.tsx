import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import ProductItem from './ProductItem'
import I18n from '../../i18n/index'
import { moderateScale } from '../../styles/common.variables'
import { formatCurrency } from '../../utils/common.util'
import ImageView from 'react-native-image-viewing'
import { IProductOrder } from '../../stores/object/product.object'
import { IOrder } from '../../stores/object/order.object'
interface IProps {
  onShowImage: () => void;
}

export default ({ onShowImage }: IProps) => {
  const order: IOrder | undefined = useSelector(
    (state: RootState) => state.order.orderDetail
  )
  const renderProduct = (
    isFavorite: boolean,
    item: IProductOrder,
    index: number,
    onPress: any
  ) => {
    return <ProductItem onShowImage={onShowImage} product={item} />
  }
  return (
    <View style={styles.container}>
      <ListFullOption
        scrollEnabled={true}
        data={order ? order.products : []}
        renderSubItem={renderProduct}
      />
      <View
        style={{
          backgroundColor: CommonVariables.whiteColor,
          borderBottomWidth: 0.5,
          borderBottomColor: '#747474',
          padding: moderateScale(10),
        }}
      >
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('orderDetail.totalPayment')}</Text>
          <Text style={styles.txt}>
            {formatCurrency(order ? order.total : 0)} VNĐ
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('orderDetail.discount')}</Text>
          <Text style={styles.txt}>
            {formatCurrency(order ? order.discounts : 0)} VNĐ
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>
            {I18n.t('orderDetail.shippingSubtotal')}
          </Text>
          <Text style={styles.txt}>
            {formatCurrency(order ? order.total_shipping : 0)} VNĐ
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('orderDetail.voucher')}</Text>
          <Text style={styles.txt}>{formatCurrency(0)} VNĐ</Text>
        </View>
      </View>

      <View
        style={[
          styles.row,
          {
            paddingVertical: moderateScale(10),
            paddingHorizontal: moderateScale(10),
          },
        ]}
      >
        <Text style={styles.checkout}>{I18n.t('orderDetail.checkout')}</Text>
        <Text style={styles.checkout}>
          {formatCurrency(order ? order.total_paid : 0)} VNĐ
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
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
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: moderateScale(2),
  },
  txt: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  lbl: {
    color: '#B6B6B6',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  checkout: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
