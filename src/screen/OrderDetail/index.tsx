import React, { Component } from 'react'
import { Text, View, Image, ScrollView } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import I18n from '../../i18n/index'
import { moderateScale } from '../../styles/common.variables'
import { ORDERDETAIL_LOCATION, ORDERDETAIL_USER } from '../../utils/icon'
import CommonStyles from '../../utils/common.styles'
import Product from './Product'
import Shipping from './Shipping'
import Payment from './Payment'
import Status from './Status'
import Button from './Button'
import ImageView from 'react-native-image-viewing'
import { PRODUCT1 } from '../../utils/image'
import { useNavigation } from '@react-navigation/native'
import { connect } from 'react-redux'
import { RootState } from '../../stores/reducers'
import {
  getOrderDetail,
  getDetailOrderFullfilled,
} from '../../stores/actions/order.action'
import { IOrder } from '../../stores/object/order.object'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
  getOrderDetail: (orderId: number) => void;
  orderDetail: IOrder | undefined;
  changeDetailOrderFullfilled: (data: IOrder | undefined) => void;
}
class OrderDetail extends Component<IProps> {
  state = {
    visibleImage: false,
  }
  onRequestClose = () => {
    this.setState({ visibleImage: false })
  }
  onShowImage = () => {
    this.setState({ visibleImage: true })
  }
  componentDidMount() {
    const { getOrderDetail, navigation } = this.props
    console.log('====================================')
    console.log(navigation.state.params)
    console.log('====================================')
    const { orderId } = navigation.state.params
    getOrderDetail(orderId)
  }
  componentWillUnmount() {
    const { changeDetailOrderFullfilled } = this.props
    changeDetailOrderFullfilled(undefined)
  }
  render() {
    const { navigation, orderDetail } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={I18n.t('orderDetail.title')} />
        <ScrollView>
          <View style={styles.pnlIdOrder}>
            <View>
              <Text style={styles.lblIdOrder}>Mã đơn hàng</Text>
              <Text style={styles.lblCreateAt}>Ngày tạo</Text>
            </View>
            <View style={styles.pnlRight}>
              <Text style={styles.txtIdOrder}>{orderDetail?.id}</Text>
              <Text style={styles.txtCreateAt}>20/03/2020 - 12:03</Text>
            </View>
          </View>
          <View style={styles.fraUser}>
            <View style={styles.pnlUser}>
              <Image source={ORDERDETAIL_USER} style={CommonStyles.iconSize} />
              <View style={styles.pnlInfoUser}>
                <Text style={styles.lblBuyingUser}>Thông tin người mua</Text>
                <Text style={styles.txtBuyingUser}>
                  {orderDetail?.contact_name}
                </Text>
                <Text style={styles.txtBuyingUser}>
                  {orderDetail?.contact_phone}
                </Text>
              </View>
            </View>
            <View style={[styles.pnlUser, { paddingTop: moderateScale(10) }]}>
              <Image
                source={ORDERDETAIL_LOCATION}
                style={CommonStyles.iconSize}
              />
              <View style={styles.pnlInfoUser}>
                <Text style={styles.lblBuyingUser}>Địa chỉ nhận hàng</Text>
                <Text style={styles.txtBuyingUser}>
                  {orderDetail?.contact_address}
                </Text>
              </View>
            </View>
          </View>
          <Product onShowImage={this.onShowImage} />
          <Shipping />
          <Payment />
          <Status />
        </ScrollView>
        <Button />

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
  return {
    i18n: state.language.i18n,
    scrollY: state.ui.scrollY,
    orderDetail: state.order.orderDetail,
    provinces: state.delivery.provinces,
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  getOrderDetail: (orderId: number) => dispatch(getOrderDetail(orderId)),
  changeDetailOrderFullfilled: (data: any) =>
    dispatch(getDetailOrderFullfilled(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderDetail)
