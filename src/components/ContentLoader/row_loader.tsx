import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { WIN_WIDTH } from '../../styles/common.variables'

export interface AppProps {}

export default class RowLoader extends React.Component<AppProps, any> {
  constructor(props: AppProps) {
    super(props)
  }

  public render() {
    const arrLoader = []
    for (let i = 0; i <= 5; i++) {
      arrLoader.push(
        <ContentLoader
          speed={0.75}
          width={CommonVariables.screenWidth - 10}
          height={WIN_WIDTH / 7 + 25}
          viewBox={`0 10 ${CommonVariables.screenWidth - 10} ${WIN_WIDTH / 7 +
            20}`}
          backgroundColor={CommonVariables.grayColor}
          foregroundColor={CommonVariables.whiteColor}
          opacity={0.2}
          key={i}
        >
          <Circle cx="38" cy="48" r={`${WIN_WIDTH / 7 / 2}`} />
          <Rect
            x={`${WIN_WIDTH / 7 / 2 + 58}`}
            y="34"
            rx="2"
            ry="2"
            width="140"
            height="10"
          />
          <Rect
            x={`${WIN_WIDTH / 7 / 2 + 58}`}
            y="54"
            rx="2"
            ry="2"
            width="140"
            height="10"
          />
        </ContentLoader>
      )
    }
    return arrLoader
  }
}
