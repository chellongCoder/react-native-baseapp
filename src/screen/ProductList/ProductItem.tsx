import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { PRODUCT1 } from './../../utils/image'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { formatCurrency } from '../../utils/common.util'
import { IProduct } from '../../stores/object/product.object'
import NavigationServices from '../../services/NavigationServices'
import SCREEN from '../../utils/screen.constant'
interface IProps {
  item: IProduct;
}
export default ({ item }: IProps) => {
  // console.log('length', item.name.length)
  const navigateDetail = () => {
    NavigationServices.navigate(
      SCREEN.BOTTOM_TABBAR.HOME_STACK.DETAIL_PRODUCT,
      { productId: item.id }
    )
  }
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={item => {
        navigateDetail()
      }}
    >
      <View style={styles.image}>
        <Image
          style={[CommonStyles.imageCover, { borderRadius: moderateScale(3) }]}
          source={{ uri: item.cover }}
        />
      </View>
      <View style={styles.info}>
        <Text style={styles.name}>
          {item.name.length <= 40
            ? item.name.toLocaleUpperCase()
            : `${item.name.slice(0, 30).toUpperCase()}`}
        </Text>
        <Text style={styles.price}>
          {formatCurrency(item.price.split('.')[0])} VNĐ
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    width: WIN_WIDTH / 2 - 20,
    // height: moderateScale(250),
    margin: moderateScale(5),
    borderRadius: moderateScale(3),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  image: {
    width: WIN_WIDTH / 2 - 20,
    height: WIN_WIDTH / 2 - 20,
    borderRadius: moderateScale(5),
  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(10),
  },
  name: {
    color: '#8E8E8E',
    fontFamily: 'OpenSans-Light',
    textAlign: 'center',
  },
  price: {
    fontFamily: 'OpenSans-SemiBold',
    color: '#747474',
  },
})
