import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Animated } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import ProductItem from '../ProductList/ProductItem'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import Services from './Services'
import Video from './Video'
import { IProduct } from '../../stores/object/product.object'
import ListLoading from '../../components/ListLoading'
import { AppDispatch } from '../../App.bootstrap'
import { refresh, getProduct } from '../../stores/actions/home.action'
import Voucher from './Voucher'
import { CommonVariables } from '../../utils/common.styles'
import { useNavigation } from '@react-navigation/native'
import { ICategory } from '../../stores/object/category.object'
const renderProduct = (
  isFavorite: boolean,
  item: any,
  index: number,
  onPress: Function
) => {
  return <ProductItem item={item} />
}

interface IProps {
  navigation?: any;
  choicedCategory: ICategory;
}

export default ({ navigation, choicedCategory }: IProps) => {
  const category: ICategory[] = useSelector(
    (state: RootState) => state.category.categoriesProduct
  )
  const products: IProduct[] = useSelector(
    (state: RootState) => state.home.products
  )
  const loadingProducts: boolean = useSelector(
    (state: RootState) => state.home.loadingProducts
  )
  const scrollY = useSelector((state: RootState) => state.ui.scrollY)
  const dispatch = useDispatch()

  const onRefresh = () => {
    dispatch(refresh())
  }

  console.log('products', products)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('tabPress', (e: any) => {
      console.log('====================================')
      console.log('press', choicedCategory, e)
      console.log('====================================')

      dispatch(refresh(1, choicedCategory.id))
    })

    return unsubscribe
  }, [navigation, choicedCategory])

  return (
    <View style={styles.container}>
      {!loadingProducts ? (
        <ListFullOption
          style={styles.list}
          scrollEnabled={true}
          data={products}
          renderSubItem={renderProduct}
          showsVerticalScrollIndicator={false}
          onRefreshEvent={onRefresh}
          onScroll={Animated.event([
            {
              nativeEvent: {
                contentOffset: {
                  y: scrollY,
                },
              },
            },
          ])}
          listFooterComponent={
            <View
              style={{
                paddingBottom: moderateScale(180),
              }}
            >
              <Services />
              <Video />
            </View>
          }
          ListHeaderComponent={<Voucher />}
        />
      ) : (
        <ListLoading />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonVariables.whiteColor,
  },
  list: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    width: WIN_WIDTH,
    justifyContent: 'center',
    paddingTop: moderateScale(10),
    paddingBottom: moderateScale(50),
  },
})
