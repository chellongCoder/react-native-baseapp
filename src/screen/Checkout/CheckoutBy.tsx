import React, { useState, useCallback } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_CHECKOUT_OPTION,
} from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import Checkbox from './../../components/Checkbox'
let ref1: any
let ref2: any
interface IProps {
  paymentId: any;
  changePaymentId: (paymentId: number) => void;
}
export default ({ changePaymentId, paymentId }: IProps) => {
  const order = useSelector((state: RootState) => state.order.order)
  const [mapRef, setMapRef] = useState(new Map<string, boolean>())
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const onChoiceCheckbox = (name: string, checked: boolean) => {
    console.log('name', name, 'check', checked)
    mapRef.forEach((value, key) => {
      mapRef.set(key, false)
    })
    mapRef.set(name, true)
    setMapRef(mapRef)
    forceUpdate()
    changePaymentId(Number(name))
  }

  const choiceCheckbox = (ref: any) => {
    ref._toggleCheck()
  }

  console.log('====================================')
  console.log(paymentId)
  console.log('====================================')

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          borderBottomWidth: 0.5,
          paddingBottom: moderateScale(10),
          borderBottomColor: '#CFCFCF',
        }}
      >
        <Image
          style={CommonStyles.iconSize}
          source={ORDERDETAIL_CHECKOUT_OPTION}
        />
        <Text style={styles.lbl}>Thanh toán</Text>
      </View>
      <View
        style={{
          marginLeft: moderateScale(10),
        }}
      >
        <TouchableOpacity
          onPress={() => choiceCheckbox(ref1)}
          style={styles.checkout}
        >
          <Checkbox
            ref={(ref: any) => {
              ref1 = ref
              mapRef.set('0', false)
            }}
            onChange={onChoiceCheckbox}
            name={'0'}
            checked={paymentId == 0 ? true : !!mapRef.get('0')}
            style={{
              backgroundColor: CommonVariables.whiteColor,
              color: CommonVariables.buttonColor,
              borderRadius: 10,
              borderColor: '#E55353',
            }}
            size={20}
          />
          <Text style={styles.txt}>Thanh toán khi nhận hàng</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => choiceCheckbox(ref2)}
          style={styles.checkout}
        >
          <Checkbox
            ref={(ref: any) => {
              ref2 = ref
              mapRef.set('1', false)
            }}
            onChange={onChoiceCheckbox}
            name={'1'}
            checked={paymentId == 1 ? true : !!mapRef.get('1')}
            style={{
              backgroundColor: CommonVariables.whiteColor,
              color: CommonVariables.buttonColor,
              borderRadius: 10,
              borderColor: '#E55353',
            }}
            size={20}
          />
          <Text style={styles.txt}>
            {I18n.t('orderDetail.paymentBy', { var: order.paymentOption })}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    // flexDirection: 'row',
    padding: moderateScale(10),
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: moderateScale(10),
  },
  lbl: {
    color: '#747474',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
    marginLeft: moderateScale(10),
  },
  txt: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    marginLeft: moderateScale(10),
  },
  checkout: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
})
