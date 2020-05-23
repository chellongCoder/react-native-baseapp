import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Demo from '../screen/Demo'
import InfoUser from '../screen/InfoUser'
import DetailWallet from '../screen/DetailWallet'
import ChangeAgency from '../screen/ChangeAgency'
import Member from '../screen/Member'
import Identification from '../screen/Identification'
import AccountBank from '../screen/AccountBank'
import Infomation from '../screen/Infomation'
import SCREEN from '../utils/screen.constant'
import Revenue from '../screen/Revenue'
import Profile from '../screen/Profile'
import BankInfo from '../screen/BankInfo'

const UserInfomationStack = createAppContainer(
  createStackNavigator(
    {
      UserInfo: {
        screen: InfoUser,
        navigationOptions: ({ navigation }) => ({
          title: 'UserInfo',
          header: null,
        }),
      },
      DetailWallet: {
        screen: DetailWallet,
        navigationOptions: ({ navigation }) => ({
          title: 'DetailWallet',
          header: null,
        }),
      },
      ChangeAgency: {
        screen: ChangeAgency,
        navigationOptions: ({ navigation }) => ({
          title: 'Change Agency',
          header: null,
        }),
      },
      Revenue: {
        screen: Revenue,
        navigationOptions: ({ navigation }) => ({
          title: 'Revenue',
          header: null,
        }),
      },
      Information: {
        screen: Infomation,
        navigationOptions: ({ navigation }) => ({
          title: 'Infomation',
          header: null,
        }),
      },
      Members: {
        screen: Member,
        navigationOptions: ({ navigation }) => ({
          title: 'Members',
          header: null,
        }),
      },
      Identifiers: {
        screen: Identification,
        navigationOptions: ({ navigation }) => ({
          title: 'Identifiers',
          header: null,
        }),
      },
      AccountBank: {
        screen: AccountBank,
        navigationOptions: ({ navigation }) => ({
          title: 'AccountBank',
          header: null,
        }),
      },
      Profile: {
        screen: Profile,
        navigationOptions: ({ navigation }) => ({
          title: 'Profile',
          header: null,
        }),
      },
      BankInfo: {
        screen: BankInfo,
        navigationOptions: ({ navigation }) => ({
          title: 'BankInfo',
          header: null,
        }),
      },
    },
    {
      initialRouteName: SCREEN.BOTTOM_TABBAR.USERINFOMATION_STACK.USER_INFO,
      navigationOptions: {
        header: null,
      },
    }
  )
)
export default UserInfomationStack
