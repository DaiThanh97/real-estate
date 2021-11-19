import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { IMenuRepository } from "../../domain/repositories/IMenuRepository";
import { IAccountGroupRepository } from "../../domain/repositories/IAccountGroupRepository";
import { IFeatureRepository } from "../../domain/repositories/IFeatureRepository";
import { IResourceRepository } from "../../domain/repositories/IResourceRepository";
import { Account } from "../../domain/models/Account";
import { NotFoundError } from "../../domain/exceptions/error";

export class FindCurrentAccount {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(accountId: string): Promise<Account> {
    const result = await this.accountRepository.findById(accountId);
    if (!result) {
      throw new NotFoundError("Account is not found");
    }
    // TODO load more menus,group account,resources,features...
    // will implement in ticket load user menu/resouces

    return result;
  }
}
