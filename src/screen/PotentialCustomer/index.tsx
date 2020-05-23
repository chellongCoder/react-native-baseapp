import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  SectionList,
  Image,
  PanResponder,
} from 'react-native'
import ListFullOption from '../../components/ListFullOption'
import styles from './styles'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import customers from './data'
import Header from '../../components/Header'
import { formatCurrency } from '../../utils/common.util'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles from '../../utils/common.styles'
import { CUSTOMERICON } from '../../utils/icon'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}

export default class PotentialCustomer extends Component<IProps> {
  renderItem = (favourite, item) => {
    console.log('renderItem', item)
    return (
      <View
        style={{
          backgroundColor: '#FFFFFF',
          width: WIN_WIDTH,
        }}
      >
        <View style={styles.itemContainer}>
          <View style={styles.iconView}>
            <Image source={CUSTOMERICON} style={styles.icon} />
          </View>
          <View style={styles.contentView}>
            <Text style={styles.nameTxt}>{item.name}</Text>
            <Text>Cấp bậc: {item.rank}</Text>
          </View>
        </View>
      </View>
    )
  }
  render() {
    const { navigation } = this.props
    console.log('CUSTOMERICON', customers)
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Khách hàng tiềm năng" />
        <ListFullOption
          data={customers}
          renderSubItem={this.renderItem}
          scrollEnabled={true}
        />
        {/* <Text>OK</Text> */}
      </View>
    )
  }
}
