import { Entity, Column, OneToOne, JoinColumn, Unique, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { EAccountType } from "../../../../domain/models/Account";
import { EmployeeEntity } from "./EmployeeEntity";
import { CollaboratorEntity } from "./CollaboratorEntity";
import { AccountAccountGroupEntity } from "./AccountAccountGroupEntity";
import { IBaseAssigned } from "./IBaseAssigned";

@Entity({
  name: "accounts",
  orderBy: {
    createdAt: "ASC",
  },
})
@Unique("UNIQUE_ACCOUNT", ["identityName"])
export class AccountEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    name: "employee_id",
    nullable: true,
  })
  employeeId: string | null;

  @OneToOne(() => EmployeeEntity)
  @JoinColumn({
    name: "employee_id",
    referencedColumnName: "id",
  })
  employee: EmployeeEntity | null;

  @Column({
    type: "text",
    name: "collaborator_id",
    nullable: true,
  })
  collaboratorId: string | null;

  @OneToOne(() => CollaboratorEntity)
  @JoinColumn({
    name: "collaborator_id",
    referencedColumnName: "id",
  })
  collaborator: CollaboratorEntity | null;

  @Column({
    type: "enum",
    nullable: false,
    default: EAccountType.COLLABORATOR,
    enum: EAccountType,
  })
  type: EAccountType;

  @Column({
    type: "text",
    name: "identity_name",
    nullable: false,
  })
  identityName: string;

  @Column({
    type: "text",
    nullable: true,
  })
  hash: string | null;

  @Column({
    type: "boolean",
    name: "is_active",
    nullable: false,
    default: true,
  })
  isActive: boolean | null;

  @Column({
    type: "text",
    nullable: true,
  })
  code: string | null;

  @Column({
    type: "timestamp",
    name: "last_login_at",
    nullable: true,
  })
  lastLoginAt: Date | null;

  @Column({
    type: "text",
    name: "display_name",
    nullable: false,
  })
  displayName: string;

  @Column({
    type: "text",
    name: "connected_firebase_auth_id",
    nullable: true,
  })
  connectedFirebaseAuthId: string | null;

  @OneToMany(() => AccountAccountGroupEntity, (type) => type.account, {
    cascade: true,
  })
  accountAccountGroups: AccountAccountGroupEntity[] | null;

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
      AccountEntity,
      | "id"
      | "employeeId"
      | "employee"
      | "collaboratorId"
      | "collaborator"
      | "type"
      | "identityName"
      | "hash"
      | "isActive"
      | "code"
      | "lastLoginAt"
      | "displayName"
      | "connectedFirebaseAuthId"
      | "accountAccountGroups"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    if (input) {
      this.employeeId = input.employeeId;
      this.employee = input.employee;
      this.collaboratorId = input.collaboratorId;
      this.type = input.type;
      this.identityName = input.identityName;
      this.hash = input.hash;
      this.isActive = input.isActive;
      this.code = input.code;
      this.lastLoginAt = input.lastLoginAt;
      this.displayName = input.displayName;
      this.connectedFirebaseAuthId = input.connectedFirebaseAuthId;
      this.accountAccountGroups = input.accountAccountGroups;
      this.createdBy = input.createdBy;
      this.updatedBy = input.updatedBy;
    }
  }
}
