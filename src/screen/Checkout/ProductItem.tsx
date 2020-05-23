import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { PRODUCT1 } from '../../utils/image'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { formatCurrency } from '../../utils/common.util'
import AddRemoveProduct from './AddRemoveProduct'
import { ICart } from '../../stores/object/cart.object'
import { putCart } from '../../stores/actions/cart.action'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
interface IProps {
  product: ICart;
  onShowImage: () => void;
}
export default ({ product, onShowImage }: IProps) => {
  console.log('====================================')
  console.log(product)
  console.log('====================================')
  const dispatch = useDispatch()
  const addProduct = (rowId: string, qty: number) => {
    dispatch(putCart(rowId, qty))
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomWidth: 0.5,
        borderBottomColor: '#CFCFCF',
        paddingVertical: moderateScale(10),
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
        <Image style={CommonStyles.imageCover} source={PRODUCT1} />
      </TouchableOpacity>
      <View
        style={{
          flex: 1,
          justifyContent: 'space-around',
        }}
      >
        <View>
          <Text style={styles.name}>{product.name}</Text>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}
        >
          <AddRemoveProduct
            rowId={product.rowId}
            quantity={product.qty}
            putCart={addProduct}
          />
          <Text style={styles.txtPrice}>
            {formatCurrency(product.price * product.qty)} VNĐ
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
