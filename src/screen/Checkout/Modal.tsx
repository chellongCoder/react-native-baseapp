import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import {
  WIN_HEIGHT,
  WIN_WIDTH,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { CHECKOUT_FAIL, CHECKOUT_SUCCESS } from '../../utils/image'
import * as Animatable from 'react-native-animatable'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import NavigationServices from '../../services/NavigationServices'
import SCREEN from '../../utils/screen.constant'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { formatCurrency } from '../../utils/common.util'

interface IProps {
  isSuccess: boolean;
  changeShowModal: (bool: boolean) => void;
}
export default ({ isSuccess, changeShowModal }: IProps) => {
  const summary: any = useSelector((state: RootState) => state.cart.summary)

  const shippingFee = useSelector(
    (state: RootState) => state.delivery.choicedDeliveryOption?.fee
  )

  const hideModal = () => {
    console.log('asdasd')
    changeShowModal(false)
  }
  const hideModalError = () => {
    console.log('asdasd')
    changeShowModal(false)
  }
  const onNavigateProduct = () => {
    hideModal()
    NavigationServices.goBack()
    NavigationServices.navigate(SCREEN.BOTTOM_TABBAR.HOME_STACK.HOME)
  }
  if (isSuccess) {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: WIN_WIDTH,
            height: WIN_HEIGHT,
            justifyContent: 'center',
          }}
        >
          <Animatable.View animation="bounceIn" style={styles.content}>
            <View style={styles.value}>
              <Text style={{ color: '#595858' }}>Giá trị đơn hàng:</Text>
              <Text
                style={{
                  color: '#707070',
                  fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
                }}
              >
                {formatCurrency(summary?.total_paid + shippingFee)} VNĐ
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: moderateScale(10),
              }}
            >
              <View
                style={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                  marginVertical: moderateScale(10),
                }}
              >
                <Image style={CommonStyles.image} source={CHECKOUT_SUCCESS} />
              </View>
              <Text
                style={{
                  color: '#707070',
                  fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
                  fontSize: moderateScale(15),
                  textAlign: 'center',
                }}
              >
                Thanh toán thành công
              </Text>
              <Text style={{ color: '#595858', textAlign: 'center' }}>
                Cảm ơn bạn đã sử dụng dịch vụ
              </Text>
              <TouchableOpacity
                onPress={onNavigateProduct}
                style={{
                  backgroundColor: '#E55353',
                  marginVertical: moderateScale(20),
                  padding: moderateScale(10),
                  borderRadius: moderateScale(5),
                }}
              >
                <Text
                  style={{
                    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
                    color: CommonVariables.whiteColor,
                  }}
                >
                  {`Mua sắm tiếp`.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <View
          style={{
            width: WIN_WIDTH,
            height: WIN_HEIGHT,
            justifyContent: 'center',
          }}
        >
          <Animatable.View animation="bounceIn" style={styles.content}>
            <View
              style={{
                alignItems: 'center',
                paddingVertical: moderateScale(10),
                paddingHorizontal: moderateScale(20),
              }}
            >
              <View
                style={{
                  width: moderateScale(60),
                  height: moderateScale(60),
                  marginVertical: moderateScale(10),
                }}
              >
                <Image style={CommonStyles.image} source={CHECKOUT_FAIL} />
              </View>
              <Text
                style={{
                  color: '#707070',
                  fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
                  fontSize: moderateScale(15),
                  textAlign: 'center',
                }}
              >
                Đã có lỗi xảy ra trong quá trình thanh toán
              </Text>
              <Text
                style={{
                  color: '#595858',
                  textAlign: 'center',
                  paddingVertical: moderateScale(10),
                }}
              >
                Phương thức thanh toán không khả dụng. Vui lòng kiểm tra lại
                thông tin thanh toán và thử lại.
              </Text>
              <TouchableOpacity
                onPress={hideModalError}
                style={{
                  backgroundColor: '#E55353',
                  padding: moderateScale(10),
                  borderRadius: moderateScale(5),
                  marginVertical: moderateScale(5),
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
                    color: CommonVariables.whiteColor,
                  }}
                >
                  {`Đổi phương thức thanh toán`.toUpperCase()}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  borderColor: '#E55353',
                  padding: moderateScale(10),
                  borderRadius: moderateScale(5),
                  borderWidth: 0.5,
                  marginVertical: moderateScale(5),
                  width: '100%',
                  alignItems: 'center',
                }}
              >
                <Text
                  style={{
                    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
                    color: '#E55353',
                  }}
                >
                  {`Thoát`.toUpperCase()}
                </Text>
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: WIN_HEIGHT,
    width: WIN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  content: {
    backgroundColor: CommonVariables.whiteColor,
    marginHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  value: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: '#A7A7A7',
    marginHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
})
