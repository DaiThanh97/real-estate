import { Account } from "../domain/models/Account";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAppraisalExpectationLastMonthStatisticsViewRepository,
  IAppraisalExpectationManager,
  IAppraisalExpectationRepository,
  IAppraisalExpectationThisMonthStatisticsViewRepository,
  IBaseRepository,
  IInspectionExpectationRepository,
  IInvestmentEfficiencyRepository,
  IInvestmentPlanManager,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository
} from "../domain/services/contract";
import {
  ChangeableAppraisalExpectationSerializer,
  QueryAppraisalExpectationSerializer,
} from "../interfaces/serializers/AppraisalExpectationSerializer";
import NoteAppUseCases from "./NoteAppUseCases";
import { AppraisalExpectationStatus, } from "../infrastructure/orm/typeorm/models/AppraisalExpectation";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import { AppraisalExpectation } from "../domain/models/AppraisalExpectation";
import { InspectionExpectationStatus } from "../domain/models/InspectionExpectation";
import { Utilities } from "./utils";
import { AccountEventModel, AccountEventType } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { InvestmentEfficiencyStatus, } from "../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import {
  AppraisalExpectationStatusType,
  InspectionExpectationStatusType,
  InvestmentEfficiencyStatusType,
  InvestmentPlanStatusType
} from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class AppraisalExpectationAppUseCases extends NoteAppUseCases {
  private static relations = [
    "createdBy", "updatedBy", "approvedBy", "completedBy", "assignee", "company", "instructor",
    "inspectionExpectation", "inspectionExpectation.approvedBy", "inspectionExpectation.assignee",
    "inspectionExpectation.createdBy", "inspectionExpectation.updatedBy",
    "planItems", "planItems.planType", "planItems.constructionType",
    "planItems.lands"
  ];

  static accountEvents = {
    GUI_DUYET: AccountEventType.TU.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.TU.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.TU.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.TU.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.AppraisalExpectation;

  public static async sendTUNotification(
    note: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService, appraisalExpectationRepository: IAppraisalExpectationRepository },
    sendMoreAccounts: number[] = [],
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.appraisalExpectationRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;
    if (action === NOTIFICATION.TU.CAP_NHAT_NGUOI_THUC_HIEN) {
      data["new"] = note.assignee.displayName;
    }

    beans.eventEmitter.emit(EVENT.CREATE_NOTIFICATION, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: NotificationGroup.TU,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      url: `/appraisal/expectation/view/${note.id}`,
      data,
    }, account.id, sendMoreAccounts);
  }

  public static async get(id: number, beans: {
    appraisalExpectationRepository: IAppraisalExpectationRepository,
  }): Promise<any> {
    return await this.doGet(id, beans.appraisalExpectationRepository, this.relations);
  }

  public static async create(
    data: ChangeableAppraisalExpectationSerializer,
    account: Account,
    beans: {
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountRepository: IAccountRepository,
      inspectionExpectationRepository: IInspectionExpectationRepository,
      accountEventRepository: IAccountEventRepository,
    }): Promise<any> {
    await this.checkInspectionExpectation(data.inspectionExpectationId, data.propertyId, beans);
    const {
      rv,
      property
    } = await this.doCreate<AppraisalExpectationStatusType, ChangeableAppraisalExpectationSerializer>(
      data,
      account,
      beans.appraisalExpectationManager,
      beans.appraisalExpectationRepository,
      beans,
      AppraisalExpectationStatus.Drafting,
      PropertyProgressType.TDUT,
    );
    await beans.propertyManager.updateStatusWhenCreateTUNote(property, account.id);

    return await this.get(rv.id, beans);
  }

  public static async getAll(
    queryOptions: QueryAppraisalExpectationSerializer,
    account: Account,
    withPermission: boolean,
    beans: {
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>,
    }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    const queryWheres = {};
    const alias = "inspectionExpectation";

    const [result, total] = await beans.appraisalExpectationRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["city", "ward", "district", "street", "assignee"],
      join: {
        alias,
        leftJoinAndSelect: { property: "inspectionExpectation.property" }
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
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
    payload: ChangeableAppraisalExpectationSerializer,
    account: Account,
    beans: {
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>,
      accountRepository: IAccountRepository,
      propertyRepository: IPropertyRepository,
      inspectionExpectationRepository: IInspectionExpectationRepository,
      appraisalExpectationPlanItemRepository: IBaseRepository,
      appraisalExpectationPlanLandRepository: IBaseRepository,
      propertyManager: IPropertyManager,
      accountEventRepository: IAccountEventRepository,
      eventEmitter: EventEmitterService,
    }): Promise<any> {
    await this.checkInspectionExpectation(payload.inspectionExpectationId, payload.propertyId, beans);
    const {
      rv,
      property,
      noteBeforeUpdate
    } = await this.doUpdate<AppraisalExpectationStatusType, ChangeableAppraisalExpectationSerializer>(
      id, payload, account,
      beans.appraisalExpectationRepository,
      beans,
      [AppraisalExpectationStatus.Drafting, AppraisalExpectationStatus.Rejected],
      AppraisalExpectationStatus.Drafting,
      beans.appraisalExpectationManager,
      PropertyProgressType.TDUT,
    );
    await beans.appraisalExpectationPlanLandRepository.delete({ planItemId: null });
    await beans.appraisalExpectationPlanItemRepository.delete({ appraisalExpectationId: null });

    await beans.propertyManager.updateStatusWhenCreateTUNote(property, account.id);

    const result = await this.get(rv.id, beans);
    if (noteBeforeUpdate.assigneeId !== result.assigneeId) {
      await this.sendTUNotification(result, account, NOTIFICATION.TU.CAP_NHAT_NGUOI_THUC_HIEN, beans);
    }
    return result;
  }

  public static async updateStatus(data: ChangeStatusNoteSerializer, account: Account, beans: {
    appraisalExpectationRepository: IAppraisalExpectationRepository,
    appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>,
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>,
    accountEventRepository: IAccountEventRepository,
    eventEmitter: EventEmitterService,
    propertyProgressRepository: IPropertyProgressRepository,
  }): Promise<any> {
    const note = await beans.appraisalExpectationRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property", "planItems"]
    }) as Readonly<any>;

    await AppraisalExpectation.validate(note);

    const currentTime = await Utilities.currentTime();
    const customUpdated = (data.status === AppraisalExpectationStatus.Finished ? {
      completedAt: currentTime,
      completedBy: account.id
    } : {});
    const statusGenerateNote = AppraisalExpectationStatus.Finished;
    const checkPropertyWithNewStatuses = [AppraisalExpectationStatus.Pending, AppraisalExpectationStatus.Approved];

    await this.doUpdateStatus<AppraisalExpectationStatusType>(
      note, data, statusGenerateNote,
      customUpdated, account,
      beans.appraisalExpectationManager,
      beans.appraisalExpectationRepository,
      AppraisalExpectationStatus.Approved,
      AppraisalExpectationStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.TDUT,
    );
    const result = await this.get(data.id, beans);
    if (data.status === AppraisalExpectationStatus.Finished) {
      await this.sendTUNotification(result, account, NOTIFICATION.TU.HOAN_THANH, beans);
      await this.triggerAccountActivity<AppraisalExpectation>(result, ActivityGroup.TU, account, ACTIVITY.TU.HOAN_THANH, beans);
    } else if (data.status === AppraisalExpectationStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendTUNotification(result, account, NOTIFICATION.TU.GUI_DUYET, beans);
      await this.triggerAccountActivity<AppraisalExpectation>(result, ActivityGroup.TU, account, ACTIVITY.TU.GUI_DUYET, beans);
    } else if (data.status === AppraisalExpectationStatus.Rejected && note.status === AppraisalExpectationStatus.Pending) {
      await this.sendTUNotification(result, account, NOTIFICATION.TU.TU_CHOI_GUI_DUYET, beans);
      await this.triggerAccountActivity<AppraisalExpectation>(result, ActivityGroup.TU, account, ACTIVITY.TU.TU_CHOI, beans, data.rejectionNote);
    } else if (data.status === AppraisalExpectationStatus.Rejected && note.status === AppraisalExpectationStatus.Finished) {
      await this.sendTUNotification(result, account, NOTIFICATION.TU.TU_CHOI_HOAN_THANH, beans);
      await this.triggerAccountActivity<AppraisalExpectation>(result, ActivityGroup.TU, account, ACTIVITY.TU.TU_CHOI, beans, data.rejectionNote);
    } else if (data.status === AppraisalExpectationStatus.Approved) {
      await beans.propertyManager.updateStatusWhenApprovedTUNote(note.property, account.id);
      await beans.investmentPlanManager.updatePlanItemPriceWhenApprovedTUNote(note.planItems);
      await this.sendTUNotification(result, account, NOTIFICATION.TU.PHE_DUYET, beans);
      await this.triggerAccountActivity<AppraisalExpectation>(result, ActivityGroup.TU, account, ACTIVITY.TU.PHE_DUYET, beans);
    }
    return result;
  }

  public static async delete(
    id: number,
    account: Account,
    beans: {
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
      eventEmitter: EventEmitterService,
      appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [AppraisalExpectationStatus.Drafting, AppraisalExpectationStatus.Approved];
    const noteIdName = "appraisalExpectationId";
    const childOfNoteDeleteStatus = InvestmentEfficiencyStatus.Deleted;
    const childOfNoteRepository = beans.investmentEfficiencyRepository;
    const note = await this.doDelete<AppraisalExpectationStatusType, InvestmentEfficiencyStatusType>(
      id,
      beans.appraisalExpectationRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      AppraisalExpectationStatus.Drafting,
      AppraisalExpectationStatus.Deleted,
      childOfNoteDeleteStatus,
      childOfNoteRepository,
      beans.appraisalExpectationManager,
      beans
    );

    await this.triggerAccountActivity<AppraisalExpectation>(note, ActivityGroup.TU, account, ACTIVITY.TU.XOA, beans);
    if (note.status === AppraisalExpectationStatus.Approved) {
      await this.sendTUNotification(note, account, NOTIFICATION.TU.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(id, beans.appraisalExpectationRepository, []);
  }

  public static async restore(
    id: number,
    account: Account,
    beans: {
      appraisalExpectationRepository: IAppraisalExpectationRepository;
      inspectionExpectationRepository: IInspectionExpectationRepository;
      appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [AppraisalExpectationStatus.Deleted];
    const parentOfNoteValidStatusList = [InspectionExpectationStatus.Approved];
    const parentOfNoteQueryCheckValid = {
      isDeleted: false
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "inspectionExpectationId";
    const parentOfNoteRepository = beans.inspectionExpectationRepository;
    await this.doRestore<AppraisalExpectationStatusType, InspectionExpectationStatusType>(
      id,
      beans.appraisalExpectationRepository,
      account,
      AppraisalExpectationStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.appraisalExpectationManager,
    );
    return await this.get(id, beans);
  }

  private static async checkInspectionExpectation(inspectionExpectationId: number, propertyId: number, beans: {
    inspectionExpectationRepository: IInspectionExpectationRepository,
  }): Promise<void> {
    if (inspectionExpectationId) {
      await beans.inspectionExpectationRepository.findOneOrFail({
        id: inspectionExpectationId,
        propertyId,
        status: InspectionExpectationStatus.Approved,
        isDeleted: false,
      });
    }
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      appraisalExpectationThisMonthStatisticsViewRepository: IAppraisalExpectationThisMonthStatisticsViewRepository;
      appraisalExpectationLastMonthStatisticsViewRepository: IAppraisalExpectationLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.appraisalExpectationThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.appraisalExpectationLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }

}
