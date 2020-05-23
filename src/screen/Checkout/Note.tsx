import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput } from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  ORDERDETAIL_SHIPPING,
  ORDERDETAIL_CHECKOUT_OPTION,
  CHECKOUT_VOUCHER,
  CHECKOUT_RIGHT,
  CHECKOUT_NOTE,
} from '../../utils/icon'
import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import Animated, { Easing } from 'react-native-reanimated'
let note = ''
interface IProps {
  onChangeNote: (text: string) => void;
}
export default ({ onChangeNote }: IProps) => {
  const animatedWidth = new Animated.Value(Math.round(WIN_WIDTH / 2))

  const animatedOpacityLabel = Animated.interpolate(animatedWidth, {
    inputRange: [Math.round(WIN_WIDTH / 2), Math.round(WIN_WIDTH / 1.3)],
    outputRange: [1, 0],
  })

  const onAnimate = () => {
    Animated.timing(animatedWidth, {
      toValue: moderateScale(Math.round(WIN_WIDTH / 1.3)),
      duration: 250,
      easing: Easing.inOut(Easing.ease),
    }).start()
  }

  const onFocus = () => {
    onAnimate()
  }

  const onBlur = () => {
    onChangeNote(note)
  }

  const onChangeText = (text: string) => {
    note = text
  }

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image
          source={CHECKOUT_NOTE}
          style={[CommonStyles.iconSize, { marginRight: moderateScale(10) }]}
        />
        <Animated.Text style={[styles.lbl, { opacity: animatedOpacityLabel }]}>
          {I18n.t('checkout.note')}
        </Animated.Text>
      </View>
      <View style={styles.row}>
        <Animated.View style={[styles.button, { width: animatedWidth }]}>
          <TextInput
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              paddingVertical: moderateScale(10),
            }}
            multiline
            placeholder={I18n.t('checkout.input')}
            onFocus={onFocus}
            onChangeText={onChangeText}
            onBlur={onBlur}
          />
        </Animated.View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
    position: 'absolute',
    left: moderateScale(25),
  },
  txt: {
    color: '#C8C8C8',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
  },
  button: {
    backgroundColor: '#EFEFEF',
    padding: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    width: WIN_WIDTH / 2,
    borderRadius: moderateScale(15),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
})
