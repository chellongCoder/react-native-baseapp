import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { LINKICON, HANDICON, SHAREICON } from '../../utils/image'
import I18n from '../../i18n/index'
import ListFullOption from '../../components/ListFullOption'
import ProductItem from './ProductItem'
interface IProps {
  products: any[];
}

export default ({ products }: IProps) => {
  const renderProduct = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: Function
  ) => {
    return <ProductItem item={item} />
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleView}>
        <Text style={styles.suggestProductTxt}>
          {I18n.t('detailProduct.suggestProduct')}
        </Text>
      </View>
      <View>
        <ListFullOption
          style={styles.list}
          data={products}
          renderSubItem={renderProduct}
          horizontal={true}
          scrollEnabled={true}
        />
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: WIN_WIDTH / 3 + moderateScale(100),
    marginTop: moderateScale(8),
    marginBottom: moderateScale(20),
    backgroundColor: '#FFF',
  },
  titleView: {
    height: moderateScale(30),
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: moderateScale(30),
  },
  prdView: {
    // flex: 4 / 6,
    backgroundColor: 'red',
  },
  list: {
    // flex: 4 / 6,
    //flexWrap: 'wrap',
    flexDirection: 'row',
    // width: WIN_WIDTH,
    justifyContent: 'center',
    // backgroundColor: 'green',
    // paddingTop: moderateScale(10),
    paddingBottom: moderateScale(50),
  },
  imgView: {
    // height: 0.2 * WIN_HEIGHT,
    height: 0.15 * WIN_HEIGHT,
  },
  suggestProductTxt: {
    fontSize: moderateScale(10),
    paddingRight: moderateScale(15),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#E55353',
    textAlignVertical: 'center',
  },
})
