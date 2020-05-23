import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { CommonVariables } from '../utils/common.styles'
import { ICategory } from '../stores/object/category.object'

interface IFilterItem {
  item: ICategory
  // eslint-disable-next-line prettier/prettier
  index: number
  isFavorite: boolean
  onPressItem: Function
  setRef?: (ref: any) => void
  numberBadgeCategories?: any
}

export default ({
  item,
  index,
  isFavorite,
  onPressItem,
  setRef,
  numberBadgeCategories,
}: IFilterItem) => {
  console.log('item', item)
  const focus = () => {
    onPressItem(item)
  }
  console.log('isFavorite item', isFavorite)
  return (
    <TouchableOpacity onPress={focus} style={[styles.container, {backgroundColor: isFavorite ? '#E55353' : undefined}]}>
      <Text style={[styles.text, {color: isFavorite ? CommonVariables.whiteColor : undefined}]}>{item.name}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderWidth: 0.5,
    borderColor: '#CFCFCF',
    borderRadius: 3
  },
   text: {

   }
});