import React from 'react'
import { Alert, Platform, Text, StyleSheet, Share } from 'react-native'
import { observable, computed, remove as removeMobx } from 'mobx'
import { string } from 'prop-types'
import {
  fromLeft,
  zoomIn,
  zoomOut,
  fromRight,
  fromBottom,
} from 'react-navigation-transitions'
/**
 * AccessKey
 */
export const ACCESS_KEY = 'ACCESSKEY'
import AsyncStorage from '@react-native-community/async-storage'
import { IOrderStatus } from '../stores/object/order.object'
import {
  ORDER_NEW,
  ORDER_FINISHED,
  ORDER_CANCEL,
  ORDER_TRANSPORTING,
  ORDER_COMPLETED,
} from './icon'

export const getAccessKey = async () => await AsyncStorage.getItem(ACCESS_KEY)
export const setAccessKey = async (accesskey: string) => {
  await AsyncStorage.removeItem(ACCESS_KEY)
  console.log('save access key', accesskey)
  return await AsyncStorage.setItem(ACCESS_KEY, accesskey)
}

export const clearCache = async () => {
  await AsyncStorage.removeItem(ACCESS_KEY)
}

function formatCurrency(num: any) {
  if (typeof num == 'number') {
    num = num.toString()
  }
  return num.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

function formatDateString(date: any, format?: any) {
  const dateObject = new Date()
  let signFormat = '/'
  let signDate = '/'
  let dd = String(dateObject.getDate()).padStart(2, '0')
  let mm = String(dateObject.getMonth() + 1).padStart(2, '0') //January is 0!
  let yyyy = dateObject.getFullYear().toString()
  if (format.includes('-')) {
    signFormat = '-'
  }
  if (date.includes('-')) {
    signDate = '-'
  }
  const arrDate = date.split(signDate)
  mm = arrDate[1]
  if (arrDate[0].length !== 4) {
    dd = arrDate[0]
    yyyy = arrDate[2]
  } else {
    dd = arrDate[2]
    yyyy = arrDate[0]
  }

  if (format) {
    const arrFormatDate = format.split(signFormat).map(e => e.toLowerCase())
    if (arrFormatDate.includes('dd')) {
      arrDate[arrFormatDate.indexOf('dd')] = dd
    }
    if (arrFormatDate.includes('mm')) {
      arrDate[arrFormatDate.indexOf('mm')] = mm
    }
    if (arrFormatDate.includes('yyyy')) {
      arrDate[arrFormatDate.indexOf('yyyy')] = yyyy
    }
  } else {
    arrDate[0] = yyyy
    arrDate[1] = mm
    arrDate[2] = dd
  }
  return arrDate.join(signFormat)
}

function formatDate(date?: Date, format?: any /* dd/mm/yyyy */) {
  const dateObject = date ? new Date(date) : new Date()
  const dd = String(dateObject.getDate()).padStart(2, '0')
  const mm = String(dateObject.getMonth() + 1).padStart(2, '0') //January is 0!
  const yyyy = dateObject.getFullYear().toString()
  const arrDate: any[] = []
  let sign = '/'
  if (format) {
    if (format.includes('-')) {
      sign = '-'
    }
    const arrFormatDate = format.split(sign).map(e => e.toLowerCase())
    if (arrFormatDate.includes('dd')) {
      arrDate[arrFormatDate.indexOf('dd')] = dd
    }
    if (arrFormatDate.includes('mm')) {
      arrDate[arrFormatDate.indexOf('mm')] = mm
    }
    if (arrFormatDate.includes('yyyy')) {
      arrDate[arrFormatDate.indexOf('yyyy')] = yyyy
    }
  } else {
    arrDate[0] = dd
    arrDate[1] = mm
    arrDate[2] = yyyy
  }
  return arrDate.join(sign)
}

function getHours(date?: Date, format?: any) {
  const dateObject = date ? new Date(date) : new Date()

  return `${dateObject.getHours()}:${dateObject.getMinutes()}`
}

function getTimeItem(time: string) {
  const date = new Date(time)
  return `${formatDate(date)} ${getHours(date)}`
}

export { formatCurrency, formatDateString, formatDate, getHours, getTimeItem }

export const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2]
  const nextScene = scenes[scenes.length - 1]
  console.log('prevScene', prevScene, 'nextScene', nextScene)
  // Custom transitions go there
  if (
    (prevScene &&
      prevScene.route.routeName === 'Home' &&
      nextScene.route.routeName === 'DetailWallet') ||
    (prevScene &&
      prevScene.route.routeName === 'Home' &&
      nextScene.route.routeName === 'Order') ||
    (prevScene &&
      prevScene.route.routeName === 'Home' &&
      nextScene.route.routeName === 'Member') ||
    (prevScene &&
      prevScene.route.routeName === 'Home' &&
      nextScene.route.routeName === 'Checkout') ||
    (prevScene &&
      prevScene.route.routeName === 'Home' &&
      nextScene.route.routeName === 'Notification')
  ) {
    return fromBottom()
  } else if (
    prevScene &&
    prevScene.route.routeName === 'Order' &&
    nextScene.route.routeName === 'OrderDetail'
  ) {
    return fromRight()
  } else if (
    prevScene &&
    prevScene.route.routeName === 'ChangePasswordEmail' &&
    nextScene.route.routeName === 'ConfirmEmail'
  ) {
    return zoomIn()
  } else if (
    prevScene &&
    prevScene.route.routeName === 'Login' &&
    nextScene.route.routeName === 'FinishInfoSocial'
  ) {
    return fromBottom()
  }
  return fromRight()
}

export function formatDateForAPI(date: Date) {
  if (!date) return ''
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  const year = d.getFullYear()
  let day = '' + d.getDate()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [`${year}`, `${month}`, `${day}`].join('-')
}

export function formatDateEnglish(date: string) {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'June',
    'July',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const d = new Date(date)
  let month = '' + (d.getMonth() + 1)
  const year = d.getFullYear()
  let day = '' + d.getDate()

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return `${monthNames[d.getMonth()]} ${[`${day}`, ` ${year}`].join(',')}`
}

export function alertInfo(text: string) {
  Alert.alert(text)
}

export function alertInfoOption(
  title: string,
  content: string,
  ok: () => void,
  isCancel = true
) {
  if (isCancel) {
    Alert.alert(
      title,
      content,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        { text: 'OK', onPress: () => ok() },
      ],
      { cancelable: false }
    )
  } else {
    Alert.alert(title, content, [{ text: 'OK', onPress: () => ok() }], {
      cancelable: false,
    })
  }
}

export function formatNumberPhone(numberPhone: string) {
  let number = numberPhone
  if (number[0] == '0') {
    number = number.replace('0', '+84').replace(/\s/g, '')
  }
  return number
}

export default function formatBirthdayZalo(date: string) {
  const arr = date.split('/')
  date = `${arr[2]}-${arr[1]}-${arr[0]}`
  return date
}

export function isAndroid() {
  return Platform.OS === 'android'
}

export function formatMoney(
  amount: string,
  decimalCount = 2,
  decimal = '.',
  thousands = ','
) {
  try {
    decimalCount = Math.abs(decimalCount)
    decimalCount = isNaN(decimalCount) ? 2 : decimalCount

    const negativeSign = Number(amount) < 0 ? '-' : ''

    const i: string = parseInt(
      (amount = Math.abs(Number(amount) || 0).toFixed(decimalCount))
    ).toString()
    const j = i.length > 3 ? i.length % 3 : 0

    return (
      negativeSign +
      (j ? i.substr(0, j) + thousands : '') +
      i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + thousands) +
      (decimalCount
        ? decimal +
        Math.abs(Number(amount) - i)
          .toFixed(decimalCount)
          .slice(2)
        : '')
    )
  } catch (e) {
    console.log(e)
  }
}

export function timeSince(date: Date) {
  const seconds = Math.floor((new Date() - date) / 1000)

  let interval = Math.floor(seconds / 31536000)

  if (interval > 1) {
    return interval + ' years'
  }
  interval = Math.floor(seconds / 2592000)
  if (interval > 1) {
    return interval + ' months'
  }
  interval = Math.floor(seconds / 86400)
  if (interval > 1) {
    return interval + ' days'
  }
  interval = Math.floor(seconds / 3600)
  if (interval > 1) {
    return interval + ' hours'
  }
  interval = Math.floor(seconds / 60)
  if (interval > 1) {
    return interval + ' minutes'
  }
  return Math.floor(seconds) + ' seconds'
}

export function getStatusOrder(
  orderStatus: IOrderStatus[],
  statusCode: string
) {
  switch (statusCode) {
    case orderStatus[0].name:
      return [ORDER_FINISHED, orderStatus[0].color]
    case orderStatus[1].name:
      return [ORDER_TRANSPORTING, orderStatus[1].color]
    case orderStatus[2].name:
      return [ORDER_CANCEL, orderStatus[2].color]
    case orderStatus[3].name:
      return [ORDER_COMPLETED, orderStatus[3].color]
    case orderStatus[4].name:
      return [ORDER_NEW, orderStatus[4].color]
    default:
      return [null, '#ffffff']
  }
}

export async function share(message: string) {
  try {
    const result = await Share.share({
      message,
    })
    if (result.action === Share.sharedAction) {
      if (result.activityType) {
        // shared with activity type of result.activityType
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
      // dismissed
    }
  } catch (error) {
    //(error.message)
  }
}

export const regexNumberPhone = /^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
export const regexNumberPhoneEmail = /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$|^(0|\+84)(\s|\.)?((3[2-9])|(5[689])|(7[06-9])|(8[1-689])|(9[0-46-9]))(\d)(\s|\.)?(\d{3})(\s|\.)?(\d{3})$/
export const regexEmail = /^[a-zA-Z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/
