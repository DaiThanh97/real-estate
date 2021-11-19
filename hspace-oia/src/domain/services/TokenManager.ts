import { Account } from "../models/Account";
import { plainToClass } from "class-transformer";
import { IAccountRepository, ISessionRepository, ITokenManager } from "./contract";
import { Utilities } from "../../application/utils";

export class TokenManager implements ITokenManager {
  constructor(private accountRepository: IAccountRepository, private sessionRepository: ISessionRepository) {
  }

  public async validate(decoded: any, isUserWeb = false): Promise<any> {
    const { sub } = decoded as { sub: number };

    const account = await this.accountRepository.findOne({
      where: {
        id: sub,
        isActive: true,
        ...Utilities.appendQueryUserPlatform(isUserWeb),
      },
      relations: [
        "accountAccountGroups",
        "employee",
        "collaborator",
        "accountAccountGroups.accountGroup",
        "employee.employeeLimits",
        "employee.employeeRegions",
        "employee.employeeLimits.type",
      ],
    });
    if (account === undefined) {
      return { isValid: false };
    }

    const sessionId = decoded["custom:session"];
    const session = await this.sessionRepository.findOne({ id: sessionId, isActive: true });
    if (session === undefined) {
      return { isValid: false };
    }
    const currentAccount = plainToClass(Account, account);
    currentAccount.classify();

    return { isValid: true, account: currentAccount };
  }
}
