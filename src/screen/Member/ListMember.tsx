import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { useSelector } from 'react-redux'
import { RootState } from '../../stores/reducers'
import ListFullOption from '../../components/ListFullOption'
import { CommonVariables } from '../../utils/common.styles'
import MemberItem from './MemberItem'
const renderMember = (
  isFavorite: boolean,
  item: any,
  index: number,
  onPress: any
) => {
  return <MemberItem item={item} />
}
export default () => {
  const members = useSelector((state: RootState) => state.member.members)
  return (
    <View style={styles.container}>
      <ListFullOption
        scrollEnabled={true}
        data={members}
        renderSubItem={renderMember}
        style={{}}
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
