import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "group_values",
  orderBy: {
    createdAt: "ASC",
  },
})
export class GroupValueEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "int",
  })
  id: number;

  @Column({
    type: "varchar",
    nullable: false,
  })
  code: string;

  @Column({
    type: "varchar",
    nullable: false,
  })
  name: string;

  @Column({
    type: "boolean",
    name: "is_active",
    default: true,
    nullable: false,
  })
  isActive: boolean;

  @Column({
    type: "int",
    name: "parent_id",
    nullable: true,
  })
  parentId: number | null;

  @ManyToOne(() => GroupValueEntity)
  @JoinColumn({
    name: "parent_id",
    referencedColumnName: "id",
  })
  parent: GroupValueEntity | null;

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
      GroupValueEntity,
      "id" | "code" | "name" | "isActive" | "parentId" | "parent" | "createdBy" | "updatedBy"
    >,
  ) {
    super(input);
    if (input) {
      this.code = input.code;
      this.name = input.name;
      this.isActive = input.isActive;
      this.parentId = input.parentId;
      this.parent = input.parent;
      this.createdBy = input.createdBy;
      this.updatedBy = input.updatedBy;
    }
  }
}
