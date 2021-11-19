import {
  ChangeableAppraisalStatementSerializer,
  QueryAppraisalStatementSerializer,
} from "../interfaces/serializers/AppraisalStatementSerializer";
import { Account } from "../domain/models/Account";
import {
  AppraisalAuditDetail,
  AppraisalStatement,
  AppraisalStatementStatus,
} from "../domain/models/AppraisalStatement";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAppraisalAuditDetailRepository,
  IAppraisalStatementLastMonthStatisticsViewRepository,
  IAppraisalStatementManager,
  IAppraisalStatementRatioViewRepository,
  IAppraisalStatementRepository,
  IAppraisalStatementThisMonthStatisticsViewRepository,
  IInspectionStatementRepository,
  IInvestmentPlanRepository,
  ILatestApprovedNoteRepository,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository,
} from "../domain/services/contract";
import { plainToClass } from "class-transformer";
import { In } from "typeorm";
import { Utilities } from "./utils";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import { InspectionStatementStatus, } from "../infrastructure/orm/typeorm/models/InspectionStatement";
import NoteAppUseCases from "./NoteAppUseCases";
import { BusinessStatus } from "../infrastructure/orm/typeorm/models/Property";
import { EventEmitterService } from "../infrastructure/config/beans";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { AccountEventModel, AccountEventType, } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { NoteType } from "../infrastructure/orm/typeorm/models/LatestApprovedNote";
import { InvestmentPlanStatus } from "../infrastructure/orm/typeorm/models/InvestmentPlan";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import {
  AppraisalStatementStatusType,
  InspectionStatementStatusType,
  InvestmentPlanStatusType
} from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class AppraisalStatementAppUseCases extends NoteAppUseCases {
  private static relations = [
    "city",
    "district",
    "ward",
    "street",
    "assignee",
    "instructor",
    "approvedBy",
    "executionBy",
    "completedBy",
    "createdBy",
    "updatedBy",
    "inspectionStatement",
    "inspectionStatement.assignee",
    "inspectionStatement.approvedBy",
    "inspectionStatement.createdBy",
    "inspectionStatement.updatedBy",
    "auditDetails",
  ];

  private static relationsList = [
    "city",
    "district",
    "ward",
    "street",
    "assignee",
    "approvedBy",
    "inspectionStatement",
    "inspectionStatement.assignee",
    "inspectionStatement.approvedBy",
    "inspectionStatement.createdBy",
    "inspectionStatement.updatedBy",
    "property",
  ];

  static accountEvents = {
    HOAN_THANH: AccountEventType.TH.HOAN_THANH,
    GUI_DUYET: AccountEventType.TH.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.TH.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.TH.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.TH.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.AppraisalStatement;

  public static async get(
    id: number,
    beans: {
      appraisalStatementRepository: IAppraisalStatementRepository;
    }
  ): Promise<any> {
    return await this.doGet(
      id,
      beans.appraisalStatementRepository,
      this.relations
    );
  }

  public static async getRatio(
    id: number,
    beans: {
      appraisalStatementRepository: IAppraisalStatementRepository;
      appraisalStatementRatioViewRepository: IAppraisalStatementRatioViewRepository;
    }
  ): Promise<any> {
    return await beans.appraisalStatementRatioViewRepository.findOne({
      where: {
        id,
      }
    });
  }

  public static async sendTHNotification(
    note: any,
    account: Account,
    action: string,
    beans: {
      eventEmitter: EventEmitterService,
      appraisalStatementRepository: IAppraisalStatementRepository
    },
    sendMoreAccounts: number[] = []
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.appraisalStatementRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;
    if (action === NOTIFICATION.TH.CAP_NHAT_NGUOI_THUC_HIEN) {
      data["new"] = note.assignee.displayName;
    }

    beans.eventEmitter.emit(
      EVENT.CREATE_NOTIFICATION,
      {
        refCode: note.noteId,
        propertyId: note.propertyId,
        refId: note.id,
        group: NotificationGroup.TH,
        action,
        createdBy: account.id,
        updatedBy: account.id,
        url: `/appraisal/statement/view/${note.id}`,
        data,
      },
      account.id,
      sendMoreAccounts
    );
  }

  public static async create(
    payload: ChangeableAppraisalStatementSerializer,
    account: Account,
    beans: {
      appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>;
      appraisalStatementRepository: IAppraisalStatementRepository;
      accountRepository: IAccountRepository;
      propertyRepository: IPropertyRepository;
      inspectionStatementRepository: IInspectionStatementRepository;
      propertyManager: IPropertyManager;
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    const data: AppraisalStatement = plainToClass(AppraisalStatement, payload);
    await Account.updateAuditInfoForList(data.auditDetails, account.id);
    await this.checkInspectionStatement(
      data.inspectionStatementId,
      data.propertyId,
      beans
    );
    await this.checkAuditDetails(data.auditDetails, beans);

    const { rv } = await this.doCreate<AppraisalStatementStatusType, ChangeableAppraisalStatementSerializer>(
      data,
      account,
      beans.appraisalStatementManager,
      beans.appraisalStatementRepository,
      beans,
      AppraisalStatementStatus.Drafting,
      PropertyProgressType.TDHT,
    );

    await this.changePropertyBusinessStatus(payload, account, beans);
    return await this.get(rv.id, beans);
  }

  public static async update(
    id: number,
    payload: ChangeableAppraisalStatementSerializer,
    account: Account,
    beans: {
      appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>;
      appraisalStatementRepository: IAppraisalStatementRepository;
      appraisalAuditDetailRepository: IAppraisalAuditDetailRepository;
      accountRepository: IAccountRepository;
      propertyRepository: IPropertyRepository;
      inspectionStatementRepository: IInspectionStatementRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    const data = plainToClass(AppraisalStatement, payload);
    await Account.updateAuditInfoForList(data.auditDetails, account.id);
    await this.checkInspectionStatement(
      data.inspectionStatementId,
      payload.propertyId,
      beans
    );
    await this.checkAuditDetails(data.auditDetails, beans);

    const { noteBeforeUpdate } = await this.doUpdate<AppraisalStatementStatusType, ChangeableAppraisalStatementSerializer>(
      id,
      data,
      account,
      beans.appraisalStatementRepository,
      beans,
      [AppraisalStatementStatus.Drafting, AppraisalStatementStatus.Rejected],
      AppraisalStatementStatus.Drafting,
      beans.appraisalStatementManager,
      PropertyProgressType.TDHT,
    );

    await beans.appraisalAuditDetailRepository.delete({
      appraisalStatementId: null,
    });
    await this.changePropertyBusinessStatus(payload, account, beans);

    const result = await this.get(id, beans);
    if (noteBeforeUpdate.assigneeId !== result.assigneeId) {
      await this.sendTHNotification(
        result,
        account,
        NOTIFICATION.TH.CAP_NHAT_NGUOI_THUC_HIEN,
        beans
      );
    }
    return result;
  }

  public static async getAll(
    queryOptions: QueryAppraisalStatementSerializer,
    account: Account,
    withPermission: boolean,
    beans: {
      appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>;
      appraisalStatementRepository: IAppraisalStatementRepository;
    }
  ): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    let queryWheres = {};
    const alias = "appraisalStatement";

    const [
      result,
      total,
    ] = (await beans.appraisalStatementRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: this.relationsList,
      join: {
        alias,
        leftJoinAndSelect: { property: "appraisalStatement.property" },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        queryWheres = {
          ...queryWheres,
          ...Utilities.buildWhereSearchFromAndTo(
            queryOptions.priceFrom,
            queryOptions.priceTo,
            "propertyUnitPricePPSS"
          ),
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
    })) as [Readonly<any[]>, number];

    return {
      data: result,
      total,
    };
  }

  public static async updateStatus(
    data: ChangeStatusNoteSerializer,
    account: Account,
    beans: {
      appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>;
      appraisalStatementRepository: IAppraisalStatementRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      accountEventRepository: IAccountEventRepository;
      latestApprovedNoteRepository: ILatestApprovedNoteRepository;
      propertyRepository: IPropertyRepository;
      propertyProgressRepository: IPropertyProgressRepository;
    }
  ): Promise<any> {
    const note = (await beans.appraisalStatementRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property"],
    })) as Readonly<AppraisalStatement>;
    await AppraisalStatement.validate(note);

    const currentTime = await Utilities.currentTime();
    const customUpdated =
      data.status === AppraisalStatementStatus.Finished
        ? {
          completedAt: currentTime,
          completedBy: account.id,
        }
        : {};
    const statusGenerateNote = AppraisalStatementStatus.Finished;
    const checkPropertyWithNewStatuses = [AppraisalStatementStatus.Pending, AppraisalStatementStatus.Approved];
    
    await this.doUpdateStatus<AppraisalStatementStatusType>(
      note,
      data,
      statusGenerateNote,
      customUpdated,
      account,
      beans.appraisalStatementManager,
      beans.appraisalStatementRepository,
      AppraisalStatementStatus.Approved,
      AppraisalStatementStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.TDHT,
    );

    const result = await this.get(data.id, beans);
    if (data.status === AppraisalStatementStatus.Finished) {
      await this.sendTHNotification(
        result,
        account,
        NOTIFICATION.TH.HOAN_THANH,
        beans
      );
      await this.triggerAccountActivity<AppraisalStatement>(result, ActivityGroup.TH, account, ACTIVITY.TH.HOAN_THANH, beans);
    } else if (data.status === AppraisalStatementStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendTHNotification(
        result,
        account,
        NOTIFICATION.TH.GUI_DUYET,
        beans
      );
      await this.triggerAccountActivity<AppraisalStatement>(result, ActivityGroup.TH, account, ACTIVITY.TH.GUI_DUYET, beans);
    } else if (data.status === AppraisalStatementStatus.Approved) {
      await beans.latestApprovedNoteRepository.updateOrCreate({
        refId: note.id,
        accountId: account.id,
        propertyId: note.property.id,
        type: NoteType.TH,
      });
      await beans.propertyManager.updateStatusWhenApprovedTHNote(
        note.property,
        account.id
      );
      await this.sendTHNotification(
        result,
        account,
        NOTIFICATION.TH.PHE_DUYET,
        beans
      );
      await this.triggerAccountActivity<AppraisalStatement>(result, ActivityGroup.TH, account, ACTIVITY.TH.PHE_DUYET, beans);
    } else if (data.status === AppraisalStatementStatus.Rejected) {
      await this.sendTHNotification(
        result,
        account,
        note.status === AppraisalStatementStatus.Finished
          ? NOTIFICATION.TH.TU_CHOI_HOAN_THANH
          : NOTIFICATION.TH.TU_CHOI_GUI_DUYET,
        beans
      );
      await this.triggerAccountActivity<AppraisalStatement>(result, ActivityGroup.TH, account, ACTIVITY.TH.TU_CHOI, beans, data.rejectionNote);
    }

    return result;
  }

  private static async checkInspectionStatement(
    inspectionStatementId: number,
    propertyId: number,
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository;
    }
  ): Promise<void> {
    if (inspectionStatementId) {
      await beans.inspectionStatementRepository.findOneOrFail({
        id: inspectionStatementId,
        propertyId,
        status: InspectionStatementStatus.Approved,
        isDeleted: false,
      });
    }
  }

  private static async checkAuditDetails(
    auditDetails: AppraisalAuditDetail[],
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository;
    }
  ): Promise<void> {
    const inspectionStatementIds = (auditDetails || []).map(
      (el: { inspectionStatementId: number }) => el.inspectionStatementId
    );
    if (inspectionStatementIds && inspectionStatementIds.length > 0) {
      await beans.inspectionStatementRepository.findOneOrFail({
        id: In(inspectionStatementIds),
        status: InspectionStatementStatus.Approved,
      });
    }
  }

  public static async delete(
    id: number,
    account: Account,
    beans: {
      appraisalStatementRepository: IAppraisalStatementRepository,
      investmentPlanRepository: IInvestmentPlanRepository,
      eventEmitter: EventEmitterService,
      appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [AppraisalStatementStatus.Drafting, AppraisalStatementStatus.Approved];
    const noteIdName = "appraisalStatementId";
    const childOfNoteDeleteStatus = InvestmentPlanStatus.Deleted;
    const childOfNoteRepository = beans.investmentPlanRepository;
    const note = await this.doDelete<AppraisalStatementStatusType, InvestmentPlanStatusType>(
      id,
      beans.appraisalStatementRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      AppraisalStatementStatus.Drafting,
      AppraisalStatementStatus.Deleted,
      childOfNoteDeleteStatus,
      childOfNoteRepository,
      beans.appraisalStatementManager,
      beans
    );

    await this.triggerAccountActivity<AppraisalStatement>(note, ActivityGroup.TH, account, ACTIVITY.TH.XOA, beans);

    if (note.status === AppraisalStatementStatus.Approved) {
      await this.sendTHNotification(note, account, NOTIFICATION.TH.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(id, beans.appraisalStatementRepository, []);
  }

  public static async restore(
    id: number,
    account: Account,
    beans: {
      appraisalStatementRepository: IAppraisalStatementRepository;
      inspectionStatementRepository: IInspectionStatementRepository;
      appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [AppraisalStatementStatus.Deleted];
    const parentOfNoteValidStatusList = [InspectionStatementStatus.Approved];
    const parentOfNoteQueryCheckValid = {
      isDeleted: false
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "inspectionStatementId";
    const parentOfNoteRepository = beans.inspectionStatementRepository;
    await this.doRestore<AppraisalStatementStatusType, InspectionStatementStatusType>(
      id,
      beans.appraisalStatementRepository,
      account,
      AppraisalStatementStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.appraisalStatementManager,
    );
    return await this.get(id, beans);
  }

  private static async changePropertyBusinessStatus(
    payload: ChangeableAppraisalStatementSerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
    }
  ) {
    if (payload.propertyId) {
      const property = await beans.propertyRepository.findOneOrFail(
        payload.propertyId
      );
      await beans.propertyManager.updateStatusWhenCreateNote(
        property,
        BusinessStatus.Verifying,
        account.id
      );
    }
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      appraisalStatementThisMonthStatisticsViewRepository: IAppraisalStatementThisMonthStatisticsViewRepository;
      appraisalStatementLastMonthStatisticsViewRepository: IAppraisalStatementLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.appraisalStatementThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.appraisalStatementLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }
}
