import * as React from 'react'
import styles from './styles'
import { View, Image } from 'react-native'
import { AUTHBACKGROUND } from '../../utils/image'
export interface IBackgroundDefaultProps {}

export interface IBackgroundDefaultState {}

export default class BackgroundDefault extends React.Component<
  IBackgroundDefaultProps,
  IBackgroundDefaultState
> {
  constructor(props: IBackgroundDefaultProps) {
    super(props)
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.topImage} source={AUTHBACKGROUND} />
        {/* <Image style={styles.bottomImage} source={BELOW_BACKGROUND} /> */}
      </View>
    )
  }
}
