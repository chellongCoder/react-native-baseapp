import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import styles from './styles'
import Header from '../../components/Header'
import { useNavigation } from '@react-navigation/native'
import I18n from '../../i18n/index'
import { DELIVERY_COVER } from '../../utils/image'
import CommonStyles from '../../utils/common.styles'
import Option from './Option'
import Button from './Button'
import { IDeliveryOption } from '../../stores/object/delivery.object'
interface IProps {
  navigation: ReturnType<typeof useNavigation>;
}
export default class DeliveryOption extends Component<IProps> {
  state = {
    deliveryOption: undefined,
  }

  changeDeliveryOption = (deliveryOption: IDeliveryOption) => {
    this.setState({ deliveryOption })
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
        <Option changeDeliveryOption={this.changeDeliveryOption} />
        <Button deliveryOption={this.state.deliveryOption} />
      </View>
    )
  }
}
