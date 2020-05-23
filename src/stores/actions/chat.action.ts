import { Message, ChatActionTypes } from '../object/chat.object'
import { SEND_MESSAGE } from '../constants/chat.constant'

// TypeScript infers that this function is returning SendMessageAction
export function sendMessage(newMessage: Message): ChatActionTypes {
  return {
    type: SEND_MESSAGE,
    payload: newMessage,
  }
}

// TypeScript infers that this function is returning DeleteMessageAction
export function deleteMessage(timestamp: number): ChatActionTypes {
  return {
    type: 'DELETE_MESSAGE',
    meta: {
      timestamp,
    },
  }
}
