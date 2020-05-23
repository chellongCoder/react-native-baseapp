import React from 'react'
import ContentLoader, { Rect, Circle } from 'react-content-loader/native'
import { View } from 'react-native'

export default () => (
  <View
    style={{
      marginTop: 10,
    }}
  >
    <ContentLoader
      speed={0.5}
      width={400}
      height={160}
      viewBox="0 0 400 160"
      backgroundColor="#cdc9cc"
      foregroundColor="#ecebeb"
    >
      <Rect x="0" y="0" rx="3" ry="3" width="67" height="11" />
      <Rect x="76" y="0" rx="3" ry="3" width="140" height="11" />
      <Rect x="127" y="48" rx="3" ry="3" width="53" height="11" />
      <Rect x="187" y="48" rx="3" ry="3" width="72" height="11" />
      <Rect x="18" y="48" rx="3" ry="3" width="100" height="11" />
      <Rect x="0" y="71" rx="3" ry="3" width="37" height="11" />
      <Rect x="18" y="23" rx="3" ry="3" width="140" height="11" />
      <Rect x="166" y="23" rx="3" ry="3" width="173" height="11" />
    </ContentLoader>
  </View>
)
