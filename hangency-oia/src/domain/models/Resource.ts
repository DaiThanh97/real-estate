import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { IResource } from "@halato/user";
import { Account } from "./Account";
import { Feature } from "./Feature";

export class Resource extends BaseDomainModel implements IDomainModel, IResource {
  id: string;
  path: string;
  model: string;
  api: string;
  name: string;
  group: string;
  seq: number;
  description: string;
  isActive: boolean;

  features: Feature[];
  createdBy: Account;
  updatedBy: Account;

  constructor(input: Pick<Resource, "id" | "createdAt" | "updatedAt"> & ResourceBulkUpdatableField) {
    super(input);
    this.path = input.path;
    this.name = input.name;
    this.model = input.model;
    this.api = input.api;
    this.group = input.group;
    this.seq = input.seq;
    this.description = input.description;
    this.isActive = input.isActive;
    this.features = input.features;
    this.updatedBy = input.updatedBy;
    this.createdBy = input.createdBy;
  }

  static create = (id: string, input: ResourceBulkUpdatableField, now: Date): Resource => {
    return new Resource({
      id,
      createdAt: now,
      updatedAt: now,
      path: input.path,
      name: input.name,
      model: input.model,
      api: input.api,
      group: input.group,
      seq: input.seq,
      description: input.description,
      isActive: input.isActive,
      features: input.features,
      createdBy: input.createdBy,
      updatedBy: input.updatedBy,
    });
  };

  update = (input: ResourceBulkUpdatableField): void => {
    this.path = input.path;
    this.name = input.name;
    this.model = input.model;
    this.api = input.api;
    this.group = input.group;
    this.seq = input.seq;
    this.description = input.description;
    this.isActive = input.isActive;
    this.features = input.features;
    this.updatedBy = input.updatedBy;
    this.createdBy = input.createdBy;
  };

  equals(entity: Resource) {
    if (!(entity instanceof Resource)) return false;
    return this.id === entity.id;
  }
}

export type ResourceBulkUpdatableField = Pick<
  Resource,
  | "model"
  | "api"
  | "name"
  | "group"
  | "seq"
  | "path"
  | "description"
  | "isActive"
  | "features"
  | "updatedBy"
  | "createdBy"
>;
