import Beans from "../../infrastructure/config/beans";
import { Account } from "../../domain/models/Account";
import { plainToClass } from "class-transformer";
import {
  AppraisalExpectationSerializer,
  ChangeableAppraisalExpectationSerializer,
  QueryAppraisalExpectationSerializer
} from "../serializers/AppraisalExpectationSerializer";
import AppraisalExpectationAppUseCases from "../../application/AppraisalExpectationAppUseCases";
import { AppraisalExpectationStatus } from "../../infrastructure/orm/typeorm/models/AppraisalExpectation";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { getResponseSchema, idSchema, rejectNoteSchema } from "../schemas/base";
import {
  addingAppraisalExpectationSchema,
  appraisalExpectationSchema,
  appraisalExpectationSchemas,
  queryAppraisalExpectationSchema,
} from "../schemas/appraisalExpectation";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { noteStatisticSchemaResponse, activitiesSchemaResponse } from "../schemas/note";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";
import { pagingQuerySchema } from "../schemas/query";
import { PagingSerializer } from "../serializers/PagingSerializer";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";

const appraisalExpectationResponse = getResponseSchema(appraisalExpectationSchema, "AppraisalExpectationResponse");
const appraisalExpectationsResponse = getResponseSchema(appraisalExpectationSchemas, "AppraisalExpectationsResponse");
const actions = ACTIONS.TDUT;
const resource = "appraisal_expectation";

@Controller("appraisal_expectations", ["appraisal_expectation"])
export default class InspectionStatementController {
  @Get({
    route: "/{id}",
    description: "Get appraisal expectation of property by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
    const rv = await AppraisalExpectationAppUseCases.get(id, serviceLocator);
    return plainToClass(
      AppraisalExpectationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Post({
    description: "Create appraisal expectation of property",
    validateSchemas: {
      payload: addingAppraisalExpectationSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
      type: ChangeableAppraisalExpectationSerializer
    }) inspectionStatementIn: ChangeableAppraisalExpectationSerializer,
  ): Promise<any> {
    const rv = await AppraisalExpectationAppUseCases.create(inspectionStatementIn, account, serviceLocator);
    return plainToClass(
      AppraisalExpectationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    description: "Get all appraisal expectation of property with paging",
    validateSchemas: {
      query: queryAppraisalExpectationSchema,
    },
    responseSchema: appraisalExpectationsResponse,
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
      type: QueryAppraisalExpectationSerializer,
    }) queryOptions: QueryAppraisalExpectationSerializer,
  ): Promise<any> {
    const { data, total } = await AppraisalExpectationAppUseCases.getAll(queryOptions, account, true, serviceLocator);
    const serialize = plainToClass(AppraisalExpectationSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Get({
    route: "/_for_other",
    description: "Get all appraisal expectation of property with paging for other note",
    validateSchemas: {
      query: queryAppraisalExpectationSchema,
    },
    responseSchema: appraisalExpectationsResponse,
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
      type: QueryAppraisalExpectationSerializer,
    }) queryOptions: QueryAppraisalExpectationSerializer,
  ): Promise<any> {
    const { data, total } = await AppraisalExpectationAppUseCases.getAll(queryOptions, account, false, serviceLocator);
    const serialize = plainToClass(AppraisalExpectationSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Put({
    route: "/{id}",
    description: "Update an appraisal expectation of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: addingAppraisalExpectationSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
      type: ChangeableAppraisalExpectationSerializer
    }) appraisalExpectationIn: ChangeableAppraisalExpectationSerializer,
  ): Promise<any> {
    const rv = await AppraisalExpectationAppUseCases.update(id, appraisalExpectationIn, account, serviceLocator);

    return plainToClass(
      AppraisalExpectationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Put({
    route: "/{id}/_finished",
    description: "Change appraisal expectation finished action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: AppraisalExpectationStatus.Finished });
    return await this.putStatus(dto, serviceLocator, account);
  }


  @Put({
    route: "/{id}/_pending",
    description: "Change appraisal expectation pending action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: AppraisalExpectationStatus.Pending });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change appraisal expectation approved action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: AppraisalExpectationStatus.Approved });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change appraisal expectation rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
    return await this.putStatus({ ...dto, id, status: AppraisalExpectationStatus.Rejected }, serviceLocator, account);
  }

  @Delete({
    route: "/{id}",
    description: "Delete appraisal expectation note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: appraisalExpectationResponse,
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
    const note = await AppraisalExpectationAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(AppraisalExpectationSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore appraisal expectation note by ID",
    validateSchemas: {
      params: idSchema,
    },
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    responseSchema: appraisalExpectationResponse,
    secure: true
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await AppraisalExpectationAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(AppraisalExpectationSerializer, note, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/_statistics",
    description: "Get inspection expectation statistics by account",
    platforms: ["web"],
    responseSchema: noteStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await AppraisalExpectationAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the TDUT",
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
      ActivityGroup.TU,
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


  private putStatus = async (data: ChangeStatusNoteSerializer, serviceLocator: Beans, account: Account): Promise<any> => {
    const note = await AppraisalExpectationAppUseCases.updateStatus(data, account, serviceLocator);
    return plainToClass(AppraisalExpectationSerializer, note, { excludeExtraneousValues: true });
  };
}
