import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import I18n from '../../i18n/index'
import { CommonVariables } from '../../utils/common.styles'
import ListMember from './ListMember'
import { useNavigation } from '@react-navigation/native'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
export default class Member extends Component<IProps> {
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          navigation={navigation}
          title={I18n.t('member.title', { member: 3 })}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.member}>
            Thành viên:{' '}
            <Text
              style={[
                styles.member,
                { fontFamily: CommonVariables.fonts.OPENSANS_BOLD },
              ]}
            >
              MIING
            </Text>
          </Text>
        </View>

        <View style={styles.tableHead}>
          <View style={[styles.tableHeadRow, { flex: 4 / 10 }]}>
            <Text style={styles.textHeaderRow}>
              {I18n.t('member.member_name')}
            </Text>
          </View>
          <View style={styles.separate} />
          <View style={[styles.tableHeadRow, { flex: 2 / 10 }]}>
            <Text style={styles.textHeaderRow}>
              {I18n.t('member.monthly_turnover')}
            </Text>
          </View>
          <View style={styles.separate} />
          <View style={[styles.tableHeadRow, { flex: 2 / 10 }]}>
            <Text style={styles.textHeaderRow}>
              {I18n.t('member.current_turnover')}
            </Text>
          </View>
          <View style={styles.separate} />
          <View style={[styles.tableHeadRow, { flex: 2 / 10 }]}>
            <Text style={styles.textHeaderRow}>
              {I18n.t('member.compare_lastmonth')}
            </Text>
          </View>
        </View>

        <ListMember />
      </View>
    )
  }
}
