import NoteAppUseCases from "./NoteAppUseCases";
import {
  ChangeableProjectNegotiationPlanStepSerializer,
  ChangeableProjectNegotiationSerializer,
  QueryProjectNegotiationSerializer
} from "../interfaces/serializers/ProjectNegotiationSerializer";
import { Account } from "../domain/models/Account";
import {
  IAccountEventRepository,
  IAccountRepository,
  IInvestmentEfficiencyRepository,
  IProjectNegotiationActionDetailRepository,
  IProjectNegotiationLastMonthStatisticsViewRepository,
  IProjectNegotiationManager,
  IProjectNegotiationOpinionDetailRepository,
  IProjectNegotiationPlanStepRepository,
  IProjectNegotiationReferItemRepository,
  IProjectNegotiationRepository,
  IProjectNegotiationThisMonthStatisticsViewRepository,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository
} from "../domain/services/contract";
import { ProjectNegotiationStatus, } from "../infrastructure/orm/typeorm/models/ProjectNegotiation";
import { InvestmentEfficiencyStatus } from "../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import { ProjectNegotiation } from "../domain/models/ProjectNegotiation";
import { ChangeableProjectNegotiationReferItemSerializer, } from "../interfaces/serializers/ProjectNegotiationReferItemSerializer";
import { AccountEventModel, AccountEventType } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { EventEmitterService } from "../infrastructure/config/beans";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import { InvestmentEfficiencyStatusType, ProjectNegotiationStatusType } from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class ProjectNegotiationAppUseCases extends NoteAppUseCases {
  private static relations = [
    "createdBy", "updatedBy", "approvedBy", "assignee", "company", "instructor",
    "city", "district", "ward", "street",
    "investmentEfficiency", "investmentEfficiency.approvedBy", "investmentEfficiency.assignee",
    "investmentEfficiency.createdBy",
    "investmentEfficiency.updatedBy",
    "planSteps", "planSteps.actionDetail", "planSteps.opinionDetail",
    "planSteps.createdBy", "planSteps.updatedBy",
    "planSteps.actionDetail.createdBy", "planSteps.actionDetail.updatedBy",
    "planSteps.opinionDetail.createdBy", "planSteps.opinionDetail.updatedBy",
    "referItems", "referItems.createdBy", "referItems.updatedBy",
    "referItems.negotiationRefer", "referItems.referSource",
  ];

  static accountEvents = {
    GUI_DUYET: AccountEventType.TL.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.TL.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.TL.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.TL.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.ProjectNegotiation;

  public static async create(
    data: ChangeableProjectNegotiationSerializer,
    account: Account,
    beans: {
      projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>,
      projectNegotiationRepository: IProjectNegotiationRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountRepository: IAccountRepository,
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    }): Promise<any> {
    await this.checkInvestmentEfficiency(data.investmentEfficiencyId, data.propertyId, beans);
    const { rv, property } = await this.doCreate<ProjectNegotiationStatusType, ChangeableProjectNegotiationSerializer>(
      data, account,
      beans.projectNegotiationManager,
      beans.projectNegotiationRepository,
      beans,
      ProjectNegotiationStatus.Drafting,
      PropertyProgressType.TLDA,
    );
    await beans.propertyManager.updateStatusWhenCreateTLNote(property, account.id);
    return await this.get(rv.id, beans);
  }

  public static async get(id: number, beans: {
    projectNegotiationRepository: IProjectNegotiationRepository,
  }): Promise<any> {
    return await this.doGet(id, beans.projectNegotiationRepository, this.relations);
  }

  public static async getAll(queryOptions: QueryProjectNegotiationSerializer, account: Account, beans: {
    projectNegotiationRepository: IProjectNegotiationRepository,
  }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    const alias = "projectNegotiation";

    const [result, total] = await beans.projectNegotiationRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["city", "ward", "district", "street", "assignee"],
      join: {
        alias,
        leftJoinAndSelect: { property: "projectNegotiation.property" }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        const queryWheres = {
          ...(queryOptions.priority ? { priority: queryOptions.priority } : {}),
        };
        this.doGetAllQueryBuilder(
          qb,
          queryOptionsFull,
          queryWheres,
          account,
          true,
          alias,
        );
        if (queryOptions.sourceId) {
          qb.andWhere("property.sourceId = :sourceId", { sourceId: queryOptions.sourceId });
        }
      },
    }) as [Readonly<any[]>, number];

    return {
      data: result,
      total
    };
  }

  public static async update(
    id: number,
    data: ChangeableProjectNegotiationSerializer,
    account: Account,
    beans: {
      projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>,
      projectNegotiationRepository: IProjectNegotiationRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountRepository: IAccountRepository,
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    }): Promise<any> {
    await this.checkInvestmentEfficiency(data.investmentEfficiencyId, data.propertyId, beans);
    const { rv, property } = await this.doUpdate<ProjectNegotiationStatusType, ChangeableProjectNegotiationSerializer>(
      id, data, account,
      beans.projectNegotiationRepository,
      beans,
      [ProjectNegotiationStatus.Drafting, ProjectNegotiationStatus.Rejected],
      ProjectNegotiationStatus.Drafting,
      beans.projectNegotiationManager,
      PropertyProgressType.TLDA,
    );
    await beans.propertyManager.updateStatusWhenCreateTLNote(property, account.id);
    return await this.get(rv.id, beans);
  }

  public static async updateStatus(
    data: ChangeStatusNoteSerializer,
    account: Account,
    beans: {
      projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>,
      projectNegotiationRepository: IProjectNegotiationRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountEventRepository: IAccountEventRepository,
      eventEmitter: EventEmitterService,
      propertyProgressRepository: IPropertyProgressRepository,
    }): Promise<any> {
    const note = await beans.projectNegotiationRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property"]
    }) as Readonly<any>;

    await ProjectNegotiation.validate(note);

    const customUpdated = {};
    const statusGenerateNote = ProjectNegotiationStatus.Pending;
    const checkPropertyWithNewStatuses = [ProjectNegotiationStatus.Pending, ProjectNegotiationStatus.Approved];
    
    await this.doUpdateStatus<ProjectNegotiationStatusType>(
      note, data,
      statusGenerateNote, customUpdated, account,
      beans.projectNegotiationManager,
      beans.projectNegotiationRepository,
      ProjectNegotiationStatus.Approved,
      ProjectNegotiationStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.TLDA,
    );

    const result = await this.get(data.id, beans);
    if (data.status === ProjectNegotiationStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendKHNotification(result, account, NOTIFICATION.TL.GUI_DUYET, beans);
      await this.triggerAccountActivity<ProjectNegotiation>(result, ActivityGroup.TL, account, ACTIVITY.TL.GUI_DUYET, beans);
    } else if (data.status === ProjectNegotiationStatus.Approved) {
      await beans.propertyManager.updateStatusWhenApprovedTLNote(note.property, account.id);
      await this.sendKHNotification(result, account, NOTIFICATION.TL.PHE_DUYET, beans);
      await this.triggerAccountActivity<ProjectNegotiation>(result, ActivityGroup.TL, account, ACTIVITY.TL.PHE_DUYET, beans);
    } else if (data.status === ProjectNegotiationStatus.Rejected) {
      await this.sendKHNotification(result, account, NOTIFICATION.TL.TU_CHOI, beans);
      await this.triggerAccountActivity<ProjectNegotiation>(result, ActivityGroup.TL, account, ACTIVITY.TL.TU_CHOI, beans, data.rejectionNote);
    }

    return result;
  }

  public static async createReferItem(
    projectNegotiationId: number,
    data: ChangeableProjectNegotiationReferItemSerializer,
    account: Account,
    beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      projectNegotiationReferItemRepository: IProjectNegotiationReferItemRepository,
    }): Promise<any> {
    await this.checkProjectNegotiation(projectNegotiationId, beans);
    await beans.projectNegotiationReferItemRepository.save({
      projectNegotiationId,
      createdBy: account.id,
      updatedBy: account.id,
      ...data,
    });
    return await this.get(projectNegotiationId, beans);
  }

  public static async updateReferItem(projectNegotiationId: number, id: number, data: ChangeableProjectNegotiationReferItemSerializer, account: Account, beans: {
    projectNegotiationRepository: IProjectNegotiationRepository,
    projectNegotiationReferItemRepository: IProjectNegotiationReferItemRepository,
  }): Promise<any> {
    await beans.projectNegotiationReferItemRepository.findOneOrFail({ id, projectNegotiationId });
    await this.checkProjectNegotiation(projectNegotiationId, beans);
    await beans.projectNegotiationReferItemRepository.update(id, {
      ...data,
      updatedBy: account.id
    });
    return await this.get(projectNegotiationId, beans);
  }

  public static async deleteReferItem(projectNegotiationId: number, id: number, beans: {
    projectNegotiationRepository: IProjectNegotiationRepository,
    projectNegotiationReferItemRepository: IProjectNegotiationReferItemRepository,
  }): Promise<any> {
    await beans.projectNegotiationReferItemRepository.findOneOrFail({ id, projectNegotiationId });
    await this.checkProjectNegotiation(projectNegotiationId, beans);
    await beans.projectNegotiationReferItemRepository.delete(id);
    return await this.get(projectNegotiationId, beans);
  }

  public static async createPlanStep(
    projectNegotiationId: number,
    data: ChangeableProjectNegotiationPlanStepSerializer,
    account: Account,
    beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      projectNegotiationPlanStepRepository: IProjectNegotiationPlanStepRepository,
      projectNegotiationActionDetailRepository: IProjectNegotiationActionDetailRepository,
      projectNegotiationOpinionDetailRepository: IProjectNegotiationOpinionDetailRepository,
    }): Promise<any> {
    await this.checkProjectNegotiation(projectNegotiationId, beans);
    const actionDetail = await beans.projectNegotiationActionDetailRepository.save({
      action: "",
      createdBy: account.id,
      updatedBy: account.id,
    });

    const opinionDetail = await beans.projectNegotiationOpinionDetailRepository.save({
      opinion: "",
      createdBy: account.id,
      updatedBy: account.id,
    });

    await beans.projectNegotiationPlanStepRepository.save({
      projectNegotiationId,
      createdBy: account.id,
      updatedBy: account.id,
      actionDetailId: actionDetail.id,
      opinionDetailId: opinionDetail.id,
      ...data,
    });

    return await this.get(projectNegotiationId, beans);
  }

  public static async updatePlanStep(
    projectNegotiationId: number,
    planStepId: number,
    data: ChangeableProjectNegotiationPlanStepSerializer,
    account: Account, beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      projectNegotiationPlanStepRepository: IProjectNegotiationPlanStepRepository,
    }): Promise<any> {
    await beans.projectNegotiationPlanStepRepository.findOneOrFail({ id: planStepId, projectNegotiationId });
    await this.checkProjectNegotiation(projectNegotiationId, beans);

    await beans.projectNegotiationPlanStepRepository.update(planStepId, {
      updatedBy: account.id,
      ...data,
    });

    return await this.get(projectNegotiationId, beans);
  }

  public static async deletePlanStep(
    projectNegotiationId: number,
    planStepId: number,
    beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      projectNegotiationPlanStepRepository: IProjectNegotiationPlanStepRepository,
      projectNegotiationActionDetailRepository: IProjectNegotiationActionDetailRepository,
      projectNegotiationOpinionDetailRepository: IProjectNegotiationOpinionDetailRepository,
    }): Promise<any> {
    const planStep = await beans.projectNegotiationPlanStepRepository.findOneOrFail({
      id: planStepId,
      projectNegotiationId
    });
    await this.checkProjectNegotiation(projectNegotiationId, beans);
    await beans.projectNegotiationPlanStepRepository.delete({ id: planStepId });
    await beans.projectNegotiationActionDetailRepository.delete({ id: planStep.actionDetailId });
    await beans.projectNegotiationOpinionDetailRepository.delete({ id: planStep.opinionDetailId });

    return await this.get(projectNegotiationId, beans);
  }

  public static async updatePlanStepAction(
    projectNegotiationId: number,
    planStepId: number,
    action: string,
    account: Account, beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      projectNegotiationPlanStepRepository: IProjectNegotiationPlanStepRepository,
      projectNegotiationActionDetailRepository: IProjectNegotiationActionDetailRepository,
      projectNegotiationOpinionDetailRepository: IProjectNegotiationOpinionDetailRepository,
    }): Promise<any> {
    const planStep = await beans.projectNegotiationPlanStepRepository.findOneOrFail({
      id: planStepId,
      projectNegotiationId
    });
    await this.checkProjectNegotiation(projectNegotiationId, beans);

    await beans.projectNegotiationActionDetailRepository.update(planStep.actionDetailId, {
      updatedBy: account.id,
      action,
    });

    return await this.get(projectNegotiationId, beans);
  }

  public static async updatePlanStepOpinion(
    projectNegotiationId: number,
    planStepId: number,
    opinion: string,
    account: Account, beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      projectNegotiationPlanStepRepository: IProjectNegotiationPlanStepRepository,
      projectNegotiationActionDetailRepository: IProjectNegotiationActionDetailRepository,
      projectNegotiationOpinionDetailRepository: IProjectNegotiationOpinionDetailRepository,
      eventEmitter: EventEmitterService,
    }): Promise<any> {
    const planStep = await beans.projectNegotiationPlanStepRepository.findOneOrFail({
      id: planStepId,
      projectNegotiationId,
    });
    await this.checkProjectNegotiation(projectNegotiationId, beans);

    await beans.projectNegotiationOpinionDetailRepository.update(planStep.opinionDetailId, {
      updatedBy: account.id,
      opinion,
    });
    const result = await this.get(projectNegotiationId, beans);
    await this.sendKHNotification(result, account, NOTIFICATION.TL.LUU_Y_KIEN_QUAN_LY, beans);

    return result;
  }

  private static async checkInvestmentEfficiency(investmentEfficiencyId: number, propertyId: number, beans: {
    investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
  }): Promise<void> {
    if (investmentEfficiencyId) {
      await beans.investmentEfficiencyRepository.findOneOrFail({
        id: investmentEfficiencyId,
        propertyId,
        status: InvestmentEfficiencyStatus.Approved,
        isDeleted: false,
      });
    }
  }

  public static async sendKHNotification(
    note: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService, projectNegotiationRepository: IProjectNegotiationRepository, },
    sendMoreAccounts: number[] = [],
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.projectNegotiationRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;

    beans.eventEmitter.emit(EVENT.CREATE_NOTIFICATION, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: NotificationGroup.TL,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      url: `/negotiation/view/${note.id}`,
      data,
    }, account.id, sendMoreAccounts);
  }

  private static async checkProjectNegotiation(projectNegotiationId: number, beans: {
    projectNegotiationRepository: IProjectNegotiationRepository,
  }): Promise<void> {
    await beans.projectNegotiationRepository.findOneOrFail({
      id: projectNegotiationId,
      status: ProjectNegotiationStatus.Approved,
      isDeleted: false,
    });
  }

  public static async delete(
    projectNegotiationId: number,
    account: Account,
    beans: {
      projectNegotiationRepository: IProjectNegotiationRepository,
      eventEmitter: EventEmitterService,
      projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [ProjectNegotiationStatus.Drafting, ProjectNegotiationStatus.Approved];
    const noteIdName = "projectNegotiationId";
    const note = await this.doDelete<ProjectNegotiationStatusType, unknown>(
      projectNegotiationId,
      beans.projectNegotiationRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      ProjectNegotiationStatus.Drafting,
      ProjectNegotiationStatus.Deleted,
      null,
      null,
      beans.projectNegotiationManager,
      beans
    );

    await this.triggerAccountActivity<ProjectNegotiation>(note, ActivityGroup.TL, account, ACTIVITY.TL.XOA, beans);

    if (note.status === ProjectNegotiationStatus.Approved) {
      await this.sendKHNotification(note, account, NOTIFICATION.TH.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(projectNegotiationId, beans.projectNegotiationRepository, []);
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      projectNegotiationThisMonthStatisticsViewRepository: IProjectNegotiationThisMonthStatisticsViewRepository;
      projectNegotiationLastMonthStatisticsViewRepository: IProjectNegotiationLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.projectNegotiationThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.projectNegotiationLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }
  
  public static async restore(
    id: number,
    account: Account,
    beans: {
      projectNegotiationRepository: IProjectNegotiationRepository;
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository;
      projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [ProjectNegotiationStatus.Deleted];
    const parentOfNoteValidStatusList = [InvestmentEfficiencyStatus.Approved];
    const parentOfNoteQueryCheckValid = {
      isDeleted: false
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "investmentEfficiencyId";
    const parentOfNoteRepository = beans.investmentEfficiencyRepository;
    await this.doRestore<ProjectNegotiationStatusType, InvestmentEfficiencyStatusType>(
      id,
      beans.projectNegotiationRepository,
      account,
      ProjectNegotiationStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.projectNegotiationManager,
    );
    return await this.get(id, beans);
  }
}
