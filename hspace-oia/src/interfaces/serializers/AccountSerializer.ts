import { Expose, Type } from "class-transformer";
import { EAccountType } from "../../domain/models/Account";
import { EmployeeSerializer } from "./EmployeeSerializer";
import { CollaboratorSerializer } from "./CollaboratorSerializer";
import { AccountGroupSerializer } from "./AccountGroupSerializer";
import { BaseSerializer } from "./Base";
import { PagingSerializer } from "./PagingSerializer";
import ResourceSerializer from "./ResourceSerializer";
import FeatureSerializer from "./FeatureSerializer";

export class AccountAccountGroupSerializer extends BaseSerializer {
  @Expose()
  accountId: number;

  @Expose()
  accountGroupId: number;

  @Expose()
  @Type(() => AccountGroupSerializer)
  accountGroup: AccountGroupSerializer;
}

export class AccountMenuSerializer extends BaseSerializer {
  @Expose()
  name: string;

  @Expose()
  parentId: number;

  @Expose()
  @Type(() => AccountMenuSerializer)
  parent: AccountMenuSerializer;

  @Expose()
  resourceId: number;

  @Expose()
  @Type(() => ResourceSerializer)
  resource: ResourceSerializer;

  @Expose()
  @Type(() => AccountMenuSerializer)
  children: AccountMenuSerializer[];

  @Expose()
  hasChild: boolean;

  @Expose()
  path: string;
}

export default class AccountSerializer extends BaseSerializer {

  @Expose()
  type: EAccountType;

  @Expose()
  identityName: string;

  @Expose()
  code: string;

  @Expose()
  displayName: string;

  @Expose()
  isActive: boolean;

  @Expose()
  lastLoginAt: Date;

  @Expose()
  employeeId: number;

  @Expose()
  @Type(() => EmployeeSerializer)
  employee: EmployeeSerializer;

  @Expose()
  collaboratorId: number;

  @Expose()
  @Type(() => CollaboratorSerializer)
  collaborator: CollaboratorSerializer;

  @Expose()
  @Type(() => AccountAccountGroupSerializer)
  accountAccountGroups: AccountAccountGroupSerializer[];

  @Expose()
  @Type(() => AccountGroupSerializer)
  accountGroups: AccountGroupSerializer[];

  @Expose()
  @Type(() => AccountMenuSerializer)
  menu: AccountMenuSerializer[];

  @Expose()
  @Type(() => ResourceSerializer)
  resources: ResourceSerializer[];

  @Expose()
  @Type(() => FeatureSerializer)
  features: FeatureSerializer[];

}

export class AccountQuery extends PagingSerializer {
  @Expose()
  code: string;

  @Expose()
  identityName: string;

  @Expose()
  type: EAccountType;

  @Expose()
  displayName: string;

  @Expose()
  @Type(() => EmployeeSerializer)
  employees: EmployeeSerializer[];

  @Expose()
  @Type(() => CollaboratorSerializer)
  collaborators: CollaboratorSerializer[];

  // Combination of employee and collaborators

  @Expose()
  fullName: string | undefined;

  @Expose()
  phone: string | undefined;

  @Expose()
  email: string | undefined;

  @Expose()
  titleId: number | undefined;

  @Expose()
  departmentId: number | undefined;

  @Expose()
  managerId: number | undefined;

  @Expose()
  statusId: number | undefined;

  @Expose()
  description: string | undefined;

  @Expose()
  companyId: number | undefined;

  @Expose()
  collaboratorTypeId: number | undefined;

  @Expose()
  accountGroupId: number | undefined;
}

export class AccountChangePasswordSerializer {
  @Expose()
  password: string;

  @Expose()
  newPassword: string;
}

export class AccountForgotPasswordRequestSerializer {
  @Expose()
  identityName: string;
}

export class AccountForgotPasswordConfirmSerializer {
  @Expose()
  identityName: string;
  @Expose()
  code: string;
  @Expose()
  sign: string;
  @Expose()
  newPassword: string;
}


export class QueryAccountForNoteAssigneeSerializer extends PagingSerializer {
  @Expose()
  displayName: string;
  @Expose()
  resourceId: number;
  @Expose()
  isActive: boolean;
}
