import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { MasterValueEntity } from "./MasterValueEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "employee_limits",
  orderBy: {
    createdAt: "ASC",
  },
})
export class EmployeeLimitEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "int",
    name: "type_id",
    nullable: false,
  })
  typeId: number;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "type_id",
    referencedColumnName: "id",
  })
  type: MasterValueEntity;

  @Column({
    type: "text",
    name: "employee_id",
    nullable: false,
  })
  employeeId: string;

  @ManyToOne(() => EmployeeEntity)
  @JoinColumn({
    name: "employee_id",
    referencedColumnName: "id",
  })
  employee: EmployeeEntity;

  @Column({
    type: "float",
    nullable: false,
  })
  value: number;

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
    input: Pick<EmployeeLimitEntity, "id" | "typeId" | "type" | "employeeId" | "employee" | "value" | "isActive">,
  ) {
    super(input);
    if (input) {
      this.typeId = input.typeId;
      this.type = input.type;
      this.employeeId = input.employeeId;
      this.employee = input.employee;
      this.value = input.value;
      this.isActive = input.isActive;
    }
  }
}
