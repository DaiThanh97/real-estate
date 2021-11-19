import { IPasswordManager } from "./security/IPasswordManager";
import { Account, AccountMenu, EAccountType } from "../domain/models/Account";
import { plainToClass } from "class-transformer";
import _ from "lodash";
import {
  IAccountGroupRepository,
  IAccountManager,
  IAccountRepository,
  IAccountSettingRepository,
  IBaseRepository,
  IFeatureRepository,
  IMenuManager,
  IMenuRepository,
  IResetTokenRepository,
  IResourceRepository
} from "../domain/services/contract";
import { ILike, In } from "typeorm";
import { BadRequestError, ConflictError, ForbiddenError } from "../infrastructure/error";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import AccountSerializer, {
  AccountChangePasswordSerializer,
  AccountForgotPasswordConfirmSerializer,
  AccountForgotPasswordRequestSerializer,
  AccountMenuSerializer,
  AccountQuery,
  QueryAccountForNoteAssigneeSerializer
} from "../interfaces/serializers/AccountSerializer";
import { AccountQueryGenerator } from "./utils/AccountQueryGenerator";
import { Utilities } from "./utils";
import { Menu } from "../domain/models/Menu";
import { AccountGroup, AccountGroupFeature, AccountGroupResource } from "../domain/models/AccountGroup";
import { Resource } from "../domain/models/Resource";
import { Feature } from "../domain/models/Feature";
import { AccountGroupSerializer } from "../interfaces/serializers/AccountGroupSerializer";
import ResourceSerializer from "../interfaces/serializers/ResourceSerializer";
import FeatureSerializer from "../interfaces/serializers/FeatureSerializer";
import { AccessTokenManager } from "./security/AccessTokenManager";
import { LicenseRequestSerializer } from "../interfaces/serializers/Base";
import { IPolicyManager } from "../domain/services/contract/IPolicyManager";
import { Enforcer } from "casbin/lib/cjs/enforcer";
import { AccountSettingDataSerializer } from "../interfaces/serializers/AccountSettingSerializer";

export default class AccountAppUseCases {
  public static async create(payload: any, currentAccount: Account, beans: {
    accountRepository: IAccountRepository,
    accountGroupRepository: IAccountGroupRepository,
    accountManager: IAccountManager,
  }): Promise<any> {
    await this.validate(payload, beans);
    let creatingAccount: Account = await beans.accountManager.generateCredential(payload);
    creatingAccount = Account.createByAccount(creatingAccount, currentAccount);
    const created = await beans.accountRepository.save(creatingAccount);
    await beans.accountManager.sendCredential(creatingAccount);
    await beans.accountManager.createDefaultSettings(created.id);
    return this.get(created.id, beans);
  }

  public static async get(id: number, beans: {
    accountRepository: IAccountRepository,
  }): Promise<any> {
    return await beans.accountRepository.findOneOrFail({
      where: { id },
      relations: [
        "accountAccountGroups",
        "employee", "employee.updatedBy", "employee.createdBy",
        "collaborator", "collaborator.updatedBy", "collaborator.createdBy",
        "createdBy",
        "updatedBy",
        "accountAccountGroups.updatedBy",
        "accountAccountGroups.createdBy",
        "accountAccountGroups.accountGroup"
      ],
    });
  }

  public static async getCurrent(id: number, beans: {
    accountRepository: IAccountRepository,
    accountGroupRepository: IAccountGroupRepository,
    resourceRepository: IResourceRepository,
    featureRepository: IFeatureRepository,
    menuRepository: IMenuRepository,
    menuManager: IMenuManager,
  }): Promise<any> {
    const result = (await this.get(id, beans)) as Account;
    const accountGroups: AccountGroup[] = await this.getAllAccountGroupById(id, beans);
    const menu: Menu[] = await beans.menuRepository.find({
      relations: ["parent", "resource"],
      order: {
        seq: "ASC",
      },
      where: {
        isActive: true,
      },
    });
    let uniqueUserResources: Resource[] = [];
    let uniqueUserFeatures: Feature[] = [];
    for (const accountGroup of accountGroups) {
      const resourcesAccountGroup: AccountGroupResource[] = accountGroup.accountGroupResources;
      const featuresAccountGroup: AccountGroupFeature[] = accountGroup.accountGroupFeatures;
      for (const resource of resourcesAccountGroup) {
        const existedResource = uniqueUserResources.find(item => item.id === resource.resource.id);
        if (!existedResource) {
          uniqueUserResources.push(resource.resource);
        }
      }
      for (const feature of featuresAccountGroup) {
        const existedFeature = uniqueUserFeatures.find(item => item.id === feature.feature.id);
        if (!existedFeature) {
          uniqueUserFeatures.push(feature.feature);
        }
      }
    }
    let userMenuFlatten: Menu[] = [];
    for (const menuItem of menu) {
      const resourceEnabled = uniqueUserResources.find(item => item.id === menuItem.resourceId);
      if (!menuItem.resourceId || (menuItem.resourceId && resourceEnabled)) {
        userMenuFlatten.push(menuItem);
      }
    }
    const userMenu: AccountMenu[] = [];
    if (result.type === EAccountType.ADMIN) {
      beans.menuManager.getChildrenMenu(null, menu, userMenu);
      uniqueUserResources = await beans.resourceRepository.find({});
      uniqueUserFeatures = await beans.featureRepository.find({});
    } else {
      userMenuFlatten = userMenuFlatten.filter(item => !beans.menuManager.menuIsHaveNoResourceChild(item.id, userMenuFlatten));
      beans.menuManager.getChildrenMenu(null, userMenuFlatten, userMenu);
    }
    const resultSerializer = plainToClass(AccountSerializer, result);
    resultSerializer.accountGroups = plainToClass(AccountGroupSerializer, accountGroups);
    resultSerializer.menu = plainToClass(AccountMenuSerializer, userMenu);
    resultSerializer.resources = plainToClass(ResourceSerializer, uniqueUserResources);
    resultSerializer.features = plainToClass(FeatureSerializer, uniqueUserFeatures);
    return resultSerializer;
  }

  public static async login(identityName: string, password: string, isUserWeb: boolean, beans: {
    accountRepository: IAccountRepository, passwordManager: IPasswordManager
  }): Promise<any> {
    const findResult = await beans.accountRepository.findOne({
      where: {
        identityName: ILike(identityName),
        ...Utilities.appendQueryUserPlatform(isUserWeb),
      }
    });
    if (findResult) {
      const account: Account = plainToClass(Account, findResult);
      const match = await beans.passwordManager.checkPassword(password, account.hash);

      if (match) {
        account.updateLoginTime();
        await beans.accountRepository.update(account.id, {
          lastLoginAt: account.lastLoginAt,
        });
        return account;
      }
    }

    return undefined;
  }

  public static async validate(payload: any, beans: {
    accountGroupRepository: IAccountGroupRepository,
  }): Promise<void> {
    if (payload?.accountAccountGroups?.length) {
      const accountGroupIds = payload.accountAccountGroups.map((el: { accountGroupId: number; }) => el.accountGroupId);
      const accountGroups = await beans.accountGroupRepository.find({
        where: {
          id: In(accountGroupIds)
        }
      });

      if (accountGroups.length !== payload.accountAccountGroups.length) {
        throw new ConflictError(
          "The account account group are not valid.",
          ErrorCode.Account.AccountAccountGroupsInvalid,
        );
      }
    }
  }

  public static async update(id: number, payload: any, currentAccount: Account, beans: {
    accountRepository: IAccountRepository,
    accountGroupRepository: IAccountGroupRepository,
    accountAccountGroupRepository: IBaseRepository,
  }): Promise<any> {
    await this.validate(payload, beans);
    const accountBeforeUpdate: Account = await this.get(id, beans);
    const existedAccount = plainToClass(Account, accountBeforeUpdate);

    const updatingAccount: Account = plainToClass(Account, payload);
    existedAccount.update(updatingAccount);

    existedAccount.updateByAccount(currentAccount, accountBeforeUpdate);
    const result = await beans.accountRepository.save(existedAccount);

    await beans.accountAccountGroupRepository.delete({ accountId: null });

    return this.get(result.id, beans);
  }

  public static async getAll(queryOptions: AccountQuery, beans: {
    accountRepository: IAccountRepository,
  }): Promise<any> {

    const queryBuilder: any = AccountQueryGenerator.generateSearchQuery(beans.accountRepository, queryOptions);

    const totalCount = await queryBuilder.getCount();
    const resultQuery = await queryBuilder
      .take(queryOptions.take)
      .skip(queryOptions.skip)
      .orderBy(`a.${queryOptions.orderField}`, queryOptions.order)
      .getMany();

    const items = plainToClass(AccountSerializer, resultQuery, { excludeExtraneousValues: true });

    return {
      data: items,
      total: totalCount
    };
  }

  public static async getAllAccountGroupById(id: number, beans: {
    accountRepository: IAccountRepository,
    accountGroupRepository: IAccountGroupRepository,
  }): Promise<any> {
    const accountResult = await this.get(id, beans);
    const account: Account = plainToClass(Account, accountResult);
    if (account.accountAccountGroups.map(item => item.accountGroupId).length) {
      return await beans.accountGroupRepository.find({
        where: { id: In(account.accountAccountGroups.map(item => item.accountGroupId)) },
        relations: [
          "accountGroupResources", "accountGroupFeatures", "createdBy",
          "updatedBy", "accountGroupResources.updatedBy", "accountGroupResources.createdBy",
          "accountGroupFeatures.updatedBy", "accountGroupFeatures.createdBy", "accountGroupFeatures.feature",
          "accountGroupResources.resource",
        ]
      });
    }
    return [];
  }

  public static async changePassword(payload: AccountChangePasswordSerializer, account: Account, beans: {
    accountRepository: IAccountRepository, accountManager: IAccountManager,
  }): Promise<any> {
    const { password, newPassword } = payload;
    const matchCurrentPassword = await beans.accountManager.checkCurrentPassword(password, account);
    if (!matchCurrentPassword) {
      throw new BadRequestError("Password is invalid.", ErrorCode.Account.AccountPasswordInvalid);
    }
    const newPasswordHash = await beans.accountManager.getHashNewPassword(newPassword);
    await beans.accountRepository.update(account.id, {
      hash: newPasswordHash,
      updatedBy: account.id,
    });
    return account;
  }

  public static async forgotPasswordRequest(
    payload: AccountForgotPasswordRequestSerializer,
    accountType: EAccountType,
    beans: {
      accountRepository: IAccountRepository,
      resetTokenRepository: IResetTokenRepository,
      accountManager: IAccountManager
    }): Promise<any> {
    const account: Account = await beans.accountManager.findAccountByIdentityName(accountType, payload.identityName);
    const email = accountType === EAccountType.EMPLOYEE ? account.employee.email : account.collaborator.email;
    const identityName = account.identityName;
    return await beans.accountManager.createForgotPassword(account, email, identityName);
  }

  public static async forgotPasswordConfirm(
    payload: AccountForgotPasswordConfirmSerializer,
    accountType: EAccountType,
    beans: {
      accountRepository: IAccountRepository,
      resetTokenRepository: IResetTokenRepository,
      accountManager: IAccountManager
    }): Promise<any> {
    const resetTokenData = await beans.accountManager.findResetTokenByIdentityName(payload.identityName);
    await beans.accountManager.validateConfirmForgotPassword(resetTokenData, payload.code, payload.sign);
    await beans.accountManager.confirmForgotPassword(resetTokenData, payload.newPassword);
    return true;
  }

  public static async getLicense(
    dto: LicenseRequestSerializer,
    account: Account,
    beans: {
      accessTokenManager: AccessTokenManager,
      policyManager: IPolicyManager,
      enforcer: Enforcer,
    }
  ): Promise<any> {
    const subject = account;
    const resource = {
      name: dto.api,
      id: dto.id,
      resourceId: dto.resourceId,
    };
    const action = dto.method;

    await beans.enforcer.loadPolicy();
    const res = await beans.enforcer.enforce(subject, resource, action);
    if (!res) {
      const errorCustom = _.find(
        ErrorCode.LicenseErrors as unknown as { apis: string[], method: string, errorCode: string }[],
        item => item.apis.includes(dto.api) && item.method === dto.method
      );
      if (errorCustom) {
        throw new ForbiddenError("Permission Denied", errorCustom.errorCode);
      }
      throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
    }
    return beans.accessTokenManager.generateLicense(account.id, dto.api, dto.method, dto.id);
  }

  public static async getListForNoteAssignee(
    queryOptions: QueryAccountForNoteAssigneeSerializer,
    beans: {
      accountRepository: IAccountRepository,
      resourceRepository: IResourceRepository,
    }): Promise<any> {
    const resource = await beans.resourceRepository.findOne({
      where: { id: queryOptions.resourceId, isActive: true },
      cache: 60000
    });
    if (!resource) {
      return {
        items: [],
        total: 0,
      };
    }
    const actsFilter = ["create", "update"]; // actions of feature 'Tạo' hoặc 'Cập nhật'
    const query = beans.accountRepository
      .createQueryBuilder("a")
      .select("a.*")
      .addSelect("a.display_name", "displayName")
      .addSelect("a.identity_name", "identityName")
      .innerJoin("account_account_groups", "aag", "aag.accountId = a.id")
      .innerJoin("account_groups", "ag", "ag.id = aag.accountGroupId")
      .innerJoin("account_group_features", "agf", "agf.accountGroupId = ag.id")
      .innerJoin("features", "f", "f.id = agf.featureId")
      .innerJoin("resources", "r", "r.id = f.resourceId")
      .where("a.type = :type", { type: EAccountType.EMPLOYEE })
      .andWhere("ag.isActive = true")
      .andWhere("f.isActive = true")
      .andWhere("r.isActive = true")

      .andWhere("r.model = :model", {
        model: resource.model,
      })
      .andWhere("f.act IN (:...acts)", { acts: actsFilter })
      .groupBy("a.id");

    if (queryOptions.isActive != null) {
      query.andWhere("a.isActive = :isActive", { isActive: queryOptions.isActive });
    }
    if (queryOptions.displayName) {
      query.andWhere("LOWER(a.displayName) like :displayName", { displayName: `%${queryOptions.displayName.toLowerCase()}%` });
    }

    const total = await query.getCount();
    const rv = await query
      .limit(queryOptions.take)
      .offset(queryOptions.skip)
      .orderBy(`a.${queryOptions.orderField}`, queryOptions.order)
      .getRawMany();

    return {
      items: rv,
      total,
    };
  }

  public static async getAccountSettings(
    folder: string,
    account: Account,
    beans: {
      accountSettingRepository: IAccountSettingRepository,
    }
  ): Promise<any> {
    return await beans.accountSettingRepository.find({
      relations: ["createdBy", "updatedBy"],
      where: {
        folder: ILike(folder),
        accountId: account.id,
        isActive: true,
      }
    }) || [];
  }

  public static async getAccountSetting(
    folder: string,
    key: string,
    account: Account,
    beans: {
      accountSettingRepository: IAccountSettingRepository,
    }
  ): Promise<any> {
    return await beans.accountSettingRepository.findOneOrFail({
      relations: ["createdBy", "updatedBy"],
      where: {
        folder: ILike(folder),
        key: ILike(key),
        accountId: account.id,
        isActive: true,
      }
    });
  }

  public static async updateAccountSetting(
    folder: string,
    key: string,
    data: AccountSettingDataSerializer,
    account: Account,
    beans: {
      accountSettingRepository: IAccountSettingRepository,
    }
  ): Promise<any> {
    const currentSetting = await this.getAccountSetting(folder, key, account, beans);
    if (currentSetting.data.type !== data.type || typeof data.value !== data.type) {
      throw new BadRequestError("The type is not valid.");
    }

    await beans.accountSettingRepository.update({
      key: ILike(key),
      folder: ILike(folder),
      accountId: account.id,
      isActive: true,
    }, {
      data,
      ...(currentSetting.createdBy ? {} : { createdBy: account.id }),
      updatedBy: account.id,
    });

    return await this.getAccountSetting(folder, key, account, beans);
  }
}
