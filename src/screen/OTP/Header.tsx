import React from 'react'
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import CommonStyles from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'
import NavigationServices from '../../services/NavigationServices'
import { LOGO, OTP_ICON_APP } from '../../utils/image'
export default () => {
  return (
    <View style={styles.container}>
      <Image style={CommonStyles.image} source={OTP_ICON_APP} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 230,
    height: 84,
  },
})
