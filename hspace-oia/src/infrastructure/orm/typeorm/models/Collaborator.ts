import { EntitySchema } from "typeorm";
import { IAccount } from "./Account";
import { IMasterValue } from "./MasterValue";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";


export interface ICollaborator {
  id: number;
  fullName: string;
  birthday: Date;
  joinedDate: Date;
  phone: string;
  email: string;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  companyId: number;
  company: IMasterValue;
  collaboratorTypeId: number;
  collaboratorType: IMasterValue;
}

export const Collaborator = new EntitySchema<ICollaborator>({
  name: "collaborator",
  tableName: "collaborators",
  columns: {
    ...BaseColumnSchemaPart,
    fullName: {
      type: String,
      name: "full_name",
      nullable: false,
    },
    birthday: {
      type: "date",
      name: "birthday",
      nullable: false,
    },
    joinedDate: {
      type: "date",
      name: "joined_date",
      nullable: false,
    },
    phone: {
      type: String,
      name: "phone",
      default: "",
    },
    email: {
      type: String,
      name: "email",
      default: "",
    },
    companyId: {
      type: Number,
      name: "company_id",
      nullable: true,
    },
    collaboratorTypeId: {
      type: Number,
      name: "collaborator_type_id",
      nullable: true,
    },
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    company: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: {name: "company_id", referencedColumnName: "id"},
    },
    collaboratorType: {
      type: "many-to-one",
      target: "masterValue",
      joinColumn: {name: "collaborator_type_id", referencedColumnName: "id"},
    },
  },
  uniques: [
    {
      name: "UNIQUE_COLLABORATOR",
      columns: [
        "phone",
      ]
    }
  ],
});
