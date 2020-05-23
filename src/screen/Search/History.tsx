import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { moderateScale } from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import { ORDER_X, SEARCH_EXTEND } from '../../utils/icon'
import {
  removeItemHistory,
  removeAllHistory,
} from '../../stores/actions/search.action'
import { alertInfoOption } from '../../utils/common.util'
import I18n from '../../i18n/index'
const NUMBER_HISTORY = 5
export default () => {
  const history = useSelector((state: RootState) => state.search.history)
  const [data, setData] = useState(history.slice(0, NUMBER_HISTORY))
  const onViewMore = () => {
    setData(history)
  }
  const dispatch = useDispatch()
  const onDeleteItem = (index: number) => {
    console.log('====================================')
    console.log(index)
    console.log('====================================')
    alertInfoOption(
      I18n.t('detailProduct.comment.delete_item_istory'),
      '',
      () => {
        dispatch(removeItemHistory(index))
        setData(
          data.filter((item, i) => {
            return index !== i
          })
        )
      }
    )
  }
  const deleteAllHistory = () => {
    alertInfoOption(
      I18n.t('detailProduct.comment.delete_item_istory'),
      '',
      () => {
        dispatch(removeAllHistory())
        setData([])
      }
    )
  }
  const renderNotification = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: any
  ) => {
    return (
      <View style={styles.item}>
        <Text>{item.content}</Text>
        <TouchableOpacity
          onPress={() => onDeleteItem(index)}
          style={{
            padding: moderateScale(5),
          }}
        >
          <Image style={CommonStyles.iconSizeSmall} source={ORDER_X} />
        </TouchableOpacity>
      </View>
    )
  }
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.history}>Lịch sử tìm kiếm</Text>
        <TouchableOpacity onPress={deleteAllHistory}>
          <Text style={styles.delete}>Xoá lịch sử</Text>
        </TouchableOpacity>
      </View>
      <ListFullOption
        scrollEnabled={true}
        data={data}
        renderSubItem={renderNotification}
        style={{
          backgroundColor: CommonVariables.whiteColor,
        }}
      />
      {data.length !== history.length && history.length > NUMBER_HISTORY ? (
        <TouchableOpacity onPress={onViewMore} style={styles.showMore}>
          <Text style={styles.txtViewMore}>Xem Thêm</Text>
          <Image source={SEARCH_EXTEND} style={CommonStyles.iconSmallSmall} />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
  },
  history: {
    color: '#BDBDBD',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  delete: {
    color: '#515151',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomColor: '#CFCFCF',
    borderBottomWidth: 0.5,
    marginHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  showMore: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: moderateScale(10),
    backgroundColor: CommonVariables.whiteColor,
  },
  txtViewMore: {
    color: '#BDBDBD',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    marginRight: moderateScale(5),
  },
})
