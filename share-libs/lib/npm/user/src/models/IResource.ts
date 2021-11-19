import { IFeature } from "./IFeature";
import { IAccount } from "./IAccount";

export interface IResource {
  id: number | string;
  path: string;
  description: string;
  isActive: boolean;

  features: IFeature[];

  createdAt: Date;

  updatedAt: Date;

  createdBy: IAccount;

  updatedBy: IAccount;
}
