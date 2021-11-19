import { Expose, Type } from "class-transformer";
import { PagingSerializer } from "./PagingSerializer";
import MasterValueSerializer from "./MasterValueSerializer";
import AccountSerializer from "./AccountSerializer";
import { PropertyBookmarkSerializer } from "./PropertyBookmarkSerializer";
import { PropertyHistoryNoteSerializer } from "./PropertyHistoryNoteSerializer";
import { BasicAccountSerializer, IdSerializer } from "./Base";
import { BusinessStatusType, PropertyStatusType } from "../../infrastructure/types/Property";

function relationPropertyMixin<T extends new (...args: any[]) => {
  /**/
}>(constructor: T) {
  const fields = [
    "streetNumber",
    "city",
    "district",
    "ward",
    "street",
    "locationType",
    "status",
  ];
  const masterValueFields = [
    "city",
    "district",
    "ward",
    "street",
    "locationType",
  ];
  const RelationMixinClass = class extends constructor {
    streetNumber: string;
    city: MasterValueSerializer;
    district: MasterValueSerializer;
    ward: MasterValueSerializer;
    street: MasterValueSerializer;
    locationType: MasterValueSerializer;
    status: PropertyStatusType;
  };
  for (const field of fields) {
    Expose()(RelationMixinClass.prototype, field);
  }
  for (const field of masterValueFields) {
    Type(() => MasterValueSerializer)(RelationMixinClass.prototype, field);
  }
  return RelationMixinClass;
}

function accountPropertyMixin<T extends new (...args: any[]) => {
  /**/
}>(constructor: T) {
  const fields = [
    "urgentLevel",
    "price",
    "createdAt",
    "source",
    "updatedBy",
    "createdBy",
    "approvedAt",
    "approvedBy",
    "broker",
  ];
  const accountFields = [
    "updatedBy",
    "source",
    "createdBy",
    "approvedBy",
    "broker",
  ];
  const RelationMixinClass = class extends constructor {
    urgentLevel: MasterValueSerializer;
    price: number;
    createdAt: Date;
    updatedBy: AccountSerializer;
    createdBy: AccountSerializer;
    source: AccountSerializer;
    approvedAt: Date;
    approvedBy: AccountSerializer;
    broker: AccountSerializer;
  };
  for (const field of fields) {
    Expose()(RelationMixinClass.prototype, field);
  }
  for (const field of accountFields) {
    Type(() => AccountSerializer)(RelationMixinClass.prototype, field);
  }
  Type(() => MasterValueSerializer)(
    RelationMixinClass.prototype,
    "urgentLevel"
  );

  return RelationMixinClass;
}

export class PropertyRatioSerializer {
  @Expose()
  ratioChangeableAppraise: number;

  @Expose()
  ratioChangeableBuy: number;

  @Expose()
  ratioClosedDealAppraise: number;

  @Expose()
  differencePrice: number;
}

export class PropertyProgressSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  type: string;
}

export abstract class PropertyGeneralInfoMixinSerializer {
  @Expose()
  id: number;

  @Expose()
  streetNumber: string;

  @Expose()
  cityId: number;

  @Expose()
  districtId: number;

  @Expose()
  wardId: number;

  @Expose()
  streetId: number;

  @Expose()
  locationTypeId: number;

  @Expose()
  urgentLevelId: number;

  @Expose()
  generalNote: string;

  @Expose()
  price: number;

  @Expose()
  longitude: string;

  @Expose()
  latitude: string;

  @Expose()
  attachments: string;

  @Expose()
  topicId: number;

  @Expose()
  version: string;

  @Expose()
  sourceCollectorId: number;
}

export class PropertyGeneralInfoSerializer extends PropertyGeneralInfoMixinSerializer {
}

export class PropertySerializer extends PropertyGeneralInfoMixinSerializer {
  @Expose()
  landPlot: string;

  @Expose()
  map: string;

  @Expose()
  horizontalFront: number;

  @Expose()
  horizontalBack: number;

  @Expose()
  height1: number;

  @Expose()
  height2: number;

  @Expose()
  propertyTypeId: number;

  @Expose()
  propertyPeriodId: number;

  @Expose()
  propertyUsingId: number;

  @Expose()
  recognizedArea: number;

  @Expose()
  unrecognizedArea: number;

  @Expose()
  recognizedPlanningArea: number;

  @Expose()
  constructionCurrentStage: string;

  @Expose()
  groundFloors: number;

  @Expose()
  mezzanines: number;

  @Expose()
  basements: number;

  @Expose()
  roofs: number;

  @Expose()
  structure: string;

  @Expose()
  recognizedFloorArea: number;

  @Expose()
  unrecognizedFloorArea: number;

  @Expose()
  constructionNote: string;

  @Expose()
  sourceId: number;

  @Expose()
  dealStage: string;

  @Expose()
  businessStatus: BusinessStatusType;

  @Expose()
  transactionDate: Date;

  @Expose()
  brokerId: number;

  @Expose()
  closedDealValue: number;

  @Expose()
  status: PropertyStatusType;

  @Expose()
  isActive: boolean;

  @Expose()
  code: string;

  @Expose()
  description: string;

  @Expose()
  @Type(() => PropertyBookmarkSerializer)
  propertyBookmarks: PropertyBookmarkSerializer[];

  @Expose()
  changeablePrice: number;

  @Expose()
  saleBrokerId: number;

  @Expose()
  @Type(() => PropertyHistoryNoteSerializer)
  propertyHistoryNotes: PropertyHistoryNoteSerializer[];
}

export class PropertyGeneralMixinQuerySerializer extends PagingSerializer {
  @Expose()
  streetNumber: string;

  @Expose()
  districtId: number;

  @Expose()
  streetId: number;

  @Expose()
  locationTypeId: number;

  @Expose()
  wardId: number;

  @Expose()
  priceFrom: number;

  @Expose()
  priceTo: number;

  @Expose()
  price: number;

  @Expose()
  status: PropertyStatusType;

  @Expose()
  approvedBy: number;
}

export class PropertyQuerySerializer extends PropertyGeneralMixinQuerySerializer {
  @Expose()
  code: string;

  @Expose()
  urgentLevelId: number;

  @Expose()
  collaboratorTypeId: number;

  @Expose()
  sourceId: number;

  @Expose()
  companyId: number;

  @Expose()
  assigneeId: number;

  @Expose()
  followerId: number;

  @Expose()
  followDate: Date;

  @Expose()
  businessStatus: BusinessStatusType;

  @Expose()
  createdFrom: Date;

  @Expose()
  createdTo: Date;

  @Expose()
  dealStage: string;
}

@relationPropertyMixin
export class PropertyShortListSerializer extends IdSerializer {
  @Expose()
  code?: string;
}

@relationPropertyMixin
@accountPropertyMixin
export class PropertyListSerializer extends IdSerializer {
  @Expose()
  code?: string;

  @Expose()
  changeablePrice?: number;

  @Expose()
  businessStatus?: BusinessStatusType;

  @Expose()
  @Type(() => PropertyBookmarkSerializer)
  propertyBookmarks: PropertyBookmarkSerializer[];
}

@relationPropertyMixin
@accountPropertyMixin
export class PropertyItemSerializer extends PropertySerializer {
  @Expose()
  @Type(() => MasterValueSerializer)
  propertyType: MasterValueSerializer;

  @Expose()
  @Type(() => MasterValueSerializer)
  propertyPeriod: MasterValueSerializer;

  @Expose()
  @Type(() => MasterValueSerializer)
  propertyUsing: MasterValueSerializer;

  @Expose()
  @Type(() => PropertyRatioSerializer)
  propertyRatio?: PropertyRatioSerializer;

  @Expose()
  @Type(() => PropertyProgressSerializer)
  latestProgress?: PropertyProgressSerializer;
}

@relationPropertyMixin
@accountPropertyMixin
export class PropertyShortItemSerializer extends PropertyGeneralInfoSerializer {
  @Expose()
  code?: string;

  @Expose()
  @Type(() => PropertyHistoryNoteSerializer)
  propertyHistoryNotes: PropertyHistoryNoteSerializer[];
}

export class PropertyStatusSerializer {
  @Expose()
  id: number;

  @Expose()
  status: PropertyStatusType;

  @Expose()
  reasonId?: number | undefined;

  @Expose()
  @Type(() => MasterValueSerializer)
  reason?: MasterValueSerializer | undefined;

  @Expose()
  notes: string;
}

export class PropertyBusinessStatusSerializer {
  @Expose()
  id: number;

  @Expose()
  businessStatus: BusinessStatusType;
}

export class PropertyNoteItemSerializer {
  @Expose()
  id: number;

  @Expose()
  type: string;

  @Expose()
  propertyId: number;

  @Expose()
  createdAt: Date;

  @Expose()
  noteId: string;

  @Expose()
  @Type(() => BasicAccountSerializer)
  assignee?: BasicAccountSerializer | undefined;

  @Expose()
  @Type(() => BasicAccountSerializer)
  approvedBy?: BasicAccountSerializer | undefined;

  @Expose()
  approvedAt: Date;

  @Expose()
  @Type(() => BasicAccountSerializer)
  source?: BasicAccountSerializer | undefined;

  @Expose()
  status: string;
}

export class DealPropertyRequestSerializer {
  @Expose()
  closedDealValue: number;

  @Expose()
  transactionDate: Date;

  @Expose()
  brokerId: number;

  @Expose()
  @Type(() => BasicAccountSerializer)
  sourceCollectorId?: BasicAccountSerializer | undefined;
}

export class ChangeablePriceRequestSerializer {
  @Expose()
  changeablePrice: number;

  @Expose()
  saleBrokerId: number;
}
