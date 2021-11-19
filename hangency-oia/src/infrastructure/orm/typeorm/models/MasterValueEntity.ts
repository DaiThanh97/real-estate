import { Entity, Column, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { GroupValueEntity } from "./GroupValueEntity";
import { AccountEntity } from "./AccountEntity";
import { IBaseAssigned } from "./IBaseAssigned";

@Entity({
  name: "master_values",
  orderBy: {
    createdAt: "ASC",
  },
})
export class MasterValueEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "int",
  })
  id: number;

  @Column({
    type: "int",
    name: "group_id",
    nullable: true,
  })
  groupId: number | null;

  @ManyToOne(() => GroupValueEntity)
  @JoinColumn({
    name: "group_id",
    referencedColumnName: "id",
  })
  groupValue: GroupValueEntity | null;

  @Column({
    type: "text",
    name: "group_code",
    nullable: false,
  })
  groupCode: string;

  @Column({
    type: "text",
    name: "group_name",
    nullable: false,
  })
  groupName: string;

  @Column({
    type: "text",
    name: "value_code",
    nullable: false,
    default: "",
  })
  valueCode: string;

  @Column({
    type: "text",
    name: "value_name",
    nullable: false,
    default: "",
  })
  valueName: string;

  @Column({
    type: "simple-json",
    name: "custom_data",
    nullable: true,
    default: "",
  })
  customData: string | null;

  @Column({
    type: "int",
    name: "parent_id",
    nullable: true,
  })
  parentId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "parent_id",
    referencedColumnName: "id",
  })
  parent: MasterValueEntity | null;

  @OneToMany(() => MasterValueEntity, (type) => type.parent, {
    cascade: true,
  })
  children: MasterValueEntity[] | null;

  @Column({
    type: "boolean",
    name: "is_active",
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({
    name: "created_by",
    referencedColumnName: "id",
  })
  createdBy: AccountEntity | null;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({
    name: "updated_by",
    referencedColumnName: "id",
  })
  updatedBy: AccountEntity | null;

  constructor(
    input: Pick<
      MasterValueEntity,
      | "id"
      | "groupId"
      | "groupValue"
      | "groupCode"
      | "groupName"
      | "valueCode"
      | "valueName"
      | "customData"
      | "parentId"
      | "parent"
      | "isActive"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    if (input) {
      this.groupId = input.groupId;
      this.groupValue = input.groupValue;
      this.groupCode = input.groupCode;
      this.groupName = input.groupName;
      this.valueCode = input.valueCode;
      this.valueName = input.valueName;
      this.customData = input.customData;
      this.parentId = input.parentId;
      this.isActive = input.isActive;
      this.createdBy = input.createdBy;
      this.updatedBy = input.updatedBy;
    }
  }
}
