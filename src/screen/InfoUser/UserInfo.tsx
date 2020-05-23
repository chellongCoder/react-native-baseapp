import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { USER_INFO, USER_EDIT } from '../../utils/icon'
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
      name: 'Tên',
      value: user?.name,
    },
    {
      name: 'Ngày sinh',
      value: user?.birthday,
    },
    {
      name: 'Giới tính',
      value: user?.gender ? I18n.t('profile.male') : I18n.t('profile.female'),
    },
    {
      name: 'Điện thoại',
      value: user?.phone,
    },
    {
      name: 'email',
      value: user?.email,
    },
  ]
  const onEditProfile = () => {
    NavigationServices.navigate('Profile')
  }
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', padding: moderateScale(10) }}>
        <Image source={USER_INFO} style={CommonStyles.iconSize} />
        <Text
          style={{
            color: '#707070',
            fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
            marginLeft: moderateScale(10),
          }}
        >
          {I18n.t('userInfo.user_info')}{' '}
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
    marginBottom: moderateScale(10),
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
