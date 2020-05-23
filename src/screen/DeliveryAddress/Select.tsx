import React from 'react'
import { View, Text } from 'react-native'
import Select2 from 'react-native-select-two'
import { CommonVariables } from '../../utils/common.styles'

const mockData = [
  { id: 1, name: 'React Native Developer', checked: true }, // set default checked for render option item
  { id: 2, name: 'Android Developer' },
  { id: 3, name: 'iOS Developer' },
]
interface IProps {
  setRef: (ref: any) => void;
  data: any[];
  onSelectItem: (item: any) => void;
}
export default ({ setRef, data, onSelectItem }: IProps) => {
  const onSelect = (id: any[], item: any[]) => {
    console.log('====================================')
    console.log(item)
    console.log('====================================')
    onSelectItem(item)
  }
  return (
    <View>
      <Select2
        isSelectSingle
        style={{ width: 0, position: 'absolute', borderWidth: 0 }}
        colorTheme={'#E55353'}
        popupTitle="Select item"
        title="Select item"
        data={data}
        onSelect={onSelect}
        onRemoveItem={(data: any) => {
          // this.setState({ data })
        }}
        defaultFontName={CommonVariables.fonts.OPENSANS_REGULAR}
        ref={(ref: any) => setRef(ref)}
      />
    </View>
  )
}
