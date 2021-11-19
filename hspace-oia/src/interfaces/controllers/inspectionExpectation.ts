import Beans from "../../infrastructure/config/beans";
import { Account } from "../../domain/models/Account";
import { plainToClass } from "class-transformer";
import {
  ChangeableInspectionExpectationSerializer,
  InspectionExpectationSerializer,
  QueryInspectionExpectationSerializer,
} from "../serializers/InspectionExpectationSerializer";
import InspectionExpectationAppUseCases from "../../application/InspectionExpectationAppUseCases";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import { InspectionExpectationStatus } from "../../domain/models/InspectionExpectation";
import {
  addingInspectionExpectationSchema,
  inspectionExpectationSchema,
  inspectionExpectationSchemas,
  queryInspectionExpectationSchema,
  updatingInspectionExpectationSchema,
} from "../schemas/inspectionExpectation";
import { getResponseSchema, idSchema, rejectNoteSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { activitiesSchemaResponse, noteStatisticSchemaResponse } from "../schemas/note";
import { pagingQuerySchema } from "../schemas/query";
import { PagingSerializer } from "../serializers/PagingSerializer";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";

const actions = ACTIONS.KSUT;
const resource = "inspection_expectation";
const inspectionExpectationResponse = getResponseSchema(
  inspectionExpectationSchema,
  "InspectionExpectationResponse"
);
const inspectionExpectationsResponse = getResponseSchema(
  inspectionExpectationSchemas,
  "InspectionExpectationsResponse"
);

@Controller("inspection_expectations", ["inspection_expectation"])
export default class InspectionExpectationController {
  @Get({
    route: "/{id}",
    description: "Get inspection expectation of property by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionExpectationResponse,
    policy: {
      res: "inspection",
      act: actions.GET,
    },
    platforms: ["web"],
    secure: true,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans
  ): Promise<any> {
    const rv = await InspectionExpectationAppUseCases.get(id, serviceLocator);
    return plainToClass(InspectionExpectationSerializer, rv, {
      excludeExtraneousValues: true,
    });
  }

  @Post({
    description: "Create inspection expectation of property",
    validateSchemas: {
      payload: addingInspectionExpectationSchema,
    },
    responseSchema: inspectionExpectationResponse,
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
      type: ChangeableInspectionExpectationSerializer,
    })
      inspectionStatementIn: ChangeableInspectionExpectationSerializer
  ): Promise<any> {
    const rv = await InspectionExpectationAppUseCases.create(
      inspectionStatementIn,
      account,
      serviceLocator
    );
    return plainToClass(InspectionExpectationSerializer, rv, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    description: "Get all inspection expectation of property with paging",
    validateSchemas: {
      query: queryInspectionExpectationSchema,
    },
    responseSchema: inspectionExpectationsResponse,
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
      type: QueryInspectionExpectationSerializer,
    })
      queryOptions: QueryInspectionExpectationSerializer
  ): Promise<any> {
    const { data, total } = await InspectionExpectationAppUseCases.getAll(
      queryOptions,
      account,
      true,
      serviceLocator
    );
    const serialize = plainToClass(InspectionExpectationSerializer, data, {
      excludeExtraneousValues: true,
    });

    return {
      items: serialize,
      total,
    };
  }

  @Get({
    route: "/_for_other",
    description: "Get all inspection expectation of property with paging for other note",
    validateSchemas: {
      query: queryInspectionExpectationSchema,
    },
    responseSchema: inspectionExpectationsResponse,
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
      type: QueryInspectionExpectationSerializer,
    })
      queryOptions: QueryInspectionExpectationSerializer
  ): Promise<any> {
    const { data, total } = await InspectionExpectationAppUseCases.getAll(
      queryOptions,
      account,
      false,
      serviceLocator
    );
    const serialize = plainToClass(InspectionExpectationSerializer, data, {
      excludeExtraneousValues: true,
    });

    return {
      items: serialize,
      total,
    };
  }

  @Put({
    route: "/{id}",
    description: "Update inspection expectation of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: updatingInspectionExpectationSchema,
    },
    responseSchema: inspectionExpectationResponse,
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
      type: ChangeableInspectionExpectationSerializer,
    })
      appraisalExpectationIn: ChangeableInspectionExpectationSerializer
  ): Promise<any> {
    const rv = await InspectionExpectationAppUseCases.update(
      id,
      appraisalExpectationIn,
      account,
      serviceLocator
    );

    return plainToClass(InspectionExpectationSerializer, rv, {
      excludeExtraneousValues: true,
    });
  }

  @Put({
    route: "/{id}/_pending",
    description: "Change inspection expectation status to pending",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionExpectationResponse,
    policy: {
      res: resource,
      act: actions.SUBMIT,
    },
    platforms: ["web"],
  })
  public async pending(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account
  ): Promise<any> {
    const dto = plainToClass(ChangeStatusNoteSerializer, {
      id,
      status: InspectionExpectationStatus.Pending,
    });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change inspection expectation approved action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionExpectationResponse,
    policy: {
      res: resource,
      act: actions.APPROVE,
    },
    platforms: ["web"],
  })
  public async approved(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account
  ): Promise<any> {
    const dto = plainToClass(ChangeStatusNoteSerializer, {
      id,
      status: InspectionExpectationStatus.Approved,
    });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change inspection expectation rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: inspectionExpectationResponse,
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
      type: ChangeStatusNoteSerializer,
    })
      dto: ChangeStatusNoteSerializer
  ): Promise<any> {
    return await this.putStatus(
      { ...dto, id, status: InspectionExpectationStatus.Rejected },
      serviceLocator,
      account
    );
  }

  @Delete({
    route: "/{id}",
    description: "Delete inspection expectation note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: inspectionExpectationResponse,
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
    const note = await InspectionExpectationAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(InspectionExpectationSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_restore",
    description: "Restore inspection expectation note by ID",
    validateSchemas: {
      params: idSchema,
    },
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    responseSchema: inspectionExpectationResponse,
    secure: true
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await InspectionExpectationAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(InspectionExpectationSerializer, note, {
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
    return await InspectionExpectationAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the KSUT",
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
      ActivityGroup.KU,
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

  private putStatus = async (
    data: ChangeStatusNoteSerializer,
    serviceLocator: Beans,
    account: Account
  ): Promise<any> => {
    const note = await InspectionExpectationAppUseCases.updateStatus(
      data,
      account,
      serviceLocator
    );
    return plainToClass(InspectionExpectationSerializer, note, {
      excludeExtraneousValues: true,
    });
  };
}
