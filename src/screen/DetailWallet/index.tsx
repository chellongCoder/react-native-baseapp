import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Image,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import styles from './styles'
import { HOMECOVER, COINIMG, WALLET } from '../../utils/image'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import Icon from 'react-native-vector-icons/AntDesign'
import { CART, BELL, MENUTHREEDOT, BACKBTN, RIGHTARROW } from '../../utils/icon'
import { moderateScale, WIN_HEIGHT } from '../../styles/common.variables'
import Badge from '../../components/Badge'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import { switchLanguage } from '../../i18n'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import SCREEN from '../../utils/screen.constant'
import I18n from 'i18n-js'
import Mine from '../../stores/object/me.object'
import Header from '../../components/Header'

interface IProps {
  i18n: any;
  navigation: ReturnType<typeof useNavigation>;
  me: Mine;
}

const data = {
  currentBalance: '44.012.545',
}
class DetailWallet extends Component<IProps> {
  constructor(props) {
    super(props)
    this.state = {
      currentBalance: 0,
    }
  }
  componentDidMount() {
    this.setState({
      currentBalance: data.currentBalance,
    })
  }
  onGotoHistory = () => {
    const { navigation } = this.props
    navigation.navigate(SCREEN.BOTTOM_TABBAR.DETAIL_WALLET.DRAWAL_HISTORY)
  }
  onGotoCommissionHistory = () => {
    const { navigation } = this.props
    navigation.navigate(SCREEN.BOTTOM_TABBAR.DETAIL_WALLET.COMMISSION_HISTORY)
  }
  onGotoCart = () => {}
  render() {
    const { navigation, me } = this.props
    return (
      <View style={styles.container}>
        {/* <View style={styles.cover}>
          <Image style={CommonStyles.imageCover} source={HOMECOVER} />
        </View> */}
        <Header navigation={navigation} title="Ví hoa hồng" />
        {/* <View style={styles.headerSection}>
            <TouchableOpacity
              onPress={this.onGotoCart}
              style={{ flex: 1 / 10, alignItems: 'center' }}
            >
              <Image source={BACKBTN} style={CommonStyles.iconSize} />
            </TouchableOpacity>
            <Text style={styles.txtTitle}>{I18n.t(['wallet', 'title'])}</Text>
            <TouchableOpacity
              onPress={this.onGotoCart}
              style={{ flex: 1 / 10, alignItems: 'center' }}
            >
              <Image source={CART} style={CommonStyles.iconSize} />
              <Badge number={1} />
            </TouchableOpacity>
            <View style={{ flex: 1 / 10, alignItems: 'center' }}>
              <Image source={BELL} style={CommonStyles.iconSize} />
              <Badge number={1} />
            </View>
            <View style={{ flex: 1 / 10, alignItems: 'flex-end' }}>
              <Image source={MENUTHREEDOT} style={CommonStyles.iconSize} />
            </View>
          </View> */}
        <ScrollView>
          <View style={styles.mainView}>
            <View>
              <View style={styles.balanceWalletView}>
                <Image
                  source={COINIMG}
                  style={[CommonStyles.iconSize, { flex: 1 / 10 }]}
                />
                <Text style={styles.walletTxt}>
                  {I18n.t(['wallet', 'walletHave'])}
                </Text>
                <Text style={styles.currBaltxt}>
                  {me.point} {I18n.t(['common', 'VNDCurrency'])}
                </Text>
              </View>
              <View style={styles.imgView}>
                <Image source={WALLET} style={styles.img} />
              </View>
              <View
                style={[
                  styles.balanceWalletView,
                  { marginBottom: moderateScale(20) },
                ]}
              >
                <Text
                  style={[
                    styles.walletTxt,
                    { flex: 3 / 6, color: '#848484', fontWeight: 'bold' },
                  ]}
                >
                  {I18n.t(['wallet', 'historyDrawl'])}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.detailBtn,
                    {
                      flex: 2 / 6,
                      marginLeft: moderateScale(30),
                      marginRight: moderateScale(0),
                    },
                  ]}
                  onPress={() => {
                    this.onGotoHistory()
                  }}
                >
                  <Text style={styles.btnTxt}>
                    {I18n.t(['wallet', 'transactionDetail'])}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1 / 6,
                    alignItems: 'flex-end',
                    paddingRight: moderateScale(5),
                  }}
                >
                  <Image
                    source={RIGHTARROW}
                    style={{
                      width: moderateScale(15),
                      height: moderateScale(15),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
              <View
                style={[
                  styles.balanceWalletView,
                  { marginBottom: moderateScale(20) },
                ]}
              >
                <Text
                  style={[
                    styles.walletTxt,
                    { flex: 3 / 6, color: '#848484', fontWeight: 'bold' },
                  ]}
                >
                  {I18n.t(['wallet', 'benefitHistory'])}
                </Text>
                <TouchableOpacity
                  style={[
                    styles.detailBtn,
                    {
                      flex: 2 / 6,
                      marginLeft: moderateScale(30),
                      marginRight: moderateScale(0),
                    },
                  ]}
                  onPress={() => {
                    this.onGotoCommissionHistory()
                  }}
                >
                  <Text style={styles.btnTxt}>
                    {I18n.t(['wallet', 'transactionDetail'])}
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1 / 6,
                    alignItems: 'flex-end',
                    paddingRight: moderateScale(5),
                  }}
                >
                  <Image
                    source={RIGHTARROW}
                    style={{
                      width: moderateScale(15),
                      height: moderateScale(15),
                      resizeMode: 'contain',
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={styles.footer}>
              <TouchableOpacity style={styles.drwalBtn}>
                <Text style={styles.drwalTxt}>
                  {I18n.t(['wallet', 'drawal'])}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        {/* </SafeAreaView> */}
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    i18n: state.language.i18n,
    me: state.home.me,
  }
}

export default connect(mapStateToProps, null)(DetailWallet)
