import { IFeature } from "./IFeature";
import { IResource } from "./IResource";

export interface IAccountGroupFeature {
  featureId: number | string;
  accountGroupId: number | string;
  feature?: IFeature;
}

export interface IAccountGroupResource {
  resourceId: number | string;
  accountGroupId: number | string;
  resource?: IResource;
}

export interface IAccountGroup {
  code: string;
  name: string;
  isActive: boolean;
  description?: string;

  accountGroupResources: IAccountGroupResource[];

  accountGroupFeatures: IAccountGroupFeature[];
}
