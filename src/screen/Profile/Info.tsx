import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import { CommonVariables } from '../../utils/common.styles'
import Checkbox from '../../components/Checkbox'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { formatDate } from '../../utils/common.util'
import { IProfile } from '../../stores/object/user.object'
import { RootState } from '../../stores/reducers'
import { useSelector } from 'react-redux'

let ref1: any
let ref2: any
export default () => {
  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )
  const [mapRef, setMapRef] = useState(new Map<string, boolean>())
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false)
  const [date, setDate] = useState<string | undefined>(user?.birthday)
  const [, updateState] = useState()
  const forceUpdate = useCallback(() => updateState({}), [])

  const onChoiceCheckbox = (name: string, checked: boolean) => {
    console.log('name', name, 'check', checked)

    mapRef.forEach((value, key) => {
      mapRef.set(key, false)
    })
    mapRef.set(name, true)
    setMapRef(mapRef)
    forceUpdate()
  }
  const choiceCheckbox = (ref: any) => {
    ref._toggleCheck()
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true)
  }

  const hideDatePicker = () => {
    setDatePickerVisibility(false)
  }

  const handleConfirm = date => {
    console.log('====================================')
    console.log(date, formatDate(date, 'yyyy-mm-dd'))
    console.log('====================================')
    hideDatePicker()
    // formatDate(date, 'yyyy-mm-dd')
    setDate(formatDate(date, 'yyyy-mm-dd'))
  }

  useEffect(() => {
    setTimeout(() => {
      user?.gender ? choiceCheckbox(ref1) : choiceCheckbox(ref2)
    }, 100)
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('profile.name')}</Text>
        <TextInput style={styles.input} defaultValue={user?.name} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('profile.phone')}</Text>
        <TextInput style={styles.input} defaultValue={user?.phone} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('profile.email')}</Text>
        <TextInput style={styles.input} defaultValue={user?.email} />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('profile.gender')}</Text>
        <TouchableOpacity
          onPress={() => choiceCheckbox(ref1)}
          style={styles.gender}
        >
          <Checkbox
            ref={(ref: any) => {
              ref1 = ref
              mapRef.set(I18n.t('profile.male'), false)
            }}
            checked={!!mapRef.get(I18n.t('profile.male'))}
            name={I18n.t('profile.male')}
            style={styles.checkbox}
            size={20}
            onChange={onChoiceCheckbox}
          />
          <Text style={styles.txtGender}>{I18n.t('profile.male')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => choiceCheckbox(ref2)}
          style={styles.gender}
        >
          <Checkbox
            ref={(ref: any) => {
              ref2 = ref
              mapRef.set(I18n.t('profile.female'), false)
            }}
            name={I18n.t('profile.female')}
            checked={!!mapRef.get(I18n.t('profile.female'))}
            style={styles.checkbox}
            size={20}
            onChange={onChoiceCheckbox}
          />
          <Text style={styles.txtGender}>{I18n.t('profile.female')}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('profile.birthday')}</Text>
        <TouchableWithoutFeedback onPress={showDatePicker}>
          <View>
            <Text style={styles.date}>{date}</Text>
          </View>
        </TouchableWithoutFeedback>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    margin: moderateScale(5),
    borderRadius: moderateScale(5),
    borderColor: '#CFCFCF',
    paddingBottom: moderateScale(10),
  },
  input: {
    borderBottomWidth: 0.5,
    paddingVertical: moderateScale(5),
    borderColor: '#CFCFCF',
    color: '#7D7D7D',
  },
  field: {
    marginHorizontal: moderateScale(10),
    paddingTop: moderateScale(10),
  },
  label: {
    fontFamily: CommonVariables.fonts.OPENSANS_SEMIBOLD,
    color: '#525252',
  },
  gender: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(10),
  },
  txtGender: {
    color: '#7D7D7D',
    marginLeft: moderateScale(10),
  },
  checkbox: {
    backgroundColor: CommonVariables.whiteColor,
    color: CommonVariables.buttonColor,
    borderRadius: 10,
    borderColor: '#E55353',
  },
  date: {
    color: '#7D7D7D',
    paddingVertical: moderateScale(5),
  },
})
