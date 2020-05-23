import React, { useState, useEffect } from 'react'
import { View, StyleSheet, TextInput, Keyboard, Text } from 'react-native'
import { moderateScale } from '../../styles/common.variables'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  line: {
    height: 0.5,
    width: 46.12,
    backgroundColor: '#D8D8D8',
    marginTop: moderateScale(5),
  },
  digit: {
    height: moderateScale(30),
    width: moderateScale(30),
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: moderateScale(10),
    backgroundColor: '#eeeeee',
    borderRadius: moderateScale(5),
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  number: {
    fontSize: moderateScale(15),
    textAlign: 'center',
    color: CommonVariables.buttonColor,
  },
  underline: {
    width: moderateScale(5),
    height: 1,
    backgroundColor: '#747474',
  },
})
interface IInputFields {
  changeOtp: (otp: string) => void;
  onContinue: () => Promise<void>;
}
export default ({ changeOtp, onContinue }: IInputFields) => {
  let inputRef: any
  const [value, setValue] = useState('')

  const handleTouch = () => {
    inputRef.focus()
    console.log('asdasd')
  }
  const onChangeText = (text: string) => {
    setValue(text)
    console.log('value', value, text)
    changeOtp(text)
    if (text.length === 6) {
      Keyboard.dismiss()
      onContinue()
    }
  }
  useEffect(() => {
    if (!value) {
      inputRef.focus()
    }
  })
  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={handleTouch}
        style={{ flexDirection: 'row', paddingVertical: 30 }}
      >
        <View style={styles.digit}>
          <Text style={styles.number}>{value[0]}</Text>
          {!value[0] ? <View style={styles.underline} /> : null}
        </View>
        <View style={styles.digit}>
          <Text style={styles.number}>{value[1]}</Text>
          {!value[1] ? <View style={styles.underline} /> : null}
        </View>
        <View style={styles.digit}>
          <Text style={styles.number}>{value[2]}</Text>
          {!value[2] ? <View style={styles.underline} /> : null}
        </View>
        <View style={styles.digit}>
          <Text style={styles.number}>{value[3]}</Text>
          {!value[3] ? <View style={styles.underline} /> : null}
        </View>
        <View style={styles.digit}>
          <Text style={styles.number}>{value[4]}</Text>
          {!value[4] ? <View style={styles.underline} /> : null}
        </View>
        <View style={styles.digit}>
          <Text style={styles.number}>{value[5]}</Text>
          {!value[5] ? <View style={styles.underline} /> : null}
        </View>
      </TouchableWithoutFeedback>
      <TextInput
        onChangeText={onChangeText}
        keyboardType="number-pad"
        returnKeyType="done"
        ref={ref => (inputRef = ref)}
        style={{ backgroundColor: 'transparent', height: 0, width: 0 }}
      />
    </View>
  )
}
