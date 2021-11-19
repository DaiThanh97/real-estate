import { IAccountRepository } from "../../domain/repositories/IAccountRepository";
import { Account } from "../../domain/models/Account";
import { NotFoundError } from "../../domain/exceptions/error";

export class FindAccountByAuthId {
  constructor(private readonly accountRepository: IAccountRepository) {}

  async execute(authId: string): Promise<Account> {
    const result = await this.accountRepository.findByAuthId(authId);
    if (!result) {
      throw new NotFoundError("Account is not found");
    }
    return result;
  }
}
