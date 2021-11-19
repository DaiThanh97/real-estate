import constants from "../../infrastructure/config/constants";

export class MasterValueQueries {
  public static getUsedItemsQuery() {
    const tmpName = "id";

    const relationArr: { column: string, table: string }[] = [];
    for (const table of constants.masterValueRelations) {
      for (const col of table.columns) {
        relationArr.push({
          "column": col,
          "table": table.name,
        });
      }
    }

    const query = relationArr.map(el => {
      return `SELECT ${el.column} ${tmpName} FROM ${el.table}`;
    }).join(" UNION ");

    return `SELECT DISTINCT ${tmpName} FROM (${query}) as tmp_table WHERE ${tmpName} IS NOT NULL`;
  }
}
