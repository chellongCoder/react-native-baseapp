import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

import { CommonVariables } from '../../utils/common.styles'
import SystemNotify from './Expiried'
import Available from './Available'
import Expiried from './Expiried'

const Tab = createMaterialTopTabNavigator()

export default () => {
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
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused, color }) => (
            <Text
              style={[
                styles.label,
                {
                  color: focused ? '#E55353' : '#747474',
                },
              ]}
            >
              Có hiệu lực{' '}
            </Text>
          ),
        }}
        name="Available"
        component={Available}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TouchableOpacity>
              <Text
                style={[
                  styles.label,
                  {
                    color: focused ? '#E55353' : '#747474',
                  },
                ]}
              >
                Đã sử dụng{' '}
              </Text>
            </TouchableOpacity>
          ),
        }}
        name="Used"
        component={Expiried}
      />
      <Tab.Screen
        options={{
          tabBarLabel: ({ focused, color }) => (
            <TouchableOpacity>
              <Text
                style={[
                  styles.label,
                  {
                    color: focused ? '#E55353' : '#747474',
                  },
                ]}
              >
                Hết hiệu lực{' '}
              </Text>
            </TouchableOpacity>
          ),
        }}
        name="Expiried"
        component={Expiried}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  label: {
    textAlign: 'center',
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
  },
})
