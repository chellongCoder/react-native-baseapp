import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { USER_EDIT, USER_BANK } from '../../utils/icon'
import { moderateScale } from '../../styles/common.variables'
import NavigationServices from '../../services/NavigationServices'
import I18n from '../../i18n/index'
import { IProfile } from '../../stores/object/user.object'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'

export default () => {
  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )
  const fields = [
    {
      name: 'Tên tài khoản',
      value: user?.personal_card_name,
    },
    {
      name: 'Số tài khoản ',
      value: user?.personal_card_code,
    },
    {
      name: 'Ngân hàng',
      value: user?.bank_name,
    },
  ]
  const onEditProfile = () => {
    NavigationServices.navigate('BankInfo')
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', padding: moderateScale(10) }}>
        <Image source={USER_BANK} style={CommonStyles.iconSize} />
        <Text
          style={{
            color: '#707070',
            fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
            marginLeft: moderateScale(10),
          }}
        >
          {I18n.t('userInfo.bank')}{' '}
        </Text>
        <TouchableWithoutFeedback onPress={onEditProfile}>
          <View
            style={{
              flex: 1,
              alignItems: 'flex-end',
            }}
          >
            <Image source={USER_EDIT} style={[CommonStyles.iconSize]} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View
        style={{
          marginHorizontal: moderateScale(10),
        }}
      >
        {fields.map((value, index) => {
          return (
            <View
              key={index}
              style={[
                styles.item,
                { borderBottomWidth: index === fields.length - 1 ? 0 : 0.5 },
              ]}
            >
              <Text style={styles.name}>{value.name}</Text>
              <View
                style={{
                  flex: 1,
                  alignItems: 'flex-end',
                  paddingLeft: moderateScale(10),
                }}
              >
                <Text
                  style={[
                    styles.value,
                    { color: index === 0 ? '#E55353' : '#707070' },
                  ]}
                >
                  {value.value}
                </Text>
              </View>
            </View>
          )
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
    paddingVertical: moderateScale(10),
  },
  name: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
  },
  value: {
    color: '#707070',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
