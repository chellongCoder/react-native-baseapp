import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'
import Checkbox from '../../components/Checkbox'
import I18n from '../../i18n/index'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { IDeliveryOption } from '../../stores/object/delivery.object'

const refs: any[] = []
interface IProps {
  changeDeliveryOption: (deliveryOption: IDeliveryOption) => void;
}

export default ({ changeDeliveryOption }: IProps) => {
  const [mapRef, setMapRef] = useState(new Map<string, boolean>())
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])
  const shipping: IDeliveryOption[] = useSelector(
    (state: RootState) => state.delivery.shipping
  )
  console.log('====================================')
  console.log(shipping)
  console.log('====================================')
  const onChoiceCheckbox = (name: string, checked: boolean) => {
    console.log('name', JSON.parse(name), 'check', checked)
    const value: IDeliveryOption = JSON.parse(name)
    changeDeliveryOption(value)
    mapRef.forEach((value, key) => {
      mapRef.set(key, false)
    })
    mapRef.set(name, true)
    setMapRef(mapRef)
    forceUpdate()
  }

  const choiceCheckbox = (ref: any) => {
    ref._toggleCheck()
  }

  const choicedDeliveryOption: IDeliveryOption | undefined = useSelector(
    (state: RootState) => state.delivery.choicedDeliveryOption
  )

  useEffect(() => {
    setTimeout(() => {
      const index = choicedDeliveryOption
        ? shipping.findIndex(
            (value: IDeliveryOption, index: number) =>
              value.name === choicedDeliveryOption.name
          )
        : -1
      refs[index] && choiceCheckbox(refs[index])
    }, 200)
  }, [choicedDeliveryOption])
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Chọn gói dịch vụ của Giao hàng nhanh</Text>
      </View>
      <View style={styles.choice}>
        {shipping.map((value, index) => {
          let ref: any
          refs[index] = ref
          return (
            <TouchableOpacity
              key={index}
              onPress={() => choiceCheckbox(refs[index])}
              style={styles.row}
            >
              <Checkbox
                ref={(_ref: any) => {
                  ref = _ref
                  refs[index] = ref
                  mapRef.set(JSON.stringify(value), false)
                }}
                onChange={onChoiceCheckbox}
                name={JSON.stringify(value)}
                checked={!!mapRef.get(JSON.stringify(value))}
                style={{
                  backgroundColor: CommonVariables.whiteColor,
                  color: CommonVariables.buttonColor,
                  borderRadius: 10,
                  borderColor: '#E55353',
                }}
                size={20}
              />
              <Text style={styles.txt}>{value.name} </Text>
            </TouchableOpacity>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    marginHorizontal: moderateScale(10),
    borderRadius: moderateScale(10),
  },
  inputContainer: {
    marginHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: '#A7A7A7',
  },
  choice: {
    padding: moderateScale(10),
  },
  label: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  txt: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
    marginLeft: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    paddingVertical: moderateScale(5),
  },
})
