import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Header from '../../components/Header'
import DrawerScreen from '../../components/DrawerScreen'
import { CommonVariables } from '../../utils/common.styles'
import VideoItem from './VideoItem'
import videos from './data'
import ListFullOption from '../../components/ListFullOption'
import { moderateScale } from '../../styles/common.variables'
interface IProps {
  navigation: any;
}
export default class VideoList extends Component<IProps> {
  renderItem = (isFavorite: boolean, item: any) => {
    return <VideoItem video={item} />
  }
  render() {
    const { navigation } = this.props
    return (
      <View style={styles.container}>
        <Header navigation={navigation} title="Video đào tạo" />
        <ListFullOption
          data={videos}
          renderSubItem={this.renderItem}
          // horizontal={true}
          scrollEnabled={true}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E6E6E6',
  },
})
