import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { PRODUCT1 } from '../../utils/image'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { formatCurrency } from '../../utils/common.util'
import { IProductOrder } from '../../stores/object/product.object'
interface IProps {
  product: IProductOrder;
  onShowImage: () => void;
}
export default ({ product, onShowImage }: IProps) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#CFCFCF',
        padding: moderateScale(10),
      }}
    >
      <TouchableOpacity
        onPress={onShowImage}
        style={{
          width: WIN_WIDTH / 6,
          height: WIN_WIDTH / 6,
          marginRight: moderateScale(10),
        }}
      >
        <Image
          style={CommonStyles.imageCover}
          source={{ uri: product.cover }}
        />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
        }}
      >
        <View>
          <Text style={styles.name}>{product.product_name}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            flex: 1,
          }}
        >
          <Text style={styles.quantum}>số lượng</Text>
          <Text style={styles.quantum}>x{product.quantity}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <Text style={styles.txtPrice}>
            {formatCurrency(Number(product.product_price) * product.quantity)}{' '}
            VNĐ
          </Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  name: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  quantum: {
    color: '#B6B6B6',
    fontSize: moderateScale(15),
  },
  txtPrice: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
})
