import * as uuid from "uuid";

import { ICollaboratorRepository } from "../../domain/repositories/ICollaboratorRepository";
import { Collaborator } from "../../domain/models/Collaborator";
import { Account } from "../../domain/models/Account";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { BadImplementationError } from "../../domain/exceptions/error";
import { IAccountManager } from "../../domain/services/contract/IAccountManager";
import { IAccountGroupRepository } from "../../domain/repositories/IAccountGroupRepository";

export class CreateCollaborator {
  constructor(
    private readonly collaboratorRepository: ICollaboratorRepository,
    private readonly accountManager: IAccountManager,
    private readonly accountGroupRepository: IAccountGroupRepository,
  ) {}

  async execute(
    input: {
      fullName: string;
      birthday: Date;
      joinedDate: Date;
      phone: string;
      email: string;
      companyId: number;
      collaboratorTypeId: number;
      accountAccountGroups: { accountGroupId: string }[];
      isActive: boolean;
    },
    currentAccount: Account,
  ): Promise<Collaborator> {
    await this.checkPhoneExisted(input.phone);
    await this.checkEmailExisted(input.email);
    await this.checkGroupAccountIdsValid(input.accountAccountGroups);

    const newId = uuid.v4();
    const now = new Date();

    const createdPayload = {
      fullName: input.fullName,
      birthday: input.birthday,
      joinedDate: input.joinedDate,
      phone: input.phone,
      email: input.email,
      companyId: input.companyId,
      collaboratorTypeId: input.collaboratorTypeId,
    };

    const newCollaborator = Collaborator.create(newId, createdPayload, currentAccount, now);
    await this.collaboratorRepository.create(newCollaborator);

    // Create account for collaborator
    await this.accountManager.createAccountByCollaborator(
      newCollaborator,
      {
        isActive: input.isActive,
        accountAccountGroups: input.accountAccountGroups,
      },
      currentAccount,
    );

    const created = await this.collaboratorRepository.findById(newCollaborator.id);

    return created;
  }

  async checkPhoneExisted(phone: string): Promise<void> {
    const exist = await this.collaboratorRepository.findByPhone(phone);
    if (exist) {
      throw new BadImplementationError(`The collaborator phone ${phone} is exist.`, ErrorCode.Collaborator.PhoneExist);
    }
  }

  async checkEmailExisted(email: string): Promise<void> {
    const exist = await this.collaboratorRepository.findByEmail(email);
    if (exist) {
      throw new BadImplementationError(`The collaborator email ${email} is exist.`, ErrorCode.Collaborator.EmailExist);
    }
  }

  async checkGroupAccountIdsValid(accountAccountGroups: { accountGroupId: string }[]): Promise<void> {
    if (accountAccountGroups && accountAccountGroups.length > 0) {
      const accountGroupIds = accountAccountGroups.map((el: { accountGroupId: string }) => el.accountGroupId);
      const accountGroups = await this.accountGroupRepository.getByIds(accountGroupIds);
      if (!accountGroups || accountGroups.length !== accountAccountGroups.length) {
        throw new BadImplementationError(
          "The account account group are not valid.",
          ErrorCode.Account.AccountAccountGroupsInvalid,
        );
      }
    }
  }
}
