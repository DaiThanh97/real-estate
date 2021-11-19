import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { PropertyStatusType } from "../../../types/Property";
import { Property, PropertyStatus } from "../models/Property";


class PropertyStatisticsView {
  @ViewColumn({ name: "district_id" })
  districtId: number;

  @ViewColumn()
  status: PropertyStatusType;

  @ViewColumn()
  count: number;
}

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("property.districtId", "district_id")
    .addSelect("property.status", "status")
    .addSelect("COUNT(*)", "count")
    .from(Property, "property")
    .where("property.isActive = true")
    .andWhere(" property.changedStatusTime BETWEEN DATE_TRUNC('MONTH', NOW()::date) AND NOW()")
    .groupBy("district_id, status")
  ,
  name: "property_this_month_statistics_view",
  materialized: false,
})
export class PropertyThisMonthStatisticsView extends PropertyStatisticsView {
}

@ViewEntity({
  expression: `
  SELECT property.district_id AS district_id, property.status AS status, COUNT(*) AS count
  FROM properties as property
  WHERE property.changed_status_time >= DATE_TRUNC('MONTH', NOW()::date - INTERVAL '1 MONTH')
    AND property.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND property.status NOT IN ('${PropertyStatus.Drafting}', '${PropertyStatus.Pending}')
    AND property.is_active = true
  GROUP BY property.district_id, property.status
  UNION
  SELECT property.district_id AS district_id, property.status AS status, COUNT(*) AS count
  FROM properties as property
  WHERE property.changed_status_time < DATE_TRUNC('MONTH', NOW()::date)
    AND property.status IN ('${PropertyStatus.Drafting}', '${PropertyStatus.Pending}')
    AND property.is_active = true
  GROUP BY property.district_id, property.status
  ORDER BY district_id;
  `,
  name: "property_last_month_statistics_view",
  materialized: false,
})
export class PropertyLastMonthStatisticsView extends PropertyStatisticsView {
}
