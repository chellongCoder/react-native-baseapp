import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from '../../i18n/index'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import CommonButton from '../../components/CommonButton'
import { IDeliveryOption } from '../../stores/object/delivery.object'
import { useDispatch } from 'react-redux'
import { choiceDeliveryOption } from '../../stores/actions/delivery.action'
import NavigationServices from '../../services/NavigationServices'
let refButton: any
interface IProps {
  deliveryOption: IDeliveryOption | undefined;
}
export default ({ deliveryOption }: IProps) => {
  const setRefButton = (ref: any) => {
    refButton = ref
  }

  const dispatch = useDispatch()

  const onPress = () => {
    console.log('====================================')
    console.log(deliveryOption)
    console.log('====================================')
    deliveryOption && dispatch(choiceDeliveryOption(deliveryOption))
    NavigationServices.goBack()
  }

  return (
    <View style={styles.container}>
      <CommonButton
        setRefButton={setRefButton}
        onPress={onPress}
        text={`Xác nhận`.toUpperCase()}
        isAnimated={true}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(30),
  },
})
