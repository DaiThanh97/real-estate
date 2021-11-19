import { Account } from "../domain/models/Account";
import { AccountGroup } from "../domain/models/AccountGroup";
import { plainToClass } from "class-transformer";
import { ILike, In } from "typeorm";
import { BadRequestError, ConflictError } from "../infrastructure/error";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import {
  IAccountGroupManager,
  IAccountGroupRepository,
  IBaseRepository,
  IFeatureRepository,
  IResourceRepository
} from "../domain/services/contract";
import _ from "lodash";

export default class AccountGroupAppUseCases {
  public static async validate(payload: any, beans: {
    accountGroupRepository: IAccountGroupRepository,
    featureRepository: IFeatureRepository,
    resourceRepository: IResourceRepository,
  }): Promise<void> {
    const exist = await beans.accountGroupRepository.findOne({ where: { code: ILike(payload.code) } });
    if (exist) {
      if (payload.id === undefined || (payload.id && exist.id !== payload.id)) {
        throw new BadRequestError(
          "The code of account group is exist.",
          ErrorCode.AccountGroup.CodeExist
        );
      }
    }

    if (payload.accountGroupResources && payload.accountGroupResources.length > 0) {
      const resourceIds = payload.accountGroupResources.map((el: { resourceId: number; }) => el.resourceId);
      const resources = await beans.resourceRepository.find({
        where: { id: In(resourceIds) },
      });
      if (resources.length !== payload.accountGroupResources.length) {
        throw new ConflictError(
          "The account group resources are not valid.",
          ErrorCode.AccountGroup.ResourcesInvalid,
        );
      }

      if (payload.accountGroupFeatures && payload.accountGroupFeatures.length > 0) {
        const features = await beans.featureRepository.find({
          where: { id: In(payload.accountGroupFeatures.map((el: { featureId: number; }) => el.featureId)) },
        });
        if (features.length !== payload.accountGroupFeatures.length) {
          throw new ConflictError(
            "The account group features are not valid.",
            ErrorCode.AccountGroup.FeaturesInvalid,
          );
        }
        AccountGroup.checkFeatures(resources, features);
      }
    } else {
      if (payload.accountGroupFeatures && payload.accountGroupFeatures.length > 0) {
        throw new ConflictError(
          "The account group features are not valid.",
          ErrorCode.AccountGroup.FeaturesInvalid,
        );
      }
    }
  }

  public static async get(id: number, beans: {
    accountGroupRepository: IAccountGroupRepository,
    accountAccountGroupRepository: IBaseRepository,
  }): Promise<any> {
    const accountGroup = await beans.accountGroupRepository.findOneOrFail({
      where: { id, isDeleted: false },
      relations: [
        "accountGroupResources",
        "accountGroupFeatures",
        "createdBy",
        "updatedBy",
        "accountGroupResources.updatedBy",
        "accountGroupResources.createdBy",
        "accountGroupFeatures.updatedBy",
        "accountGroupFeatures.createdBy",
        "accountGroupFeatures.feature",
        "accountGroupResources.resource",
      ],
    });

    accountGroup.accountGroupResources = _.filter(accountGroup.accountGroupResources, (item: any) => item.resource?.isActive);
    accountGroup.accountGroupResources = _.orderBy(accountGroup.accountGroupResources, item => item.resource?.name, ["asc"]);
    accountGroup.accountGroupFeatures = _.filter(accountGroup.accountGroupFeatures, (item: any) => item.feature?.isActive && _.find(accountGroup.accountGroupResources, res => item.feature?.resourceId === res.resource?.id));
    accountGroup.accountGroupFeatures = _.orderBy(accountGroup.accountGroupFeatures, item => item.feature?.seq, ["asc"]);

    const accountAccount = await beans.accountAccountGroupRepository.findOne({
      select: ["id"],
      where: { accountGroupId: id }
    });
    accountGroup.haveAccounts = !(!accountAccount);

    return accountGroup;
  }

  public static async create(payload: any, account: Account, beans: {
    accountGroupRepository: IAccountGroupRepository,
    accountGroupFeatureRepository: IBaseRepository,
    accountGroupResourceRepository: IBaseRepository,
    featureRepository: IFeatureRepository,
    resourceRepository: IResourceRepository,
    accountGroupManager: IAccountGroupManager,
    accountAccountGroupRepository: IBaseRepository,
  }): Promise<any> {
    await this.validate(payload, beans);
    const accountGroup = AccountGroup.createByAccount(payload, account);
    const result = await beans.accountGroupRepository.save(accountGroup);
    await beans.accountGroupManager.classify(result.id);
    return this.get(result.id, beans);
  }

  public static async update(payload: any, account: Account, beans: {
    accountGroupRepository: IAccountGroupRepository,
    accountGroupFeatureRepository: IBaseRepository,
    accountGroupResourceRepository: IBaseRepository,
    featureRepository: IFeatureRepository,
    resourceRepository: IResourceRepository,
    accountGroupManager: IAccountGroupManager,
    accountAccountGroupRepository: IBaseRepository,
  }): Promise<any> {
    await this.validate(payload, beans);
    const accountGroup: AccountGroup = plainToClass(AccountGroup, payload);
    const exist = await this.get(accountGroup.id, beans);
    await AccountGroup.updateByAccount(accountGroup, exist, account);
    const result = await beans.accountGroupRepository.save(accountGroup);

    beans.accountGroupFeatureRepository.delete({ accountGroupId: null });
    beans.accountGroupResourceRepository.delete({ accountGroupId: null });
    await beans.accountGroupManager.classify(result.id);

    return this.get(result.id, beans);
  }

  public static async delete(id: number, account: Account, beans: {
    accountGroupRepository: IAccountGroupRepository,
    accountAccountGroupRepository: IBaseRepository,
  }): Promise<any> {
    const accountAccount = await beans.accountAccountGroupRepository.findOne({
      where: { accountGroupId: id }
    });

    if (!accountAccount) {
      await beans.accountGroupRepository.update(id, {
        isDeleted: true,
        updatedBy: account.id,
      });
    } else{
      throw new BadRequestError(
        "Some accounts have used the account group.",
        ErrorCode.AccountGroup.AccountAccountGroupExist
      );
    }
  }
}
