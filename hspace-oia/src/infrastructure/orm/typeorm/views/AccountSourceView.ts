import { Connection, ViewColumn, ViewEntity } from "typeorm";
import { PropertyStatus } from "../models/Property";
import { Account } from "../models/Account";
import { EAccountType } from "../../../../domain/models/Account";

export const AccountSourceViewName = "account_source_view" as const;

@ViewEntity({
  expression: (connection: Connection) => connection.createQueryBuilder()
    .select("account.id", "id")
    .addSelect("account.displayName", "display_name")
    .addSelect("property.cityId", "city_id")
    .addSelect("property.districtId", "district_id")
    .addSelect("property.wardId", "ward_id")
    .addSelect("property.streetId", "street_id")
    .addSelect("property.streetNumber", "street_number")
    .from(Account, "account")
    .innerJoin("properties", "property", "property.source_id = account.id")
    .where("property.isActive = true")
    .andWhere("account.isActive = true")
    .andWhere(`account.type = '${EAccountType.COLLABORATOR}'`)
    .andWhere(`property.status IN ('${PropertyStatus.Approved}', '${PropertyStatus.Existed}', '${PropertyStatus.Transacted}')`)
    .groupBy("account.id")
    .addGroupBy("account.displayName")
    .addGroupBy("property.cityId")
    .addGroupBy("property.districtId")
    .addGroupBy("property.wardId")
    .addGroupBy("property.streetId")
    .addGroupBy("property.streetNumber")
  ,
  name: AccountSourceViewName,
})
export class AccountSourceView {
  @ViewColumn()
  id: number;

  @ViewColumn({ name: "display_name" })
  displayName: string;

  @ViewColumn({ name: "city_id" })
  cityId: number;

  @ViewColumn({ name: "street_id" })
  streetId: number;

  @ViewColumn({ name: "district_id" })
  districtId: number;

  @ViewColumn({ name: "ward_id" })
  wardId: number;

  @ViewColumn({ name: "street_number" })
  streetNumber: string;

}
