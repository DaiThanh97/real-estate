import Beans from "../../infrastructure/config/beans";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete, Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { getResponseSchema, idSchema, noteIdAndIdSchema, rejectNoteSchema } from "../schemas/base";
import { Param } from "../routing-controllers/decorator/Param";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { plainToClass } from "class-transformer";
import ProjectNegotiationAppUseCases from "../../application/ProjectNegotiationAppUseCases";
import { ProjectNegotiationStatus } from "../../infrastructure/orm/typeorm/models/ProjectNegotiation";
import {
  ChangeableProjectNegotiationPlanStepSerializer,
  ChangeableProjectNegotiationSerializer,
  ProjectNegotiationSerializer,
  QueryProjectNegotiationSerializer
} from "../serializers/ProjectNegotiationSerializer";
import {
  addingProjectNegotiationPlanStepSchema,
  addingProjectNegotiationSchema,
  projectNegotiationSchema,
  projectNegotiationSchemas,
  queryProjectNegotiationSchema,
  updatingProjectNegotiationActionSchema,
  updatingProjectNegotiationOpinionSchema,
  updatingProjectNegotiationPlanStepSchema,
  updatingProjectNegotiationSchema
} from "../schemas/projectNegotiation";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Account } from "../../domain/models/Account";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import { ChangeStatusNoteSerializer } from "../serializers/Base";
import {
  addingProjectNegotiationReferItemSchema,
  updatingProjectNegotiationReferItemSchema,
} from "../schemas/projectNegotiationReferItem";
import { ChangeableProjectNegotiationReferItemSerializer } from "../serializers/ProjectNegotiationReferItemSerializer";
import { Body } from "../routing-controllers/decorator/Body";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { noteStatisticSchemaResponse } from "../schemas/note";
import { activitiesSchemaResponse } from "../schemas/note";
import { pagingQuerySchema } from "../schemas/query";
import { PagingSerializer } from "../serializers/PagingSerializer";
import { ActivityGroup } from "../../infrastructure/orm/typeorm/models/ActivityTemplate";
import { AccountActivitySerializer } from "../serializers/AccountActivitySerializer";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";

const projectNegotiationResponse = getResponseSchema(projectNegotiationSchema, "ProjectNegotiationSchema");
const projectNegotiationSchemasResponse = getResponseSchema(
  projectNegotiationSchemas, "ProjectNegotiationSchemas"
);
const actions = ACTIONS.TLDA;
const resource = "project_negotiation";

@Controller("project_negotiations", ["project_negotiation"])
export default class InvestmentEfficiencyController {
  @Get({
    route: "/{id}",
    description: "Get project negotiation note of property by Id",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: projectNegotiationResponse,
    secure: true,
    policy: {
      res: resource,
      act: actions.GET,
    },
    platforms: ["web"],
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await ProjectNegotiationAppUseCases.get(id, serviceLocator);
    return plainToClass(
      ProjectNegotiationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Post({
    description: "Create project negotiation of property",
    validateSchemas: {
      payload: addingProjectNegotiationSchema,
    },
    responseSchema: projectNegotiationResponse,
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
      type: ChangeableProjectNegotiationSerializer
    }) projectNegotiationIn: ChangeableProjectNegotiationSerializer,
  ): Promise<any> {
    const rv = await ProjectNegotiationAppUseCases.create(projectNegotiationIn, account, serviceLocator);
    return plainToClass(
      ProjectNegotiationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Put({
    route: "/{id}",
    description: "Update an project negotiation of property by Id",
    validateSchemas: {
      params: idSchema,
      payload: updatingProjectNegotiationSchema,
    },
    responseSchema: projectNegotiationResponse,
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
      type: ChangeableProjectNegotiationSerializer,
    }) dataIn: ChangeableProjectNegotiationSerializer
  ): Promise<any> {
    const rv = await ProjectNegotiationAppUseCases.update(id, dataIn, account, serviceLocator);
    return plainToClass(
      ProjectNegotiationSerializer,
      rv, {
        excludeExtraneousValues: true,
      });
  }

  @Get({
    description: "Get all project negotiation of property with paging",
    validateSchemas: {
      query: queryProjectNegotiationSchema,
    },
    responseSchema: projectNegotiationSchemasResponse,
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
      type: QueryProjectNegotiationSerializer,
    }) queryOptions: QueryProjectNegotiationSerializer,
  ): Promise<any> {
    const { data, total } = await ProjectNegotiationAppUseCases.getAll(queryOptions, account, serviceLocator);
    const serialize = plainToClass(ProjectNegotiationSerializer, data, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    };
  }

  @Put({
    route: "/{id}/_pending",
    description: "Change project negotiation status to pending",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: projectNegotiationResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: ProjectNegotiationStatus.Pending });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_approved",
    description: "Change project negotiation approved action",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: projectNegotiationResponse,
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
    const dto = plainToClass(ChangeStatusNoteSerializer, { id, status: ProjectNegotiationStatus.Approved });
    return await this.putStatus(dto, serviceLocator, account);
  }

  @Put({
    route: "/{id}/_rejected",
    description: "Change project negotiation rejected action",
    validateSchemas: {
      params: idSchema,
      payload: rejectNoteSchema,
    },
    responseSchema: projectNegotiationResponse,
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
    return await this.putStatus({ ...dto, id, status: ProjectNegotiationStatus.Rejected }, serviceLocator, account);
  }

  @Post({
    route: "/{id}/_refer_item",
    description: "Create refer item of project negotiation",
    validateSchemas: {
      params: idSchema,
      payload: addingProjectNegotiationReferItemSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_REF_INFO,
    },
    platforms: ["web"],
  })
  public async createReferItem(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: ChangeableProjectNegotiationReferItemSerializer
    }) dto: ChangeableProjectNegotiationReferItemSerializer,
  ): Promise<any> {
    const rv = await ProjectNegotiationAppUseCases.createReferItem(id, dto, account, serviceLocator);
    return plainToClass( ProjectNegotiationSerializer, rv, { excludeExtraneousValues: true, });
  }

  @Put({
    route: "/{id}/_refer_item/{itemId}",
    description: "Update refer item of project negotiation by ID",
    validateSchemas: {
      params: noteIdAndIdSchema,
      payload: updatingProjectNegotiationReferItemSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_REF_INFO,
    },
    platforms: ["web"],
  })
  public async updateReferItem(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") noteId: number,
    @Param("itemId") id: number,
    @Payload({
      type: ChangeableProjectNegotiationReferItemSerializer
    }) dto: ChangeableProjectNegotiationReferItemSerializer,
  ): Promise<any> {
    const rv = await ProjectNegotiationAppUseCases.updateReferItem(noteId, id, dto, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, rv, { excludeExtraneousValues: true, });
  }

  @Delete({
    route: "/{id}/_refer_item/{itemId}",
    description: "Delete refer item of project negotiation by ID",
    validateSchemas: {
      params: noteIdAndIdSchema
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_REF_INFO,
    },
    platforms: ["web"],
  })
  public async deleteReferItem(
    @ServiceLocator() serviceLocator: Beans,
    @Param("id") noteId: number,
    @Param("itemId") id: number,
  ): Promise<any> {
    const rv = await ProjectNegotiationAppUseCases.deleteReferItem(noteId, id, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, rv, { excludeExtraneousValues: true, });
  }

  @Post({ 
    route: "/{id}/_plan_step",
    description: "Add plan step for project negotiation",
    validateSchemas: {
      params: idSchema,
      payload: addingProjectNegotiationPlanStepSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_PLAN_STEP,
    },
    platforms: ["web"],
  })
  public async createPlanStep(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeableProjectNegotiationPlanStepSerializer
    })
      dto: ChangeableProjectNegotiationPlanStepSerializer,
  ): Promise<any> {
    const note = await ProjectNegotiationAppUseCases.createPlanStep(id, dto, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_plan_step/{itemId}",
    description: "Update plan step for project negotiation",
    validateSchemas: {
      params: noteIdAndIdSchema,
      payload: updatingProjectNegotiationPlanStepSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_PLAN_STEP,
    },
    platforms: ["web"],
  })
  public async updatePlanStep(
    @Param("id") noteId: number,
    @Param("itemId") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: ChangeableProjectNegotiationPlanStepSerializer
    })
      dto: ChangeableProjectNegotiationPlanStepSerializer,
  ): Promise<any> {
    const note = await ProjectNegotiationAppUseCases.updatePlanStep(noteId, id, dto, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  }

  @Delete({
    route: "/{id}/_plan_step/{itemId}",
    description: "Delete plan step for project negotiation",
    validateSchemas: {
      params: noteIdAndIdSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_PLAN_STEP,
    },
    platforms: ["web"],
  })
  public async deletePlanStep(
    @Param("id") noteId: number,
    @Param("itemId") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await ProjectNegotiationAppUseCases.deletePlanStep(noteId, id, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_plan_step/{itemId}/_action",
    description: "Update action for project negotiation plan step",
    validateSchemas: {
      params: noteIdAndIdSchema,
      payload: updatingProjectNegotiationActionSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_ACTION,
    },
    platforms: ["web"],
  })
  public async updatePlanStepAction(
    @Param("id") noteId: number,
    @Param("itemId") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Body("action") action: string,
  ): Promise<any> {
    const note = await ProjectNegotiationAppUseCases.updatePlanStepAction(noteId, id, action, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}/_plan_step/{itemId}/_opinion",
    description: "Update opinion for project negotiation plan step",
    validateSchemas: {
      params: noteIdAndIdSchema,
      payload: updatingProjectNegotiationOpinionSchema,
    },
    responseSchema: projectNegotiationResponse,
    policy: {
      res: resource,
      act: actions.UPDATE_OPINION,
    },
    platforms: ["web"],
  })
  public async updatePlanStepOpinion(
    @Param("id") noteId: number,
    @Param("itemId") id: number,
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Body("opinion") opinion: string,
  ): Promise<any> {
    const note = await ProjectNegotiationAppUseCases.updatePlanStepOpinion(noteId, id, opinion, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  }

  @Delete({
    route: "/{id}",
    description: "Delete project negotiation note",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: projectNegotiationResponse,
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
    const note = await ProjectNegotiationAppUseCases.delete(id, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/_statistics",
    description: "Get project negotiation statistics by account",
    platforms: ["web"],
    responseSchema: noteStatisticSchemaResponse,
  })
  public async getStatistics(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
  ): Promise<any> {
    return await ProjectNegotiationAppUseCases.getFullNoteStatistic(account, serviceLocator);
  }
  
  @Put({
    route: "/{id}/_restore",
    description: "Restore project negotiation note by ID",
    validateSchemas: {
      params: idSchema,
    },
    policy: {
      res: resource,
      act: actions.RESTORE,
    },
    responseSchema: projectNegotiationResponse,
    secure: true
  })
  public async restore(
    @Param("id") id: number,
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const note = await ProjectNegotiationAppUseCases.restore(id, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, {
      excludeExtraneousValues: true,
    });
  }

  @Get({
    route: "/{id}/_activities",
    description: "Get activities of the TLDA",
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
      ActivityGroup.TL,
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
    const note = await ProjectNegotiationAppUseCases.updateStatus(data, account, serviceLocator);
    return plainToClass(ProjectNegotiationSerializer, note, { excludeExtraneousValues: true });
  };

}
