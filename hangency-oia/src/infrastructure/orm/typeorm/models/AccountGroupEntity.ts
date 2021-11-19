import { Entity, Column, OneToMany, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { AccountGroupResourceEntity } from "./AccountGroupResourceEntity";
import { AccountGroupFeatureEntity } from "./AccountGroupFeatureEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "account_groups",
  orderBy: {
    createdAt: "ASC",
  },
})
export class AccountGroupEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
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
  code: string;

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
    type: "jsonb",
    nullable: true,
  })
  classes: string[] | null;

  @Column({
    type: "boolean",
    name: "is_deleted",
    default: false,
  })
  isDeleted: boolean;

  @Column({
    type: "boolean",
    name: "is_active",
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => AccountGroupResourceEntity, (type) => type.resource)
  accountGroupResources: AccountGroupResourceEntity[];

  @OneToMany(() => AccountGroupFeatureEntity, (type) => type.feature)
  accountGroupFeatures: AccountGroupFeatureEntity[];

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
      AccountGroupEntity,
      | "id"
      | "code"
      | "name"
      | "description"
      | "classes"
      | "isDeleted"
      | "isActive"
      | "accountGroupResources"
      | "accountGroupFeatures"
    >,
  ) {
    super(input);
    if (input) {
      this.code = input.code;
      this.name = input.name;
      this.description = input.description;
      this.classes = input.classes;
      this.isDeleted = input.isDeleted;
      this.isActive = input.isActive;
      this.accountGroupResources = input.accountGroupResources;
      this.accountGroupFeatures = input.accountGroupFeatures;
    }
  }
}
