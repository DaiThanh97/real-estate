import { BaseDTO } from "../BaseDTO";
import { GroupValue } from "../../../domain/models/GroupValue";
import { Expose } from "class-transformer";
import { AccountBasicDTO } from "../account/AccountBasicDTO";

export class GroupValueDTO extends BaseDTO {
  @Expose()
  id: number;

  @Expose()
  parentId: number;

  @Expose()
  parent?: GroupValueDTO;

  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  isActive?: boolean;

  createdBy?: AccountBasicDTO;
  updatedBy?: AccountBasicDTO;

  constructor(
    input: Pick<
      GroupValueDTO,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "parentId"
      | "parent"
      | "code"
      | "name"
      | "isActive"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    this.parentId = input.parentId;
    this.parent = input.parent;
    this.code = input.code;
    this.name = input.name;
    this.isActive = input.isActive;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static toDTO(d: GroupValue): GroupValueDTO {
    return new GroupValueDTO({
      id: d.id,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      parentId: d.parentId,
      parent: d.parent && this.toDTO(d.parent),
      code: d.code,
      name: d.name,
      isActive: d.isActive,
      createdBy: d.createdBy && AccountBasicDTO.toDTO(d.createdBy),
      updatedBy: d.updatedBy && AccountBasicDTO.toDTO(d.updatedBy),
    });
  }
}
