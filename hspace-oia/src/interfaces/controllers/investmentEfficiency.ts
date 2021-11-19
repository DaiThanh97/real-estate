import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { getResponseSchema, idSchema, rejectNoteSchema } from "../schemas/base";
import { Param } from "../routing-controllers/decorator/Param";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { plainToClass } from "class-transformer";
import InvestmentEfficiencyAppUseCases from "../../application/InvestmentEfficiencyAppUseCases";
import {
  ApprovedInvestmentEfficiencyRequest,
  ChangeableInvestmentEfficiencySerializer,
  InvestmentEfficiencySerializer,
  QueryInvestmentEfficiencySerializer
} from "../serializers/InvestmentEfficiencySerializer";
import {
  addingInvestmentEfficiencySchema,
  approvedInvestmentEfficiencyRequestSchema,
  investmentEfficiencySchema,
  investmentEfficiencySchemas,
  queryInvestmentEfficiencySchema,
  updatingInvestmentEfficiencySchema
} from "../schemas/investmentEfficiency";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Account } from "../../domain/models/Account";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import Beans from "../../infrastructure/config/beans";
import { InvestmentEfficiencyStatus } from "../../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { noteStatisticSchemaResponse, activitiesSchemaResponse } from "../schemas/note";
import { PagingSerializer } from "../serializers/PagingSerializer";
import { pagingQuerySchema } from "../schemas/query";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";

const investmentEfficiencyResponse = getResponseSchema(investmentEfficiencySchema, "InvestmentEfficiencyResponse");
const investmentEfficiencySchemasResponse = getResponseSchema(
  investmentEfficiencySchemas, "InvestmentEfficiencySchemasResponse"
);

const actions = ACTIONS.HQDT;
const resource = "investment_efficiency";


@Controller("investment_efficiencies", ["investment_efficiency"])
export default class InvestmentEfficiencyController {
  @Get({
    route: "/{id}",
    description: "Get investment efficiency note of property by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.GET,
    },
    platforms: ["web"],
    secure: true,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await InvestmentEfficiencyAppUseCases.get(id, serviceLocator);
    return plainToClass(
      InvestmentEfficiencySerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Post({
    description: "Create investment efficiency of property",
    validateSchemas: {
      payload: addingInvestmentEfficiencySchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.CREATE,
    },
    platforms: ["web"],
  })
  public async create(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeableInvestmentEfficiencySerializer
    }) investmentEfficiencyIn: ChangeableInvestmentEfficiencySerializer,
  ): Promise<any> {
    const rv = await InvestmentEfficiencyAppUseCases.create(investmentEfficiencyIn, account, serviceLocator);
    return plainToClass(
      InvestmentEfficiencySerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    description: "Get all investment efficiency of property with paging",
    validateSchemas: {
      query: queryInvestmentEfficiencySchema,
    },
    responseSchema: investmentEfficiencySchemasResponse,
    policy: {
      res: resource,
      act: actions.GET_LIST,
    },
    platforms: ["web"],
  })
  public async getAll(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryInvestmentEfficiencySerializer,
    }) queryOptions: QueryInvestmentEfficiencySerializer,
  ): Promise<any> {
    const { data, total } = await InvestmentEfficiencyAppUseCases.getAll(queryOptions, account, true, serviceLocator);
    const serialize = plainToClass(InvestmentEfficiencySerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_for_other",
    description: "Get all investment efficiency of property with paging for other note",
    validateSchemas: {
      query: queryInvestmentEfficiencySchema,
    },
    responseSchema: investmentEfficiencySchemasResponse,
    policy: {
      res: resource,
      act: actions.GET_FOR_OTHER_LIST,
    },
    platforms: ["web"],
  })
  public async getAllForOtherNote(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryInvestmentEfficiencySerializer,
    }) queryOptions: QueryInvestmentEfficiencySerializer,
  ): Promise<any> {
    const { data, total } = await InvestmentEfficiencyAppUseCases.getAll(queryOptions, account, false, serviceLocator);
    const serialize = plainToClass(InvestmentEfficiencySerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Put({
    route: "/{id}",
    description: "Update an investment efficiency of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: updatingInvestmentEfficiencySchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.UPDATE,
    },
    platforms: ["web"],
  })
  public async update(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeableInvestmentEfficiencySerializer,
    }) dataIn: ChangeableInvestmentEfficiencySerializer
  ): Promise<any> {
    const rv = await InvestmentEfficiencyAppUseCases.update(id, dataIn, account, serviceLocator);
    return plainToClass(
      InvestmentEfficiencySerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Put({
    route: "/{id}/_pending",
    description: "Change investment efficiency status to pending action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.SUBMIT,
    },
    platforms: ["web"],
  })
  public async pending(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: InvestmentEfficiencyStatus.Pending });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change investment efficiency status to approved action",
    validateSchemas: {
      params: idSchema,
      payload: approvedInvestmentEfficiencyRequestSchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.APPROVE,
    },
    platforms: ["web"],
  })
  public async approved(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ApprovedInvestmentEfficiencyRequest
    }) dto: ApprovedInvestmentEfficiencyRequest,
  ): Promise<any> {
    const note = await InvestmentEfficiencyAppUseCases.approve(id, dto, account, serviceLocator);

    return plainToClass(InvestmentEfficiencySerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change investment efficiency status to rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.REJECT,
    },
    platforms: ["web"],
  })
  public async rejected(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeStatusNoteSerializer
    }) dto: ChangeStatusNoteSerializer,
  ): Promise<any> {
    return await this.putStatus({ ...dto, id, status: InvestmentEfficiencyStatus.Rejected }, serviceLocator, account);
  }

  @Delete({
    route: "/{id}",
    description: "Delete investment efficiencies note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: investmentEfficiencyResponse,
    policy: {
      res: resource,
      act: actions.DELETE,
    },
    platforms: ["web"],
    secure: true,
  })
  public async delete(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    const note = await InvestmentEfficiencyAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(InvestmentEfficiencySerializer, note, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/_statistics",
    description: "Get investment efficiencies statistics by account",
    platforms: ["web"],
    responseSchema: noteStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await InvestmentEfficiencyAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore investment efficiencies note by ID",
    validateSchemas: {
      params: idSchema,
    },
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    responseSchema: investmentEfficiencyResponse,
    secure: true
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await InvestmentEfficiencyAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(InvestmentEfficiencySerializer, note, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the HQDT",
    validateSchemas: {
      params: idSchema,
      query: pagingQuerySchema,
    },
    responseSchema: activitiesSchemaResponse,
    platforms: ["web"],
  })
  public async getActivities(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: PagingSerializer,
    })
    queries: PagingSerializer
  ): Promise<any> {
    const { items, total } = await AccountActivityAppUseCases.getActivities(
      id,
      ActivityGroup.HD,
      queries,
      serviceLocator
    );

    const serialize = plainToClass(AccountActivitySerializer, items, {
      excludeExtraneousValues: true,
    });

    return {
      items: serialize,
      total,
    };
  }

  private putStatus = async (data: ChangeStatusNoteSerializer,
                             serviceLocator: Beans, account: Account): Promise<any> => {
    const note = await InvestmentEfficiencyAppUseCases.updateStatus(data, account, serviceLocator);

    return plainToClass(InvestmentEfficiencySerializer, note, { excludeExtraneousValues: true });
  };
}
