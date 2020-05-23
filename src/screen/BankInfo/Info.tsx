import React, { useState, useCallback, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from 'react-native'
import { moderateScale } from '../../styles/common.variables'
import I18n from '../../i18n/index'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import Checkbox from '../../components/Checkbox'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { formatDate } from '../../utils/common.util'
import { SEARCH_EXTEND } from '../../utils/icon'
import Select from './Select'
import { IProfile } from '../../stores/object/user.object'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { getBanks } from '../../stores/actions/system.action'
import { IBank } from '../../stores/object/system.object'

let refSelect: any

export default () => {
  const user: IProfile | null = useSelector(
    (state: RootState) => state.auth.user
  )
  const [bank, setBank] = useState<IBank | undefined>()

  const banks: IBank[] = useSelector((state: RootState) => state.system.banks)

  const dispatch = useDispatch()

  const setRef = (ref: any) => {
    console.log('ref', ref)
    refSelect = ref
  }

  const onShowSelect = () => {
    refSelect.showModal()
  }

  const onSelect = ([item]: any) => {
    console.log('item', item)
    setBank(item)
  }

  useEffect(() => {
    dispatch(getBanks())
  }, [])

  return (
    <View style={styles.container}>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('bank.name')}</Text>
        <TextInput
          style={styles.input}
          defaultValue={user?.personal_card_name}
        />
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('bank.number')}</Text>
        <TextInput style={styles.input} defaultValue={user?.bank_number} />
      </View>
      <View
        style={[
          styles.field,
          {
            flexDirection: 'row',
            borderBottomWidth: 0.5,
            paddingVertical: moderateScale(10),
            borderColor: '#CFCFCF',
          },
        ]}
      >
        <Text style={styles.label}>{I18n.t('bank.bank')}</Text>
        <TouchableWithoutFeedback onPress={onShowSelect}>
          <View style={styles.choice}>
            <Text style={styles.bank}>
              {bank ? bank.name : user?.bank_name}
            </Text>
            <Image source={SEARCH_EXTEND} style={CommonStyles.iconSizeSmall} />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View style={styles.field}>
        <Text style={styles.label}>{I18n.t('bank.branch')}</Text>
        <TextInput style={styles.input} defaultValue={user?.bank_location} />
      </View>

      <Select setRef={setRef} data={banks} onSelectItem={onSelect} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    margin: moderateScale(5),
    borderRadius: moderateScale(5),
    borderColor: '#CFCFCF',
    paddingBottom: moderateScale(20),
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
  choice: {
    flexDirection: 'row',
    flex: 10 / 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  bank: {
    color: '#7D7D7D',
    marginHorizontal: moderateScale(20),
  },
})
