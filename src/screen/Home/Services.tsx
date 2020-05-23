import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { HOME_SERVICE_EXCHANGE, HOME_SERVICE_CHARGE } from '../../utils/image'
import { moderateScale, WIN_WIDTH } from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
const services = [
  {
    name: 'Chính sách đổi trả',
    content:
      'Nam fringilla feugiat leo. Duis lacus nunc, consectetur quis dui a, dignissim congue odio. Suspendisse semper consequat lectus a finibus. Aliquam erat volutpat',
    image: HOME_SERVICE_EXCHANGE,
  },
  {
    name: 'Chính sách đổi trả',
    content:
      'Nam fringilla feugiat leo. Duis lacus nunc, consectetur quis dui a, dignissim congue odio. Suspendisse semper consequat lectus a finibus. Aliquam erat volutpat',
    image: HOME_SERVICE_CHARGE,
  },

  {
    name: 'Chính sách đổi trả',
    content:
      'Nam fringilla feugiat leo. Duis lacus nunc, consectetur quis dui a, dignissim congue odio. Suspendisse semper consequat lectus a finibus. Aliquam erat volutpat',
    image: HOME_SERVICE_EXCHANGE,
  },
  {
    name: 'Chính sách đổi trả',
    content:
      'Nam fringilla feugiat leo. Duis lacus nunc, consectetur quis dui a, dignissim congue odio. Suspendisse semper consequat lectus a finibus. Aliquam erat volutpat',
    image: HOME_SERVICE_CHARGE,
  },
]
export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Services</Text>
      </View>
      {services.map((value, index) => {
        return (
          <View key={index} style={styles.card}>
            <View
              style={{
                width: (WIN_WIDTH - 20) / 3,
                height: moderateScale(120),
              }}
            >
              <Image style={CommonStyles.image} source={value.image} />
            </View>
            <View
              style={{
                justifyContent: 'center',
                width: ((WIN_WIDTH - 50) * 2) / 3,
                padding: 10,
              }}
            >
              <Text style={styles.name}>{value.name}</Text>
              <Text style={styles.content}>{value.content}</Text>
            </View>
          </View>
        )
      })}
      <View style={styles.viewAll}>
        <Text style={[styles.textHeader, { color: '#E55353' }]}>
          Xem toàn bộ
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    borderRadius: moderateScale(5),
    width: WIN_WIDTH - moderateScale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    marginBottom: moderateScale(20),
    marginTop: moderateScale(10),
  },
  header: {
    padding: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
    width: WIN_WIDTH - moderateScale(40),
  },
  textHeader: {
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    width: WIN_WIDTH - moderateScale(40),
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
  },
  name: {
    fontSize: moderateScale(15),
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: '#717171',
    paddingBottom: moderateScale(10),
  },
  content: {
    fontFamily: CommonVariables.fonts.OPENSANS_LIGHT,
    color: '#717171',
    fontSize: moderateScale(12),
  },
  viewAll: {
    paddingVertical: moderateScale(10),
  },
})
