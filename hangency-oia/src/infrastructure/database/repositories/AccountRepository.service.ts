import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformAccount } from "./transforms/account/TransformAccount";
import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { Account } from "../../../domain/models/Account";
import { AccountEntity } from "../../orm/typeorm/models/AccountEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";
import { ILike } from "typeorm";
import map from "lodash/map";

@Service({ id: TYPES.accountRepository })
export class AccountRepository extends BaseRepository<Account, AccountEntity> implements IAccountRepository {
  constructor() {
    super();
  }
  async findById(id: string): Promise<Account | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
        isActive: true,
      },
      relations: [
        "createdBy",
        "updatedBy",
        "accountAccountGroups",
        "accountAccountGroups.accountGroup",
        "employee",
        "collaborator",
      ],
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  async findByIdentityName(identityName: string): Promise<Account | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        identityName,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  async findByAuthId(authId: string): Promise<Account | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        connectedFirebaseAuthId: authId,
        isActive: true,
      },
      relations: ["employee", "collaborator"],
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  async getByCode(code: string): Promise<Account[] | undefined> {
    const repo = this.getTypeORMRepository();
    const result: AccountEntity[] = await repo.find({
      where: {
        code: ILike(code + "%"),
      },
    });
    return result ? map(result, (el: AccountEntity) => this.transformEntityToDomain(el)) : undefined;
  }

  async save(d: Account): Promise<void> {
    const typeORMRepository = await this.getTypeORMRepository();
    const e = this.transformCreateEntityFromDomain(d);
    await typeORMRepository.save(e);
  }

  transformUpdateEntityFromDomain(d: Account): Partial<AccountEntity> {
    return TransformAccount.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: AccountEntity): Account {
    return TransformAccount.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: Account): AccountEntity {
    return TransformAccount.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<AccountEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(AccountEntity);
  }
}
