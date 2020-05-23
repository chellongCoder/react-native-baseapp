import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Share,
} from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import { isAndroid } from '../../utils/common.util'
import { isIphoneX, ifIphoneX } from 'react-native-iphone-x-helper'
import { PRODUCT1, SHARERATE } from '../../utils/image'
import { formatCurrency } from '../../utils/common.util'
import StarRating from 'react-native-star-rating'
import I18n from '../../i18n/index'
interface IProps {
  product: object;
}
export default ({ product }: IProps) => {
  console.log('dsfads', product.product)
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: product.link_share,
      })
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //(error.message)
    }
  }
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={product.imageUrl ? { uri: product.imageUrl } : PRODUCT1}
      />
      <View style={styles.infoView}>
        <View style={styles.namePriceView}>
          <Text style={styles.nameTxt}>
            {product.name && product.name.length <= 40
              ? product.name.toLocaleUpperCase()
              : `${product.name.slice(0, 25).toUpperCase()}`}
          </Text>
          <Text style={styles.priceTxt}>
            {product.price && formatCurrency(product.price.split('.')[0])} VNĐ
          </Text>
        </View>
        <View style={styles.ratingShareView}>
          <View style={styles.rateView}>
            <Text style={styles.rateTxt}>{I18n.t('detailProduct.rating')}</Text>
            <StarRating
              disabled={true}
              maxStars={5}
              rating={2.5} //product.rate
              starSize={20}
              starStyle={{ color: '#FFC107', activeOpacity: 0.2 }}
              containerStyle={{
                justifyContent: 'flex-start',
              }}
            //selectedStar={rating => this.onStarRatingPress(rating)}
            />
          </View>
          <View style={styles.shareView}>
            <TouchableOpacity onPress={() => onShare()}>
              <Image
                source={SHARERATE}
                style={{ width: 40, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1 / 10,
    height: WIN_WIDTH,
    backgroundColor: '#FFF',
  },
  image: {
    flex: 3,
    resizeMode: 'cover',
    width: WIN_WIDTH,
    //marginBottom: moderateScale(5),
  },
  infoView: {
    flex: 1,
    flexDirection: 'row',
  },
  namePriceView: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: moderateScale(10),
    //backgroundColor: 'red',
  },
  nameTxt: {
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: '600',
    color: '#5B5B5B',
    fontSize: 15,
    flexWrap: 'wrap',
  },
  priceTxt: {
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontStyle: 'normal',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#E65353',
    fontSize: 18,
    letterSpacing: 1,
  },
  ratingShareView: {
    flex: 1.5,
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: moderateScale(5),
  },
  rateView: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: moderateScale(15),
  },
  rateTxt: {
    color: '#A2A2A2',
    textAlign: 'left',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontSize: 16,
  },
  shareView: {
    flex: 1,
    justifyContent: 'center',
    marginLeft: moderateScale(15),
    //  backgroundColor: 'red',
  },
})
