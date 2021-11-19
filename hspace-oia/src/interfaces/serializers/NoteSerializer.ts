import { PagingSerializer } from "./PagingSerializer";
import { Expose, Type } from "class-transformer";
import { BasicAccountSerializer } from "./Base";
import MasterValueSerializer from "./MasterValueSerializer";
import { PropertyItemSerializer } from "./PropertySerializer";

export class ChangeableNoteSerializer {
  @Expose()
  executionDate: Date;

  @Expose()
  assigneeId: number;

  @Expose()
  companyId: number;

  @Expose()
  instructorId: number;

  @Expose()
  propertyId: number;

  @Expose()
  streetNumber: string;

  @Expose()
  cityId: number;

  @Expose()
  wardId: number;

  @Expose()
  districtId: number;

  @Expose()
  streetId: number;

  @Expose()
  address: string;

  @Expose()
  noteType: string;

  @Expose()
  version: string;
}

export class QueryNoteSerializer extends PagingSerializer {
  @Expose()
  propertyId: number;

  @Expose()
  propertyCode: string;

  @Expose()
  noteId: string;

  @Expose()
  noteType: string;

  @Expose()
  address: string;

  @Expose()
  streetNumber: string;

  @Expose()
  streetId: number;

  @Expose()
  wardId: number;

  @Expose()
  districtId: number;

  @Expose()
  createdFrom: Date;

  @Expose()
  createdTo: Date;

  @Expose()
  approvedBy: number;

  @Expose()
  approvedFrom: Date;

  @Expose()
  approvedTo: Date;

  @Expose()
  assigneeId: number;

  @Expose()
  status: string;

  @Expose()
  monthYear: Date;

  @Expose()
  propertyStatus: string;
}

export function noteSerializerMixin<T extends new(...args: any[]) => {/**/ }>(constructor: T) {
  const fields = [
    "noteId", "status", "rejectionNote", "approvedAt", "approvedBy", "assignee", "instructor",
    "company", "property", "city", "district", "ward", "street", "rejectedAt", "rejectedBy",
    "topicId", "version",
  ];
  const RelationMixinClass = class extends constructor {
    noteId: string;
    version: string;
    status: string;
    rejectionNote: string;
    approvedAt: Date | undefined;
    approvedBy: BasicAccountSerializer | undefined;
    assignee: BasicAccountSerializer | undefined;
    instructor: BasicAccountSerializer | undefined;
    company: MasterValueSerializer | undefined;
    property: PropertyItemSerializer | undefined;
    city: MasterValueSerializer | undefined;
    district: MasterValueSerializer | undefined;
    ward: MasterValueSerializer | undefined;
    street: MasterValueSerializer | undefined;
    rejectedAt: Date;
    rejectedBy: BasicAccountSerializer | undefined;
    topicId: number | undefined;
  };
  for (const field of fields) {
    Expose()(RelationMixinClass.prototype, field);
  }
  Type(() => BasicAccountSerializer)(RelationMixinClass.prototype, "approvedBy");
  Type(() => BasicAccountSerializer)(RelationMixinClass.prototype, "assignee");
  Type(() => BasicAccountSerializer)(RelationMixinClass.prototype, "instructor");
  Type(() => MasterValueSerializer)(RelationMixinClass.prototype, "company");
  Type(() => MasterValueSerializer)(RelationMixinClass.prototype, "city");
  Type(() => MasterValueSerializer)(RelationMixinClass.prototype, "district");
  Type(() => MasterValueSerializer)(RelationMixinClass.prototype, "ward");
  Type(() => MasterValueSerializer)(RelationMixinClass.prototype, "street");
  Type(() => BasicAccountSerializer)(RelationMixinClass.prototype, "rejectedBy");
  Type(() => PropertyItemSerializer)(RelationMixinClass.prototype, "property");

  return RelationMixinClass;
}
