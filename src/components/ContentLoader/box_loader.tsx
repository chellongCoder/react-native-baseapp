import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { WIN_WIDTH } from '../../styles/common.variables'
import { View } from 'react-native'

export interface AppProps {}

export default class BoxLoader extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props)
  }

  public render() {
    const arrLoader = []
    for (let i = 0; i <= 3; i++) {
      arrLoader.push(
        <ContentLoader
          speed={0.75}
          width={WIN_WIDTH / 5.5}
          height={WIN_WIDTH / 5.5}
          viewBox={`0 10 ${WIN_WIDTH / 5.5} ${WIN_WIDTH / 5.5}`}
          backgroundColor={CommonVariables.grayColor}
          foregroundColor={CommonVariables.whiteColor}
          opacity={0.2}
          style={{ borderRadius: 10 }}
        >
          <Rect rx="2" ry="2" width={'100%'} height={'100%'} />
        </ContentLoader>
      )
    }
    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        {arrLoader}
      </View>
    )
  }
}
