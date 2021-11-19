import { IAccountGroup } from "./IAccountGroup";
import { IResource } from "./IResource";
import { ICollaborator } from "./ICollaborator";
import { IEmployee } from "./IEmployee";

export interface IAccountAccountGroup {
  accountId: number | string;
  accountGroupId: number | string;
  accountGroup?: IAccountGroup;
  account?: IAccount;
}

export interface IAccountMenu {
  name: string;
  parentId?: number | string;
  resourceId?: number | string;
  children?: IAccountMenu[];
  hasChild?: boolean;
  path?: string;

  resource?: IResource;

  parent?: IAccountMenu;
}

export interface IAccount {
  // type: EAccountType;
  identityName: string;
  employeeId: number | string;
  employee: IEmployee;
  collaboratorId: number | string;
  collaborator: ICollaborator;
  isActive: boolean;
  code: string;
  hash: string;
  password: string;
  lastLoginAt?: Date;
  displayName: string;
  // classes: string[];

  accountAccountGroups: IAccountAccountGroup[];
}
