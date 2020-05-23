import { GET_BANKS_FULLFILLED, GET_BANKS } from '../constants/system.constant'

export interface IBank {
  id: number;
  code: string;
  name: string;
  logo_url: string;
  created_at: string;
  updated_at: string;
}

export interface SystemState {
  banks: IBank[];
  deviceId: string;
  fcmToken: string;
}

interface UpdateSessionAction {
  type: typeof GET_BANKS_FULLFILLED | typeof GET_BANKS;
  payload: SystemState;
}

export type SystemActionTypes = UpdateSessionAction
