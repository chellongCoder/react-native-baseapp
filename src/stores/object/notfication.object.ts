export const TYPE_NOTIFY = {
  ORDER: '1',
  SYSTEM: '2',
}

export interface INotification {
  order_id: string;
  order_status: string;
  order_status_name: string;
  title: string;
  type_notify: string;
  body: string;
  create_at: Date;
}

export interface NotificationState {
  notifications?: INotification[];
  badge: number;
}

export interface NotificationAction {
  type: string;
  payload: any;
}
