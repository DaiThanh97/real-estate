import { IAccountDeviceTokenManager, IAccountDeviceTokenRepository, } from "./contract";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import _ from "lodash";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";


@Service(ContainerTokens.AccountDeviceTokenManager)
export class AccountDeviceTokenManager implements IAccountDeviceTokenManager {

  public constructor(
    @Inject(ContainerTokens.AccountDeviceTokenRepository)
    private accountDeviceTokenRepository: IAccountDeviceTokenRepository,
  ) {
  }

  public async getTokesFromAccountIds(
    accountIds: number[],
  ): Promise<any> {
    const accountDeviceTokens = await this.accountDeviceTokenRepository.find({
      join: {
        alias: "accountDeviceToken",
        leftJoinAndSelect: {
          account: "accountDeviceToken.account",
        },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({ isActive: true });
        qb.andWhere("account.id IN (:...accountIds)", { accountIds });
        qb.andWhere("account.isActive = :isActiveAccount", {
          isActiveAccount: true,
        });
      },
    }) as Readonly<any>;
    if (!accountDeviceTokens) {
      return [];
    }
    return _.map(accountDeviceTokens, (el) => el.deviceToken);
  }

}
