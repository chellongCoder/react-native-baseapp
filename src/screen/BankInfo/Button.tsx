import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import I18n from '../../i18n/index'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import { CommonVariables } from '../../utils/common.styles'
import CommonButton from '../../components/CommonButton'
let refButton: any
interface IProps {}
export default ({}: IProps) => {
  const setRefButton = (ref: any) => {
    refButton = ref
  }

  const onPress = async () => {
    try {
      refButton.current.onAnimate()
      // await confirmAddress()
      // refButton.current.endAnimated()
    } catch (error) {
      console.log('====================================')
      console.log(error)
      refButton.current.endAnimated()
      console.log('====================================')
    }
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
    marginVertical: moderateScale(10),
  },
})
