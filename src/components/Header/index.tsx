import React from 'react'
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native'
import { HOMECOVER } from '../../utils/image'
import { BACKBTN, CART, MENUTHREEDOT, BELL } from '../../utils/icon'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { moderateScale, WIN_HEIGHT } from '../../styles/common.variables'
import NavigationServices from '../../services/NavigationServices'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import Badge from '../Badge'
interface IProps {
  title: string;
  navigation: ReturnType<typeof useNavigation>;
  notgoback?: boolean;
}
export default ({ title, navigation, notgoback }: IProps) => {
  const badge = useSelector((state: RootState) => state.cart.badge)

  const badgeNotification = useSelector(
    (state: RootState) => state.notification.badge
  )

  const goBack = () => {
    navigation.goBack()
  }
  const navigationDrawer = useSelector(
    (state: RootState) => state.ui.navigationDrawer
  )
  const toggleDrawer = () => {
    navigationDrawer.toggleDrawer()
  }
  const onNavigateCart = () => {
    navigation.navigate('Cart')
  }
  const onNavigateNotification = () => {
    navigation.navigate('Notification')
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={HOMECOVER} style={styles.image}>
        <SafeAreaView
          style={{
            flex: 1,
            flexDirection: 'row',
          }}
        >
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            {notgoback ? null : (
              <TouchableOpacity
                onPress={goBack}
                style={{
                  position: 'absolute',
                  left: 0,
                  padding: moderateScale(10),
                }}
              >
                <Image style={CommonStyles.iconSize} source={BACKBTN} />
              </TouchableOpacity>
            )}
            <Text style={styles.text}>{title}</Text>
            <View
              style={{
                position: 'absolute',
                flexDirection: 'row',
                width: moderateScale(80),
                right: 0,
                justifyContent: 'space-between',
              }}
            >
              <TouchableOpacity
                onPress={onNavigateCart}
                style={styles.iconLeft}
              >
                <Image style={CommonStyles.iconSize} source={CART} />
                {badge ? (
                  <View style={styles.badge}>
                    <Badge number={badge} />
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity
                onPress={onNavigateNotification}
                style={styles.iconLeft}
              >
                <Image style={CommonStyles.iconSize} source={BELL} />
                {badgeNotification ? (
                  <View style={styles.badge}>
                    <Badge number={badgeNotification} />
                  </View>
                ) : null}
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleDrawer} style={styles.iconLeft}>
                <Image style={CommonStyles.iconSize} source={MENUTHREEDOT} />
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    // flex: 1 / 10,
    height: WIN_HEIGHT / 10,
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: CommonVariables.whiteColor,
    fontSize: moderateScale(15),
    fontWeight: 'bold',
  },
  iconLeft: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: moderateScale(10),
  },
  badge: {
    position: 'absolute',
    top: 5,
  },
})
