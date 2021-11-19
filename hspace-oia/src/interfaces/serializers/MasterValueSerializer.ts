import { Expose, Type } from "class-transformer";
import GroupValueSerializer from "./GroupValueSerializer";
import { BaseSerializer } from "./Base";
import { PagingSerializer } from "./PagingSerializer";

export default class MasterValueSerializer extends BaseSerializer {
  @Expose()
  groupId: number;

  @Expose()
  parentId: number;

  @Expose()
  groupCode: string;

  @Expose()
  groupName: string;

  @Expose()
  valueCode: string;

  @Expose()
  valueName: string;

  @Expose()
  isUsed?: boolean | undefined;

  @Expose()
  customData: string;

  @Expose()
  @Type(() => MasterValueSerializer)
  parent?: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => GroupValueSerializer)
  groupValue?: GroupValueSerializer | undefined;

  @Expose()
  isActive: boolean;
}

export class QueryMasterValueSerializer extends PagingSerializer {
  @Expose()
  groupId: number;

  @Expose()
  parentId: number;

  @Expose()
  groupCode: string;

  @Expose()
  groupName: string;

  @Expose()
  valueCode: string;

  @Expose()
  valueName: string;

  @Expose()
  parentValueName: string;

  @Expose()
  parentValueCode: string;
}
