import Beans from "../../infrastructure/config/beans";
import { Account } from "../../domain/models/Account";
import { plainToClass } from "class-transformer";
import {
  ChangeableInspectionStatementSerializer,
  InspectionStatementSerializer,
  QueryInspectionStatementSerializer
} from "../serializers/InspectionStatementSerializer";
import InspectionStatementAppUseCases from "../../application/InspectionStatementAppUseCases";
import { AppraisalStatementStatus } from "../../domain/models/AppraisalStatement";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import { InspectionStatementStatus } from "../../infrastructure/orm/typeorm/models/InspectionStatement";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { getResponseSchema, idSchema, rejectNoteSchema } from "../schemas/base";
import {
  addingInspectionStatementSchema,
  inspectionStatementSchema,
  inspectionStatementSchemas,
  queryInspectionStatementSchema,
  updatingInspectionStatementSchema
} from "../schemas/inspectionStatement";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";
import { pagingQuerySchema } from "../schemas/query";
import { PagingSerializer } from "../serializers/PagingSerializer";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";
import { noteStatisticSchemaResponse, activitiesSchemaResponse } from "../schemas/note";

const inspectionStatementResponse = getResponseSchema(inspectionStatementSchema, "InspectionStatementResponse");
const inspectionStatementsResponse = getResponseSchema(inspectionStatementSchemas, "InspectionStatementsResponse");

const actions = ACTIONS.KSHT;
const resource = "inspection_statement";

@Controller("inspection_statements", ["inspection_statement"])
export default class InspectionStatementController {
  @Get({
    route: "/{id}",
    description: "Get inspection statement of property by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionStatementResponse,
    policy: {
      res: "inspection",
      act: actions.GET,
    },
    platforms: ["web"],
    secure: true,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await InspectionStatementAppUseCases.get(id, serviceLocator);
    return plainToClass(
      InspectionStatementSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Post({
    description: "Create inspection statement of property",
    validateSchemas: {
      payload: addingInspectionStatementSchema,
    },
    responseSchema: inspectionStatementResponse,
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
      type: ChangeableInspectionStatementSerializer
    }) inspectionStatementIn: ChangeableInspectionStatementSerializer,
  ): Promise<any> {
    const rv = await InspectionStatementAppUseCases.create(inspectionStatementIn, account, serviceLocator);
    return plainToClass(
      InspectionStatementSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    description: "Get all inspection statement of property with paging and account permission",
    validateSchemas: {
      query: queryInspectionStatementSchema,
    },
    responseSchema: inspectionStatementsResponse,
    policy: {
      res: "inspection",
      act: actions.GET_LIST,
    },
    platforms: ["web"],
  })
  public async getAll(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryInspectionStatementSerializer,
    }) queryOptions: QueryInspectionStatementSerializer,
  ): Promise<any> {
    const { data, total } = await InspectionStatementAppUseCases.getAll(queryOptions, account, true, serviceLocator);
    const serialize = plainToClass(InspectionStatementSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_for_other",
    description: "Get all inspection statement of property with paging for other note",
    validateSchemas: {
      query: queryInspectionStatementSchema,
    },
    responseSchema: inspectionStatementsResponse,
    policy: {
      res: "inspection",
      act: actions.GET_FOR_OTHER_LIST,
    },
    platforms: ["web"],
  })
  public async getAllForOtherNote(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryInspectionStatementSerializer,
    }) queryOptions: QueryInspectionStatementSerializer,
  ): Promise<any> {
    const { data, total } = await InspectionStatementAppUseCases.getAll(queryOptions, account, false, serviceLocator);
    const serialize = plainToClass(InspectionStatementSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Put({
    route: "/{id}",
    description: "Update an inspection statement of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: updatingInspectionStatementSchema,
    },
    responseSchema: inspectionStatementResponse,
    policy: {
      res: resource,
      act: actions.UPDATE,
    },
    platforms: ["web"],
  })
  public async update(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: ChangeableInspectionStatementSerializer
    }) inspectionStatementIn: ChangeableInspectionStatementSerializer,
  ): Promise<any> {
    const rv = await InspectionStatementAppUseCases.update(id, inspectionStatementIn, account, serviceLocator);

    return plainToClass(
      InspectionStatementSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Put({
    route: "/{id}/_pending",
    description: "Change inspection statement status to pending",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionStatementResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: InspectionStatementStatus.Pending });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change inspection statement approved action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionStatementResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: InspectionStatementStatus.Approved });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change inspection statement rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: inspectionStatementResponse,
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
    return await this.putStatus({ ...dto, id, status: AppraisalStatementStatus.Rejected }, serviceLocator, account);
  }

  @Delete({
    route: "/{id}",
    description: "Delete inspection statement note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionStatementResponse,
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
    const note = await InspectionStatementAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(InspectionStatementSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore inspection statement note by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionStatementResponse,
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    platforms: ["web"],
    secure: true,
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const property = await InspectionStatementAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(InspectionStatementSerializer, property, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the KSHT",
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
      ActivityGroup.KH,
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
    description: "Get inspection statement statistics by account",
    platforms: ["web"],
    responseSchema: noteStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await InspectionStatementAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }

  private putStatus = async (data: ChangeStatusNoteSerializer, serviceLocator: Beans, account: Account): Promise<any> => {
    const note = await InspectionStatementAppUseCases.updateStatus(data, account, serviceLocator);
    return plainToClass(InspectionStatementSerializer, note, { excludeExtraneousValues: true });
  };
}
