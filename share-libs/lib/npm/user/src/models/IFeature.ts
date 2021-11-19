import { IAccount } from "./IAccount";

export interface IFeature {
  id: number | string;
  name: string;
  description: string;
  action: string;
  isActive: boolean;
  resourceId: number | string;

  createdBy: IAccount;

  updatedBy: IAccount;
}
