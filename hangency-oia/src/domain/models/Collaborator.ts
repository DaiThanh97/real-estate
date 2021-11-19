import { BaseDomainModel } from "../shared/BaseDomainModel";
import { IDomainModel } from "../shared/IDomainModel";
import { ICollaborator } from "@halato/user";
import { MasterValue } from "./MasterValue";
import { Account } from "./Account";

export class Collaborator extends BaseDomainModel implements IDomainModel, ICollaborator {
  id: string;
  fullName: string;
  birthday: Date;
  joinedDate: Date;
  phone: string;
  email: string;
  companyId: number;
  collaboratorTypeId: number;

  company: MasterValue | null;
  collaboratorType: MasterValue | null;

  createdBy?: Account;
  updatedBy?: Account;

  constructor(
    input: Pick<
      Collaborator,
      "id" | "createdAt" | "updatedAt" | "company" | "collaboratorType" | "createdBy" | "updatedBy"
    > &
      CollaboratorBulkUpdatableField,
  ) {
    super(input);
    this.fullName = input.fullName;
    this.birthday = input.birthday;
    this.joinedDate = input.joinedDate;
    this.phone = input.phone;
    this.email = input.email;
    this.companyId = input.companyId;
    this.company = input.company;
    this.collaboratorTypeId = input.collaboratorTypeId;
    this.collaboratorType = input.collaboratorType;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static create = (id: string, input: CollaboratorBulkUpdatableField, createdBy: Account, now: Date): Collaborator => {
    return new Collaborator({
      id,
      createdAt: now,
      updatedAt: now,
      createdBy: createdBy,
      updatedBy: createdBy,
      fullName: input.fullName,
      birthday: input.birthday,
      joinedDate: input.joinedDate,
      phone: input.phone,
      email: input.email,
      companyId: input.companyId,
      collaboratorTypeId: input.collaboratorTypeId,

      company: null,
      collaboratorType: null,
    });
  };

  update = (input: CollaboratorBulkUpdatableField): void => {
    this.fullName = input.fullName;
    this.birthday = input.birthday;
    this.joinedDate = input.joinedDate;
    this.phone = input.phone;
    this.email = input.email;
    this.companyId = input.companyId;
    this.collaboratorTypeId = input.collaboratorTypeId;
  };

  equals(entity: Collaborator) {
    if (!(entity instanceof Collaborator)) return false;

    return this.id === entity.id;
  }
}

export type CollaboratorBulkUpdatableField = Pick<
  Collaborator,
  "fullName" | "birthday" | "joinedDate" | "phone" | "email" | "companyId" | "collaboratorTypeId"
>;
