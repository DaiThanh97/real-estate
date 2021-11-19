import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart , ActiveStatusColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { IProperty } from "./Property";
import { IMasterValue } from "./MasterValue";
import { HistoryNoteType } from "../../../../domain/models/PropertyHistoryNote";

export interface IPropertyHistoryNote {
  id: number;
  propertyId: number;
  type: HistoryNoteType;
  reasonId: number,
  notes: string;
  isActive: boolean;
  property: IProperty;
  reason: IMasterValue;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
}

export const PropertyHistoryNote = new EntitySchema<IPropertyHistoryNote>({
  name: "property_history_note",
  tableName: "property_history_notes",
  columns: {
    ...BaseColumnSchemaPart,
    ...ActiveStatusColumnSchemaPart,
    propertyId: {
      type: Number,
      name: "property_id",
      nullable: false,
    },
    type: {
      name: "type",
      nullable: true,
      enum: HistoryNoteType,
      default: HistoryNoteType.OTHER,
      type: "enum",
    },
    reasonId: {
      type: "int",
      name: "reason_id",
      nullable: true
    },
    notes: {
      type: String,
      name: "notes",
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    property: {
      type: "many-to-one",
      target: "property",
      inverseSide: "propertyHistoryNotes",
      joinColumn: { name: "property_id", referencedColumnName: "id" },
      nullable: true,
    },
    reason: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: { name: "reason_id", referencedColumnName: "id" },
    },
  },
});
