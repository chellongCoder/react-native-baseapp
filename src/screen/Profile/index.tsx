import React, { Component } from 'react'
import { Text, View } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import I18n from '../../i18n/index'
import Info from './Info'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Address from './Address'
import { IProvince, IDistrict, IWard, IAddress } from '../../stores/object/delivery.object'
import { RootState } from '../../stores/reducers'
import { connect } from 'react-redux'
import Button from './Button'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
  address: IAddress | undefined

}
class Profile extends Component<IProps> {
  province!: IProvince
  district!: IDistrict
  ward!: IWard
  addressName: string = this.props.address ? this.props.address.address_name : ''

  changeAddressName = (name: string) => {
    this.addressName = name
  }

  changeProvince = (province: any) => {
    this.province = province
  }

  changeDistrict = (district: any) => {
    this.district = district
  }

  changeWard = (ward: any) => {
    this.ward = ward
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title={I18n.t('profile.title')} />
        <KeyboardAwareScrollView>
          <Info />
          <Address
          changeProvince={this.changeProvince}
          changeDistrict={this.changeDistrict}
          changeWard={this.changeWard}
          changeAddressName={this.changeAddressName}
        />
          <Button/>
        </KeyboardAwareScrollView>
      </View>
    )
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    address: state.delivery.address
  }
}
const mapDispatchToProps = (dispatch: any) => ({
  
})
export default connect(mapStateToProps, mapDispatchToProps)(Profile)