import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import I18n from '../../i18n/index'
import { DELIVERY_COVER } from '../../utils/image'
import CommonStyles from '../../utils/common.styles'
import Address from './Address'
import Button from './Button'
import {
  IProvince,
  IDistrict,
  IWard,
  IAddress,
} from '../../stores/object/delivery.object'
import { alertInfo } from '../../utils/common.util'
import { connect } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { updateAddress, updateAddressRejected } from '../../stores/actions/delivery.action'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
  updateAddress: (data: any) =>void;
  updateAddressRejected: () => void;
  address: IAddress | undefined
}
class DeliveryAddress extends Component<IProps> {
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

  confirmAddress = async () => {
    const {updateAddress} = this.props
    if(!this.province) {
      alertInfo(I18n.t('deliveryAddress.not_exist_province'))
      throw  new Error(I18n.t('deliveryAddress.not_exist_province'))
    }
    if(!this.district) {
      alertInfo(I18n.t('deliveryAddress.not_exist_district'))
      throw  new Error(I18n.t('deliveryAddress.not_exist_district'))
    }
    if(!this.ward) {
      alertInfo(I18n.t('deliveryAddress.not_exist_ward'))
      throw  new Error(I18n.t('deliveryAddress.not_exist_ward'))
    }
    const data = {
      district_id: this.district.id,
      province_id: this.province.id,
      ward_id: this.ward.id,
      address_name: this.addressName
    }
    console.log('====================================')
    console.log(data)
    console.log('====================================')
    await updateAddress(data)
  }

  componentWillUnmount() {
    const {updateAddressRejected} = this.props
    updateAddressRejected()
  }

  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header
          navigation={navigation}
          title={I18n.t('deliveryAddress.title')}
        />
        <View style={styles.cover}>
          <Image style={CommonStyles.image} source={DELIVERY_COVER} />
        </View>
        <View style={styles.title}>
          <Text style={styles.txtTitle}>Thay đổi địa chỉ nhận hàng</Text>
        </View>
        <Address
          changeProvince={this.changeProvince}
          changeDistrict={this.changeDistrict}
          changeWard={this.changeWard}
          changeAddressName={this.changeAddressName}
        />
        <Button confirmAddress={this.confirmAddress} />
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
  updateAddress: async (data: any) => await dispatch(updateAddress(data)),
  updateAddressRejected: () => dispatch(updateAddressRejected(null))
})
export default connect(mapStateToProps, mapDispatchToProps)(DeliveryAddress)