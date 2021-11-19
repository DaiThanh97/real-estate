import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { EmployeeEntity } from "./EmployeeEntity";
import { MasterValueEntity } from "./MasterValueEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "employee_regions",
  orderBy: {
    createdAt: "ASC",
  },
})
export class EmployeeRegionEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "int",
    name: "city_id",
    nullable: true,
  })
  cityId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "city_id",
    referencedColumnName: "id",
  })
  city: MasterValueEntity | null;

  @Column({
    type: "int",
    name: "ward_id",
    nullable: true,
  })
  wardId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "ward_id",
    referencedColumnName: "id",
  })
  ward: MasterValueEntity | null;

  @Column({
    type: "int",
    name: "district_id",
    nullable: true,
  })
  districtId: number | null;

  @ManyToOne(() => MasterValueEntity)
  @JoinColumn({
    name: "district_id",
    referencedColumnName: "id",
  })
  district: MasterValueEntity | null;

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
    input: Pick<
      EmployeeRegionEntity,
      "id" | "cityId" | "city" | "districtId" | "district" | "employeeId" | "employee" | "isActive"
    >,
  ) {
    super(input);
    if (input) {
      this.cityId = input.cityId;
      this.city = input.city;
      this.districtId = input.districtId;
      this.district = input.district;
      this.employeeId = input.employeeId;
      this.employee = input.employee;
      this.isActive = input.isActive;
    }
  }
}
