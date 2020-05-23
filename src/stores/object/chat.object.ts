import { SEND_MESSAGE, DELETE_MESSAGE } from '../constants/chat.constant'

export interface Message {
  user: string
  message: string
  timestamp: number
}

export interface ChatState {
  messages: Message[]
}

interface SendMessageAction {
  type: typeof SEND_MESSAGE
  payload: Message
}

interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE
  meta: {
    timestamp: number
  }
}

export type ChatActionTypes = SendMessageAction | DeleteMessageAction
