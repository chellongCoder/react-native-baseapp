import React, { Component } from 'react'
import { Text, View, ScrollView } from 'react-native'
import Header from '../../components/Header'
import I18n from '../../i18n/index'
import styles from './styles'
import Address from './Address'
import Product from './Product'
import ImageView from 'react-native-image-viewing'
import Shipping from './Shipping'
import CheckoutBy from './CheckoutBy'
import Voucher from './Voucher'
import Note from './Note'
import EndingCheckout from './EndingCheckout'
import Button from './Button'
import { useNavigation } from '@react-navigation/native'
import Modal from './Modal'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import { getUser, getShipping } from '../../stores/actions/delivery.action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import WebView from './WebView'
import {
  resetStore,
  getDetailOrderFullfilled,
} from '../../stores/actions/order.action'

interface IProps {
  navigation: ReturnType<typeof useNavigation>;
  getShipping: () => void;
  resetStore: () => void;
  getDetailOrderFullfilled: (data: any) => void;
}
class Checkout extends Component<IProps> {
  refWebView: any

  setRefWebView = (ref: any) => {
    this.refWebView = ref
  }

  state = {
    visibleImage: false,
    iShowModal: false,
    paymentId: undefined,
    note: '',
    isSuccess: true,
  }
  onRequestClose = () => {
    this.setState({ visibleImage: false })
  }
  onShowImage = () => {
    this.setState({ visibleImage: true })
  }
  changeShowModal = (bool: boolean) => {
    this.setState({ iShowModal: bool })
  }
  changeShowModalError = (bool: boolean) => {
    this.setState({ iShowModal: bool, isSuccess: false })
  }
  changePaymentId = (paymentId: number) => {
    this.setState({ paymentId })
  }
  onChangeNote = (note: string) => {
    this.setState({ note })
  }
  showWebView = () => {
    this.refWebView.current.show()
  }

  componentDidMount() {
    const { getShipping } = this.props
    getShipping()
  }

  componentWillUnmount() {
    const { getDetailOrderFullfilled } = this.props
    getDetailOrderFullfilled(undefined)
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={I18n.t('checkout.title')} />
        <KeyboardAwareScrollView>
          <Address />
          <Product onShowImage={this.onShowImage} />
          <Shipping />
          <CheckoutBy
            changePaymentId={this.changePaymentId}
            paymentId={this.state.paymentId}
          />
          <Voucher />
          <Note onChangeNote={this.onChangeNote} />
          <EndingCheckout />
          <WebView
            setRef={this.setRefWebView}
            changeShowModalError={this.changeShowModalError}
            changeShowModal={this.changeShowModal}
          />
          <Button
            changeShowModal={this.changeShowModal}
            changeShowModalError={this.changeShowModalError}
            paymentId={this.state.paymentId}
            note={this.state.note}
            showWebView={this.showWebView}
          />
        </KeyboardAwareScrollView>
        {this.state.iShowModal ? (
          <Modal
            isSuccess={this.state.isSuccess}
            changeShowModal={this.changeShowModal}
          />
        ) : null}
        <ImageView
          images={[
            {
              uri:
                'https://betterstudio.com/wp-content/uploads/2019/05/1-1-instagram-1024x1024.jpg',
            },
            {
              uri:
                'https://betterstudio.com/wp-content/uploads/2019/05/1-1-instagram-1024x1024.jpg',
            },
          ]}
          animationType="slide"
          imageIndex={0}
          visible={this.state.visibleImage}
          onRequestClose={this.onRequestClose}
          presentationStyle="overFullScreen"
        />
      </View>
    )
  }
}
const mapStateToProps = (state: RootState) => {
  return {}
}
const mapDispatchToProps = (dispatch: any) => ({
  getShipping: () => dispatch(getShipping()),
  resetStore: () => dispatch(resetStore()),
  getDetailOrderFullfilled: (data: any) =>
    dispatch(getDetailOrderFullfilled(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
