import React, { useState } from 'react'
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import {
  moderateScale,
  WIN_WIDTH,
  WIN_HEIGHT,
} from '../../styles/common.variables'
import Video, { FilterType, OnProgressData } from 'react-native-video'
import {
  HOME_NEXT,
  HOME_PAUSE,
  HOME_PREVIOUS,
  HOME_VIEW,
  HOME_HEART,
  HOME_PLAY,
} from '../../utils/icon'
import * as Animatable from 'react-native-animatable'

export default () => {
  const [isPaused, setIsPaused] = useState(true)
  const [isShowControl, setIsShowControl] = useState(true)
  const onPause = () => {
    setIsPaused(!isPaused)
  }
  const onProgress = (data: OnProgressData) => {
    // console.log('data video', data)
  }
  const onShowControl = () => {
    setIsShowControl(!isShowControl)
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>Services</Text>
      </View>
      <TouchableWithoutFeedback onPress={onShowControl}>
        <View
          style={{
            paddingTop: moderateScale(10),
            paddingBottom: moderateScale(20),
          }}
        >
          <View
            style={{
              width: WIN_WIDTH - moderateScale(40),
              height: WIN_HEIGHT / 4,
            }}
          >
            <Video
              source={require('./../../broadchurch.mp4')}
              paused={isPaused}
              onProgress={onProgress}
              muted={true}
              resizeMode="cover"
              style={styles.video}
            />

            <Animatable.View
              animation={isShowControl ? 'fadeIn' : 'fadeOut'}
              duration={500}
              style={styles.contentContainerVideo}
            >
              <Image style={CommonStyles.iconSize} source={HOME_PREVIOUS} />
              <TouchableOpacity onPress={onPause}>
                <Image
                  style={CommonStyles.iconSize}
                  source={isPaused ? HOME_PAUSE : HOME_PLAY}
                />
              </TouchableOpacity>
              <Image style={CommonStyles.iconSize} source={HOME_NEXT} />

              <View style={styles.contentVideo}>
                <Text style={styles.title}>Lorem ipsum dolor sit amet</Text>
                <View style={styles.row}>
                  <View style={styles.row}>
                    <Image style={CommonStyles.iconSize} source={HOME_VIEW} />
                    <Text style={styles.number}>23</Text>
                  </View>
                  <View style={styles.row}>
                    <Image style={CommonStyles.iconSize} source={HOME_HEART} />
                    <Text style={styles.number}>18</Text>
                  </View>
                </View>
              </View>
            </Animatable.View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: CommonVariables.whiteColor,
    borderRadius: moderateScale(5),
    width: WIN_WIDTH - moderateScale(20),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  header: {
    padding: moderateScale(10),
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
    width: WIN_WIDTH - moderateScale(40),
  },
  textHeader: {
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    width: WIN_WIDTH - moderateScale(40),
    borderBottomWidth: 0.5,
    borderBottomColor: '#CFCFCF',
  },
  name: {
    fontSize: moderateScale(15),
    fontFamily: CommonVariables.fonts.OPENSANS_BOLD,
    color: '#717171',
    paddingBottom: moderateScale(10),
  },
  content: {
    fontFamily: CommonVariables.fonts.OPENSANS_LIGHT,
    color: '#717171',
    fontSize: moderateScale(12),
  },
  viewAll: {
    paddingVertical: moderateScale(10),
  },
  row: {
    flexDirection: 'row',
    marginRight: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    paddingVertical: moderateScale(10),
  },
  number: {
    color: CommonVariables.whiteColor,
    fontFamily: CommonVariables.fonts.OPENSANS_REGULAR,
    paddingLeft: moderateScale(10),
  },
  contentContainerVideo: {
    width: WIN_WIDTH - moderateScale(40),
    height: WIN_HEIGHT / 4,
    backgroundColor: 'rgba(0,0,0,0.2)',
    position: 'absolute',
    top: moderateScale(0),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(10),
  },
  contentVideo: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    padding: moderateScale(10),
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    width: '100%',
    height: '100%',
  },
})
