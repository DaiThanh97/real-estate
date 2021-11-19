export interface INotificationManager {
  sendNotification(notification: any, accountId: number, sendMoreAccounts: number[]): Promise<any>;

  getNotificationContent(group: string, action: string, data: any): Promise<any>;

  getAccountIdsByNotificationAction(action: string): Promise<any>;
}
