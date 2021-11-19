import { Entity, Column, JoinColumn, ManyToOne, Unique, OneToMany, PrimaryColumn } from "typeorm";
import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { AccountEntity } from "./AccountEntity";
import { MasterValueEntity } from "./MasterValueEntity";
import { EmployeeLimitEntity } from "./EmployeeLimitEntity";
import { EmployeeRegionEntity } from "./EmployeeRegionEntity";
import { IBaseAssigned } from "./IBaseAssigned";

@Entity({
  name: "employees",
  orderBy: {
    createdAt: "ASC",
  },
})
@Unique("UNIQUE_EMPLOYEE", ["code"])
export class EmployeeEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
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
    default: "",
  })
  phone: string;

  @Column({
    type: "text",
    default: "",
  })
  email: string;

  @Column({
    type: "int",
    name: "department_id",
    nullable: true,
  })
  departmentId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "department_id",
    referencedColumnName: "id",
  })
  department: MasterValueEntity | null;

  @Column({
    type: "int",
    name: "title_id",
    nullable: true,
  })
  titleId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "title_id",
    referencedColumnName: "id",
  })
  title: MasterValueEntity | null;

  @Column({
    type: "text",
    name: "manager_id",
    nullable: true,
  })
  managerId: string | null;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({
    name: "manager_id",
    referencedColumnName: "id",
  })
  manager: EmployeeEntity | null;

  @Column({
    type: "int",
    name: "status_id",
    nullable: true,
  })
  statusId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "status_id",
    referencedColumnName: "id",
  })
  status: MasterValueEntity | null;

  @OneToMany(() => EmployeeRegionEntity, (type) => type.employee, {
    cascade: true,
  })
  employeeRegions: EmployeeRegionEntity[] | null;

  @OneToMany(() => EmployeeLimitEntity, (type) => type.employee, {
    cascade: true,
  })
  employeeLimits: EmployeeLimitEntity[] | null;

  @ManyToOne(() => AccountEntity)
  @JoinColumn({
    name: "created_by",
    referencedColumnName: "id",
  })
  createdBy: AccountEntity | null;

  // audit updated
  @ManyToOne(() => AccountEntity)
  @JoinColumn({
    name: "updated_by",
    referencedColumnName: "id",
  })
  updatedBy: AccountEntity | null;

  constructor(
    input: Pick<
      EmployeeEntity,
      | "id"
      | "code"
      | "fullName"
      | "birthday"
      | "joinedDate"
      | "phone"
      | "email"
      | "departmentId"
      | "department"
      | "titleId"
      | "title"
      | "managerId"
      | "manager"
      | "statusId"
      | "status"
      | "employeeRegions"
      | "employeeLimits"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    if (input) {
      this.code = input.code;
      this.fullName = input.fullName;
      this.birthday = input.birthday;
      this.joinedDate = input.joinedDate;
      this.phone = input.phone;
      this.email = input.email;
      this.departmentId = input.departmentId;
      this.department = input.department;
      this.titleId = input.titleId;
      this.title = input.title;
      this.managerId = input.managerId;
      this.manager = input.manager;
      this.statusId = input.statusId;
      this.status = input.status;
      this.employeeRegions = input.employeeRegions;
      this.employeeLimits = input.employeeLimits;
      this.createdBy = input.createdBy;
      this.updatedBy = input.updatedBy;
    }
  }
}
