import { EntityRepository, Repository } from "typeorm";
import { IAccountEventRepository } from "../../../../domain/services/contract";
import { AccountEvent } from "../models/AccountEvent";
import { Container } from "typedi";
import ContainerTokens from "../../../../domain/services/contract/ContainerTokens";

@EntityRepository(AccountEvent)
export class AccountEventRepository extends Repository<any> implements IAccountEventRepository {
  async updateOrCreate(data: {
    referenceId: number,
    accountId: number,
    model: string,
    type: string,
    createdBy?: number,
    updatedBy?: number,
  }): Promise<any> {
    const accountEventRepository = Container.get(ContainerTokens.AccountEventRepository);

    const res = await accountEventRepository.findOne({
      where: {
        referenceId: data.referenceId,
        type: data.type,
        model: data.model,
      }
    });
    if (res) {
      return await accountEventRepository.update(res.id, {
        updatedBy: data.updatedBy || data.accountId,
        accountId: data.accountId,
      });
    } else {
      return await accountEventRepository.save({
        referenceId: data.referenceId,
        accountId: data.accountId,
        type: data.type,
        model: data.model,
        createdBy: data.createdBy || data.accountId,
        updatedBy: data.updatedBy || data.accountId,
      });
    }
  }
}
