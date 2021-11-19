export interface IAccountDeviceTokenManager {
  getTokesFromAccountIds(accountIds: number[]): Promise<any>;
}
