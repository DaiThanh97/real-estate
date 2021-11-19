import { accountCredentialMixin, BaseSerializer } from "./Base";
import { Expose, Transform, Type } from "class-transformer";
import MasterValueSerializer from "./MasterValueSerializer";
import { PagingSerializer } from "./PagingSerializer";

export class EmployeeLimitSerializer extends BaseSerializer {
  @Expose()
  typeId: number;

  @Expose()
  employeeId: number;

  @Expose()
  value: number;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => MasterValueSerializer)
  type: MasterValueSerializer;
}

export class EmployeeRegionSerializer extends BaseSerializer {
  @Expose()
  cityId: number;

  @Expose()
  districtId: number;

  @Expose()
  employeeId: number;

  @Expose()
  isActive: boolean;

  @Expose()
  @Type(() => MasterValueSerializer)
  city: MasterValueSerializer;

  @Expose()
  @Type(() => MasterValueSerializer)
  district: MasterValueSerializer;
}

export class EmployeeSerializer extends BaseSerializer {
  @Expose()
  code: string;

  @Expose()
  fullName: string;

  @Expose()
  birthday: Date;

  @Expose()
  joinedDate: Date;

  @Expose()
  phone?: string;

  @Expose()
  email?: string;

  @Expose()
  departmentId: number;

  @Expose()
  titleId: number;

  @Expose()
  managerId: number;

  @Expose()
  statusId: number;

  @Expose()
  @Type(() => EmployeeLimitSerializer)
  employeeLimits: EmployeeLimitSerializer[];

  @Expose()
  @Type(() => EmployeeRegionSerializer)
  employeeRegions: EmployeeRegionSerializer[];

  @Expose()
  @Type(() => MasterValueSerializer)
  department: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  title: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => EmployeeSerializer)
  manager: EmployeeSerializer | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  status: MasterValueSerializer | undefined;
}

function transformAccountId({ value }: any) {
  if (value === "" || value === "null") {
    return null;
  }

  return value;
}

export class EmployeeQuery extends PagingSerializer {
  @Expose()
  fullName: string | undefined;

  @Expose()
  code: string | undefined;

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
  @Transform(transformAccountId)
  accountId: number | undefined;

  @Expose()
  description: string | undefined;
}

@accountCredentialMixin
export class EmployeeCurrentSerializer extends EmployeeSerializer {
}

export class EmployeeChangeBasicInfoSerializer {
  @Expose()
  birthday: Date;
}
