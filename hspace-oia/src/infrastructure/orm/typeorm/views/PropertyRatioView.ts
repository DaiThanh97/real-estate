import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { Property } from "../models/Property";
import { NoteType } from "../models/LatestApprovedNote";

export const PropertyRatioViewName = "property_ratio_view" as const;

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("property.id", "id")
    .addSelect("property.closedDealValue", "closed_deal_value")
    .addSelect("property.changeablePrice", "changeable_price")
    .addSelect("latestApprovedTH.refId", "appraisal_statement_id")
    .addSelect("appraisalStatement.propertyUnitPricePPSS", "property_unit_price_ppss")
    .addSelect("latestApprovedHD.refId", "investment_efficiency_id")
    .addSelect("investmentEfficiency.approvedPurchasePrice", "approved_purchase_price")
    .addSelect("changeable_price - approved_purchase_price", "difference_price")
    .addSelect(
      "CAST(changeable_price AS float)/NULLIF(CAST(approved_purchase_price AS float),0)",
      "ratio_changeable_buy"
    )
    .addSelect(
      "CAST(changeable_price AS float)/NULLIF(CAST(property_unit_price_ppss AS float),0)",
      "ratio_changeable_appraise"
    )
    // Updated by ticket: BDS-1301 ===> Giao dịch/Giá định = ABS(Giá đã giao dịch - giá thẩm định)/ giá đã giao dịch
    .addSelect(
      "ABS(CAST(closed_deal_value AS float) - CAST(property_unit_price_ppss AS float)) / NULLIF(CAST(closed_deal_value AS float),0)",
      "ratio_closed_deal_appraise"
    )
    .from(Property, "property")
    .leftJoin(
      "latest_approved_notes",
      "latestApprovedTH",
      `latestApprovedTH.type = '${NoteType.TH}' AND latestApprovedTH.propertyId = property.id`
    )
    .leftJoin(
      "latest_approved_notes",
      "latestApprovedHD",
      `latestApprovedHD.type = '${NoteType.HD}' AND latestApprovedHD.propertyId = property.id`
    )
    .leftJoin(
      "appraisal_statement",
      "appraisalStatement",
      "appraisalStatement.id = latestApprovedTH.refId"
    )
    .leftJoin(
      "investment_efficiency",
      "investmentEfficiency",
      "investmentEfficiency.id = latestApprovedHD.refId"
    )
    .where("property.isActive = true")
  ,
  name: PropertyRatioViewName,
  synchronize: false,
  materialized: true,
})
export class PropertyRatioView {
  @ViewColumn()
  id: number;

  @ViewColumn({ name: "closed_deal_value" })
  closedDealValue: number;

  @ViewColumn({ name: "changeable_price" })
  changeablePrice: number;

  @ViewColumn({ name: "appraisal_statement_id" })
  appraisalStatementId: number;

  @ViewColumn({ name: "investment_efficiency_id" })
  investmentEfficiencyId: number;

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
}
