import { Account } from "../../domain/models/Account";
import { plainToClass } from "class-transformer";
import {
  ChangeableInvestmentPlanSerializer,
  InvestmentPlanSerializer,
  QueryInvestmentPlanSerializer
} from "../serializers/InvestmentPlanSerializer";
import InvestmentPlanAppUseCases from "../../application/InvestmentPlanAppUseCases";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import Beans from "../../infrastructure/config/beans";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { getResponseSchema, idSchema, rejectNoteSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Param } from "../routing-controllers/decorator/Param";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import {
  addingInvestmentPlanSchema,
  investmentPlanSchema,
  investmentPlanSchemas,
  queryInvestmentPlanSchema,
  updatingInvestmentPlanSchema
} from "../schemas/investmentPlan";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { InvestmentPlanStatus } from "../../infrastructure/orm/typeorm/models/InvestmentPlan";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";
import { pagingQuerySchema } from "../schemas/query";
import { PagingSerializer } from "../serializers/PagingSerializer";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";
import { noteStatisticSchemaResponse, activitiesSchemaResponse } from "../schemas/note";

const investmentPlanResponse = getResponseSchema(investmentPlanSchema, "InspectionStatementResponse");
const investmentPlansResponse = getResponseSchema(investmentPlanSchemas, "InspectionStatementsResponse");

const actions = ACTIONS.PADT;
const resource = "investment_plan";

@Controller("investment_plans", ["investment_plan"])
export default class InvestmentPlanController {
  doPostCreate(data: any, account: Account, serviceLocator: Beans): Promise<any> {
    return InvestmentPlanAppUseCases.create(data, account, serviceLocator);
  }

  doPutUpdate(id: number, data: any, account: Account, serviceLocator: Beans): Promise<any> {
    return InvestmentPlanAppUseCases.update(id, data, account, serviceLocator);
  }

  doGetById(id: number, serviceLocator: Beans): Promise<any> {
    return InvestmentPlanAppUseCases.get(id, serviceLocator);
  }

  doGetAllQuery(queryOptions: any, account: Account, withPermission: boolean, serviceLocator: Beans): Promise<any> {
    return InvestmentPlanAppUseCases.getAll(queryOptions, account, withPermission, serviceLocator);
  }

  doPutUpdateStatus(data: ChangeStatusNoteSerializer, account: Account, serviceLocator: Beans): Promise<any> {
    return InvestmentPlanAppUseCases.updateStatus(data, account, serviceLocator);
  }

  @Post({
    description: "Create investment plan of property",
    validateSchemas: {
      payload: addingInvestmentPlanSchema,
    },
    responseSchema: investmentPlanResponse,
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
      type: ChangeableInvestmentPlanSerializer
    }) note: ChangeableInvestmentPlanSerializer,
  ): Promise<any> {
    const rv = await this.doPostCreate(note, account, serviceLocator);
    return plainToClass(
      InvestmentPlanSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Put({
    route: "/{id}",
    description: "Update an investment plan of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: updatingInvestmentPlanSchema,
    },
    responseSchema: investmentPlanResponse,
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
      type: ChangeableInvestmentPlanSerializer,
    }) dataIn: ChangeableInvestmentPlanSerializer
  ): Promise<any> {
    const rv = await this.doPutUpdate(id, dataIn, account, serviceLocator);
    return plainToClass(
      InvestmentPlanSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    route: "/{id}",
    description: "Get investment plan of property by Id",
    validateSchemas: {
      params: idSchema,
    },
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
    const rv = await this.doGetById(id, serviceLocator);
    return plainToClass(
      InvestmentPlanSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    description: "Get investment plan of property with paging",
    validateSchemas: {
      query: queryInvestmentPlanSchema,
    },
    responseSchema: investmentPlansResponse,
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
      type: QueryInvestmentPlanSerializer
    }) queryOptions: QueryInvestmentPlanSerializer,
  ): Promise<any> {
    const { data, total } = await this.doGetAllQuery(queryOptions, account, true, serviceLocator);
    const serialize = plainToClass(InvestmentPlanSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_for_other",
    description: "Get investment plan of property with paging for other note",
    validateSchemas: {
      query: queryInvestmentPlanSchema,
    },
    responseSchema: investmentPlansResponse,
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
      type: QueryInvestmentPlanSerializer
    }) queryOptions: QueryInvestmentPlanSerializer,
  ): Promise<any> {
    const { data, total } = await this.doGetAllQuery(queryOptions, account, false, serviceLocator);
    const serialize = plainToClass(InvestmentPlanSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Put({
    route: "/{id}/_pending",
    description: "Change investment plan status to pending action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: investmentPlanResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: InvestmentPlanStatus.Pending });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change investment plan status to approved action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: investmentPlanResponse,
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
  ): Promise<any> {
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: InvestmentPlanStatus.Approved });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change investment plan status to rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: investmentPlanResponse,
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
    return await this.putStatus({ ...dto, id, status: InvestmentPlanStatus.Rejected }, serviceLocator, account);
  }

  @Delete({
    route: "/{id}",
    description: "Delete investment plan note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: investmentPlanResponse,
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
    const note = await InvestmentPlanAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(InvestmentPlanSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore invesment plan note by ID",
    validateSchemas: {
      params: idSchema,
    },
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    responseSchema: investmentPlanResponse,
    secure: true
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await InvestmentPlanAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(InvestmentPlanSerializer, note, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the PADT",
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
      ActivityGroup.PD,
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

  @Get({
    route: "/_statistics",
    description: "Get investment plan statistics by account",
    platforms: ["web"],
    responseSchema: noteStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await InvestmentPlanAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }

  private putStatus = async (data: ChangeStatusNoteSerializer,
                             serviceLocator: Beans, account: Account): Promise<any> => {
    const note = await this.doPutUpdateStatus(data, account, serviceLocator);

    return plainToClass(InvestmentPlanSerializer, note, { excludeExtraneousValues: true });
  };
}
