import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { ResourceEntity } from "./ResourceEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "menus",
  orderBy: {
    createdAt: "ASC",
  },
})
export class MenuEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    nullable: true,
  })
  path: string | null;

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
    type: "boolean",
    name: "is_active",
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @Column({
    type: "int",
    nullable: true,
  })
  seq: number | null;

  @Column({
    type: "text",
    name: "parent_id",
    nullable: true,
  })
  parentId: string | null;

  @ManyToOne(() => MenuEntity)
  @JoinColumn({
    name: "parent_id",
    referencedColumnName: "id",
  })
  parent: MenuEntity | null;

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
      MenuEntity,
      "id" | "path" | "name" | "description" | "isActive" | "seq" | "parentId" | "parent" | "resourceId" | "resource"
    >,
  ) {
    super(input);
    if (input) {
      this.path = input.path;
      this.name = input.name;
      this.description = input.description;
      this.isActive = input.isActive;
      this.seq = input.seq;
      this.parentId = input.parentId;
      this.parent = input.parent;
      this.resourceId = input.resourceId;
      this.resource = input.resource;
    }
  }
}
