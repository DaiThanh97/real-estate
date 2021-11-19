import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IEmployeeRegion } from "@halato/user";
import { MasterValue } from "./MasterValue";

export class EmployeeRegion extends BaseDomainModel implements IDomainModel, IEmployeeRegion {
  id: string;
  cityId: number;
  districtId: number;
  employeeId: string;
  isActive: boolean;

  city: MasterValue | null;
  district: MasterValue | null;

  constructor(input: Pick<EmployeeRegion, "id" | "createdAt" | "updatedAt"> & EmployeeRegionBulkUpdatableField) {
    super(input);
    this.cityId = input.cityId;
    this.districtId = input.districtId;
    this.employeeId = input.employeeId;
    this.isActive = input.isActive;
    this.city = input.city;
    this.district = input.district;
  }

  static create = (id: string, input: EmployeeRegionBulkUpdatableField, now: Date): EmployeeRegion => {
    return new EmployeeRegion({
      id,
      createdAt: now,
      updatedAt: now,
      cityId: input.cityId,
      districtId: input.districtId,
      employeeId: input.employeeId,
      isActive: input.isActive,
      city: input.city,
      district: input.district,
    });
  };

  update = (input: EmployeeRegionBulkUpdatableField): void => {
    this.cityId = input.cityId;
    this.districtId = input.districtId;
    this.employeeId = input.employeeId;
    this.isActive = input.isActive;
    this.city = input.city;
    this.district = input.district;
  };

  equals(entity: EmployeeRegion) {
    if (!(entity instanceof EmployeeRegion)) return false;

    return this.id === entity.id;
  }
}

export type EmployeeRegionBulkUpdatableField = Pick<
  EmployeeRegion,
  "cityId" | "districtId" | "employeeId" | "isActive" | "city" | "district"
>;
