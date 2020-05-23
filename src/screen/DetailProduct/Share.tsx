import React, { Component } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Clipboard,
  Share,
} from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { LINKICON, HANDICON, SHAREICON } from '../../utils/image'
import I18n from '../../i18n/index'
interface IProps {
  product: object;
}
export default ({ product }: IProps) => {
  const copyLink = () => {
    Clipboard.setString(product.link_share)
  }
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
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.title}>
          <View style={{ justifyContent: 'center' }}>
            <Image
              source={LINKICON}
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
              {I18n.t('detailProduct.suggestLink')}
            </Text>
          </View>
        </View>
        <View style={styles.feeTransfer}>
          <TouchableOpacity onPress={() => copyLink()}>
            <Text style={styles.feeTxt}>
              {I18n.t('detailProduct.copyLink')}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={styles.title}>
          <View style={{ justifyContent: 'center' }}>
            <Image
              source={HANDICON}
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
              {I18n.t('detailProduct.moneyShare')}
            </Text>
          </View>
        </View>
        <View style={styles.feeTransfer}>
          <TouchableOpacity style={styles.shareBtn} onPress={() => onShare()}>
            <Image
              source={SHAREICON}
              style={[
                {
                  flex: 1,
                  width: moderateScale(10),
                  height: moderateScale(10),
                  resizeMode: 'contain',
                },
              ]}
            />
            <Text style={styles.btnText}>{I18n.t('detailProduct.share')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(8),
    height: 0.1 * WIN_HEIGHT,
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
    // backgroundColor: 'yellow',
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
  feeTxt: {
    fontSize: moderateScale(10),
    paddingRight: moderateScale(15),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontWeight: '600',
    letterSpacing: 1,
    color: '#3EB968',
    textAlign: 'right',
  },
  shareBtn: {
    backgroundColor: '#E55353',
    height: moderateScale(20),
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: 5.76,
  },
  btnText: {
    flex: 4,
    fontSize: moderateScale(10),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    textTransform: 'uppercase',
    color: '#FFFFFF',
  },
})
