import React, { useCallback, useState, useRef, useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ViewStyle,
  StyleProp,
  Animated,
  ActivityIndicator,
} from 'react-native'
import ContentLoader from '../ContentLoader'
import { WIN_WIDTH, moderateScale } from '../../styles/common.variables'
import { toJS } from 'mobx'
interface IListFullOption {
  data: any[] | undefined
  // eslint-disable-next-line prettier/prettier
  renderSubItem: (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: Function
  ) => JSX.Element
  style?: StyleProp<ViewStyle>
  horizontal?: boolean
  showsHorizontalScrollIndicator?: boolean
  showsVerticalScrollIndicator?: boolean
  onRefreshEvent?: Function
  setRefRefresh?: (ref: any) => void
  ListHeaderComponent?: React.ReactElement<
    any,
    | string
    | ((
        props: any
      ) => React.ReactElement<
        any,
        string | (new (props: any) => React.Component<any, any, any>)
      > | null)
    | (new (props: any) => React.Component<any>)
  >
  scrollEnabled: boolean
  ListEmptyComponent?:
    | React.ComponentClass<any, any>
    | React.FunctionComponent<any>
  isMultiSelect?: boolean
  loadMore?: boolean
  onLoadMore?: () => Promise<void>
  listFooterComponent?: any
  onScroll?: any
}
const Row = ({ item, isFavorite, onPress, renderSubItem, index }: any) => {
  return renderSubItem(isFavorite, item, index, onPress)
}
const renderItem = ({
  item,
  index,
  favorites,
  setFavorite,
  renderSubItem,
}: any) => {
  return (
    <Row
      item={item}
      isFavorite={favorites.includes(item)}
      onPress={item => {
        setFavorite(favoriteItems => {
          console.log('favoriteItems', favoriteItems)
          
          const isFavorite = favoriteItems.includes(item)

          if (isFavorite) {
            return favoriteItems.filter(title => title !== item)
          } else {
            return [item]
          }
        })
      }}
      renderSubItem={renderSubItem}
      index={index}
    />
  )
}

const renderItemMultiSelect = ({
  item,
  index,
  favorites,
  setFavorite,
  renderSubItem,
}: any) => {
  return (
    <Row
      item={item}
      isFavorite={favorites.includes(item)}
      onPress={item => {
        console.log('item', toJS(item))
        setFavorite(favoriteItems => {
          const isFavorite = favoriteItems.includes(item)

          if (isFavorite) {
            return favoriteItems.filter(title => title !== item)
          } else {
            if (item.id == 0) {
              return [item]
            } else if (item.id !== 0) {
              return [item, ...favoriteItems.filter(e => e.id !== 0)]
            }
          }
        })
      }}
      renderSubItem={renderSubItem}
      index={index}
    />
  )
}
const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom
}
let flatList: any
export default ({
  data,
  renderSubItem,
  style,
  horizontal,
  showsHorizontalScrollIndicator,
  showsVerticalScrollIndicator,
  ListHeaderComponent,
  onRefreshEvent,
  scrollEnabled,
  setRefRefresh,
  ListEmptyComponent,
  isMultiSelect,
  loadMore,
  onLoadMore,
  listFooterComponent,
  onScroll
}: IListFullOption) => {
  const [favorites, setFavorite] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  const [scrollY, setScrollY] = useState(new Animated.Value(0))
  const [isLoadMore, setIsLoadMore] = useState(false)
  const onRefresh = async () => {
    console.log('refresh')
    setRefreshing(true)
    try {
      onRefreshEvent && (await onRefreshEvent())
    } catch (error) {
      setRefreshing(false)
    } finally {
      setRefreshing(false)
    }
  }
  const ref = useRef({ onRefresh })
  useEffect(() => {
    setRefRefresh && setRefRefresh(ref)
  }, [])
  const renderItemCall = useCallback(
    ({ item, index }) => {
      if (isMultiSelect) {
        return renderItemMultiSelect({
          item,
          index,
          favorites,
          setFavorite,
          renderSubItem,
        })
      } else {
        return renderItem({
          item,
          index,
          favorites,
          setFavorite,
          renderSubItem,
        })
      }
    },

    [favorites]
  )
  const renderLoading = () => {
    return <ContentLoader />
  }
  const onMomentumScrollEnd = async ({nativeEvent}) => {

    if(!loadMore) return
    if (isCloseToBottom(nativeEvent)) {
      console.log("reach to end list")
      setIsLoadMore(true)
      onLoadMore && await onLoadMore()
      setTimeout(() => {
        setIsLoadMore(false)
      }, 0);
    }
    


  }

  const renderListFooterComponent = () => {
    return <View>
      {listFooterComponent ? listFooterComponent : null}
      {isLoadMore ? (        <View style={{marginVertical: moderateScale(10)}}> 
          <ActivityIndicator/>
        </View>) : null}
    </View>
    

  }

  const onContentSizeChange = () => {
    if(isLoadMore) {
      flatList.scrollToEnd({animated: true})
    }
  }
  

  return (
    <FlatList
      ListHeaderComponent={ListHeaderComponent}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      horizontal={horizontal}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      } 
      scrollEventThrottle={16}
      onScroll={onScroll}
      ref={ref => flatList = ref}
      onMomentumScrollEnd={onMomentumScrollEnd}
      extraData={favorites}
      ListFooterComponent={
        renderListFooterComponent
      }
      onContentSizeChange={onContentSizeChange}
      contentContainerStyle={style}
      data={data} // data is a constant values in the File scope.
      renderItem={refreshing ? renderLoading : renderItemCall}
      keyExtractor={keyExtractor}
      scrollEnabled={scrollEnabled}
      ListEmptyComponent={ListEmptyComponent}
    />
  )
}

function keyExtractor(item: any, index: number) {
  return item + index
}
