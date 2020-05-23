import * as React from 'react'
import {
  View,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ViewStyle,
  StyleProp,
} from 'react-native'
import { WIN_WIDTH, moderateScale } from '../styles/common.variables'
import FilterItem from './FilterItem'
import ListFullOption from '../components/ListFullOption'
import { ICategory } from '../stores/object/category.object'

export interface FilterProps {
  scrollEnabled: boolean
  // eslint-disable-next-line prettier/prettier
  data: ICategory[]
  style?: StyleProp<ViewStyle>
  onPressItem?: (item: any, isSelectedItem: boolean) => void
  setRef?: (ref: any) => void
  isMultiSelect?: boolean
  numberBadgeCategories?: any
}

export interface FilterState {}

export default class FilterContainer extends React.Component<
  FilterProps,
  FilterState
> {
  constructor(props: FilterProps) {
    super(props)
    this.state = {}
  }

  renderItemTab = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: any
  ) => {
    const { onPressItem, setRef, numberBadgeCategories } = this.props
    return (
      <FilterItem
      onPressItem={() => {
        onPress(item)
        onPressItem && onPressItem(item, !isFavorite)
      }}
      isFavorite={isFavorite}
      index={index}
      item={item}
      setRef={setRef}
      />
    )
  }

  public render() {
    const { scrollEnabled, data, style, isMultiSelect } = this.props
    return (
      <ListFullOption
        data={data}
        renderSubItem={this.renderItemTab}
        style={[
          {
            backgroundColor: '#FFF',
            padding: 10
          },
          style,
        ]}
        scrollEnabled={scrollEnabled}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        isMultiSelect={isMultiSelect}
      />
    )
  }
}
