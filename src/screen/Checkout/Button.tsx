import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from '../../i18n/index'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import CommonButton from '../../components/CommonButton'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { alertInfo, alertInfoOption } from '../../utils/common.util'
import { checkout } from '../../stores/actions/checkout.action'
import { ICart } from '../../stores/object/cart.object'
import { IOrder, ORDERED } from '../../stores/object/order.object'
import { getCart } from '../../stores/actions/cart.action'
import { getMe } from '../../stores/actions/home.action'
let refButton: any
interface IProps {
  changeShowModal: (bool: boolean) => void;
  changeShowModalError: (bool: boolean, isSuccess: boolean) => void;
  paymentId: number | undefined;
  note: string;
  showWebView: () => void;
}
export default ({
  changeShowModal,
  paymentId,
  note,
  showWebView,
  changeShowModalError,
}: IProps) => {
  const address = useSelector((state: RootState) => state.delivery.address)
  const choicedDeliveryOption = useSelector(
    (state: RootState) => state.delivery.choicedDeliveryOption
  )
  const products: ICart[] = useSelector(
    (state: RootState) => state.cart.products
  )
  const orderDetail: IOrder = useSelector(
    (state: RootState) => state.order.orderDetail
  )
  const dispatch = useDispatch()
  const setRefButton = (ref: any) => {
    refButton = ref
  }
  const onPress = async () => {
    // if (orderDetail && orderDetail.status_code === ORDERED && paymentId === 1) {
    //   showWebView()
    //   return
    // }
    alertInfoOption('Xác nhận thanh toán đơn hàng này?', '', async () => {
      //check xem đã có đơn hàng chưa, nếu có thì show webview để thanh toán
      try {
        console.log('====================================')
        console.log(
          'address',
          address,
          'choicedDeliveryOption',
          choicedDeliveryOption,
          'paymentId',
          paymentId,
          'note',
          note,
          'refWebView'
        )
        console.log('====================================')
        //
        if (!address?.address_id) {
          alertInfo('Chưa có địa chỉ nhận hàng')
          return
        }
        if (!products.length) {
          alertInfo('Chưa có sản phẩm nào trong giỏ hàng.')
          return
        }
        if (!choicedDeliveryOption) {
          alertInfo('Chưa chọn phương thức vận chuyển')
          return
        }
        if (typeof paymentId !== 'number') {
          alertInfo('Chưa chọn phương thức thanh toán')
          return
        }
        refButton.current.onAnimate()

        const data = {
          address_id: address.address_id,
          service_id: choicedDeliveryOption.service_id,
          payment_type: paymentId,
          user_note: note,
        }
        console.log('====================================')
        console.log(data)
        console.log('====================================')
        if (!paymentId) {
          //thanh toán khi nhận hàng
          await dispatch(checkout(data))
          dispatch(getCart())
          dispatch(getMe())
          changeShowModal(true)
          refButton.current.endAnimated()
          return
        }
        // thanh toán bằng vnpay thì show webview
        await dispatch(checkout(data))
        showWebView()
        refButton.current.endAnimated()
      } catch (error) {
        console.log('====================================')
        console.log(error)
        console.log('====================================')
        changeShowModalError(true, false)
      }
    })
  }
  return (
    <View style={styles.container}>
      <CommonButton
        setRefButton={setRefButton}
        onPress={onPress}
        text={`Thanh toán`.toUpperCase()}
        isAnimated={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: WIN_WIDTH,
    bottom: 0,
    padding: moderateScale(15),
    backgroundColor: CommonVariables.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 0,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },

  checkout: {
    backgroundColor: '#E55353',
    paddingVertical: moderateScale(7),
    borderRadius: moderateScale(5),
    alignItems: 'center',
    flex: 1,
  },
  txtContact: {
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
