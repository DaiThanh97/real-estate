import { Entity, Column, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { AccountGroupEntity } from "./AccountGroupEntity";
import { AccountEntity } from "./AccountEntity";
import { IBaseAssigned } from "./IBaseAssigned";

@Entity({
  name: "account_account_groups",
  orderBy: {
    createdAt: "ASC",
  },
})
export class AccountAccountGroupEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

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

  @Column({
    type: "text",
    name: "account_id",
    nullable: false,
  })
  accountId: string;

  @ManyToOne(() => AccountEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "account_id",
    referencedColumnName: "id",
  })
  account: AccountEntity;

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
      AccountAccountGroupEntity,
      "id" | "accountGroupId" | "accountGroup" | "accountId" | "account" | "createdBy" | "updatedBy"
    >,
  ) {
    super(input);
    if (input) {
      this.accountGroupId = input.accountGroupId;
      this.accountGroup = input.accountGroup;
      this.accountId = input.accountId;
      this.account = input.account;
      this.createdBy = input.createdBy;
      this.updatedBy = input.updatedBy;
    }
  }
}
