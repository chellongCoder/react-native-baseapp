import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { isAndroid } from '../../utils/common.util'
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper'
import { DETAILICON } from '../../utils/image'
import { formatCurrency } from '../../utils/common.util'
import StarRating from 'react-native-star-rating'
import I18n from '../../i18n/index'
interface IProps {
  product: object;
}
export default ({ product }: IProps) => {
  console.log('product', product)
  return (
    <View style={styles.container}>
      <View style={styles.titleTransfer}>
        <View style={styles.title}>
          <View>
            <Image
              source={DETAILICON}
              style={[CommonStyles.iconSize, { width: moderateScale(15) }]}
            />
          </View>
          <View style={styles.txtTitleView}>
            <Text
              style={[
                CommonStyles.txtTitle,
                {
                  marginLeft: moderateScale(5),
                  fontWeight: 'bold',
                  color: '#565656',
                  letterSpacing: 1,
                  fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
                },
              ]}
            >
              {I18n.t('detailProduct.detailProduct')}
            </Text>
          </View>
        </View>
        <View style={styles.feeTransfer}>
          {/* <Text style={styles.feeTxt}>{product.feeTranfer}</Text> */}
        </View>
      </View>
      <View style={styles.contentView}>
        <View style={{ flex: 1 / 10 }}></View>
        <View style={{ flex: 9 / 10 }}>
          <Text style={styles.contentTxt}>{product.description}</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1 / 10,
    marginTop: moderateScale(8),
    height: 0.25 * WIN_WIDTH,
    backgroundColor: '#FFF',
  },
  titleTransfer: {
    flex: 1,
    flexDirection: 'row',
  },
  imageIcon: {
    width: moderateScale(20),
    resizeMode: 'contain',
  },
  title: {
    flex: 2,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: moderateScale(8),
    paddingLeft: moderateScale(15),
  },
  imgView: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  txtTitleView: {
    flex: 4,
    justifyContent: 'center',
    // flexDirection: 'row',
  },
  txtTitle: {
    marginLeft: moderateScale(5),
    fontSize: moderateScale(10),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    color: '#565656',
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlignVertical: 'center',
  },
  feeTransfer: {
    flex: 1,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
  },
  contentView: {
    flex: 2,
    flexDirection: 'row',
    //backgroundColor: 'red',
  },
  contentTxt: {
    fontSize: moderateScale(10),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    color: '#5B5B5B',
    fontWeight: 'normal',
    fontStyle: 'normal',
    marginRight: moderateScale(10),
  },
})
