import React, { Component } from 'react'
import { Text, StyleSheet, View, SectionList, Image } from 'react-native'
import SectionListCustom from '../../components/SectionListCustom'
import styles from './styles'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import CommissionHistoryData from './data'
import Header from '../../components/Header'
import { WITHDRAWALHISTORYICON, BENEFITICON } from '../../utils/icon'
import { formatCurrency } from '../../utils/common.util'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles from '../../utils/common.styles'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
export default class CommissionHistory extends Component<IProps> {
  renderSectionHeader = title => {
    //console.log('title', title)
    return (
      <View style={styles.sectionHeader}>
        <Text style={styles.txtSection}>Tháng {title.section.title}</Text>
      </View>
    )
  }
  renderItem = (item, index) => {
    console.log('renderItem', item)
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          width: WIN_WIDTH,
        }}
      >
        <View style={styles.itemContainer}>
          <View style={styles.leftItem}>
            <View style={styles.aboveLeftRow}>
              <View style={styles.image}>
                <Image style={CommonStyles.iconSize} source={BENEFITICON} />
              </View>
              <View style={styles.contentView}>
                <Text style={styles.contentTxt}>Số tiền nhận</Text>
              </View>
            </View>
            <View style={styles.belowLeftRow}>
              <View style={styles.image}></View>
              <View style={styles.dateView}>
                <Text style={styles.dateTxt}>{item.item.date}</Text>
              </View>
            </View>
          </View>
          <View style={styles.rightItem}>
            <View style={styles.rightAboveRow}>
              <Text style={styles.priceTxt}>
                {formatCurrency(item.item.amount)} VNĐ
              </Text>
            </View>
            <View style={styles.rightBelowRow}>
              <Text style={styles.statusTxt}>{item.item.status}</Text>
            </View>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Lịch sử nhận hoa hồng" />
        <SectionListCustom
          section={CommissionHistoryData}
          renderSectionHeader={this.renderSectionHeader}
          renderItem={this.renderItem}
        />
        {/* <Text>OK</Text> */}
      </View>
    )
  }
}
