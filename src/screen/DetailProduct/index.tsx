import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import I18n from '../../i18n/index'
import { useNavigation } from '@react-navigation/native'
import OverView from './OverView'
import FeeTransfer from './FeeTransfer'
import Share from './Share'
import Detail from './Detail'
import SuggestProduct from './SuggestProduct'
import product from './data'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import { addCart } from '../../stores/actions/cart.action'
import {
  getDetailProduct,
  getRelateProduct,
} from '../../stores/actions/product.action'
import Comment from './Comment'
import InputComment from './InputComment'
interface IProps {
  i18n: any;
  navigation: ReturnType<typeof useNavigation>;
  addCart: Function;
  message: string;
  getDetailProduct: Function;
  getRelateProduct: Function;
  product: any;
  related: any;
}
class DetailProduct extends Component<IProps> {
  refInput: any
  state = {
    inputValue: '',
  }
  changeInputValue = (text: string) => {
    this.setState({ inputValue: text })
  }

  setRefInput = (ref: any) => {
    this.refInput = ref
  }

  showInputComment = () => {
    this.refInput.current.show()
  }

  onPress = async () => {
    const { addCart, message, product } = this.props
    await addCart(product.id, 1)
    // if (message) {
    //   Alert.alert(message)
    // }
  }
  componentDidMount() {
    const { navigation, getDetailProduct, getRelateProduct } = this.props
    const productId = navigation.getParam('productId', 0)
    getDetailProduct(productId)
    getRelateProduct(productId)
  }
  render() {
    const { navigation, product, related } = this.props
    const productId = navigation.getParam('productId', 0)
    return (
      <View style={{ justifyContent: 'flex-end', flex: 1 }}>
        <Header navigation={navigation} title={I18n.t('detailProduct.title')} />
        <ScrollView
          contentContainerStyle={{
            backgroundColor: '#F4F4F4',
            justifyContent: 'space-between',
            paddingBottom: 20,
          }}
        >
          <OverView product={product} />
          <FeeTransfer product={product} />
          <Share product={product} />
          <Detail product={product} />
          <Comment
            productId={productId}
            showInputComment={this.showInputComment}
          />
          <SuggestProduct products={related} />
        </ScrollView>
        <View style={styles.footer}>
          <View style={styles.btnPurchaseView}>
            <TouchableOpacity
              style={styles.btnPurchase}
              onPress={() => {
                this.onPress()
              }}
            >
              <Text style={styles.txtPurcharseBtn}>
                {I18n.t(['cart', 'purchase'])}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <InputComment
          changeInputValue={this.changeInputValue}
          inputValue={this.state.inputValue}
          setRef={this.setRefInput}
          productId={productId}
        />
      </View>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {
    i18n: state.language.i18n,
    string: state.cart.message,
    product: state.product.product,
    related: state.product.relates,
    //   product: product,
  }
}
const mapDispatchToProps = {
  addCart,
  getDetailProduct,
  getRelateProduct,
}
export default connect(mapStateToProps, mapDispatchToProps)(DetailProduct)
