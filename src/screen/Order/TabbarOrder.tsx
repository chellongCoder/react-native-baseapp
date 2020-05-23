import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import Live from './Live'
import Member from './Member'
import { CommonVariables } from '../../utils/common.styles'

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
              Trực tiếp{' '}
            </Text>
          ),
        }}
        name="Live"
        component={Live}
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
                Thành viên{' '}
              </Text>
            </TouchableOpacity>
          ),
        }}
        name="Member"
        component={Member}
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
