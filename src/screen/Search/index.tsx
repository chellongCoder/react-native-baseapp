import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, ScrollView } from 'react-native'
import styles from './styles'
import * as Animatable from 'react-native-animatable'
import History from './History'
import Popular from './Popular'
import Category from './Category'
import { CommonVariables } from '../../utils/common.styles'
export default class Search extends Component {
  render() {
    return (
      <Animatable.View
        duration={CommonVariables.DURATION}
        animation="fadeIn"
        style={styles.container}
      >
        <ScrollView>
          <History />
          <Popular />
          <Category />
        </ScrollView>
      </Animatable.View>
    )
  }
}
