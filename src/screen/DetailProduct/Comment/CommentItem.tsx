import React, { useState } from 'react'
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native'
import { moderateScale } from '../../../styles/common.variables'
import {
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler'
import {
  PRODUCT_DETAIL_REPLY_DISABLE,
  DETAIL_PRODUCT_USER,
  PRODUCT_DETAIL_REPLY_ENABLE,
} from '../../../utils/icon'
import CommonStyles, { CommonVariables } from '../../../utils/common.styles'
import { timeSince } from '../../../utils/common.util'
import { IComment, IReply } from '../../../stores/object/comment.object'
import I18n from '../../../i18n/index'
import ListFullOption from '../../../components/ListFullOption'
import ReplyItem from './ReplyItem'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../../stores/reducers'
import { getReplies, postReply } from '../../../stores/actions/reply.action'
import Loader from './Loader'
interface IProps {
  item: IComment;
  productId: number;
}
let valueInput: string
let refInput: any
export default ({ item, productId }: IProps) => {
  const [isReply, setIsReply] = useState(false)
  const [isEnableReply, setIsEnableReply] = useState(false)
  const [loadingReply, setLoadingReply] = useState(false)
  const dispatch = useDispatch()
  const replies = useSelector((state: RootState) => state.reply.replies)
  const loading = useSelector((state: RootState) => state.reply.loading) //ko dc xoa

  const showReply = () => {
    setIsReply(true)
    dispatch(getReplies(item.product_id, item.id))
  }
  const onChangeText = (text: string) => {
    valueInput = text
    if (!valueInput) {
      setIsEnableReply(false)
    } else {
      !isEnableReply && setIsEnableReply(true)
    }
  }

  const renderReply = (
    isFavorite: boolean,
    item: IReply,
    index: number,
    onPress: any
  ) => {
    return <ReplyItem item={item} />
  }

  const onReply = async () => {
    const data = {
      comment_id: item.id,
      content: valueInput,
    }
    setLoadingReply(true)
    await dispatch(postReply(item.product_id, data))
    setLoadingReply(false)
    refInput.clear()
    onChangeText('')
  }

  return (
    <View style={styles.item}>
      <View style={styles.header}>
        <Image source={DETAIL_PRODUCT_USER} style={CommonStyles.iconSize} />
        <Text
          style={{
            fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
            marginLeft: moderateScale(10),
          }}
        >
          {item.customer_name}
          <Text
            style={{
              color: '#A3A3A3',
              fontSize: moderateScale(12),
            }}
          >
            {' '}
            • {timeSince(new Date(item.created_at))} ago
          </Text>
        </Text>
      </View>
      <Text
        style={{
          fontSize: moderateScale(12),
          marginRight: moderateScale(20),
        }}
      >
        {item.content}
      </Text>
      {isReply ? (
        <View>
          {replies.get(item.id) ? (
            <ListFullOption
              scrollEnabled={true}
              data={replies.get(item.id)}
              renderSubItem={renderReply}
            />
          ) : (
            <Loader />
          )}
          <View style={styles.replyInput}>
            <TextInput
              style={{
                flex: 1,
                textAlignVertical: 'top',
                justifyContent: 'center',
                fontSize: moderateScale(12),
              }}
              multiline
              numberOfLines={2}
              onChangeText={onChangeText}
              ref={ref => (refInput = ref)}
            />
            {!isEnableReply ? (
              <Image
                source={PRODUCT_DETAIL_REPLY_DISABLE}
                style={CommonStyles.iconSize}
              />
            ) : loadingReply ? (
              <ActivityIndicator />
            ) : (
              <TouchableOpacity onPress={onReply}>
                <Image
                  source={PRODUCT_DETAIL_REPLY_ENABLE}
                  style={CommonStyles.iconSize}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ) : null}
      {!isReply ? (
        <TouchableWithoutFeedback onPress={showReply} style={styles.reply}>
          <Text
            style={{
              color: '#CAC6C6',
            }}
          >
            {I18n.t('detailProduct.comment.reply').toUpperCase()} (
            {item.count_reply ? item.count_reply - 1 : 0})
          </Text>
        </TouchableWithoutFeedback>
      ) : null}
    </View>
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
    marginHorizontal: moderateScale(20),
  },
})
