import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import Demo from '../screen/Demo'
import Login from '../screen/Login'
import Register from '../screen/Register'
import ForgotPassword from '../screen/ForgotPassword'
import OTP from '../screen/OTP'

const AuthStack = createAppContainer(
  createStackNavigator(
    {
      Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
          title: 'Login',
          header: null,
        }),
      },
      Register: {
        screen: Register,
        navigationOptions: ({ navigation }) => ({
          title: 'Register',
          header: null,
        }),
      },
      ForgotPassword: {
        screen: ForgotPassword,
        navigationOptions: ({ navigation }) => ({
          title: 'Forgot Password',
          header: null,
        }),
      },
      OTP: {
        screen: OTP,
        navigationOptions: ({ navigation }) => ({
          title: 'Forgot Password',
          header: null,
        }),
      },
    },
    {
      initialRouteName: 'Login',
      navigationOptions: {
        header: null,
      },
    }
  )
)
export default AuthStack
