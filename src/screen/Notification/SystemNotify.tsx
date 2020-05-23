import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import ListFullOption from '../../components/ListFullOption'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import NotificationItem from './NotificationItem'
import { CommonVariables } from '../../utils/common.styles'

export default () => {
  const notifications = useSelector(
    (state: RootState) => state.notification.notifcations
  )

  const renderNotification = (
    isFavorite: boolean,
    item: any,
    index: number,
    onPress: any
  ) => {
    return <NotificationItem item={item} />
  }
  return (
    <View style={styles.container}>
      <ListFullOption
        scrollEnabled={true}
        data={notifications}
        renderSubItem={renderNotification}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: CommonVariables.whiteColor,
  },
})
