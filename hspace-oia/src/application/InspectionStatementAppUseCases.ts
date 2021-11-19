import { Account } from "../domain/models/Account";
import { AppraisalStatementStatus } from "../domain/models/AppraisalStatement";
import {
  ChangeableInspectionStatementSerializer,
  QueryInspectionStatementSerializer
} from "../interfaces/serializers/InspectionStatementSerializer";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAppraisalStatementRepository,
  IBaseRepository,
  IInspectionStatementLastMonthStatisticsViewRepository,
  IInspectionStatementManager,
  IInspectionStatementRepository,
  IInspectionStatementThisMonthStatisticsViewRepository,
  ILatestApprovedNoteRepository,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository
} from "../domain/services/contract";
import { InspectionStatementStatus, } from "../infrastructure/orm/typeorm/models/InspectionStatement";
import { BusinessStatus, PropertyStatus } from "../infrastructure/orm/typeorm/models/Property";
import { In } from "typeorm";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import NoteAppUseCases from "./NoteAppUseCases";
import { InspectionStatement } from "../domain/models/InspectionStatement";
import { AccountEventModel, AccountEventType } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { NoteType } from "../infrastructure/orm/typeorm/models/LatestApprovedNote";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import { PropertyStatusType } from "../infrastructure/types/Property";
import { AppraisalStatementStatusType, InspectionStatementStatusType } from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { Utilities } from "./utils";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class InspectionStatementAppUseCases extends NoteAppUseCases {
  private static relations = [
    "createdBy", "updatedBy", "approvedBy", "assignee", "company", "instructor",
    "city", "ward", "district", "street", "streetGroup", "positionGroup", "broker",
    "advantageLevels", "advantageLevels.group", "advantageLevels.type",
    "disadvantageLevels", "disadvantageLevels.group", "disadvantageLevels.type",
  ];

  static accountEvents = {
    GUI_DUYET: AccountEventType.KH.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.KH.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.KH.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.KH.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.InspectionStatement;

  static propertyLinkAvailableStatuses = [PropertyStatus.Approved, PropertyStatus.Transacted];

  public static async sendKHNotification(
    note: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService, inspectionStatementRepository: IInspectionStatementRepository },
    sendMoreAccounts: number[] = [],
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.inspectionStatementRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;
    if (action === NOTIFICATION.KH.CAP_NHAT_NGUOI_THUC_HIEN) {
      data["new"] = note.assignee.displayName;
    }

    beans.eventEmitter.emit(EVENT.CREATE_NOTIFICATION, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: NotificationGroup.KH,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      url: `/inspection/statement/view/${note.id}`,
      data,
    }, account.id, sendMoreAccounts);
  }

  public static async create(
    data: ChangeableInspectionStatementSerializer,
    account: Account,
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository;
      inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountRepository: IAccountRepository,
      accountEventRepository: IAccountEventRepository,
    }): Promise<any> {
    const {
      rv,
      property
    } = await this.doCreate<InspectionStatementStatusType, ChangeableInspectionStatementSerializer>(
      data, account,
      beans.inspectionStatementManager,
      beans.inspectionStatementRepository,
      beans,
      InspectionStatementStatus.Drafting,
      PropertyProgressType.KSHT,
    );
    await beans.propertyManager.updateStatusWhenCreateKHNote(property, account.id);

    return await this.get(rv.id, beans);
  }

  public static async get(id: number, beans: {
    inspectionStatementRepository: IInspectionStatementRepository;
  }): Promise<any> {
    return await this.doGet(id, beans.inspectionStatementRepository, this.relations);
  }

  public static async update(id: number, data: ChangeableInspectionStatementSerializer, account: Account, beans: {
    inspectionStatementRepository: IInspectionStatementRepository;
    inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    advantageLevelRepository: IBaseRepository,
    disadvantageLevelRepository: IBaseRepository,
    accountRepository: IAccountRepository,
    accountEventRepository: IAccountEventRepository,
    eventEmitter: EventEmitterService,
    propertyProgressRepository: IPropertyProgressRepository,
  }): Promise<any> {
    let property: any = null;
    if (data.propertyId) {
      property = await this.getAvailableProperty(data.propertyId, beans);
    }

    const note = await beans.inspectionStatementRepository.findOneOrFail({
      id,
      status: In([InspectionStatementStatus.Drafting, InspectionStatementStatus.Rejected]),
      isDeleted: false,
    });
    await this.checkAssignee(data.assigneeId, beans);
    await this.checkInstructor(data.instructorId, beans);
    const classes = await beans.inspectionStatementManager.classify(InspectionStatementStatus.Drafting, false);
    await beans.inspectionStatementRepository.save({
      id,
      ...data,
      updatedBy: account.id,
      status: InspectionStatementStatus.Drafting,
      ...(note.status !== InspectionStatementStatus.Drafting ? { changedStatusTime: new Date() } : {}),
      classes,
      ...(note.status !== InspectionStatementStatus.Drafting ? {
        version: Utilities.increaseMajorVersion(note.version),
      } : {
        version: Utilities.increasePatchVersion(note.version),
      }),
    });
    await beans.advantageLevelRepository.delete({ inspectionStatementId: null });
    await beans.disadvantageLevelRepository.delete({ inspectionStatementId: null });

    await beans.propertyManager.updateStatusWhenCreateKHNote(property, account.id);

    const result = await this.get(id, beans);

    if (note.assigneeId !== result.assigneeId) {
      await this.saveEventAccountForAssignee(id, note.assigneeId, result.assigneeId, account, beans);
      await this.sendKHNotification(result, account, NOTIFICATION.KH.CAP_NHAT_NGUOI_THUC_HIEN, beans);
    }

    if (result.propertyId) {
      await beans.propertyProgressRepository.save({
        propertyId: result.propertyId,
        type: PropertyProgressType.KSHT,
        createdBy: account.id,
      });
    }

    return result;
  }

  public static async getAll(
    queryOptions: QueryInspectionStatementSerializer,
    account: Account,
    withPermission: boolean,
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository,
      inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>,
    }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    const queryWheres = {};
    const alias = "inspectionStatement";

    const [result, total] = await beans.inspectionStatementRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["city", "ward", "district", "street", "assignee"],
      join: {
        alias,
        leftJoinAndSelect: { property: "inspectionStatement.property" }
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
    inspectionStatementRepository: IInspectionStatementRepository;
    inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    accountEventRepository: IAccountEventRepository,
    eventEmitter: EventEmitterService,
    latestApprovedNoteRepository: ILatestApprovedNoteRepository,
    propertyProgressRepository: IPropertyProgressRepository,
  }): Promise<any> {
    const note = await beans.inspectionStatementRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property", "advantageLevels", "disadvantageLevels",]
    }) as Readonly<any>;
    await InspectionStatement.validate(note);
    const customUpdated = {};
    const statusGenerateNote = InspectionStatementStatus.Pending;
    const checkPropertyWithNewStatuses = [InspectionStatementStatus.Pending, InspectionStatementStatus.Approved];

    await this.doUpdateStatus<InspectionStatementStatusType>(
      note, data, statusGenerateNote,
      customUpdated, account,
      beans.inspectionStatementManager,
      beans.inspectionStatementRepository,
      InspectionStatementStatus.Approved,
      InspectionStatementStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.KSHT,
    );

    if (data.status === InspectionStatementStatus.Approved) {
      await beans.propertyManager.updateStatusWhenCreateNote(note.property, BusinessStatus.Verifying, account.id);
      await beans.latestApprovedNoteRepository.updateOrCreate({
        refId: note.id,
        accountId: account.id,
        propertyId: note.property.id,
        type: NoteType.KH,
      });
    }

    const result = await this.get(data.id, beans);
    if (data.status === InspectionStatementStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendKHNotification(result, account, NOTIFICATION.KH.GUI_DUYET, beans);
      await this.triggerAccountActivity<InspectionStatement>(result, ActivityGroup.KH, account, ACTIVITY.KH.GUI_DUYET, beans);
    } else if (data.status === InspectionStatementStatus.Approved) {
      await this.sendKHNotification(result, account, NOTIFICATION.KH.PHE_DUYET, beans);
      await this.triggerAccountActivity<InspectionStatement>(result, ActivityGroup.KH, account, ACTIVITY.KH.PHE_DUYET, beans);
    } else if (data.status === InspectionStatementStatus.Rejected) {
      await this.sendKHNotification(result, account, NOTIFICATION.KH.TU_CHOI, beans);
      await this.triggerAccountActivity<InspectionStatement>(result, ActivityGroup.KH, account, ACTIVITY.KH.TU_CHOI, beans, data.rejectionNote);
    }
    return result;
  }

  public static async delete(
    id: number,
    account: Account,
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository,
      appraisalStatementRepository: IAppraisalStatementRepository,
      eventEmitter: EventEmitterService,
      inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [InspectionStatementStatus.Drafting, InspectionStatementStatus.Approved];
    const noteIdName = "inspectionStatementId";
    const childOfNoteDeleteStatus = AppraisalStatementStatus.Deleted;
    const childOfNoteRepository = beans.appraisalStatementRepository;
    const note = await this.doDelete<InspectionStatementStatusType, AppraisalStatementStatusType>(
      id,
      beans.inspectionStatementRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      InspectionStatementStatus.Drafting,
      InspectionStatementStatus.Deleted,
      childOfNoteDeleteStatus,
      childOfNoteRepository,
      beans.inspectionStatementManager,
      beans
    );

    await this.triggerAccountActivity<InspectionStatement>(note, ActivityGroup.KH, account, ACTIVITY.KH.XOA, beans);

    if (note.status === InspectionStatementStatus.Approved) {
      await this.sendKHNotification(note, account, NOTIFICATION.KH.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(id, beans.inspectionStatementRepository, []);
  }

  public static async restore(
    id: number,
    account: Account,
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository;
      appraisalStatementRepository: IAppraisalStatementRepository;
      propertyRepository: IPropertyRepository;
      inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [InspectionStatementStatus.Deleted];
    const parentOfNoteValidStatusList = [PropertyStatus.Approved, PropertyStatus.Transacted];
    const parentOfNoteQueryCheckValid = {
      isActive: true
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "propertyId";
    const parentOfNoteRepository = beans.propertyRepository;
    await this.doRestore<InspectionStatementStatusType, PropertyStatusType>(
      id,
      beans.inspectionStatementRepository,
      account,
      InspectionStatementStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.inspectionStatementManager,
    );
    return await this.get(id, beans);
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      inspectionStatementThisMonthStatisticsViewRepository: IInspectionStatementThisMonthStatisticsViewRepository;
      inspectionStatementLastMonthStatisticsViewRepository: IInspectionStatementLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.inspectionStatementThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.inspectionStatementLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }
}
