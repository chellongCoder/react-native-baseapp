import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  SafeAreaView,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Animated,
} from 'react-native'
import styles from './styles'
import CommonStyles, {
  CommonVariables,
  RED,
  BLACK,
} from '../../utils/common.styles'
import { HOMECOVER } from '../../utils/image'
import {
  moderateScale,
  WIN_WIDTH,
  WIN_HEIGHT,
} from '../../styles/common.variables'
import { SEARCH, CART, BELL, MENUTHREEDOT } from '../../utils/icon'
import Badge from '../../components/Badge'
import I18n from '../../i18n'
import ProductItem from './ProductItem'
import { connect } from 'react-redux'
import { RootState } from '../../stores/reducers'
import FilterContainer from '../../containers/filter.contaner'
import ListFullOption from '../../components/ListFullOption'
import Search from '../Search'
import Filter from './Filter'
import {
  getProduct,
  loadmore,
  refresh,
} from '../../stores/actions/shopping.action'
import APIService from './../../services/api'
import { SUCCESS_CODE } from '../../services/api.service'
import ListLoading from '../../components/ListLoading'
import { Dispatch } from 'redux'
import { ICategory } from '../../stores/object/category.object'
import NavigationServices from '../../services/NavigationServices'
import { getProductsByQueryShopping } from '../../stores/actions/search.action'

interface IProps {
  products: any[];
  getProduct: Function;
  loadingProducts: boolean;
  loadmore: Function;
  refresh: Function;
  isLoadMore: boolean;
  navigationDrawer: any;
  getProductsByQuery: (query: string) => void;
  badge: number;
  badgeNotification: number;
}
class ProductList extends Component<IProps> {
  animatedWidth = new Animated.Value((WIN_WIDTH * 7) / 10)
  opacity = new Animated.Value(CommonVariables.OPACITY_SHOW)
  backgroundColor = new Animated.Value(CommonVariables.OPACITY_HIDE)
  pageNumber = 1
  isLoadmore = true
  selectedCategory: ICategory | undefined
  searchInput: string = ''

  state = {
    isSearch: false,
  }
  renderProduct = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: Function
  ) => {
    return <ProductItem item={item} />
  }
  onFocusSearch = async () => {
    Animated.timing(this.animatedWidth, {
      toValue: WIN_WIDTH - WIN_WIDTH / 15,
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
    Animated.timing(this.animatedWidth, {
      toValue: (WIN_WIDTH * 7) / 10,
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
    const { getProductsByQuery } = this.props
    this.searchInput && getProductsByQuery(this.searchInput)
    // console.log('====================================')
    // console.log(this.searchInput)
    // console.log('====================================')
  }

  setPageNumber = (number: number) => {
    this.pageNumber = number
  }

  changeCategorySelected = (category: ICategory | undefined) => {
    this.selectedCategory = category
  }

  onLoadMore = async () => {
    const { loadmore, isLoadMore } = this.props
    this.pageNumber++
    if (this.selectedCategory) {
      isLoadMore && (await loadmore(this.pageNumber, this.selectedCategory.id))
    } else {
      isLoadMore && (await loadmore(this.pageNumber))
    }
  }

  onRefresh = async () => {
    const { refresh } = this.props
    this.pageNumber = 1
    if (this.selectedCategory) {
      await refresh(this.pageNumber, this.selectedCategory.id)
    } else {
      await refresh(this.pageNumber)
    }
  }

  toggleDrawer = () => {
    const { navigationDrawer } = this.props
    navigationDrawer.toggleDrawer()
  }

  componentDidMount() {
    const { getProduct } = this.props
    getProduct()
  }

  onnavigateCart = () => {
    NavigationServices.navigate('Cart')
  }

  onnavigateNotification = () => {
    NavigationServices.navigate('Notification')
  }

  render() {
    const {
      products,
      loadingProducts,
      getProduct,
      badge,
      badgeNotification,
    } = this.props
    const backgroundSearch = this.backgroundColor.interpolate({
      inputRange: [BLACK, RED],
      outputRange: [CommonVariables.whiteColor, '#F3F3F3'],
    })
    const backgroundCover = this.backgroundColor.interpolate({
      inputRange: [BLACK, RED],
      outputRange: ['#F3F3F3', CommonVariables.whiteColor],
    })

    return (
      <View style={styles.container}>
        <Animated.View
          style={[styles.cover, { backgroundColor: backgroundCover }]}
        >
          <Animated.View style={{ opacity: this.opacity }}>
            <Image style={CommonStyles.imageCover} source={HOMECOVER} />
          </Animated.View>
        </Animated.View>
        <SafeAreaView style={{ height: WIN_HEIGHT / 9 }}>
          <View style={styles.searchSection}>
            <Animated.View
              style={[
                styles.header,
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
                  marginLeft: moderateScale(10),
                }}
                onSubmitEditing={this.onSubmitEditing}
                onFocus={this.onFocusSearch}
                placeholder={I18n.t(['home', 'search'], { count: 2 })}
                onChangeText={this.onChangeText}
              />
            </Animated.View>
            <Animated.View
              style={{
                width: WIN_WIDTH / 10,
                opacity: this.opacity,
              }}
            >
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={this.onnavigateCart}
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
              style={{ width: WIN_WIDTH / 10, opacity: this.opacity }}
            >
              <TouchableOpacity
                style={{
                  alignItems: 'center',
                }}
                onPress={this.onnavigateNotification}
              >
                <Image source={BELL} style={CommonStyles.iconSize} />
                {badgeNotification ? (
                  <View style={styles.badge}>
                    <Badge number={badgeNotification} />
                  </View>
                ) : null}
              </TouchableOpacity>
            </Animated.View>
            <TouchableOpacity
              onPress={this.toggleDrawer}
              style={{ width: WIN_WIDTH / 10, alignItems: 'center' }}
            >
              <Image source={MENUTHREEDOT} style={CommonStyles.iconSize} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View
          style={{
            flex: 1,
          }}
        >
          {!this.state.isSearch ? (
            <View>
              <Filter
                setPageNumber={this.setPageNumber}
                changeCategorySelected={this.changeCategorySelected}
              />
              {!loadingProducts ? (
                <ListFullOption
                  style={styles.list}
                  scrollEnabled={true}
                  data={products}
                  loadMore={true}
                  renderSubItem={this.renderProduct}
                  ListEmptyComponent={() => (
                    <View>
                      <Text style={styles.empty}>không có sản phẩm nào</Text>
                    </View>
                  )}
                  onLoadMore={this.onLoadMore}
                  onRefreshEvent={this.onRefresh}
                />
              ) : (
                <ListLoading />
              )}
            </View>
          ) : null}
          {this.state.isSearch ? (
            <View
              style={{
                flex: 1,
              }}
            >
              <Search />
            </View>
          ) : null}
        </View>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    products: state.shopping.products,
    loadingProducts: state.shopping.loadingProducts,
    isLoadMore: state.shopping.isLoadMore,
    navigationDrawer: state.ui.navigationDrawer,
    badge: state.cart.badge,
    badgeNotification: state.notification.badge,
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  getProduct: (pageNumber?: number, categoryId?: number) =>
    dispatch(getProduct(pageNumber, categoryId)),
  loadmore: (pageNumber?: number, categoryId?: number) =>
    dispatch(loadmore(pageNumber, categoryId)),
  refresh: (pageNumber?: number, categoryId?: number) =>
    dispatch(refresh(pageNumber, categoryId)),
  getProductsByQuery: (query: string) =>
    dispatch(getProductsByQueryShopping(query)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)
