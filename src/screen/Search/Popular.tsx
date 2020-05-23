import React from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import { PRODUCT1 } from '../../utils/image'

export default () => {
  const popular = useSelector((state: RootState) => state.search.popular)
  const renderPopular = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: any
  ) => {
    return (
      <View
        style={[
          styles.item,
          {
            borderBottomWidth: index === popular.length - 1 ? 0 : 0.5,
            borderBottomColor: '#CFCFCF',
          },
        ]}
      >
        <Text>{item.content}</Text>
        <View style={{ width: 30, height: 30 }}>
          <Image style={CommonStyles.imageCover} source={PRODUCT1} />
        </View>

        {index % 2 !== 0 ? (
          <View
            style={{
              width: 1,
              height: moderateScale(40),
              backgroundColor: '#CFCFCF',
              position: 'absolute',
              alignSelf: 'center',
            }}
          />
        ) : null}
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.popular}>
        <Text style={styles.txtPopular}>Tìm kiếm phổ biến </Text>
      </View>
      <ListFullOption
        scrollEnabled={true}
        data={popular}
        renderSubItem={renderPopular}
        style={{
          backgroundColor: CommonVariables.whiteColor,
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: moderateScale(10),
    backgroundColor: CommonVariables.whiteColor,
    paddingHorizontal: moderateScale(10),
  },
  item: {
    width: WIN_WIDTH / 2 - moderateScale(11),
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(10),
    alignItems: 'center',
  },
  popular: {
    paddingVertical: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
  },
  txtPopular: {
    color: '#616161',
    fontSize: moderateScale(15),
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
})
