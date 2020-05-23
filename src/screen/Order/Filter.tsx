import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { ORDER_FILTER, ORDER_X } from '../../utils/icon'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  moderateScale,
  WIN_HEIGHT,
  WIN_WIDTH,
} from '../../styles/common.variables'
import * as Animatable from 'react-native-animatable'
import I18n from '../../i18n/index'
import { IOrderStatus, MODE_ORDER } from '../../stores/object/order.object'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { getOrders } from '../../stores/actions/order.action'
interface IState {
  mode: MODE_ORDER;
}
export default ({ mode }: IState) => {
  const [isShowOption, setIsShowOption] = useState(false)
  const onShowOption = () => {
    setIsShowOption(!isShowOption)
  }
  const orderStatus: IOrderStatus[] = useSelector(
    (state: RootState) => state.order.orderStatus
  )
  const dispatch = useDispatch()
  const onFilter = (id: number) => {
    console.log('====================================')
    console.log(id)
    console.log('====================================')
    dispatch(getOrders(1, id, mode))
    onShowOption()
  }
  return (
    <TouchableWithoutFeedback onPress={onShowOption}>
      <View>
        <TouchableOpacity onPress={onShowOption} style={styles.container}>
          <Image style={CommonStyles.iconSize} source={ORDER_FILTER} />
          <Text style={styles.text}>Tất cả</Text>
        </TouchableOpacity>
        {isShowOption ? (
          <View style={styles.options}>
            <Animatable.View
              animation="bounceIn"
              duration={500}
              style={styles.board}
            >
              {orderStatus.map((value, index) => {
                return (
                  <TouchableOpacity
                    onPress={() => onFilter(value.id)}
                    key={index}
                    style={[styles.item, { borderBottomWidth: 0.5 }]}
                  >
                    <Text style={styles.itemText}>{value.status_name}</Text>
                  </TouchableOpacity>
                )
              })}

              <TouchableOpacity onPress={onShowOption} style={styles.x}>
                <Image style={{ width: 10, height: 10 }} source={ORDER_X} />
              </TouchableOpacity>
            </Animatable.View>
          </View>
        ) : null}
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: CommonVariables.whiteColor,
    padding: moderateScale(10),
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#747474',
  },
  text: {
    fontSize: moderateScale(12),
    marginLeft: moderateScale(10),
    fontWeight: 'bold',
    color: '#747474',
  },
  options: {
    height: WIN_HEIGHT,
    width: WIN_WIDTH,
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  board: {
    backgroundColor: CommonVariables.whiteColor,
    marginHorizontal: moderateScale(20),
    borderWidth: 0.5,
    borderColor: '#A7A7A7',
    width: WIN_WIDTH / 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(10),
  },
  item: {
    borderBottomWidth: 0.5,
    width: WIN_WIDTH / 2 - moderateScale(20),
    paddingVertical: moderateScale(8),
    borderBottomColor: '#A7A7A7',
  },
  itemText: {
    color: '#747474',
    fontSize: moderateScale(10),
  },
  x: {
    position: 'absolute',
    right: 0,
    top: 0,
    padding: moderateScale(10),
  },
})
