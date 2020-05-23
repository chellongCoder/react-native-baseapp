import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Share,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { USER_VOUCHER, USER_SHARE } from '../../utils/icon'
import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import NavigationServices from '../../services/NavigationServices'
import Mine from '../../stores/object/me.object'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { IProfile } from '../../stores/object/user.object'

export default () => {
  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )
  const onShare = async () => {
    try {
      const result = await Share.share({
        message: user ? user.name : '',
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

  const onDoit = () => {
    NavigationServices.navigate('Voucher')
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Text style={styles.lbl}>{I18n.t('home.voucher')}</Text>
        </View>
        <View style={styles.row}>
          <View style={styles.code}>
            <Text style={styles.txt}>{user?.name}</Text>
          </View>
          <View
            style={{
              width: 0.5,
              height: moderateScale(20),
              backgroundColor: '#747474',
              alignSelf: 'center',
              marginRight: moderateScale(10),
            }}
          />
          <TouchableOpacity onPress={onShare}>
            <Image source={USER_SHARE} style={[CommonStyles.iconSize]} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.note}>
          Chia sẻ ứng dụng ngay để xây dựng một cộng đồng bán hàng cho riêng
          bạn, mang đến thu nhập tự động tối thiểu từ
        </Text>
        <Text style={styles.lbl}>30 triệu đồng/tháng</Text>
      </View>
      <TouchableOpacity onPress={onDoit} style={styles.button}>
        <Text style={styles.textButton}>
          {I18n.t('home.doit').toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F4F4F4',
    paddingVertical: moderateScale(10),
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: moderateScale(20),
    paddingRight: moderateScale(10),
  },
  lbl: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  code: {
    borderBottomWidth: 0.5,
    borderBottomColor: '#747474',
    marginRight: moderateScale(20),
  },
  txt: {
    color: '#E55353',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  note: {
    fontSize: moderateScale(12),
    color: '#888888',
  },
  row: {
    flexDirection: 'row',
  },
  content: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
  },
  button: {
    backgroundColor: '#E55353',
    width: WIN_WIDTH - moderateScale(40),
    alignSelf: 'center',
    paddingVertical: moderateScale(5),
    alignItems: 'center',
    borderRadius: moderateScale(15),
  },
  textButton: {
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
