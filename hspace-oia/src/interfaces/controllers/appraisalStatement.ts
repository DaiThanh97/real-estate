import Beans from "../../infrastructure/config/beans";
import { Account } from "../../domain/models/Account";
import { AppraisalStatementStatus } from "../../domain/models/AppraisalStatement";
import AppraisalStatementAppUseCases from "../../application/AppraisalStatementAppUseCases";
import { plainToClass } from "class-transformer";
import {
  AppraisalStatementDetailSerializer,
  AppraisalStatementSerializer,
  ChangeableAppraisalStatementSerializer,
  QueryAppraisalStatementSerializer,
} from "../serializers/AppraisalStatementSerializer";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import {
  appraisalStatementListSchema,
  appraisalStatementSchema,
  changeableAppraisalStatementSchema,
  queryAppraisalStatementSchema
} from "../schemas/appraisalStatement";
import { getResponseSchema, idSchema, rejectNoteSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
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

const appraisalStatementResponse = getResponseSchema(appraisalStatementSchema, "AppraisalStatementResponse");
const appraisalStatementsResponse = getResponseSchema(appraisalStatementListSchema, "AppraisalStatementsResponse");
const actions = ACTIONS.TDHT;
const resource = "appraisal_statement";

@Controller("appraisal_statements", ["appraisal_statement"])
export default class AppraisalStatementController {

  @Post({
    description: "Create appraisal statement of property",
    validateSchemas: {
      payload: changeableAppraisalStatementSchema,
    },
    responseSchema: appraisalStatementResponse,
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
      type: ChangeableAppraisalStatementSerializer
    }) appraisalStatementIn: ChangeableAppraisalStatementSerializer,
  ): Promise<any> {
    const rv = await AppraisalStatementAppUseCases.create(appraisalStatementIn, account, serviceLocator);
    return plainToClass(
      AppraisalStatementSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Put({
    route: "/{id}",
    description: "Update an appraisal statement of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: changeableAppraisalStatementSchema,
    },
    responseSchema: appraisalStatementResponse,
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
      type: ChangeableAppraisalStatementSerializer
    }) appraisalStatementIn: ChangeableAppraisalStatementSerializer,
  ): Promise<any> {
    const rv = await AppraisalStatementAppUseCases.update(id, appraisalStatementIn, account, serviceLocator);

    return plainToClass(
      AppraisalStatementSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    route: "/{id}",
    description: "Get appraisal statement of property by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalStatementResponse,
    policy: {
      res: "appraisal",
      act: actions.GET,
    },
    platforms: ["web"],
    secure: true,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await AppraisalStatementAppUseCases.get(id, serviceLocator);
    const ratio = await AppraisalStatementAppUseCases.getRatio(id, serviceLocator);
    return plainToClass(
      AppraisalStatementDetailSerializer,
      {
        ...rv,
        ratio,
      }, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    description: "Get all appraisal statement of property with paging",
    validateSchemas: {
      query: queryAppraisalStatementSchema,
    },
    responseSchema: appraisalStatementsResponse,
    policy: {
      res: "appraisal",
      act: actions.GET_LIST,
    },
    platforms: ["web"],
  })
  public async getAll(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryAppraisalStatementSerializer,
    }) queryOptions: QueryAppraisalStatementSerializer,
  ): Promise<any> {
    const { data, total } = await AppraisalStatementAppUseCases.getAll(queryOptions, account, true, serviceLocator);
    const serialize = plainToClass(AppraisalStatementSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_for_other",
    description: "Get all appraisal statement of property with paging for other note",
    validateSchemas: {
      query: queryAppraisalStatementSchema,
    },
    responseSchema: appraisalStatementsResponse,
    policy: {
      res: "appraisal",
      act: actions.GET_FOR_OTHER_LIST,
    },
    platforms: ["web"],
  })
  public async getAllForOtherNote(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Queries({
      type: QueryAppraisalStatementSerializer,
    }) queryOptions: QueryAppraisalStatementSerializer,
  ): Promise<any> {
    const { data, total } = await AppraisalStatementAppUseCases.getAll(queryOptions, account, false, serviceLocator);
    const serialize = plainToClass(AppraisalStatementSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Put({
    route: "/{id}/_finished",
    description: "Change appraisal statement status to finished",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalStatementResponse,
    policy: {
      res: resource,
      act: actions.FINISH,
    },
    platforms: ["web"],
  })
  public async finished(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: AppraisalStatementStatus.Finished });
    return await this.putStatus(dto, serviceLocator, account);
  }


  @Put({
    route: "/{id}/_pending",
    description: "Change appraisal statement status to pending",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalStatementResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: AppraisalStatementStatus.Pending });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change appraisal statement approved action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalStatementResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: AppraisalStatementStatus.Approved });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change appraisal statement rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: appraisalStatementResponse,
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
    description: "Delete appraisal statement note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalStatementResponse,
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
    const note = await AppraisalStatementAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(AppraisalStatementSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore appraisal statement note by ID",
    validateSchemas: {
      params: idSchema,
    },
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    responseSchema: appraisalStatementResponse,
    secure: true
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await AppraisalStatementAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(AppraisalStatementSerializer, note, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the TDHT",
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
      ActivityGroup.TH,
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
    description: "Get appraisal statement statistics by account",
    platforms: ["web"],
    responseSchema: noteStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await AppraisalStatementAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }

  private putStatus = async (data: ChangeStatusNoteSerializer, serviceLocator: Beans, account: Account): Promise<any> => {
    const note = await AppraisalStatementAppUseCases.updateStatus(data, account, serviceLocator);
    return plainToClass(AppraisalStatementSerializer, note, { excludeExtraneousValues: true });
  };

}
