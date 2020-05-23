import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native'
import {
  WIN_HEIGHT,
  moderateScale,
  WIN_WIDTH,
} from '../../styles/common.variables'
import {
  STARTUP,
  BENIFIT,
  CUSTOMER,
  VIDEO,
  NEWS,
  POLICYCHANGE,
  POLICYCHARGE,
  TRANSPORT,
  CONTACT,
  FORM,
} from '../../utils/icon'
import CommonStyles from '../../utils/common.styles'
import I18n from '../../i18n'
import SCREEN from '../../utils/screen.constant'
import NavigationServices from '../../services/NavigationServices'
import { useNavigation } from '@react-navigation/native'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
export default class ListServices extends Component<IProps> {
  services = [
    [
      {
        name: I18n.t('drawer.startup'),
        icon: STARTUP,
        navigate: SCREEN.DRAWER.AGENCY_BENEFIT,
      },
      {
        name: I18n.t('drawer.benefit'),
        icon: BENIFIT,
        navigate: SCREEN.DRAWER.AGENCY_BENEFIT,
      },
      {
        name: I18n.t('drawer.customer'),
        icon: CUSTOMER,
        navigate: SCREEN.DRAWER.POTENTIAL_CUSTOMER,
      },
      {
        name: I18n.t('drawer.video'),
        icon: VIDEO,
        navigate: SCREEN.DRAWER.VIDEO_LIST,
      },
      {
        name: I18n.t('drawer.news'),
        icon: NEWS,
        navigate: SCREEN.DRAWER.AGENCY_BENEFIT,
      },
    ],
    [
      {
        name: 'underline',
        icon: null,
      },
    ],
    [
      {
        name: I18n.t('drawer.policy_change'),
        icon: POLICYCHANGE,
      },
      {
        name: I18n.t('drawer.transport'),
        icon: TRANSPORT,
      },
      {
        name: I18n.t('drawer.policy_charge'),
        icon: POLICYCHARGE,
      },
      {
        name: I18n.t('drawer.contact'),
        icon: CONTACT,
      },
    ],
  ]
  render() {
    console.log('props', this.props.navigation)
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.services.map((value, index) => {
            if (index % 2 === 0) {
              return value.map((val, i) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      console.log('asdada')
                      navigation.navigate(`${val.navigate}`)
                    }}
                    key={i}
                    style={styles.item}
                  >
                    <Image style={CommonStyles.iconSize} source={val.icon} />
                    <Text style={styles.name}>{val.name}</Text>
                  </TouchableOpacity>
                )
              })
            }
            return <View key={index} style={styles.underline} />
          })}
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: WIN_HEIGHT / 5 + moderateScale(20),
    paddingHorizontal: moderateScale(20),
  },
  underline: {
    width: WIN_WIDTH,
    height: 1,
    backgroundColor: '#A7A7A7',
    marginBottom: moderateScale(20),
  },
  name: {
    fontFamily: 'OpenSans-Regular',
    marginLeft: moderateScale(20),
  },
  item: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
  },
})
