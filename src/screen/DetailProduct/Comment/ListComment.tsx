import React, { useState } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../../stores/reducers'
import ListFullOption from '../../../components/ListFullOption'
import { IComment } from '../../../stores/object/comment.object'
import {
  DETAIL_PRODUCT_USER,
  PRODUCT_DETAIL_COMMENT_SEEALL,
  PRODUCT_DETAIL_REPLY_DISABLE,
  PRODUCT_DETAIL_REPLY_ENABLE,
} from '../../../utils/icon'
import CommonStyles, { CommonVariables } from '../../../utils/common.styles'
import { moderateScale } from '../../../styles/common.variables'
import I18n from '../../../i18n/index'
import { timeSince } from './../../../utils/common.util'
import { TextInput } from 'react-native-gesture-handler'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import CommentItem from './CommentItem'
const NUMBER_COMMENT = 3
interface IProps {
  productId: number;
}
export default ({ productId }: IProps) => {
  const comments = useSelector((state: RootState) => state.comment.comments)
  const [data, setData] = useState(comments.slice(0, NUMBER_COMMENT))
  const onViewMore = () => {
    setData(comments)
  }
  const renderComment = (
    isFavorite: boolean,
    item: IComment,
    index: number,
    onPress: any
  ) => {
    return <CommentItem item={item} productId={productId} />
  }
  return (
    <KeyboardAwareScrollView>
      <ListFullOption
        scrollEnabled={true}
        data={data}
        renderSubItem={renderComment}
        listFooterComponent={
          data.length !== comments.length &&
          comments.length > NUMBER_COMMENT ? (
            <TouchableWithoutFeedback onPress={onViewMore}>
              <View style={styles.seeAll}>
                <Text
                  style={{
                    color: '#3EB968',
                    marginRight: moderateScale(5),
                  }}
                >
                  {I18n.t('detailProduct.comment.seeAll')}
                </Text>
                <Image
                  style={CommonStyles.iconSizeSmall}
                  source={PRODUCT_DETAIL_COMMENT_SEEALL}
                />
              </View>
            </TouchableWithoutFeedback>
          ) : null
        }
      />
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  item: {
    borderBottomWidth: moderateScale(0.5),
    borderBottomColor: '#A7A7A7',
    paddingLeft: moderateScale(40),
  },
  header: {
    flexDirection: 'row',
    paddingVertical: moderateScale(5),
  },
  reply: {
    alignItems: 'flex-end',
    paddingRight: moderateScale(20),
    paddingVertical: moderateScale(5),
  },
  seeAll: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(5),
    flexDirection: 'row',
  },
  replyInput: {
    borderWidth: 0.5,
    flexDirection: 'row',
    padding: moderateScale(5),
    marginVertical: moderateScale(5),
    borderRadius: moderateScale(5),
    paddingHorizontal: moderateScale(10),
    borderColor: '#CFCFCF',
  },
})
