import { Expose, Transform, Type } from "class-transformer";
import { BaseSerializer } from "./Base";
import { PagingSerializer } from "./PagingSerializer";

export default class GroupValueSerializer extends BaseSerializer {
  @Expose()
  parentId: number;

  @Expose()
  @Type(() => GroupValueSerializer)
  parent?: GroupValueSerializer;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  isActive?: boolean;
}

function transformIsActive({ value }: any) {
  if (value === "" || value === undefined) {
    return null;
  }

  return value;
}

const transformParentIds = ({ value }: any) => {
  if (value === "" || value === undefined || value === null) {
    return [];
  }

  return value.split(",").map((item: string) => parseInt(item, 10));
};

export class GroupValueSearchSerializer extends PagingSerializer {
  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  @Transform(transformParentIds)
  parentIds: number[];

  @Expose()
  @Transform(transformIsActive)
  isActive?: boolean;
}
