import { PagingSerializer } from "./PagingSerializer";
import {
  IQuerySerializer,
  IsFieldQuery,
  MatchQuerySerializer,
  RangeQuerySerializer,
  StringQuerySerializer
} from "./QuerySerializer";
import { Expose, Type } from "class-transformer";
import { Validate, ValidateNested } from "class-validator";
import { PropertyView } from "../../infrastructure/orm/typeorm/views/PropertyView";
import { BusinessStatusType, PropertyStatusType } from "../../infrastructure/types/Property";


type PropertyViewFieldType = keyof PropertyView;

const MatchQueryFields: PropertyViewFieldType[] = [
  "streetId", "districtId", "wardId", "businessStatus", "brokerId",
  "markerId", "bookmarkType", "urgentLevelId", "hasConstruction",
];

const QueryStringFields: PropertyViewFieldType[] = ["code", "streetNumber"];

const RangeQueryFields: PropertyViewFieldType[] = [
  "createdAt", "updatedAt", "price", "changeablePrice", "recognizedArea",
  "approvedPurchasePrice", "propertyUnitPricePPSS", "ratioChangeableAppraise",
  "ratioChangeableBuy", "ratioClosedDealAppraise", "differencePrice",
  "horizontalFront", "floors", "bookmarkDate",
];


export class PropertyViewQuerySerializer extends PagingSerializer implements IQuerySerializer {
  @Expose()
  @ValidateNested({ each: true })
  @Type(() => MatchQuerySerializer)
  @Validate(
    IsFieldQuery,
    MatchQueryFields,
    {
      message: "Wrong field",
      each: true,
    }
  )
  match: MatchQuerySerializer[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => StringQuerySerializer)
  @Validate(
    IsFieldQuery,
    QueryStringFields,
    {
      message: "Wrong field",
      each: true,
    })
  queryString: StringQuerySerializer[];

  @Expose()
  @ValidateNested({ each: true })
  @Type(() => RangeQuerySerializer)
  @Validate(
    IsFieldQuery,
    RangeQueryFields,
    {
      message: "Wrong field",
      each: true,
    }
  )
  range: RangeQuerySerializer[];
}

export class PropertyViewSerializer {
  @Expose()
  id: number;

  @Expose()
  code?: string;

  @Expose()
  changeablePrice?: number;

  @Expose()
  businessStatus?: BusinessStatusType;

  @Expose()
  status: PropertyStatusType;

  @Expose()
  cityId: number;

  @Expose()
  streetId: number;

  @Expose()
  streetName: string;

  @Expose()
  districtId: number;

  @Expose()
  districtName: string;

  @Expose()
  wardId: number;

  @Expose()
  wardName: string;

  @Expose()
  streetNumber: number;

  @Expose()
  updatedAt: Date;

  @Expose()
  price: number;

  @Expose()
  bookmarkId: number;

  @Expose()
  markerId: number;

  @Expose()
  markerDisplayName: string;

  @Expose()
  bookmarkType: string;

  @Expose()
  urgentLevelId: number;

  @Expose()
  approvedPurchasePrice: number;

  @Expose()
  propertyUnitPricePPSS: number;

  @Expose()
  ratioChangeableAppraise: number;

  @Expose()
  ratioChangeableBuy: number;
}
