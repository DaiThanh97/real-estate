import { BaseDTO } from "../BaseDTO";
import { Account } from "../../../domain/models/Account";

export class AccountBasicDTO extends BaseDTO {
  type: string;
  identityName: string;
  code: string;
  displayName: string;
  isActive: boolean;

  constructor(
    input: Pick<
      AccountBasicDTO,
      "id" | "createdAt" | "updatedAt" | "type" | "identityName" | "code" | "displayName" | "isActive"
    >,
  ) {
    super(input);
    this.type = input.type;
    this.identityName = input.identityName;
    this.code = input.code;
    this.displayName = input.displayName;
    this.isActive = input.isActive;
  }

  static toDTO(d: Account): AccountBasicDTO {
    return new AccountBasicDTO({
      id: d.id,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      type: d.type,
      identityName: d.identityName,
      code: d.code,
      displayName: d.displayName,
      isActive: d.isActive,
    });
  }
}
