import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Property, PropertyStatus } from "../models/Property";
import { PropertyRatioViewName } from "./PropertyRatioView";
import { NoteType } from "../models/LatestApprovedNote";
import { BusinessStatusType, PropertyStatusType } from "../../../types/Property";


@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("property.id", "id")
    .addSelect("property.code", "code")
    .addSelect("property.cityId", "city_id")
    .addSelect("property.streetId", "street_id")
    .addSelect("property.districtId", "district_id")
    .addSelect("property.wardId", "ward_id")
    .addSelect("property.streetNumber", "street_number")
    .addSelect("property.createdAt", "created_at")
    .addSelect("property.updatedAt", "updated_at")
    .addSelect("property.price", "price")
    .addSelect("property.status", "status")
    .addSelect("property.businessStatus", "business_status")
    .addSelect("property.brokerId", "broker_id")
    .addSelect("property.changeablePrice", "changeable_price")
    .addSelect("property.urgentLevelId", "urgent_level_id")
    .addSelect("property.recognizedArea", "recognized_area")
    .addSelect("street.valueName", "street_name")
    .addSelect("district.valueName", "district_name")
    .addSelect("ward.valueName", "ward_name")
    .addSelect("broker.displayName", "broker_display_name")
    .addSelect("maker.displayName", "marker_display_name")
    .addSelect("ratioView.approvedPurchasePrice", "approved_purchase_price")
    .addSelect("ratioView.propertyUnitPricePPSS", "property_unit_price_ppss")
    .addSelect("ratioView.ratioChangeableAppraise", "ratio_changeable_appraise")
    .addSelect("ratioView.ratioChangeableBuy", "ratio_changeable_buy")
    .addSelect("ratioView.ratioClosedDealAppraise", "ratio_closed_deal_appraise")
    .addSelect("ratioView.differencePrice", "difference_price")
    .addSelect("CAST(inspectionStatement.construction -> 'KHTN29' AS INT)", "floors")
    .addSelect("CAST(inspectionStatement.landUseRights -> 'KHNT14' AS FLOAT)", "horizontal_front")
    .addSelect("CAST(inspectionStatement.construction -> 'KHHT28' ->> 'value' AS BOOLEAN)", "has_construction")
    .from(Property, "property")
    .leftJoin("masterValue", "street", "street.id = property.streetId")
    .leftJoin("masterValue", "district", "district.id = property.districtId")
    .leftJoin("masterValue", "ward", "ward.id = property.wardId")
    .leftJoin("account", "broker", "broker.id = property.brokerId")
    .leftJoinAndMapOne("property.propertyBookmark", "property.propertyBookmarks", "bookmark")
    .leftJoin("account", "maker", "maker.id = bookmark.bookmarkerId")
    .leftJoin(`${PropertyRatioViewName}`, "ratioView", "ratioView.id = property.id")
    .leftJoin(
      "latest_approved_notes",
      "latestApprovedKH",
      `latestApprovedKH.type = '${NoteType.KH}' AND latestApprovedKH.propertyId = property.id`
    )
    .leftJoin(
      "inspection_statement",
      "inspectionStatement",
      "inspectionStatement.id = latestApprovedKH.refId"
    )
    .where("property.isActive = true")
    .andWhere(`property.status = '${PropertyStatus.Approved}'`)
  ,
  name: "property_view",
})
export class PropertyView {
  @ViewColumn()
  id: number;

  @ViewColumn()
  code: string;

  @ViewColumn()
  status: PropertyStatusType;

  @ViewColumn({ name: "city_id" })
  cityId: number;

  @ViewColumn({ name: "street_id" })
  streetId: number;

  @ViewColumn({ name: "street_name" })
  streetName: string;

  @ViewColumn({ name: "district_id" })
  districtId: number;

  @ViewColumn({ name: "district_name" })
  districtName: string;

  @ViewColumn({ name: "ward_id" })
  wardId: number;

  @ViewColumn({ name: "ward_name" })
  wardName: string;

  @ViewColumn({ name: "street_number" })
  streetNumber: number;

  @ViewColumn({ name: "created_at" })
  createdAt: Date;

  @ViewColumn({ name: "updated_at" })
  updatedAt: Date;

  @ViewColumn()
  price: number;

  @ViewColumn({ name: "business_status" })
  businessStatus: BusinessStatusType;

  @ViewColumn({ name: "broker_id" })
  brokerId: number;

  @ViewColumn({ name: "broker_display_name" })
  brokerDisplayName: string;

  @ViewColumn({ name: "changeable_price" })
  changeablePrice: number;

  @ViewColumn({ name: "bookmark_id" })
  bookmarkId: number;

  @ViewColumn({ name: "bookmark_bookmarker_id" })
  markerId: number;

  @ViewColumn({ name: "marker_display_name" })
  markerDisplayName: string;

  @ViewColumn({ name: "bookmark_type" })
  bookmarkType: string;

  @ViewColumn({ name: "bookmark_bookmark_date" })
  bookmarkDate: Date;

  @ViewColumn({ name: "urgent_level_id" })
  urgentLevelId: number;

  @ViewColumn({ name: "recognized_area" })
  recognizedArea: number;

  @ViewColumn({ name: "approved_purchase_price" })
  approvedPurchasePrice: number;

  @ViewColumn({ name: "property_unit_price_ppss" })
  propertyUnitPricePPSS: number;

  @ViewColumn({ name: "ratio_changeable_appraise" })
  ratioChangeableAppraise: number;

  @ViewColumn({ name: "ratio_changeable_buy" })
  ratioChangeableBuy: number;

  @ViewColumn({ name: "ratio_closed_deal_appraise" })
  ratioClosedDealAppraise: number;

  @ViewColumn({ name: "difference_price" })
  differencePrice: number;

  @ViewColumn({ name: "horizontal_front" })
  horizontalFront: number;

  @ViewColumn({ name: "floors" })
  floors: number;

  @ViewColumn({ name: "has_construction" })
  hasConstruction: boolean;
}
