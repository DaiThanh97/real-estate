import { EmployeeRegionEntity } from "../../../../orm/typeorm/models/EmployeeRegionEntity";
import { EmployeeRegion } from "../../../../../domain/models/EmployeeRegion";
import { TransformMasterValue } from "../masterValue/TransformMasterValue";

export class TransformEmployeeRegion {
  static transformEntityToDomain(e: EmployeeRegionEntity): EmployeeRegion {
    const result = new EmployeeRegion({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      cityId: e.cityId,
      districtId: e.districtId,
      employeeId: e.employeeId,
      isActive: e.isActive,
      city: e.city && TransformMasterValue.transformEntityToDomain(e.city),
      district: e.district && TransformMasterValue.transformEntityToDomain(e.district),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: EmployeeRegion): EmployeeRegionEntity {
    return new EmployeeRegionEntity({
      id: d.id,
      cityId: d.cityId,
      districtId: d.districtId,
      employeeId: d.employeeId,
      employee: undefined,
      isActive: d.isActive,
      city: d.city && TransformMasterValue.transformCreateEntityFromDomain(d.city),
      district: d.district && TransformMasterValue.transformCreateEntityFromDomain(d.district),
    });
  }
  static transformUpdateEntityFromDomain(d: EmployeeRegion): Partial<EmployeeRegionEntity> {
    const result: Partial<EmployeeRegionEntity> = {
      cityId: d.cityId,
      districtId: d.districtId,
      employeeId: d.employeeId,
      isActive: d.isActive,
      city: d.city && TransformMasterValue.transformCreateEntityFromDomain(d.city),
      district: d.city && TransformMasterValue.transformCreateEntityFromDomain(d.city),
    };
    return result;
  }
}
