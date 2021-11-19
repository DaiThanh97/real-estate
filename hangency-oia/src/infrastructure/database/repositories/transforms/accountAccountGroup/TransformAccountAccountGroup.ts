import { AccountAccountGroupEntity } from "../../../../orm/typeorm/models/AccountAccountGroupEntity";
import { AccountAccountGroup } from "../../../../../domain/models/AccountAccountGroup";
import { TransformAccountGroup } from "../accountGroup/TransformAccountGroup";
import { TransformAccount } from "../account/TransformAccount";

export class TransformAccountAccountGroup {
  static transformEntityToDomain(e: AccountAccountGroupEntity): AccountAccountGroup {
    const result = new AccountAccountGroup({
      id: e.id,
      createdAt: e.createdAt,
      updatedAt: e.updatedAt,
      accountId: e.accountId,
      accountGroupId: e.accountGroupId,
      accountGroup: e.accountGroup && TransformAccountGroup.transformEntityToDomain(e.accountGroup),
      account: e.account && TransformAccount.transformEntityToDomain(e.account),
      createdBy: e.createdBy && TransformAccount.transformEntityToDomain(e.createdBy),
      updatedBy: e.updatedBy && TransformAccount.transformEntityToDomain(e.updatedBy),
    });
    return result;
  }
  static transformCreateEntityFromDomain(d: AccountAccountGroup): AccountAccountGroupEntity {
    return new AccountAccountGroupEntity({
      id: d.id,
      accountId: d.accountId,
      accountGroupId: d.accountGroupId,
      accountGroup: d.accountGroup && TransformAccountGroup.transformCreateEntityFromDomain(d.accountGroup),
      account: d.account && TransformAccount.transformCreateEntityFromDomain(d.account),
      createdBy: d.createdBy && TransformAccount.transformCreateEntityFromDomain(d.createdBy),
      updatedBy: d.updatedBy && TransformAccount.transformCreateEntityFromDomain(d.updatedBy),
    });
  }
  static transformUpdateEntityFromDomain(d: AccountAccountGroup): Partial<AccountAccountGroupEntity> {
    const result: Partial<AccountAccountGroupEntity> = {
      accountId: d.accountId,
      accountGroupId: d.accountGroupId,
      accountGroup: d.accountGroup && TransformAccountGroup.transformCreateEntityFromDomain(d.accountGroup),
      account: d.account && TransformAccount.transformCreateEntityFromDomain(d.account),
    };
    return result;
  }
}
