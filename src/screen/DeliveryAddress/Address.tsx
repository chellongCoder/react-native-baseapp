import React, { useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { moderateScale } from '../../styles/common.variables'
import { SEARCH_EXTEND } from '../../utils/icon'
import Select from './Select'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import {
  IProvince,
  IDistrict,
  IWard,
  IAddress,
} from '../../stores/object/delivery.object'
import { updateAddressRejected } from '../../stores/actions/delivery.action'
const [PROVINCE, DISTRICT, WARD] = [1, 2, 3]
let TYPE = PROVINCE
interface IProps {
  changeProvince: (province: IProvince) => void;
  changeDistrict: (district: IDistrict) => void;
  changeWard: (ward: IWard) => void;
  changeAddressName: (name: string) => void;
}
export default ({
  changeProvince,
  changeDistrict,
  changeWard,
  changeAddressName,
}: IProps) => {
  let refSelect: any
  const errors: any = useSelector(
    (state: RootState) => state.delivery.errorsUpdate
  )

  const [data, setData] = useState<any[]>(
    useSelector((state: RootState) => state.delivery.provinces)
  )
  const initProvince = useSelector(
    (state: RootState) => state.delivery.provinces
  )
  const dispatch = useDispatch()
  const [province, setProvince] = useState<IProvince | undefined>(undefined)
  const [district, setDistrict] = useState<IDistrict | undefined>(undefined)
  const [ward, setWard] = useState<IWard | undefined>(undefined)

  const address: IAddress | undefined = useSelector(
    (state: RootState) => state.delivery.address
  )

  const setRef = (ref: any) => {
    console.log('ref', ref)
    refSelect = ref
  }
  const onShowSelect = () => {
    refSelect.showModal()
  }
  const onSelectProvince = (item: IProvince) => {
    console.log('item', item)
    if (!item) {
      setDistrict(undefined)
      setWard(undefined)
      return
    }
    TYPE = DISTRICT
    setData(item.districts)
    setProvince(item)
    changeProvince(item)
  }
  const onSelectDistrict = (item: IDistrict) => {
    console.log('item', item)
    if (!item) {
      setWard(undefined)
      return
    }
    TYPE = WARD
    setData(item.ward)
    setDistrict(item)
    changeDistrict(item)
  }
  const onSelectward = (item: IWard) => {
    console.log('item', item)
    if (!item) return
    TYPE = PROVINCE
    setData(initProvince)
    setWard(item)
    changeWard(item)
  }
  const onSelect = ([item]: any) => {
    switch (TYPE) {
      case PROVINCE:
        return onSelectProvince(item)
      case DISTRICT:
        return onSelectDistrict(item)
      case WARD:
        return onSelectward(item)
      default:
        return () => console.log('none')
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Địa chỉ</Text>
        <TextInput
          defaultValue={address ? address.address_name : ''}
          onChangeText={changeAddressName}
          style={styles.input}
          returnKeyType="done"
          placeholder="VD: 177 Hoàng Quốc Việt"
        />
        {errors ? (
          <Text style={styles.error}>{errors.address_name}</Text>
        ) : null}
      </View>

      <TouchableOpacity onPress={onShowSelect} style={styles.province}>
        <Text style={styles.label}>Tỉnh thành</Text>
        <View style={styles.choice}>
          <Text style={styles.txtProvince}>
            {province ? province.name : address?.province_name}
          </Text>
          <Image source={SEARCH_EXTEND} style={CommonStyles.iconSmallSmall} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={onShowSelect} style={styles.province}>
        <Text style={styles.label}>Quận huyện</Text>
        <View style={styles.choice}>
          <Text style={styles.txtProvince}>
            {district ? district.name : address?.district_name}
          </Text>
          <Image source={SEARCH_EXTEND} style={CommonStyles.iconSmallSmall} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={onShowSelect}
        style={[styles.province, { marginBottom: 30 }]}
      >
        <Text style={styles.label}>Xã phường</Text>
        <View style={styles.choice}>
          <Text style={styles.txtProvince}>
            {ward ? ward.name : address?.ward_name}
          </Text>
          <Image source={SEARCH_EXTEND} style={CommonStyles.iconSmallSmall} />
        </View>
      </TouchableOpacity>

      <Select setRef={setRef} data={data} onSelectItem={onSelect} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    marginHorizontal: moderateScale(10),
    borderRadius: 10,
  },
  inputContainer: {
    marginHorizontal: moderateScale(10),
    paddingVertical: moderateScale(10),
  },
  input: {
    borderBottomColor: '#A7A7A7',
    borderBottomWidth: 0.5,
    paddingVertical: moderateScale(5),
    color: '#595858',
  },
  province: {
    flexDirection: 'row',
    marginHorizontal: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: '#A7A7A7',
    paddingVertical: moderateScale(5),
    marginVertical: moderateScale(5),
  },
  choice: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  txtProvince: {
    marginRight: moderateScale(10),
    color: '#595858',
  },
  label: {
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: '#707070',
  },
  error: {
    color: '#E55353',
    marginTop: moderateScale(10),
  },
})
