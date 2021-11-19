import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { Account } from "./Account";
import { IFeature } from "@halato/user";

export class Feature extends BaseDomainModel implements IDomainModel, IFeature {
  id: string;
  name: string;
  description: string;
  action: string;
  isActive: boolean;
  resourceId: string;

  createdBy: Account | null;
  updatedBy: Account | null;

  constructor(input: Pick<Feature, "id" | "createdAt" | "updatedAt"> & FeatureBulkUpdatableField) {
    super(input);
    this.name = input.name;
    this.description = input.description;
    this.action = input.action;
    this.isActive = input.isActive;
    this.resourceId = input.resourceId;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static create = (id: string, input: FeatureBulkUpdatableField, now: Date): Feature => {
    return new Feature({
      id,
      createdAt: now,
      updatedAt: now,
      name: input.name,
      description: input.description,
      action: input.action,
      isActive: input.isActive,
      resourceId: input.resourceId,
      createdBy: input.createdBy,
      updatedBy: input.updatedBy,
    });
  };

  update = (input: FeatureBulkUpdatableField): void => {
    this.name = input.name;
    this.description = input.description;
    this.action = input.action;
    this.isActive = input.isActive;
    this.resourceId = input.resourceId;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  };

  equals(entity: Feature) {
    if (!(entity instanceof Feature)) return false;
    return this.id === entity.id;
  }
}

export type FeatureBulkUpdatableField = Pick<
  Feature,
  "name" | "description" | "action" | "isActive" | "resourceId" | "createdBy" | "updatedBy"
>;
