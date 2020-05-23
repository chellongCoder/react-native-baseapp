import { ChatState, ChatActionTypes } from './../object/chat.object'
import { SEND_MESSAGE, DELETE_MESSAGE } from '../constants/chat.constant'

const initialState: ChatState = {
  messages: [],
}

export function chatReducer(
  state = initialState,
  action: ChatActionTypes
): ChatState {
  switch (action.type) {
    case SEND_MESSAGE:
      return {
        messages: [...state.messages, action.payload],
      }
    case DELETE_MESSAGE:
      return {
        messages: state.messages.filter(
          message => message.timestamp !== action.meta.timestamp
        ),
      }
    default:
      return state
  }
}
