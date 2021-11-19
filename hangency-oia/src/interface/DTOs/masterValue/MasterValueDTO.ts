import { BaseDTO } from "../BaseDTO";
import { MasterValue } from "../../../domain/models/MasterValue";
import { Expose } from "class-transformer";
import { GroupValueDTO } from "../groupValue/GroupValueDTO";
import { AccountBasicDTO } from "../account/AccountBasicDTO";

export class MasterValueDTO extends BaseDTO {
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
  parent?: MasterValueDTO | undefined;

  @Expose()
  groupValue?: GroupValueDTO | undefined;

  @Expose()
  isActive: boolean;

  createdBy?: AccountBasicDTO;
  updatedBy?: AccountBasicDTO;

  constructor(
    input: Pick<
      MasterValueDTO,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "groupId"
      | "parentId"
      | "groupCode"
      | "groupName"
      | "valueCode"
      | "valueName"
      | "isUsed"
      | "customData"
      | "parent"
      | "groupValue"
      | "isActive"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    this.groupId = input.groupId;
    this.parentId = input.parentId;
    this.groupCode = input.groupCode;
    this.groupName = input.groupName;
    this.valueCode = input.valueCode;
    this.valueName = input.valueName;
    this.isUsed = input.isUsed;
    this.customData = input.customData;
    this.isActive = input.isActive;
    this.parent = input.parent;
    this.groupValue = input.groupValue;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static toDTO(d: MasterValue): MasterValueDTO {
    return new MasterValueDTO({
      id: d.id,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      groupId: d.groupId,
      parentId: d.parentId,
      groupCode: d.groupCode,
      groupName: d.groupName,
      valueCode: d.valueCode,
      valueName: d.valueName,
      isUsed: d.isUsed,
      customData: d.customData,
      parent: d.parent && this.toDTO(d.parent),
      groupValue: d.groupValue && GroupValueDTO.toDTO(d.groupValue),
      isActive: d.isActive,
      createdBy: d.createdBy && AccountBasicDTO.toDTO(d.createdBy),
      updatedBy: d.updatedBy && AccountBasicDTO.toDTO(d.updatedBy),
    });
  }
}
