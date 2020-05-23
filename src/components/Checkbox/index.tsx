import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Text, TouchableHighlight, View, TouchableOpacity } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import _ from 'underscore'
import { moderateScale } from '../../styles/common.variables'

let BACKGROUND_COLOR,
  BORDER_RADIUS,
  BORDER_WIDTH,
  COLOR,
  MARGIN,
  SIZE,
  BORDER_COLOR

export default class Checkbox extends Component {
  constructor(props) {
    super(props)

    this.state = {
      backgroundColor: '#FFF',
      borderRadius: 0,
      borderWidth: 2,
      checked: false,
      color: '#000',
      margin: 2,
      name: '',
      onChange: null,
      size: 20,
      borderColor: '#000',
    }
  }

  componentDidMount() {
    this.setState(_.extend({}, this.props.style, _.omit(this.props, 'style')))
  }

  componentWillReceiveProps(nextProps) {
    this.props = nextProps
    this.setState({ checked: nextProps.checked })
  }

  render() {
    BACKGROUND_COLOR = this.state.backgroundColor
    BORDER_RADIUS = this.state.borderRadius
    BORDER_WIDTH = this.state.borderWidth
    COLOR = this.state.color
    MARGIN = this.state.margin
    SIZE = this.state.size
    BORDER_COLOR = this.state.borderColor
    return (
      <TouchableOpacity
        // underlayColor="transparent"
        onPress={() => {
          this._toggleCheck()
        }}
        style={{
          backgroundColor: BACKGROUND_COLOR,
          borderColor: BORDER_COLOR,
          borderRadius: BORDER_RADIUS,
          borderWidth: BORDER_WIDTH,
          height: SIZE,
          width: SIZE,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {this.state.checked && (
          <View
            style={{
              width: moderateScale(10),
              height: moderateScale(10),
              borderRadius: moderateScale(5),
              backgroundColor: COLOR,
            }}
          />
        )}
      </TouchableOpacity>
    )
  }

  _toggleCheck() {
    const checked = !this.state.checked
    this.setState({ checked: checked })
    this.props.onChange && this.props.onChange(this.props.name, checked)
  }
}

Checkbox.propTypes = {
  checked: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.number,
  style: PropTypes.object,
}
