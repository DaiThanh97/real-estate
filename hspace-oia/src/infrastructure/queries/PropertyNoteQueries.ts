import constants from "../config/constants";

export class PropertyNoteQueries {

  private static columnsNoteDefault: string[] = 
  [
    "note.id",
    "note.property_id AS \"propertyId\"",
    "note.created_at AS \"createdAt\"",
    "note.note_id AS \"noteId\"",
    "assignee.id AS \"assignee.id\"",
    "assignee.display_name AS \"assignee.displayName\"",
    "approvedBy.id AS \"approvedBy.id\"",
    "approvedBy.display_name AS \"approvedBy.displayName\"",
    "note.approved_at AS \"approvedAt\"",
    "source.id AS \"source.id\"",
    "source.display_name AS \"source.displayName\"",
    "note.status"
  ];

  public static getNoteListQuery(propertyId: number) {
    const relationArr: { column: string, table: string }[] = [];
    for (const table of constants.propertyNotesListQuery) {
      const columnsSelect = [...table.columns, ...this.columnsNoteDefault];
      relationArr.push({
        "column": columnsSelect.join(", "),
        "table": table.name,
      });
    }
    return relationArr.map(el => {
      return ` SELECT ${el.column} FROM ${el.table} note 
                INNER JOIN properties property 
                  ON property.id = note.property_id AND note.property_id = ${propertyId} AND note.is_deleted=false 
                LEFT JOIN accounts assignee ON assignee.id = note.assignee_id 
                LEFT JOIN accounts approvedBy ON approvedBy.id = note.approved_by
                LEFT JOIN accounts source ON source.id = property.source_id  
              `;
    }).join(" UNION ALL ");
  }
}
