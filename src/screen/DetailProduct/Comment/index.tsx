import React, { useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../../utils/common.styles'
import { moderateScale } from '../../../styles/common.variables'
import I18n from '../../../i18n/index'
import Header from './Header'
import ListComment from './ListComment'
import { useDispatch, useSelector } from 'react-redux'
import { getComments } from '../../../stores/actions/comment.action'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Loader from './Loader'
import { RootState } from '../../../stores/reducers'
interface IProps {
  productId: number;
  showInputComment: () => void;
}
export default ({ productId, showInputComment }: IProps) => {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.comment.loading)

  useEffect(() => {
    console.log('====================================')
    console.log('productId', productId)
    console.log('====================================')
    dispatch(getComments(productId))
  }, [])
  return (
    <View style={styles.container}>
      <Header showInputComment={showInputComment} />
      {/* <ListComment /> */}
      {loading ? <Loader /> : <ListComment productId={productId} />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    marginTop: moderateScale(10),
    // paddingHorizontal: moderateScale(10),
  },
})
