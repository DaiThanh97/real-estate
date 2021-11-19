import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { ResourceEntity } from "./ResourceEntity";
import { AccountGroupEntity } from "./AccountGroupEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "account_group_resources",
  orderBy: {
    createdAt: "ASC",
  },
})
export class AccountGroupResourceEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    name: "resource_id",
    nullable: false,
  })
  resourceId: string;

  @ManyToOne(() => ResourceEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "resource_id",
    referencedColumnName: "id",
  })
  resource: ResourceEntity;

  @Column({
    type: "text",
    name: "account_group_id",
    nullable: false,
  })
  accountGroupId: string;

  @ManyToOne(() => AccountGroupEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "account_group_id",
    referencedColumnName: "id",
  })
  accountGroup: AccountGroupEntity;

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
    input: Pick<AccountGroupResourceEntity, "id" | "resourceId" | "resource" | "accountGroupId" | "accountGroup">,
  ) {
    super(input);
    if (input) {
      this.resourceId = input.resourceId;
      this.resource = input.resource;
      this.accountGroupId = input.accountGroupId;
      this.accountGroup = input.accountGroup;
    }
  }
}
