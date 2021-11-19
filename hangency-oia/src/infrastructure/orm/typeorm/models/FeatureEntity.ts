import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { ResourceEntity } from "./ResourceEntity";
import { AccountEntity } from "./AccountEntity";
import { IBaseAssigned } from "./IBaseAssigned";

@Entity({
  name: "features",
  orderBy: {
    createdAt: "ASC",
  },
})
export class FeatureEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    nullable: false,
  })
  action: string;

  @Column({
    type: "text",
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
    default: "",
  })
  description: string | null;

  @Column({
    type: "text",
    name: "resource_id",
    nullable: true,
  })
  resourceId: string | null;

  @ManyToOne(() => ResourceEntity)
  @JoinColumn({
    name: "resource_id",
    referencedColumnName: "id",
  })
  resource: ResourceEntity | null;

  @Column({
    type: "text",
    nullable: true,
  })
  act: string | null;

  @Column({
    type: "text",
    name: "notification_action",
    nullable: true,
  })
  notificationAction: string | null;

  @Column({
    type: "text",
    name: "group_class",
    nullable: true,
  })
  groupClass: string | null;

  @Column({
    type: "int",
    nullable: true,
  })
  seq: number | null;

  @Column({
    type: "boolean",
    name: "is_active",
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => AccountEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "created_by",
    referencedColumnName: "id",
  })
  createdBy: AccountEntity | null;

  @ManyToOne(() => AccountEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "updated_by",
    referencedColumnName: "id",
  })
  updatedBy: AccountEntity | null;

  constructor(
    input: Pick<
      FeatureEntity,
      | "id"
      | "action"
      | "name"
      | "description"
      | "resourceId"
      | "resource"
      | "act"
      | "notificationAction"
      | "groupClass"
      | "seq"
      | "isActive"
    >,
  ) {
    super(input);
    if (input) {
      this.action = input.action;
      this.name = input.name;
      this.description = input.description;
      this.resourceId = input.resourceId;
      this.resource = input.resource;
      this.act = input.act;
      this.notificationAction = input.notificationAction;
      this.groupClass = input.groupClass;
      this.seq = input.seq;
      this.isActive = input.isActive;
    }
  }
}
