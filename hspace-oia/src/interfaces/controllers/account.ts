import AccountAppUseCases from "../../application/AccountAppUseCases";
import { plainToClass } from "class-transformer";
import AccountSerializer, {
  AccountChangePasswordSerializer,
  AccountQuery,
  QueryAccountForNoteAssigneeSerializer
} from "../serializers/AccountSerializer";
import { Account, EAccountType } from "../../domain/models/Account";
import { BadImplementationError } from "../../infrastructure/error";
import { KeywordSerializer } from "../serializers/KeywordSerializer";
import { ILike, In, Not } from "typeorm";
import { BasicAccountSerializer } from "../serializers/Base";
import { getResponseSchema, idSchema } from "../schemas/base";
import { accountResponse, accountsResponse, listBasicAccountsResponse, msgResponse } from "../schemas/response";
import {
  accountChangePassword,
  accountQuerySchema,
  accountSchema,
  accountSettingDataSchema,
  accountSettingSchema,
  accountSettingsSchema,
  addingAccountSchema,
  queryAccountForNoteAssigneeSchema,
  settingFolderSchema,
  settingParamsSchema
} from "../schemas/account";
import { keywordQuerySchema } from "../schemas/query";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import Beans from "../../infrastructure/config/beans";
import { AccountSettingDataSerializer, AccountSettingSerializer } from "../serializers/AccountSettingSerializer";


const accountSettingSchemaResponse = getResponseSchema(
  accountSettingSchema,
  "AccountSettingSchemaResponse"
);

const accountSettingsSchemaResponse = getResponseSchema(
  accountSettingsSchema,
  "AccountSettingSchemaResponse"
);

@Controller("accounts", ["account"])
export default class AccountController {

  @Post({
    description: "Create new Account.",
    validateSchemas: {
      payload: addingAccountSchema,
    },
    responseSchema: accountResponse,
  })
  public async create(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: AccountSerializer
    }) dto: AccountSerializer,
  ): Promise<any> {
    const rv = await AccountAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(AccountSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/{id}",
    description: "Get an account by id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: accountResponse,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await AccountAppUseCases.get(id, serviceLocator);
    return plainToClass(AccountSerializer, rv, { excludeExtraneousValues: true, });
  }

  @Get({
    description: "Get list accounts",
    validateSchemas: {
      query: accountQuerySchema,
    },
    responseSchema: accountsResponse,
  })
  public async getList(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: AccountQuery,
    }) queryOptions: AccountQuery,
  ): Promise<any> {
    const { data, total } = await AccountAppUseCases.getAll(queryOptions, serviceLocator);
    const serialize = plainToClass(AccountSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/me",
    description: "Get current account",
    responseSchema: accountResponse,
  })
  public async getCurrentAccount(
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await AccountAppUseCases.getCurrent(account.id, serviceLocator);
    return plainToClass(AccountSerializer, rv, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}",
    description: "Update account by ID",
    validateSchemas: {
      params: idSchema,
      payload: accountSchema,
    },
    responseSchema: accountResponse,
  })
  public async update(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: AccountSerializer
    }) accountIn: AccountSerializer,
  ): Promise<any> {
    const rv = await AccountAppUseCases.update(id, accountIn, account, serviceLocator);
    return plainToClass(AccountSerializer, rv, { excludeExtraneousValues: true });
  }

  @Post({
    route: "/changePassword",
    description: "Account change password",
    validateSchemas: {
      payload: accountChangePassword,
    },
    responseSchema: msgResponse,
  })
  public async changePassword(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: AccountChangePasswordSerializer
    }) dto: AccountChangePasswordSerializer,
  ): Promise<any> {
    const result = await AccountAppUseCases.changePassword(dto, account, serviceLocator);
    if (!result) {
      throw new BadImplementationError();
    }
    return {
      msg: "The account has been change password successfully.", success: true
    };
  }

  @Get({
    route: "/_for_chat",
    description: "Get list accounts for chat",
    validateSchemas: {
      query: keywordQuerySchema,
    },
    responseSchema: listBasicAccountsResponse,
  })
  public async getListForChat(
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: KeywordSerializer,
    }) queryOptions: KeywordSerializer,
  ): Promise<any> {

    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await serviceLocator.accountRepository.findAndCount({
      where: {
        "id": Not(account.id),
        "isActive": true,
        ...queryOptions.keyword ? { displayName: ILike("%" + queryOptions.keyword + "%") } : {},
        ...account.type === EAccountType.COLLABORATOR ? { type: In([EAccountType.EMPLOYEE, EAccountType.ADMIN]) } : {},
      },
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
    });
    const serialize = plainToClass(BasicAccountSerializer, result, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_for_note_assignee",
    description: "Get list accounts has permission for note assignee.",
    validateSchemas: {
      query: queryAccountForNoteAssigneeSchema,
    },
    responseSchema: listBasicAccountsResponse,
    platforms: ["web"],
  })
  public async getListForNoteAssignee(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: QueryAccountForNoteAssigneeSerializer,
    }) queryOptions: QueryAccountForNoteAssigneeSerializer,
  ): Promise<any> {

    const { items, total } = await AccountAppUseCases.getListForNoteAssignee(queryOptions, serviceLocator);
    const serialize = plainToClass(BasicAccountSerializer, items, { excludeExtraneousValues: true });
    return {
      items: serialize,
      total
    };
  }


  @Get({
    route: "/_settings/{folder}",
    description: "Get current account settings by folder name",
    responseSchema: accountSettingsSchemaResponse,
    validateSchemas: {
      params: settingFolderSchema,
    }
  })
  public async getAccountSettings(
    @Param("folder") folder: string,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await AccountAppUseCases.getAccountSettings(folder, account, serviceLocator);
    const items = plainToClass(AccountSettingSerializer, rv, { excludeExtraneousValues: true });
    return {
      items,
      total: rv?.length || 0,
    };
  }

  @Post({
    route: "/_settings/{folder}/{key}",
    description: "Edit account setting by folder and key",
    responseSchema: accountSettingSchemaResponse,
    validateSchemas: {
      payload: accountSettingDataSchema,
      params: settingParamsSchema,
    },
  })
  public async editAccountSetting(
    @Param("folder") folder: string,
    @Param("key") key: string,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: AccountSettingDataSerializer
    }) data: AccountSettingDataSerializer,
  ): Promise<any> {
    const rv = await AccountAppUseCases.updateAccountSetting(
      folder,
      key,
      data,
      account,
      serviceLocator
    );
    return plainToClass(AccountSettingSerializer, rv, { excludeExtraneousValues: true });
  }
}
