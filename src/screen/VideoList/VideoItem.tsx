import React, { Component } from 'react'
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native'
import {
  WIN_WIDTH,
  WIN_HEIGHT,
  moderateScale,
} from '../../styles/common.variables'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import Video from 'react-native-video'
import { EYEVIEW, HEART } from '../../utils/icon'
interface IProps {
  video: object;
}

export default ({ video }: IProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.videoView}>
        <Video
          source={{
            uri: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4',
          }}
          style={styles.nativeVideoControls}
          controls={true}
          //  rate={0}
          paused={true}
        />
      </View>
      <View style={styles.infoView}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={styles.nameView}>
            <Text style={styles.nameText}>{video.name}</Text>
          </View>
          <View style={styles.rateView}>
            <View style={styles.countView}>
              <Image source={EYEVIEW} style={styles.iconSize} />
              <Text style={styles.countText}>{video.view}</Text>
            </View>
            <View style={styles.countView}>
              <Image source={HEART} style={styles.iconSize} />
              <Text style={styles.countText}>{video.heart}</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.timeText}>{video.time}</Text>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    height: 0.4 * WIN_HEIGHT,
    backgroundColor: '#FFF',
    marginBottom: moderateScale(10),
  },
  videoView: {
    flex: 4,
    // backgroundColor: 'red',
  },
  infoView: {
    flex: 1,
    flexDirection: 'column',
  },
  nativeVideoControls: {
    // top: 184,
    height: '100%',
    width: '100%',
  },
  nameView: {
    flex: 4,
    justifyContent: 'center',
  },
  nameText: {
    marginLeft: moderateScale(15),
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontWeight: 'bold',
    color: '#565656',
    fontSize: moderateScale(12),
  },
  rateView: {
    flex: 2,
    flexDirection: 'row',
  },
  iconSize: {
    width: moderateScale(12),
    height: moderateScale(12),
    resizeMode: 'contain',
  },
  countView: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  countText: {
    color: '#8D8D8D',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    textTransform: 'uppercase',
    fontSize: moderateScale(12),
    textAlignVertical: 'center',
    marginLeft: moderateScale(3),
  },
  timeText: {
    color: '#A3A3A3',
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontSize: moderateScale(8),
    textAlignVertical: 'center',
    marginLeft: moderateScale(15),
  },
})
