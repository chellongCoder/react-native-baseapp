import React, { PureComponent } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import { AUTHBACKGROUND, SPLASH } from '../../utils/image'
import CommonStyles from '../../utils/common.styles'
import { WIN_WIDTH, WIN_HEIGHT } from '../../styles/common.variables'

export default class Splash extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <Image style={CommonStyles.imageCover} source={SPLASH} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: WIN_WIDTH,
    height: WIN_HEIGHT,
  },
})
