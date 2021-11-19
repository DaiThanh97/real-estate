import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { AppraisalStatement } from "../models/AppraisalStatement";
import { AppraisalStatementStatus } from "../../../../domain/models/AppraisalStatement";

export const AppraisalStatementRatioViewName = "appraisal_statement_ratio_view" as const;


@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("appraisalStatement.id", "id")
    .addSelect("appraisalStatement.propertyId", "property_id")
    // Updated by ticket: BDS-1301 ===> Giao dịch/Giá định = ABS(Giá đã giao dịch - giá thẩm định)/ giá đã giao dịch
    .addSelect(
      "ABS(CAST(closed_deal_value AS float) - CAST(property_unit_price_ppss AS float)) / NULLIF(CAST(closed_deal_value AS float),0)",
      "ratio_closed_deal_appraise"
    )
    .from(AppraisalStatement, "appraisalStatement")
    .leftJoin("property", "property", "property.id = appraisalStatement.propertyId")
    .andWhere(`appraisalStatement.status IN ('${AppraisalStatementStatus.Approved}', '${AppraisalStatementStatus.Deleted}')`)
  ,
  name: AppraisalStatementRatioViewName,
  synchronize: false,
  materialized: true,
})
export class AppraisalStatementRatioView {
  @ViewColumn()
  id: number;

  @ViewColumn({ name: "ratio_closed_deal_appraise" })
  ratioClosedDealAppraise: number;
}
