import NoteAppUseCases from "./NoteAppUseCases";
import {
  ApprovedInvestmentEfficiencyRequest,
  ChangeableInvestmentEfficiencySerializer,
  QueryInvestmentEfficiencySerializer
} from "../interfaces/serializers/InvestmentEfficiencySerializer";
import { Account } from "../domain/models/Account";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAppraisalExpectationRepository,
  IBaseRepository,
  IInvestmentEfficiencyLastMonthStatisticsViewRepository,
  IInvestmentEfficiencyManager,
  IInvestmentEfficiencyRepository,
  IInvestmentEfficiencyThisMonthStatisticsViewRepository,
  ILatestApprovedNoteRepository,
  IProjectNegotiationRepository,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository,
} from "../domain/services/contract";
import { InvestmentEfficiencyStatus, } from "../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import { Utilities } from "./utils";
import { InvestmentEfficiency } from "../domain/models/InvestmentEfficiency";
import { AccountEventModel, AccountEventType } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { NoteType } from "../infrastructure/orm/typeorm/models/LatestApprovedNote";
import { ProjectNegotiationStatus, } from "../infrastructure/orm/typeorm/models/ProjectNegotiation";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import {
  AppraisalExpectationStatusType,
  InvestmentEfficiencyStatusType,
  ProjectNegotiationStatusType
} from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class InvestmentEfficiencyAppUseCases extends NoteAppUseCases {
  private static relations = [
    "createdBy", "updatedBy", "approvedBy", "assignee", "company", "instructor",
    "appraisalExpectation", "appraisalExpectation.approvedBy", "appraisalExpectation.assignee",
    "appraisalExpectation.createdBy",
    "appraisalExpectation.updatedBy",
    "planItems",
    "planItems.lands",
    "appraisalExpectation.inspectionExpectation"
  ];

  static accountEvents = {
    GUI_DUYET: AccountEventType.HD.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.HD.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.HD.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.HD.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.InvestmentEfficiency;

  public static async sendHDNotification(
    note: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService, investmentEfficiencyRepository: IInvestmentEfficiencyRepository },
    sendMoreAccounts: number[] = [],
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.investmentEfficiencyRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;
    if (action === NOTIFICATION.HD.CAP_NHAT_NGUOI_THUC_HIEN) {
      data["new"] = note.assignee.displayName;
    }

    beans.eventEmitter.emit(EVENT.CREATE_NOTIFICATION, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: NotificationGroup.HD,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      url: `/investment/efficiency/view/${note.id}`,
      data,
    }, account.id, sendMoreAccounts);
  }

  public static async create(data: ChangeableInvestmentEfficiencySerializer, account: Account, beans: {
    investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>,
    investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    accountRepository: IAccountRepository,
    appraisalExpectationRepository: IAppraisalExpectationRepository,
    accountEventRepository: IAccountEventRepository,
  }): Promise<any> {
    await this.checkAppraisalExpectation(data.appraisalExpectationId, data.propertyId, beans);
    const {
      rv,
      property
    } = await this.doCreate<InvestmentEfficiencyStatusType, ChangeableInvestmentEfficiencySerializer>(
      data, account,
      beans.investmentEfficiencyManager,
      beans.investmentEfficiencyRepository,
      beans,
      InvestmentEfficiencyStatus.Drafting,
      PropertyProgressType.HQDT,
    );
    await beans.propertyManager.updateStatusWhenCreateHDNote(property, account.id);

    return await this.get(rv.id, beans);
  }

  public static async get(id: number, beans: {
    investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
  }): Promise<any> {
    return await this.doGet(id, beans.investmentEfficiencyRepository, this.relations);
  }

  public static async getAll(
    queryOptions: QueryInvestmentEfficiencySerializer,
    account: Account,
    withPermission: boolean,
    beans: {
      investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>,
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    let queryWheres = {};
    const alias = "investmentEfficiency";

    const [result, total] = await beans.investmentEfficiencyRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["city", "ward", "district", "street", "assignee"],
      join: {
        alias,
        leftJoinAndSelect: { property: "investmentEfficiency.property" }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        queryWheres = {
          ...queryWheres,
          ...(queryOptions.approvedPlanTypeId ? { approvedPlanTypeId: queryOptions.approvedPlanTypeId } : {}),
          ...Utilities.buildWhereSearchFromAndTo(
            queryOptions.approvedPurchasePriceFrom,
            queryOptions.approvedPurchasePriceTo,
            "approvedPurchasePrice"
          )
        };
        this.doGetAllQueryBuilder(
          qb,
          queryOptionsFull,
          queryWheres,
          account,
          withPermission,
          alias,
        );
      },
    }) as [Readonly<any[]>, number];

    return {
      data: result,
      total
    };
  }

  public static async update(
    id: number,
    data: ChangeableInvestmentEfficiencySerializer,
    account: Account,
    beans: {
      investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>,
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountRepository: IAccountRepository,
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      investmentEfficiencyPlanItemRepository: IBaseRepository,
      investmentEfficiencyLandRepository: IBaseRepository,
      accountEventRepository: IAccountEventRepository,
      eventEmitter: EventEmitterService,
    }): Promise<any> {
    await this.checkAppraisalExpectation(data.appraisalExpectationId, data.propertyId, beans);
    const {
      rv,
      property,
      noteBeforeUpdate
    } = await this.doUpdate<InvestmentEfficiencyStatusType, ChangeableInvestmentEfficiencySerializer>(
      id, data, account,
      beans.investmentEfficiencyRepository,
      beans,
      [InvestmentEfficiencyStatus.Drafting, InvestmentEfficiencyStatus.Rejected],
      InvestmentEfficiencyStatus.Drafting,
      beans.investmentEfficiencyManager,
      PropertyProgressType.HQDT,
    );
    await beans.investmentEfficiencyPlanItemRepository.delete({ investmentEfficiencyId: null });
    await beans.investmentEfficiencyLandRepository.delete({ planItemId: null });

    await beans.propertyManager.updateStatusWhenCreateHDNote(property, account.id);

    const result = await this.get(id, beans);
    if (noteBeforeUpdate.assigneeId !== result.assigneeId) {
      await this.sendHDNotification(result, account, NOTIFICATION.HD.CAP_NHAT_NGUOI_THUC_HIEN, beans);
    }

    return result;
  }

  public static async updateStatus(data: ChangeStatusNoteSerializer, account: Account, beans: {
    investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>,
    investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    appraisalExpectationRepository: IAppraisalExpectationRepository,
    accountEventRepository: IAccountEventRepository,
    eventEmitter: EventEmitterService,
    propertyProgressRepository: IPropertyProgressRepository;
  }): Promise<any> {
    const note = await beans.investmentEfficiencyRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property"]
    }) as Readonly<any>;
    await InvestmentEfficiency.validate(note);
    if (data.status === InvestmentEfficiencyStatus.Pending) {
      await this.checkAppraisalExpectation(note.appraisalExpectationId, note.propertyId, beans);
    }
    const customUpdated = {};
    const statusGenerateNote = InvestmentEfficiencyStatus.Pending;
    const checkPropertyWithNewStatuses = [InvestmentEfficiencyStatus.Pending];
    await this.doUpdateStatus<InvestmentEfficiencyStatusType>(
      note, data, statusGenerateNote,
      customUpdated, account,
      beans.investmentEfficiencyManager,
      beans.investmentEfficiencyRepository,
      InvestmentEfficiencyStatus.Approved,
      InvestmentEfficiencyStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.HQDT,
    );
    const result = await this.get(data.id, beans);
    if (data.status === InvestmentEfficiencyStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendHDNotification(result, account, NOTIFICATION.HD.GUI_DUYET, beans);
      await this.triggerAccountActivity<InvestmentEfficiency>(result, ActivityGroup.HD, account, ACTIVITY.HD.GUI_DUYET, beans);
    } else if (data.status === InvestmentEfficiencyStatus.Rejected) {
      await this.sendHDNotification(result, account, NOTIFICATION.HD.TU_CHOI, beans);
      await this.triggerAccountActivity<InvestmentEfficiency>(result, ActivityGroup.HD, account, ACTIVITY.HD.TU_CHOI, beans, data.rejectionNote);
    }
    return result;

  }

  public static async approve(
    id: number, data: ApprovedInvestmentEfficiencyRequest,
    account: Account, beans: {
      investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>,
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      investmentEfficiencyPlanItemRepository: IBaseRepository,
      eventEmitter: EventEmitterService,
      latestApprovedNoteRepository: ILatestApprovedNoteRepository,
      propertyProgressRepository: IPropertyProgressRepository,
    }) {
    let note = await beans.investmentEfficiencyRepository.findOneOrFail({
      where: { id },
      relations: ["property"]
    }) as Readonly<any>;
    await this.checkAvailablePlanItem(data.approvedPlanId, id, beans);
    await InvestmentEfficiency.validate(note);

    const currentStatus: InvestmentEfficiencyStatusType = note.status;
    await beans.investmentEfficiencyManager.checkStatus(currentStatus, InvestmentEfficiencyStatus.Approved);
    if(note.propertyId){
      await this.checkAvailableProperty(note.propertyId, beans);
    }
    const currentTime = await Utilities.currentTime();
    const classes = await beans.investmentEfficiencyManager.classify(InvestmentEfficiencyStatus.Approved, false);
    const noteUpdateData = {
      status: InvestmentEfficiencyStatus.Approved,
      updatedBy: account.id,
      approvedAt: currentTime,
      approvedBy: account.id,
      ...data,
      classes,
    };
    await beans.investmentEfficiencyRepository.update(
      id, noteUpdateData);
    note = {
      ...note,
      ...noteUpdateData
    };
    await beans.investmentEfficiencyPlanItemRepository.update(data.approvedPlanId, {
      isApproved: true,
    });
    await beans.propertyManager.updateStatusWhenApproveHDNote(note.property, account.id);
    const result = await this.get(id, beans);
    await this.sendHDNotification(result, account, NOTIFICATION.HD.PHE_DUYET, beans);
    await this.triggerAccountActivity<InvestmentEfficiency>(result, ActivityGroup.HD, account, ACTIVITY.HD.PHE_DUYET, beans);
    await beans.latestApprovedNoteRepository.updateOrCreate({
      refId: note.id,
      accountId: account.id,
      propertyId: note.property.id,
      type: NoteType.HD,
    });
    await beans.propertyProgressRepository.save({
      propertyId: note.property.id,
      type: PropertyProgressType.HQDT,
      createdBy: account.id,
    });

    return result;
  }

  public static async delete(
    id: number,
    account: Account,
    beans: {
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
      projectNegotiationRepository: IProjectNegotiationRepository,
      eventEmitter: EventEmitterService,
      investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [InvestmentEfficiencyStatus.Drafting, InvestmentEfficiencyStatus.Approved];
    const noteIdName = "investmentEfficiencyId";
    const childOfNoteDeleteStatus = ProjectNegotiationStatus.Deleted;
    const childOfNoteRepository = beans.projectNegotiationRepository;
    const note = await this.doDelete<InvestmentEfficiencyStatusType, ProjectNegotiationStatusType>(
      id,
      beans.investmentEfficiencyRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      InvestmentEfficiencyStatus.Drafting,
      InvestmentEfficiencyStatus.Deleted,
      childOfNoteDeleteStatus,
      childOfNoteRepository,
      beans.investmentEfficiencyManager,
      beans
    );
    await this.triggerAccountActivity<InvestmentEfficiency>(note, ActivityGroup.HD, account, ACTIVITY.HD.XOA, beans);
    if (note.status === InvestmentEfficiencyStatus.Approved) {
      await this.sendHDNotification(note, account, NOTIFICATION.HD.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(id, beans.investmentEfficiencyRepository, []);
  }

  public static async restore(
    id: number,
    account: Account,
    beans: {
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository;
      appraisalExpectationRepository: IAppraisalExpectationRepository;
      investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [InvestmentEfficiencyStatus.Deleted];
    const parentOfNoteValidStatusList = [InvestmentEfficiencyStatus.Approved];
    const parentOfNoteQueryCheckValid = {
      isDeleted: false
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "appraisalExpectationId";
    const parentOfNoteRepository = beans.appraisalExpectationRepository;
    await this.doRestore<InvestmentEfficiencyStatusType, AppraisalExpectationStatusType>(
      id,
      beans.investmentEfficiencyRepository,
      account,
      InvestmentEfficiencyStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.investmentEfficiencyManager,
    );
    return await this.get(id, beans);
  }

  private static async checkAvailablePlanItem(planItemId: number, investmentEfficiencyId: number, beans: {
    investmentEfficiencyPlanItemRepository: IBaseRepository,
  }): Promise<void> {
    await beans.investmentEfficiencyPlanItemRepository.findOneOrFail({
      id: planItemId,
      investmentEfficiencyId,
    });
  }

  private static async checkAppraisalExpectation(
    appraisalExpectationId: number,
    propertyId: number,
    beans: {
      appraisalExpectationRepository: IAppraisalExpectationRepository,
    }): Promise<void> {
    if (appraisalExpectationId) {
      await beans.appraisalExpectationRepository.findOneOrFail({
        id: appraisalExpectationId,
        propertyId,
        status: InvestmentEfficiencyStatus.Approved,
        isDeleted: false,
      });
    }
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      investmentEfficiencyThisMonthStatisticsViewRepository: IInvestmentEfficiencyThisMonthStatisticsViewRepository;
      investmentEfficiencyLastMonthStatisticsViewRepository: IInvestmentEfficiencyLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.investmentEfficiencyThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.investmentEfficiencyLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }

}
