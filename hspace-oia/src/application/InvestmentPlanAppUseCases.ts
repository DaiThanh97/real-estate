import { Account } from "../domain/models/Account";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAppraisalStatementRepository,
  IBaseRepository,
  IInvestmentPlanLastMonthStatisticsViewRepository,
  IInspectionExpectationRepository,
  IInvestmentPlanThisMonthStatisticsViewRepository,
  IInvestmentPlanManager,
  IInvestmentPlanRepository,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository
} from "../domain/services/contract";
import {
  ChangeableInvestmentPlanSerializer,
  QueryInvestmentPlanSerializer
} from "../interfaces/serializers/InvestmentPlanSerializer";
import NoteAppUseCases from "./NoteAppUseCases";
import { InvestmentPlanStatus } from "../infrastructure/orm/typeorm/models/InvestmentPlan";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import { InvestmentPlan } from "../domain/models/InvestmentPlan";
import { AppraisalStatementStatus } from "../domain/models/AppraisalStatement";
import { AccountEventModel, AccountEventType } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { InspectionExpectationStatus } from "../domain/models/InspectionExpectation";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import {
  AppraisalStatementStatusType,
  InspectionExpectationStatusType,
  InvestmentPlanStatusType
} from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class InvestmentPlanAppUseCases extends NoteAppUseCases {
  private static relations = [
    "createdBy", "updatedBy", "approvedBy", "assignee", "company", "instructor",
    "appraisalStatement", "appraisalStatement.approvedBy", "appraisalStatement.assignee",
    "appraisalStatement.createdBy",
    "appraisalStatement.updatedBy",
    "planItems",
    "planItems.lands",
    "appraisalStatement.inspectionStatement",
  ];

  static accountEvents = {
    GUI_DUYET: AccountEventType.PD.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.PD.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.PD.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.PD.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.InvestmentPlan;

  public static async create(data: ChangeableInvestmentPlanSerializer, account: Account, beans: {
    investmentPlanRepository: IInvestmentPlanRepository,
    investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>,
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    accountRepository: IAccountRepository,
    appraisalStatementRepository: IAppraisalStatementRepository,
  }): Promise<any> {
    await this.checkAppraisalStatement(data.appraisalStatementId, data.propertyId, beans);
    const { rv, property } = await this.doCreate<InvestmentPlanStatusType, ChangeableInvestmentPlanSerializer>(
      data, account,
      beans.investmentPlanManager,
      beans.investmentPlanRepository,
      beans,
      InvestmentPlanStatus.Drafting,
      PropertyProgressType.PADT,
    );
    if (property) {
      await beans.propertyManager.updateStatusWhenCreatePDNote(property, account.id);
    }

    return await this.get(rv.id, beans);
  }

  public static async get(id: number, beans: {
    investmentPlanRepository: IInvestmentPlanRepository,
  }): Promise<any> {
    return await this.doGet(id, beans.investmentPlanRepository, this.relations);
  }

  public static async getAll(
    queryOptions: QueryInvestmentPlanSerializer,
    account: Account,
    withPermission: boolean,
    beans: {
      investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>,
      investmentPlanRepository: IInvestmentPlanRepository,
    }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    const queryWheres = {};
    const alias = "investmentPlan";

    const [result, total] = await beans.investmentPlanRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["city", "ward", "district", "street", "assignee"],
      join: {
        alias,
        leftJoinAndSelect: { property: "investmentPlan.property" }
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

  public static async updateStatus(data: ChangeStatusNoteSerializer, account: Account, beans: {
    investmentPlanRepository: IInvestmentPlanRepository,
    investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>,
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    accountEventRepository: IAccountEventRepository,
    eventEmitter: EventEmitterService,
    propertyProgressRepository: IPropertyProgressRepository,
  }): Promise<any> {
    const note = await beans.investmentPlanRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property"]
    }) as Readonly<any>;

    await InvestmentPlan.validate(note);

    const customUpdated = {};
    const statusGenerateNote = InvestmentPlanStatus.Pending;
    const checkPropertyWithNewStatuses = [InvestmentPlanStatus.Pending, InvestmentPlanStatus.Approved];

    await this.doUpdateStatus<InvestmentPlanStatusType>(
      note, data, statusGenerateNote,
      customUpdated, account,
      beans.investmentPlanManager,
      beans.investmentPlanRepository,
      InvestmentPlanStatus.Approved,
      InvestmentPlanStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.PADT,
    );

    const result = await this.get(data.id, beans);
    if (data.status === InvestmentPlanStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendPDNotification(result, account, NOTIFICATION.PD.GUI_DUYET, beans);
      await this.triggerAccountActivity<InvestmentPlan>(result, ActivityGroup.PD, account, ACTIVITY.PD.GUI_DUYET, beans);
    } else if (data.status === InvestmentPlanStatus.Approved) {
      await beans.propertyManager.updateStatusWhenApprovedPDNote(note.property, account.id);
      await this.sendPDNotification(result, account, NOTIFICATION.PD.PHE_DUYET, beans);
      await this.triggerAccountActivity<InvestmentPlan>(result, ActivityGroup.PD, account, ACTIVITY.PD.PHE_DUYET, beans);
    } else if (data.status === InvestmentPlanStatus.Rejected) {
      await this.sendPDNotification(result, account, NOTIFICATION.PD.TU_CHOI, beans);
      await this.triggerAccountActivity<InvestmentPlan>(result, ActivityGroup.PD, account, ACTIVITY.PD.TU_CHOI, beans, data.rejectionNote);
    }

    return result;
  }

  public static async update(
    id: number,
    payload: ChangeableInvestmentPlanSerializer,
    account: Account,
    beans: {
      investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>,
      investmentPlanRepository: IInvestmentPlanRepository,
      accountRepository: IAccountRepository,
      propertyRepository: IPropertyRepository,
      appraisalStatementRepository: IAppraisalStatementRepository,
      investmentPlanItemRepository: IBaseRepository,
      investmentPlanLandRepository: IBaseRepository,
      propertyManager: IPropertyManager,
    }): Promise<any> {
    await this.checkAppraisalStatement(payload.appraisalStatementId, payload.propertyId, beans);
    const { rv, property } = await this.doUpdate<InvestmentPlanStatusType, ChangeableInvestmentPlanSerializer>(
      id, payload, account,
      beans.investmentPlanRepository,
      beans,
      [InvestmentPlanStatus.Drafting, InvestmentPlanStatus.Rejected],
      InvestmentPlanStatus.Drafting,
      beans.investmentPlanManager,
      PropertyProgressType.PADT,
    );
    await beans.investmentPlanItemRepository.delete({ investmentPlanId: null });
    await beans.investmentPlanLandRepository.delete({ planItemId: null });

    await beans.propertyManager.updateStatusWhenCreatePDNote(property, account.id);
    return this.get(rv.id, beans);
  }

  public static async delete(
    id: number,
    account: Account,
    beans: {
      investmentPlanRepository: IInvestmentPlanRepository,
      inspectionExpectationRepository: IInspectionExpectationRepository,
      eventEmitter: EventEmitterService,
      investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [InvestmentPlanStatus.Drafting, InvestmentPlanStatus.Approved];
    const noteIdName = "investmentPlanId";
    const childOfNoteDeleteStatus = InspectionExpectationStatus.Deleted;
    const childOfNoteRepository = beans.inspectionExpectationRepository;
    const note = await this.doDelete<InvestmentPlanStatusType, InspectionExpectationStatusType>(
      id,
      beans.investmentPlanRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      InvestmentPlanStatus.Drafting,
      InvestmentPlanStatus.Deleted,
      childOfNoteDeleteStatus,
      childOfNoteRepository,
      beans.investmentPlanManager,
      beans
    );
    await this.triggerAccountActivity<InvestmentPlan>(note, ActivityGroup.PD, account, ACTIVITY.PD.XOA, beans);
    if (note.status === InvestmentPlanStatus.Approved) {
      await this.sendPDNotification(note, account, NOTIFICATION.PD.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(id, beans.investmentPlanRepository, []);
  }

  public static async restore(
    id: number,
    account: Account,
    beans: {
      investmentPlanRepository: IInvestmentPlanRepository;
      appraisalStatementRepository: IAppraisalStatementRepository;
      investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [InvestmentPlanStatus.Deleted];
    const parentOfNoteValidStatusList = [AppraisalStatementStatus.Approved];
    const parentOfNoteQueryCheckValid = {
      isDeleted: false
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "appraisalStatementId";
    const parentOfNoteRepository = beans.appraisalStatementRepository;
    await this.doRestore<InvestmentPlanStatusType, AppraisalStatementStatusType>(
      id,
      beans.investmentPlanRepository,
      account,
      InvestmentPlanStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.investmentPlanManager,
    );
    return await this.get(id, beans);
  }

  private static async checkAppraisalStatement(appraisalStatementId: number, propertyId: number, beans: {
    appraisalStatementRepository: IAppraisalStatementRepository,
  }): Promise<void> {
    if (appraisalStatementId) {
      await beans.appraisalStatementRepository.findOneOrFail({
        id: appraisalStatementId,
        propertyId,
        status: AppraisalStatementStatus.Approved,
        isDeleted: false,
      });
    }
  }

  public static async sendPDNotification(
    note: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService, investmentPlanRepository: IInvestmentPlanRepository },
    sendMoreAccounts: number[] = [],
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.investmentPlanRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;

    beans.eventEmitter.emit(EVENT.CREATE_NOTIFICATION, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: NotificationGroup.PD,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      url: `/investment/plan/view/${note.id}`,
      data,
    }, account.id, sendMoreAccounts);
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      investmentPlanThisMonthStatisticsViewRepository: IInvestmentPlanThisMonthStatisticsViewRepository;
      investmentPlanLastMonthStatisticsViewRepository: IInvestmentPlanLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.investmentPlanThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.investmentPlanLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }
}
