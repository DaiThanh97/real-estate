import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { FeatureEntity } from "./FeatureEntity";
import { AccountGroupEntity } from "./AccountGroupEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "account_group_features",
  orderBy: {
    createdAt: "ASC",
  },
})
export class AccountGroupFeatureEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    name: "feature_id",
    nullable: false,
  })
  featureId: string;

  @ManyToOne(() => FeatureEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "feature_id",
    referencedColumnName: "id",
  })
  feature: FeatureEntity;

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
    input: Pick<AccountGroupFeatureEntity, "id" | "featureId" | "feature" | "accountGroupId" | "accountGroup">,
  ) {
    super(input);
    if (input) {
      this.featureId = input.featureId;
      this.feature = input.feature;
      this.accountGroupId = input.accountGroupId;
      this.accountGroup = input.accountGroup;
    }
  }
}
