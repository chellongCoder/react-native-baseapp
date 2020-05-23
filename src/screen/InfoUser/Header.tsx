import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native'
import { HOMECOVER, USER_AVATAR } from '../../utils/image'
import {
  WIN_HEIGHT,
  WIN_WIDTH,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { CART, BELL, MENUTHREEDOT, MEMBER_CUP } from '../../utils/icon'
import { IProfile } from '../../stores/object/user.object'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import Badge from '../../components/Badge'

export default () => {
  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )
  const badge = useSelector((state: RootState) => state.cart.badge)
  const badgeNotification = useSelector(
    (state: RootState) => state.notification.badge
  )

  const navigationDrawer = useSelector(
    (state: RootState) => state.ui.navigationDrawer
  )
  const toggleDrawer = () => {
    navigationDrawer.toggleDrawer()
  }
  return (
    <View style={styles.container}>
      <View style={styles.image}>
        <Image source={HOMECOVER} style={CommonStyles.imageCover} />
      </View>
      <SafeAreaView
        style={{
          width: WIN_WIDTH,
        }}
      />
      <View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
          <TouchableOpacity style={styles.icon}>
            <Image source={CART} style={CommonStyles.iconSize} />
            {badge ? (
              <View style={styles.badge}>
                <Badge number={badge} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity style={styles.icon}>
            <Image source={BELL} style={CommonStyles.iconSize} />
            {badgeNotification ? (
              <View style={styles.badge}>
                <Badge number={badgeNotification} />
              </View>
            ) : null}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleDrawer} style={styles.icon}>
            <Image source={MENUTHREEDOT} style={CommonStyles.iconSize} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.info}>
        <View style={styles.avatar}>
          <Image style={CommonStyles.image} source={USER_AVATAR} />
        </View>
        <View>
          <Text style={styles.textBold}>{user?.name}</Text>
          <Text style={styles.text}>{user?.phone}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            justifyContent: 'flex-end',
            alignSelf: 'flex-end',
          }}
        >
          <Text style={[styles.textBold, { marginRight: moderateScale(10) }]}>
            GĐ Kinh doanh
          </Text>
          <Image source={MEMBER_CUP} style={CommonStyles.iconSize} />
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: WIN_HEIGHT / 7,
  },
  image: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT / 7,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  icon: {
    paddingLeft: moderateScale(10),
    alignItems: 'center',
    paddingTop: moderateScale(5),
  },
  info: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  avatar: {
    width: moderateScale(40),
    height: moderateScale(40),
    marginRight: moderateScale(10),
  },
  textBold: {
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  text: {
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  badge: {
    position: 'absolute',
    right: moderateScale(10),
  },
})
