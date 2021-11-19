import { BaseDTO } from "../BaseDTO";
import { Collaborator } from "../../../domain/models/Collaborator";
import { MasterValueDTO } from "../masterValue/MasterValueDTO";
import { AccountDTO } from "../account/AccountDTO";

export class CollaboratorDTO extends BaseDTO {
  fullName: string;
  birthday: Date;
  joinedDate: Date;
  phone: string;
  email: string;
  companyId?: number;
  collaboratorTypeId?: number;
  company?: MasterValueDTO;
  collaboratorType?: MasterValueDTO;

  createdBy?: AccountDTO;
  updatedBy?: AccountDTO;

  constructor(
    input: Pick<
      CollaboratorDTO,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "fullName"
      | "birthday"
      | "joinedDate"
      | "phone"
      | "email"
      | "companyId"
      | "collaboratorTypeId"
      | "company"
      | "collaboratorType"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    this.fullName = input.fullName;
    this.birthday = input.birthday;
    this.joinedDate = input.joinedDate;
    this.phone = input.phone;
    this.email = input.email;
    this.companyId = input.companyId;
    this.collaboratorTypeId = input.collaboratorTypeId;
    this.company = input.company;
    this.collaboratorType = input.collaboratorType;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static toDTO(d: Collaborator): CollaboratorDTO {
    return new CollaboratorDTO({
      id: d.id,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      fullName: d.fullName,
      birthday: d.birthday,
      joinedDate: d.joinedDate,
      phone: d.phone,
      email: d.email,
      companyId: d.companyId,
      collaboratorTypeId: d.collaboratorTypeId,
      company: d.company && MasterValueDTO.toDTO(d.company),
      collaboratorType: d.collaboratorType && MasterValueDTO.toDTO(d.collaboratorType),
      createdBy: d.createdBy && AccountDTO.toDTO(d.createdBy),
      updatedBy: d.updatedBy && AccountDTO.toDTO(d.updatedBy),
    });
  }
}
