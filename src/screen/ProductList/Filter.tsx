import React from 'react'
import { View, StyleSheet } from 'react-native'
import { CommonVariables } from '../../utils/common.styles'
import FilterContainer from '../../containers/filter.contaner'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { ICategory } from '../../stores/object/category.object'
import { getProduct, refresh } from '../../stores/actions/shopping.action'
interface IProps {
  setPageNumber: (number: number) => void;
  changeCategorySelected: (category: ICategory | undefined) => void;
}
export default ({ setPageNumber, changeCategorySelected }: IProps) => {
  const categories: ICategory[] = useSelector(
    (state: RootState) => state.category.categoriesProduct
  )
  const dispatch = useDispatch()
  const onPressCategory = async (
    categoryItem: any,
    isSelectedItem: boolean
  ) => {
    console.log('category', categoryItem, 'isSelectedItem', isSelectedItem)
    if (isSelectedItem) {
      changeCategorySelected(categoryItem)
      dispatch(refresh(1, categoryItem.id))
    } else {
      changeCategorySelected(undefined)
      dispatch(refresh(1))
    }
    setPageNumber(1)
  }
  return (
    <View style={styles.filter}>
      <FilterContainer
        scrollEnabled={true}
        data={categories}
        isMultiSelect={false}
        onPressItem={onPressCategory}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  filter: {
    backgroundColor: CommonVariables.whiteColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 5,
    zIndex: 999,
  },
})
