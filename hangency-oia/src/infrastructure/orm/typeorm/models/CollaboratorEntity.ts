import { Entity, Column, JoinColumn, ManyToOne, Unique, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { MasterValueEntity } from "./MasterValueEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "collaborators",
  orderBy: {
    createdAt: "ASC",
  },
})
@Unique("UNIQUE_COLLABORATOR", ["phone"])
export class CollaboratorEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    name: "full_name",
    nullable: false,
  })
  fullName: string;

  @Column({
    type: "date",
    nullable: false,
  })
  birthday: Date;

  @Column({
    type: "date",
    name: "joined_date",
    nullable: false,
  })
  joinedDate: Date;

  @Column({
    type: "text",
    name: "phone",
    default: "",
  })
  phone: string;

  @Column({
    type: "text",
    name: "email",
    default: "",
  })
  email: string;

  @Column({
    type: "int",
    name: "company_id",
    nullable: true,
  })
  companyId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "company_id",
    referencedColumnName: "id",
  })
  company: MasterValueEntity | null;

  @Column({
    type: "int",
    name: "collaborator_type_id",
    nullable: true,
  })
  collaboratorTypeId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "collaborator_type_id",
    referencedColumnName: "id",
  })
  collaboratorType: MasterValueEntity | null;

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
      CollaboratorEntity,
      | "id"
      | "fullName"
      | "birthday"
      | "joinedDate"
      | "phone"
      | "email"
      | "companyId"
      | "company"
      | "collaboratorTypeId"
      | "collaboratorType"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    if (input) {
      this.fullName = input.fullName;
      this.birthday = input.birthday;
      this.joinedDate = input.joinedDate;
      this.phone = input.phone;
      this.email = input.email;
      this.companyId = input.companyId;
      this.company = input.company;
      this.collaboratorTypeId = input.collaboratorTypeId;
      this.collaboratorType = input.collaboratorType;
      this.createdBy = input.createdBy;
      this.updatedBy = input.updatedBy;
    }
  }
}
