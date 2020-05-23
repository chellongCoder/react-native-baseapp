import React, { useState } from 'react'
import { View, Image, StyleSheet, Text } from 'react-native'
import { moderateScale } from '../../../styles/common.variables'
import { DETAIL_PRODUCT_USER } from '../../../utils/icon'
import CommonStyles, { CommonVariables } from '../../../utils/common.styles'
import { timeSince } from '../../../utils/common.util'
import { IReply } from '../../../stores/object/comment.object'
import I18n from '../../../i18n/index'
import * as Animatable from 'react-native-animatable'

interface IProps {
  item: IReply;
}
export default ({ item }: IProps) => {
  return (
    <Animatable.View animation="fadeIn" style={styles.item}>
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
    </Animatable.View>
  )
}

const styles = StyleSheet.create({
  item: {
    paddingLeft: moderateScale(20),
    paddingVertical: moderateScale(5),
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
