import { View, Text, StyleSheet } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import React, { Component } from 'react'
import CommonStyles, { CommonVariables } from '../../utils/common.styles'
import { alertInfo } from '../../utils/common.util'

interface ICountDown {
  endCountDown: () => void;
  setRef: (ref: any) => void;
}
const TOTAL = 180
let interval: any
export default ({ endCountDown, setRef }: ICountDown) => {
  const [time, setTime] = useState('')

  const onCountDown = () => {
    let total = TOTAL
    interval && clearInterval(interval)
    interval = setInterval(() => {
      const minutes = (total / 60).toFixed(2)
      const second = 60 + Math.round((minutes - Math.ceil(total / 60)) * 60)
      if (second === 60) {
        setTime(`${Math.round(total / 60)}:00`)
      } else {
        setTime(
          `${Math.floor(total / 60)}:${second < 10 ? `0${second}` : second}`
        )
      }
      total--

      console.log(minutes, second)
      if (parseFloat(`${minutes}`) === 0) {
        endCountDown()
        onCountDown()
      }
    }, 1000)
  }
  useEffect(() => {
    onCountDown()
    setRef(ref)
  }, [])
  const clearCountDown = () => {
    interval && clearInterval(interval)
  }
  const resendCode = () => {
    alertInfo('Please wait message a minute')
    endCountDown()
    onCountDown()
  }
  const ref = useRef({ clearCountDown })
  return (
    <Text onPress={resendCode} style={styles.text}>
      Gửi lại ({time})
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: CommonVariables.whiteColor,
    fontFamily: 'OpenSans-SemiBold',
    textDecorationLine: 'underline',
  },
})
