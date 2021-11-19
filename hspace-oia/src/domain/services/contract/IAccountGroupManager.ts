export interface IAccountGroupManager {
  inList(arr: string[], arrOfArray: any): boolean;

  classify(accountGroupId: number): Promise<string[]>;
}
