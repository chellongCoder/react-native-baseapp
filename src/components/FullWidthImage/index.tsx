import React, { Component } from 'react'
import { Image, View, LayoutChangeEvent } from 'react-native'

interface IProps {
  ratio: number;
  source: any;
}
interface IState {
  width: number;
  height: number;
}
export default class FullWidthImage extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props)

    this.state = {
      width: 0,
      height: 0,
    }
  }

  _onLayout(event: LayoutChangeEvent) {
    const containerWidth = event.nativeEvent.layout.width

    if (this.props.ratio) {
      this.setState({
        width: containerWidth,
        height: containerWidth * this.props.ratio,
      })
    } else if (typeof this.props.source === 'number') {
      const source = Image.resolveAssetSource(this.props.source)

      this.setState({
        width: containerWidth,
        height: (containerWidth * source.height) / source.width,
      })
    } else if (typeof this.props.source === 'object') {
      Image.getSize(
        this.props.source.uri,
        (width, height) => {
          this.setState({
            width: containerWidth,
            height: (containerWidth * height) / width,
          })
        },
        (error: any) => {
          console.log('====================================')
          console.log(error)
          console.log('====================================')
        }
      )
    }
  }

  render() {
    return (
      <View onLayout={this._onLayout.bind(this)}>
        <Image
          source={this.props.source}
          style={{
            width: this.state.width,
            height: this.state.height,
          }}
        />
      </View>
    )
  }
}
