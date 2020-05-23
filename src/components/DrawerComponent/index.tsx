import React, { Component, useEffect, useLayoutEffect } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import styles from './styles'
import { DRAWERCOVER, DRAWERAVATAR } from '../../utils/image'
import CommonStyles from '../../utils/common.styles'
import ListServices from './ListServices'
import { useDispatch } from 'react-redux'
import { changeNavigationDrawer } from '../../stores/actions/ui.action'
import NavigationServices from '../../services/NavigationServices'
interface IProps {
  navigation: any;
  progress: any;
}
export default ({ navigation, progress }: IProps) => {
  console.log('navigation aaaa', navigation, progress)

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(changeNavigationDrawer(navigation))
  }, [])
  return (
    <View style={styles.container}>
      <View style={styles.cover}>
        <Image style={CommonStyles.imageCover} source={DRAWERCOVER} />
      </View>
      <View style={styles.userInfo}>
        <View style={styles.avatar}>
          <Image style={CommonStyles.image} source={DRAWERAVATAR} />
        </View>
        <Text style={styles.name}>Miing</Text>
      </View>
      <ListServices navigation={navigation} />
    </View>
  )
}
