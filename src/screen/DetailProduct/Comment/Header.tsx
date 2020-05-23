import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import I18n from '../../../i18n/index'
import {
  PRODUCT_DETAIL_COMMENT,
  PRODUCT_DETAIL_CHATBOX,
} from '../../../utils/icon'
import CommonStyles from '../../../utils/common.styles'
import { moderateScale, GRAY_BORDER } from '../../../styles/common.variables'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores/reducers'
import { IComment } from '../../../stores/object/comment.object'
interface IProps {
  showInputComment: () => void;
}
export default ({ showInputComment }: IProps) => {
  const comments: IComment[] = useSelector(
    (state: RootState) => state.comment.comments
  )
  const loadingPost = useSelector(
    (state: RootState) => state.comment.loadingPost
  )

  return (
    <View style={styles.header}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: moderateScale(10),
        }}
      >
        <Image source={PRODUCT_DETAIL_COMMENT} style={CommonStyles.iconSize} />
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: moderateScale(10),
          }}
        >
          {I18n.t('detailProduct.comment.title')} ({comments.length})
        </Text>
        {loadingPost ? (
          <ActivityIndicator
            style={{
              paddingLeft: moderateScale(10),
            }}
            color={GRAY_BORDER}
          />
        ) : null}
      </View>
      <TouchableOpacity onPress={showInputComment} style={styles.button}>
        <Image source={PRODUCT_DETAIL_CHATBOX} style={CommonStyles.iconSize} />
        <Text
          style={{
            fontWeight: 'bold',
            marginLeft: moderateScale(10),
            color: '#E55353',
            fontSize: moderateScale(12),
          }}
        >
          {I18n.t('detailProduct.comment.title').toUpperCase()}
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(5),
    borderBottomWidth: 0.5,
    borderColor: '#A7A7A7',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderRadius: 5,
    padding: moderateScale(5),
    borderColor: '#E55353',
    marginRight: moderateScale(10),
  },
})
