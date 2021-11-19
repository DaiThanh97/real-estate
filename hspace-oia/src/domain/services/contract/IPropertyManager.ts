import { PropertySerializer } from "../../../interfaces/serializers/PropertySerializer";
import { BusinessStatusType, PropertyStatusType } from "../../../infrastructure/types/Property";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { IProperty } from "../../../infrastructure/orm/typeorm/models/Property";
import { Repository } from "typeorm";

export interface IPropertyManager {
  initStatus(property: PropertySerializer): Promise<PropertySerializer>;

  checkExistAddress(property: PropertySerializer, propertyId: number): Promise<PropertySerializer>;

  updatePropertiesSameAddressPendingToExisted(property: PropertySerializer, propertyId: number): Promise<void>;

  assignSource(property: PropertySerializer, currentAccountId: number): Promise<PropertySerializer>;

  updateStatus(property: PropertySerializer, currentStatus: PropertyStatusType): Promise<PropertySerializer>;

  generateCode(property: PropertySerializer): Promise<PropertySerializer>;

  processBookmark(propertyId: number, accountId: number, employeeId: number, type: string): Promise<boolean>;

  processUnBookmark(propertyId: number, accountId: number): Promise<boolean>;

  getNewBusinessStatus(
    currentStatus: PropertyStatusType,
    currentBusinessStatus: BusinessStatusType,
    newBusinessStatus: BusinessStatusType
  ): Promise<string>;

  updateStatusWhenCreateKHNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenCreatePDNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenApprovedPDNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenCreateKUNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenApprovedKUNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenApprovedTHNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenCreateTUNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenApprovedTUNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenCreateHDNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenApproveHDNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenCreateTLNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenApprovedTLNote(property: any, updatedBy: number): Promise<any>;

  updateStatusWhenCreateNote(property: any, businessStatusNew: BusinessStatusType, updatedBy: number): Promise<any>;

  generateAddressPropertyForSendNotification(propertyId: number): Promise<any>;

  beforeUpdate(
    propertyId: number,
    partialEntity: QueryDeepPartialEntity<IProperty>,
    repository: Repository<IProperty>
  ): Promise<QueryDeepPartialEntity<IProperty>>;
}
