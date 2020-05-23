import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import ProductList from '../ProductList'
import Cosmetics from './Cosmetics'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../stores/reducers'
import { ICategory } from '../../stores/object/category.object'
import ListLoading from '../../components/ListLoading'
import { refresh } from '../../stores/actions/home.action'

const Tab = createMaterialTopTabNavigator()

export default () => {
  const category: ICategory[] = useSelector(
    (state: RootState) => state.category.categoriesProduct
  )
  const [choicedCategory, setChoicedCategory] = useState<ICategory | undefined>(
    undefined
  )
  console.log('====================================')
  console.log(category)
  console.log('====================================')

  const onchangeTab = (cate: ICategory) => {
    // dispatch(refresh(1, cate.id))
    setChoicedCategory(cate)
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        indicatorStyle: {
          backgroundColor: '#E55353',
          height: 2,
        },
        style: {
          shadowColor: '#000',
          shadowOffset: {
            width: 2,
            height: 2,
          },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 3,
        },
      }}
    >
      {category.length
        ? category.map((value, index) => (
            <Tab.Screen
              key={index}
              options={{
                tabBarLabel: ({ focused, color }) => (
                  <TouchableOpacity onPress={() => onchangeTab(value)}>
                    <Text
                      style={[
                        styles.label,
                        {
                          color: focused ? '#E55353' : '#747474',
                        },
                      ]}
                    >
                      {value.name}
                    </Text>
                  </TouchableOpacity>
                ),
              }}
              name={value.name}
              component={props => (
                <Cosmetics {...props} choicedCategory={value} />
              )}
            />
          ))
        : [1, 2, 3].map((value, index) => (
            <Tab.Screen
              key={index}
              options={{
                tabBarLabel: ({ focused, color }) => (
                  <TouchableOpacity>
                    <ActivityIndicator />
                  </TouchableOpacity>
                ),
              }}
              name={`${value}`}
              component={() => <ListLoading />}
            />
          ))}
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
  },
})
