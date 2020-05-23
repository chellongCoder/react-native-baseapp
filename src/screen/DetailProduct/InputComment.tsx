import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TextInput, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import Modal from 'react-native-modal'
import { CommonVariables } from '../../utils/common.styles'
import { useDispatch } from 'react-redux'
import { postComments } from '../../stores/actions/comment.action'
import I18n from '../../i18n/index'
let ref: any
let valueInput: string
let refInput: any
interface IProps {
  setRef: (ref: any) => void;
  inputValue: string;
  changeInputValue: (text: string) => void;
  productId: number;
}
export default ({
  setRef,
  changeInputValue,
  inputValue,
  productId,
}: IProps) => {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()

  const onSubmitEditing = () => {
    const data = {
      content: valueInput,
    }
    console.log('inputValue', valueInput)
    close()
    dispatch(postComments(productId, data))
  }

  const show = () => {
    setIsVisible(true)
    setTimeout(() => {
      refInput.focus()
    }, 200)
  }

  const close = () => {
    setIsVisible(false)
  }

  ref = useRef({ show, close })

  const onChangeText = (text: string) => {
    valueInput = text
  }

  useEffect(() => {
    setRef(ref)
  }, [])

  const onBackdropPress = () => {
    close()
    changeInputValue(valueInput)
  }

  console.log('====================================')
  console.log(inputValue)
  console.log('====================================')

  return (
    <Modal
      onBackdropPress={onBackdropPress}
      deviceWidth={WIN_WIDTH}
      deviceHeight={WIN_HEIGHT}
      isVisible={isVisible}
      style={{
        margin: 0,
        justifyContent: 'flex-end',
      }}
    >
      <TextInput
        multiline
        returnKeyType="send"
        onSubmitEditing={onSubmitEditing}
        style={styles.input}
        defaultValue={inputValue}
        onChangeText={onChangeText}
        ref={ref => (refInput = ref)}
        placeholder={I18n.t('detailProduct.comment.write_anything')}
      />
    </Modal>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: CommonVariables.whiteColor,
    color: 'black',
    flex: 9 / 10,
    textAlignVertical: 'top',
    padding: moderateScale(10),
    borderTopLeftRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
})
