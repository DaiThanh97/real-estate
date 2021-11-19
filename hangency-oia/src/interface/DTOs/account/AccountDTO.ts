import { BaseDTO } from "../BaseDTO";
import { Account } from "../../../domain/models/Account";
import { AccountBasicDTO } from "./AccountBasicDTO";

export class AccountDTO extends BaseDTO {
  type: string;
  identityName: string;
  code: string;
  displayName: string;
  isActive: boolean;

  createdBy: AccountBasicDTO;
  updatedBy: AccountBasicDTO;

  constructor(
    input: Pick<
      AccountDTO,
      | "id"
      | "createdAt"
      | "updatedAt"
      | "type"
      | "identityName"
      | "code"
      | "displayName"
      | "isActive"
      | "createdBy"
      | "updatedBy"
    >,
  ) {
    super(input);
    this.type = input.type;
    this.identityName = input.identityName;
    this.code = input.code;
    this.displayName = input.displayName;
    this.isActive = input.isActive;
    this.createdBy = input.createdBy;
    this.updatedBy = input.updatedBy;
  }

  static toDTO(d: Account): AccountDTO {
    return new AccountDTO({
      id: d.id,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      type: d.type,
      identityName: d.identityName,
      code: d.code,
      displayName: d.displayName,
      isActive: d.isActive,
      createdBy: d.createdBy && AccountBasicDTO.toDTO(d.createdBy),
      updatedBy: d.updatedBy && AccountBasicDTO.toDTO(d.updatedBy),
    });
  }
}
