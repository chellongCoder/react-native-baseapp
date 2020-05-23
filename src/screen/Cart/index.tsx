import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native'
import styles from './styles'
import { HOMECOVER, EMPTYCART, PRODUCT1 } from '../../utils/image'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { CART, BELL, MENUTHREEDOT, BACKBTN, TRASH } from '../../utils/icon'
import { moderateScale, WIN_HEIGHT } from '../../styles/common.variables'
import Badge from '../../components/Badge'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import { getCart, putCart, delCart } from '../../stores/actions/cart.action'
import { switchLanguage } from '../../i18n'
import I18n from 'i18n-js'
import AddRemoveProduct from '../Checkout/AddRemoveProduct'
import Header from '../../components/Header'
import { formatCurrency } from '../../utils/common.util'
import { useNavigation } from '@react-navigation/native'
import NavigationServices from '../../services/NavigationServices'
import SCREEN from '../../utils/screen.constant'

interface IProps {
  navigation: ReturnType<typeof useNavigation>;
  i18n: any;
  products: [];
  getCart: Function;
  totalPrice: number;
  putCart: Function;
  message: string;
  delCart: Function;
}

class Cart extends Component<IProps> {
  emptyCart = () => {
    return (
      <View style={styles.mainView}>
        <View style={styles.imgView}>
          <Image source={EMPTYCART} style={styles.img} />
          <Text style={styles.emptyTxt}>{I18n.t(['cart', 'emptyCart'])}</Text>
        </View>
      </View>
    )
  }
  async componentDidMount() {
    const { getCart } = this.props
    await getCart()
    //this.
    // console.log('totalPrice', totalPrice)
  }
  // renderListProducts = () => {
  //   return (
  //     <ScrollView style={{ flex: 1 }}>
  //       {this.props.products.map(item => {
  //         return (
  //           <View style={styles.itemView}>
  //             <Image style={styles.imgProduct} source={PRODUCT1} />
  //             <View style={styles.infoView}>
  //               <View style={styles.nameView}></View>
  //               <View style={styles.quantityView}></View>
  //             </View>
  //           </View>
  //         )
  //       })}
  //     </ScrollView>
  //   )
  // }

  onCheckout = () => {
    const { products } = this.props
    products.length &&
      NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.CART_STACK.CHECKOUT)
  }

  onShopping = () => {
    NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.SHOPPING_STACK.PRODUCTLIST)
  }
  renderItem = item => {
    //  console.log('renderItem', item)
    const { putCart, delCart } = this.props
    return (
      <View style={styles.itemView} key={Number(item.id)}>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Image style={styles.imgProduct} source={{ uri: item.cover }} />
        </View>

        <View style={styles.infoView}>
          <View style={styles.nameView}>
            <View style={styles.nameAndPrice}>
              <Text style={styles.nameTxt}>
                {item.name.length <= 40 ? item.name : item.name.slice(0, 40)}
              </Text>
              <Text style={styles.priceTxt}>
                {formatCurrency(item.price)} {I18n.t(['common', 'VNDCurrency'])}
              </Text>
            </View>
            <View style={styles.trashView}>
              <TouchableOpacity
                onPress={rowId => {
                  delCart(item.rowId)
                }}
              >
                <Image
                  source={TRASH}
                  style={{ width: moderateScale(15), resizeMode: 'contain' }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.quantityView}>
            <AddRemoveProduct
              rowId={item.rowId}
              quantity={item.qty}
              putCart={(rowId: string, qty: number) => putCart(rowId, qty)}
            />
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        {/* <View style={styles.cover}>
          <Image style={CommonStyles.imageCover} source={HOMECOVER} />
        </View> */}
        <Header
          navigation={navigation}
          title={I18n.t(['cart', 'title'])}
          notgoback="true"
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F9F9F9' }}>
          {this.props.products.length == 0 ? (
            this.emptyCart()
          ) : (
            <View style={{ flex: 1 }}>
              <FlatList
                data={this.props.products}
                renderItem={({ item }) => this.renderItem(item)}
                keyExtractor={item => `${item.id}`}
                extraData={this.props.products}
              />

              <View style={styles.footer}>
                <View style={styles.infoCart}>
                  <View style={styles.totalView}>
                    <Text style={styles.totalTxt}>
                      {I18n.t(['cart', 'total'])}
                    </Text>
                  </View>
                  <View style={styles.totalPriceView}>
                    <Text style={styles.totalPriceTxt}>
                      {formatCurrency(this.props.totalPrice)}{' '}
                      {I18n.t(['common', 'VNDCurrency'])}
                    </Text>
                  </View>
                </View>
                <View style={styles.btnPurchaseView}>
                  <TouchableOpacity
                    onPress={this.onCheckout}
                    style={styles.btnPurchase}
                  >
                    <Text style={styles.txtPurcharseBtn}>
                      {I18n.t(['cart', 'purchase'])}
                    </Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.btnPurchaseView}>
                  <TouchableOpacity
                    onPress={this.onShopping}
                    style={styles.btnAdd}
                  >
                    <Text
                      style={[styles.txtPurcharseBtn, { color: '#E65353' }]}
                    >
                      {I18n.t(['cart', 'addItem'])}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          )}
        </SafeAreaView>
      </View>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    i18n: state.language.i18n,
    products: state.cart.products,
    totalPrice: state.cart.totalPrice,
    message: state.cart.message,
  }
}
const mapDispatchToProps = {
  getCart,
  putCart,
  delCart,
}
export default connect(mapStateToProps, mapDispatchToProps)(Cart)
