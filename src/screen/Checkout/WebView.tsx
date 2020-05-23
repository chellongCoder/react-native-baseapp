import React, { useState, useEffect, useRef } from 'react'
import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import Modal from 'react-native-modal'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import AutoHeightWebView from 'react-native-autoheight-webview'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { ICheckout } from '../../stores/object/cart.object'
import {
  getOrderDetail,
  deleteOrder,
  getOrders,
} from '../../stores/actions/order.action'
import { IOrder, PAID, IOrderStatus } from '../../stores/object/order.object'
import { getCart } from '../../stores/actions/cart.action'
import { ORDER_X } from '../../utils/icon'
import * as Animatable from 'react-native-animatable'
import NavigationServices from '../../services/NavigationServices'

let ref: any
interface IProps {
  setRef: (ref: any) => void;
  changeShowModalError: (bool: boolean, isSuccess: boolean) => void;
  changeShowModal: (bool: boolean) => void;
}
export default ({ setRef, changeShowModal, changeShowModalError }: IProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const checkoutData: ICheckout = useSelector(
    (state: RootState) => state.checkout.checkoutData
  )
  const orderDetail: IOrder = useSelector(
    (state: RootState) => state.order.orderDetail
  )
  const orderStatus: IOrderStatus[] = useSelector(
    (state: RootState) => state.order.orderStatus
  )
  const dispatch = useDispatch()
  const close = async () => {
    setIsLoading(true)
    await dispatch(getOrderDetail(checkoutData.id))
    setIsVisible(false)
  }

  const show = () => {
    setIsVisible(true)
  }

  ref = useRef({ show, close })

  useEffect(() => {
    setRef(ref)
    if (orderDetail && orderDetail.status_code === orderStatus[3].name) {
      changeShowModal(true)
    } else if (orderDetail && orderDetail.status_code !== orderStatus[3].name) {
      NavigationServices.resetStack('Cart')
      dispatch(deleteOrder(orderDetail.id))
    }
  }, [orderDetail])

  const onBackButtonPressAndroid = () => {
    close()
  }

  const onBackdropPress = () => {
    close()
  }

  console.log('====================================')
  console.log(checkoutData)
  console.log('====================================')

  return (
    <View>
      <Modal
        // onBackdropPress={onBackdropPress}
        isVisible={isVisible}
        // isVisible={false}
        deviceWidth={WIN_WIDTH}
        // onSwipeComplete={close}
        deviceHeight={WIN_HEIGHT}
        onBackButtonPress={onBackButtonPressAndroid}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
        }}
      >
        <View
          style={{
            flex: 9 / 10,
            borderTopLeftRadius: moderateScale(10),
            borderTopRightRadius: moderateScale(10),
            alignItems: 'center',
          }}
        >
          <AutoHeightWebView
            style={{
              width: WIN_WIDTH,
              height: 300,
              borderTopLeftRadius: moderateScale(10),
              borderTopRightRadius: moderateScale(10),
              backgroundColor: CommonVariables.whiteColor,
              zIndex: 999,
            }}
            source={{
              uri: !checkoutData
                ? 'https://reactnative.dev/'
                : checkoutData.payment_url,
            }}
          />
          {/* <TextInput style={{ width: 100, backgroundColor: 'red' }} /> */}
        </View>

        <Animatable.View
          animation="zoomIn"
          style={{
            position: 'absolute',
            alignSelf: 'center',
            top: moderateScale(20),
            backgroundColor: CommonVariables.whiteColor,
            padding: moderateScale(10),
            borderRadius: moderateScale(20),
          }}
        >
          {!isLoading ? (
            <TouchableOpacity onPress={close}>
              <Image source={ORDER_X} style={CommonStyles.iconSize} />
            </TouchableOpacity>
          ) : (
            <ActivityIndicator />
          )}
        </Animatable.View>
      </Modal>
    </View>
  )
}
