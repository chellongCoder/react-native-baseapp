import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Animated,
  Keyboard,
} from 'react-native'
import APIService from '../../services/api'
import styles from './styles'
import { HOMECOVER, HOME_ICON } from '../../utils/image'
import CommonStyles, {
  CommonVariables,
  HEADER_EXPANDED_HEIGHT,
  HEADER_COLLAPSED_HEIGHT,
  RED,
  BLACK,
} from '../../utils/common.styles'
import { SEARCH, CART, BELL, MENUTHREEDOT, SEARCH_BACK } from '../../utils/icon'
import {
  moderateScale,
  WIN_HEIGHT,
  WIN_WIDTH,
} from '../../styles/common.variables'
import Badge from '../../components/Badge'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import I18n from 'i18n-js'
import Card from './Card'
import Tabbar from './Tabbar'
import NavigationServices from '../../services/NavigationServices'
import Search from '../Search'
import * as Animatable from 'react-native-animatable'
import { Dispatch } from 'redux'
import { useNavigation, DrawerActions } from '@react-navigation/native'
import { getCategory } from '../../stores/actions/category.action'
import { getProduct, refresh } from '../../stores/actions/home.action'
import { getProvince, getUser } from '../../stores/actions/delivery.action'
import { getProductsByQuery } from '../../stores/actions/search.action'
import { getOrderStatus } from '../../stores/actions/order.action'
import { ICategory } from '../../stores/object/category.object'
import { INotification } from '../../stores/object/notfication.object'
interface IProps {
  i18n: any;
  scrollY: Animated.Value;
  getCategory: Function;
  getProduct: (pageNumber?: number, categoryId?: number) => void;
  getProvince: () => void;
  getUser: () => void;
  navigation: ReturnType<typeof useNavigation>;
  navigationDrawer: any;
  provinces: any[];
  getProductsByQuery: (query: string) => void;
  getOrderStatus: () => void;
  badge: number;
  refresh: (pageNumber: number, categoryId: number) => void;
  category: ICategory[];
  badgeNotification: number;
}
class Home extends Component<IProps> {
  animatedWidth = new Animated.Value((WIN_WIDTH * 5.5) / 10)
  opacity = new Animated.Value(CommonVariables.OPACITY_SHOW)
  backgroundColor = new Animated.Value(CommonVariables.OPACITY_HIDE)
  refInput: any
  searchInput: string = ''
  state = {
    isSearch: false,
  }

  onPressCategory = (item: any, isFavorite: boolean) => {
    console.log('item', item, 'isFavorite', isFavorite)
  }
  onNavigateCart = () => {
    // switchLanguage('en', this)
    NavigationServices.navigate('Cart')
  }
  onNavigateNotification = () => {
    NavigationServices.navigate('Notification')
  }
  onFocusSearch = async () => {
    Animated.timing(this.animatedWidth, {
      toValue: WIN_WIDTH - WIN_WIDTH / 10 - moderateScale(30),
      duration: CommonVariables.DURATION,
    }).start()
    Animated.timing(this.opacity, {
      toValue: CommonVariables.OPACITY_HIDE,
      duration: CommonVariables.DURATION,
    }).start()
    Animated.timing(this.backgroundColor, {
      toValue: RED,
      duration: CommonVariables.DURATION,
    }).start()
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({ isSearch: true })
        resolve()
      }, CommonVariables.DURATION)
    })
  }

  onChangeText = (text: string) => {
    this.searchInput = text
  }

  onSubmitEditing = async () => {
    const { getProductsByQuery } = this.props

    Animated.timing(this.animatedWidth, {
      toValue: (WIN_WIDTH * 5.5) / 10,
      duration: CommonVariables.DURATION,
    }).start()
    Animated.timing(this.opacity, {
      toValue: CommonVariables.OPACITY_SHOW,
      duration: CommonVariables.DURATION,
    }).start()
    Animated.timing(this.opacity, {
      toValue: CommonVariables.OPACITY_SHOW,
      duration: CommonVariables.DURATION,
    }).start()
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        this.setState({ isSearch: false })
        resolve()
      }, CommonVariables.DURATION)
    })

    this.searchInput && getProductsByQuery(this.searchInput)
  }

  toggleDrawer = () => {
    const { navigationDrawer } = this.props
    navigationDrawer.toggleDrawer()
  }

  async componentDidMount() {
    console.log('====================================')
    console.warn('render')
    console.log('====================================')
    const {
      getCategory,
      getOrderStatus,
      getProvince,
      provinces,
      getUser,
      refresh,
      category,
    } = this.props
    getCategory()
    if (!provinces.length) {
      getProvince()
    }
    getUser()
    getOrderStatus()
    // refresh(1, category[0].id)
  }

  render() {
    const { scrollY, badge, badgeNotification } = this.props
    const headerHeight = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [HEADER_EXPANDED_HEIGHT, HEADER_COLLAPSED_HEIGHT],
      extrapolate: 'clamp',
    })
    const searchOpacity = scrollY.interpolate({
      inputRange: [0, HEADER_EXPANDED_HEIGHT - HEADER_COLLAPSED_HEIGHT],
      outputRange: [CommonVariables.OPACITY_SHOW, CommonVariables.OPACITY_HIDE],
      extrapolate: 'clamp',
    })
    const backgroundSearch = this.backgroundColor.interpolate({
      inputRange: [BLACK, RED],
      outputRange: [CommonVariables.whiteColor, '#F3F3F3'],
    })

    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.cover,
            { height: headerHeight, opacity: this.opacity },
          ]}
        >
          <Image style={CommonStyles.imageCover} source={HOMECOVER} />
        </Animated.View>

        <SafeAreaView>
          <Animated.View
            style={[styles.searchSection, { opacity: searchOpacity }]}
          >
            <TouchableOpacity
              onPress={() => {
                this.onSubmitEditing()
                Keyboard.dismiss()
              }}
              style={styles.iconHome}
            >
              {!this.state.isSearch ? (
                <Animatable.View
                  duration={CommonVariables.DURATION}
                  animation={this.state.isSearch ? 'fadeOut' : 'fadeIn'}
                >
                  <Image style={CommonStyles.image} source={HOME_ICON} />
                </Animatable.View>
              ) : (
                <Animatable.View
                  duration={CommonVariables.DURATION}
                  animation={this.state.isSearch ? 'fadeIn' : 'fadeOut'}
                >
                  <Image source={SEARCH_BACK} style={CommonStyles.iconSize} />
                </Animatable.View>
              )}
            </TouchableOpacity>

            <Animated.View
              style={[
                styles.inputSearch,
                {
                  width: this.animatedWidth,
                  backgroundColor: backgroundSearch,
                },
              ]}
            >
              <Image source={SEARCH} style={CommonStyles.iconSizeSmall} />
              <TextInput
                style={{
                  flex: 1,
                  borderRadius: moderateScale(15),
                  paddingVertical: 0,
                  paddingLeft: moderateScale(5),
                }}
                onFocus={this.onFocusSearch}
                placeholder={I18n.t(['home', 'search'], { count: 2 })}
                returnKeyType="search"
                onSubmitEditing={this.onSubmitEditing}
                ref={ref => (this.refInput = ref)}
                onChangeText={this.onChangeText}
              />
            </Animated.View>
            <Animated.View
              onPress={this.onNavigateCart}
              style={{
                width: WIN_WIDTH / 10,
                opacity: this.opacity,
              }}
            >
              <TouchableOpacity
                onPress={this.onNavigateCart}
                style={{
                  alignItems: 'center',
                }}
              >
                <Image source={CART} style={CommonStyles.iconSize} />
                {badge ? (
                  <View style={styles.badge}>
                    <Badge number={badge} />
                  </View>
                ) : null}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              onPress={this.onNavigateNotification}
              style={{ width: WIN_WIDTH / 10, opacity: this.opacity }}
            >
              <TouchableOpacity
                onPress={this.onNavigateNotification}
                style={{
                  alignItems: 'center',
                }}
              >
                <Image source={BELL} style={CommonStyles.iconSize} />
                {badgeNotification ? (
                  <View style={styles.badge}>
                    <Badge number={badgeNotification} />
                  </View>
                ) : null}
              </TouchableOpacity>
            </Animated.View>
            <Animated.View
              onPress={this.onNavigateNotification}
              style={{
                width: WIN_WIDTH / 10,
                opacity: this.opacity,
              }}
            >
              <TouchableOpacity
                onPress={this.toggleDrawer}
                style={{
                  alignItems: 'center',
                }}
              >
                <Image source={MENUTHREEDOT} style={CommonStyles.iconSize} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          {!this.state.isSearch ? (
            <Animated.View
              style={{
                height: WIN_HEIGHT + moderateScale(50),
                opacity: this.opacity,
              }}
            >
              <Card scrollY={scrollY} />
              <Tabbar />
            </Animated.View>
          ) : null}
        </SafeAreaView>
        {this.state.isSearch ? <Search /> : null}
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    i18n: state.language.i18n,
    scrollY: state.ui.scrollY,
    navigationDrawer: state.ui.navigationDrawer,
    provinces: state.delivery.provinces,
    badge: state.cart.badge,
    category: state.category.categoriesProduct,
    badgeNotification: state.notification.badge,
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  getProduct: (pageNumber?: number, categoryId?: number) =>
    dispatch(getProduct(pageNumber, categoryId)),
  getCategory: () => dispatch(getCategory()),
  getProvince: () => dispatch(getProvince()),
  getUser: () => dispatch(getUser()),
  getProductsByQuery: (query: string) => dispatch(getProductsByQuery(query)),
  getOrderStatus: () => dispatch(getOrderStatus()),
  refresh: (pageNumber: number, categoryId: number) =>
    dispatch(refresh(pageNumber, categoryId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
