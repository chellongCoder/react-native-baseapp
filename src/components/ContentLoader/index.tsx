import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { WIN_WIDTH } from '../../styles/common.variables'

export default () => (
  <ContentLoader
    speed={0.5}
    width={WIN_WIDTH}
    height={160}
    viewBox="0 0 400 160"
    backgroundColor="#cdc9cc"
    foregroundColor="#ecebeb"
  >
    <Rect x="9" y="0" rx="0" ry="0" width="149" height="180" />
    <Rect x="166" y="-1" rx="0" ry="0" width="124" height="164" />
  </ContentLoader>
)
