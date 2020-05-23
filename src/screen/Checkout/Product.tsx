import React from 'react'
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import ProductItem from './ProductItem'
import I18n from '../../i18n/index'
import { moderateScale } from '../../styles/common.variables'
import { formatCurrency } from '../../utils/common.util'
import { Image } from 'react-native-animatable'
import { CHECKOUT_PRODUCT } from '../../utils/icon'
import NavigationServices from '../../services/NavigationServices'

interface IProps {
  onShowImage: () => void;
}

export default ({ onShowImage }: IProps) => {
  const products = useSelector((state: RootState) => state.cart.products)

  console.log('====================================')
  console.log(products)
  console.log('====================================')

  const renderProduct = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: any
  ) => {
    return <ProductItem onShowImage={onShowImage} product={item} />
  }
  const onNavigateProduct = () => {
    NavigationServices.navigate('ProductList')
  }
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onNavigateProduct}>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'flex-start',
              paddingBottom: moderateScale(10),
            },
          ]}
        >
          <Image
            source={CHECKOUT_PRODUCT}
            style={[CommonStyles.iconSize, { marginRight: moderateScale(10) }]}
          />
          <Text style={styles.lbl}>{I18n.t('checkout.product')}</Text>
        </View>
      </TouchableWithoutFeedback>
      <ListFullOption
        scrollEnabled={true}
        data={products}
        renderSubItem={renderProduct}
      />
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
    padding: moderateScale(20),
  },
  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingVertical: moderateScale(2),
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
  },
  lbl: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  txt: {
    color: '#B6B6B6',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  checkout: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
