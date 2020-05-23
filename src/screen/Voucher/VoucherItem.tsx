import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { PRODUCT1, VOUCHER_SALE } from '../../utils/image'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import { formatDateString, formatDate, getHours } from '../../utils/common.util'
interface IProps {
  item: any;
}
export default ({ item }: IProps) => {
  return (
    <View style={[styles.container, styles.shadow]}>
      <View
        style={{
          width: moderateScale(100),
          height: moderateScale(100),
          backgroundColor: '#F4F4F4',
        }}
      >
        <Image style={CommonStyles.imageCover} source={VOUCHER_SALE} />
      </View>
      <View
        style={{
          paddingLeft: moderateScale(10),
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.note}>{item.note}</Text>
        <Text style={styles.code}>
          Mã:{' '}
          <Text
            style={[
              styles.code,
              {
                color: '#E55353',
                fontWeight: 'bold',
              },
            ]}
          >
            {item.code}
          </Text>
        </Text>
      </View>
      <View
        style={{
          alignItems: 'flex-end',
          flex: 1,
          justifyContent: 'flex-end',
          padding: moderateScale(10),
        }}
      >
        {item.status ? (
          <View style={styles.button}>
            <Text style={styles.txtButton}>{`Sử dụng`.toUpperCase()}</Text>
          </View>
        ) : (
          <View style={styles.buttonExpiried}>
            <Text style={styles.txtExpiried}>{`Hết hạn`.toUpperCase()}</Text>
          </View>
        )}
        <View>
          <Text style={styles.date}>còn lại 3 ngày</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    margin: moderateScale(10),
    backgroundColor: CommonVariables.whiteColor,
    borderBottomRightRadius: moderateScale(10),
    borderTopRightRadius: moderateScale(10),
  },
  content: {
    flex: 1,
    marginLeft: moderateScale(10),
  },
  title: {
    color: '#565656',
    fontWeight: 'bold',
    fontSize: moderateScale(15),
  },
  note: {
    color: '#9C9C9C',
    paddingVertical: moderateScale(5),
  },
  border: {
    width: WIN_WIDTH,
    height: 1,
    backgroundColor: 'red',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  code: {
    fontSize: moderateScale(15),
    color: '#6B6B6B',
  },
  button: {
    backgroundColor: '#E55353',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  buttonExpiried: {
    backgroundColor: '#E3E3E3',
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(5),
    marginBottom: moderateScale(10),
  },
  txtButton: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: CommonVariables.whiteColor,
  },
  txtExpiried: {
    color: '#858585',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
  date: {
    color: '#3EB968',
    fontSize: moderateScale(12),
  },
})
