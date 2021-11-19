import { Account } from "../domain/models/Account";
import {
  ChangeableInspectionExpectationSerializer,
  QueryInspectionExpectationSerializer
} from "../interfaces/serializers/InspectionExpectationSerializer";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAppraisalExpectationRepository,
  IBaseRepository,
  IInspectionExpectationLastMonthStatisticsViewRepository,
  IInspectionExpectationManager,
  IInspectionExpectationRepository,
  IInspectionExpectationThisMonthStatisticsViewRepository,
  IInvestmentPlanRepository,
  IPropertyManager,
  IPropertyProgressRepository,
  IPropertyRepository,
} from "../domain/services/contract";
import { InspectionExpectation, InspectionExpectationStatus, } from "../domain/models/InspectionExpectation";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import NoteAppUseCases from "./NoteAppUseCases";
import { InvestmentPlanStatus } from "../infrastructure/orm/typeorm/models/InvestmentPlan";
import { AccountEventModel, AccountEventType } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { AppraisalExpectationStatus, } from "../infrastructure/orm/typeorm/models/AppraisalExpectation";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import {
  AppraisalExpectationStatusType,
  InspectionExpectationStatusType,
  InvestmentPlanStatusType
} from "../infrastructure/types/Note";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";

export default class InspectionExpectationAppUseCases extends NoteAppUseCases {

  private static baseRelations = [
    "createdBy", "updatedBy", "approvedBy", "assignee", "company", "instructor",
    "city", "district", "ward", "street",
  ];

  private static investmentPlanRelations = [
    "investmentPlan", "investmentPlan.assignee", "investmentPlan.approvedBy", "investmentPlan.createdBy", "investmentPlan.updatedBy",
  ];

  private static propertyRelations = [
    "property", "property.approvedBy", "property.createdBy", "property.updatedBy",
  ];

  private static relations = [
    ...InspectionExpectationAppUseCases.baseRelations,
    ...InspectionExpectationAppUseCases.investmentPlanRelations,
  ];

  private static relationsList = [
    ...InspectionExpectationAppUseCases.baseRelations,
    ...InspectionExpectationAppUseCases.investmentPlanRelations,
    ...InspectionExpectationAppUseCases.propertyRelations,
  ];

  static accountEvents = {
    GUI_DUYET: AccountEventType.KU.GUI_DUYET,
    NGUOI_THUC_HIEN_TRUOC: AccountEventType.KU.NGUOI_THUC_HIEN_TRUOC,
    NGUOI_THUC_HIEN: AccountEventType.KU.NGUOI_THUC_HIEN,
    NGUOI_XOA: AccountEventType.KU.NGUOI_XOA,
  };
  static accountEventModel = AccountEventModel.InspectionExpectation;

  public static async sendKUNotification(
    note: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService, inspectionExpectationRepository: IInspectionExpectationRepository },
    sendMoreAccounts: number[] = [],
  ) {
    const address = await this.generateAddressForSendNotification(note.id, beans.inspectionExpectationRepository);
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
      ...address
    } as any;
    if (action === NOTIFICATION.KU.CAP_NHAT_NGUOI_THUC_HIEN) {
      data["new"] = note.assignee.displayName;
    }

    beans.eventEmitter.emit(EVENT.CREATE_NOTIFICATION, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: NotificationGroup.KU,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      url: `/inspection/expectation/view/${note.id}`,
      data,
    }, account.id, sendMoreAccounts);
  }

  public static async get(id: number, beans: {
    inspectionExpectationRepository: IInspectionExpectationRepository;
  }): Promise<any> {
    return await this.doGet(id, beans.inspectionExpectationRepository, this.relations);
  }

  public static async create(
    data: ChangeableInspectionExpectationSerializer,
    account: Account,
    beans: {
      inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>,
      inspectionExpectationRepository: IInspectionExpectationRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      accountRepository: IAccountRepository,
      investmentPlanRepository: IInvestmentPlanRepository,
      accountEventRepository: IAccountEventRepository,
    }): Promise<any> {
    await this.checkInvestmentPlan(data.investmentPlanId, data.propertyId, beans);
    const {
      rv,
      property,
    } = await this.doCreate<InspectionExpectationStatusType, ChangeableInspectionExpectationSerializer>(
      data, account,
      beans.inspectionExpectationManager,
      beans.inspectionExpectationRepository,
      beans,
      InspectionExpectationStatus.Drafting,
      PropertyProgressType.KSUT,
    );
    await beans.propertyManager.updateStatusWhenCreateKUNote(property, account.id);

    return await this.get(rv.id, beans);
  }

  public static async update(
    id: number,
    data: ChangeableInspectionExpectationSerializer,
    account: Account,
    beans: {
      inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>,
      inspectionExpectationRepository: IInspectionExpectationRepository,
      propertyRepository: IPropertyRepository,
      propertyManager: IPropertyManager,
      inspectionExpectationPlanLandRepository: IBaseRepository,
      inspectionExpectationPlanItemRepository: IBaseRepository,
      inspectionExpectationAdvantageLevelRepository: IBaseRepository,
      inspectionExpectationDisadvantageLevelRepository: IBaseRepository,
      accountRepository: IAccountRepository,
      investmentPlanRepository: IInvestmentPlanRepository,
      accountEventRepository: IAccountEventRepository,
      eventEmitter: EventEmitterService,
    }): Promise<any> {
    await this.checkInvestmentPlan(data.investmentPlanId, data.propertyId, beans);
    const {
      rv,
      property,
      noteBeforeUpdate
    } = await this.doUpdate<InspectionExpectationStatusType, ChangeableInspectionExpectationSerializer>(
      id, data, account,
      beans.inspectionExpectationRepository,
      beans,
      [InspectionExpectationStatus.Drafting, InspectionExpectationStatus.Rejected],
      InspectionExpectationStatus.Drafting,
      beans.inspectionExpectationManager,
      PropertyProgressType.KSUT,
    );

    await beans.inspectionExpectationAdvantageLevelRepository.delete({ planLandId: null });
    await beans.inspectionExpectationDisadvantageLevelRepository.delete({ planLandId: null });
    await beans.inspectionExpectationPlanLandRepository.delete({ planItemId: null });
    await beans.inspectionExpectationPlanItemRepository.delete({ inspectionExpectationId: null });

    await beans.propertyManager.updateStatusWhenCreateKUNote(property, account.id);

    const result = await this.get(id, beans);
    if (noteBeforeUpdate.assigneeId !== result.assigneeId) {
      await this.sendKUNotification(result, account, NOTIFICATION.KU.CAP_NHAT_NGUOI_THUC_HIEN, beans);
    }

    return result;
  }

  public static async getAll(
    queryOptions: QueryInspectionExpectationSerializer,
    account: Account,
    withPermission: boolean,
    beans: {
      inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>,
      inspectionExpectationRepository: IInspectionExpectationRepository,
    }): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const queryOptionsFull = await this.getQueryOptionFull(queryOptions);
    const queryWheres = {};
    const alias = "inspectionExpectation";

    const [result, total] = await beans.inspectionExpectationRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: this.relationsList,
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

  public static async updateStatus(data: ChangeStatusNoteSerializer, account: Account, beans: {
    inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>,
    inspectionExpectationRepository: IInspectionExpectationRepository,
    propertyRepository: IPropertyRepository,
    propertyManager: IPropertyManager,
    accountEventRepository: IAccountEventRepository,
    eventEmitter: EventEmitterService,
    propertyProgressRepository: IPropertyProgressRepository,
  }): Promise<any> {
    const note = await beans.inspectionExpectationRepository.findOneOrFail({
      where: { id: data.id },
      relations: ["property"]
    }) as Readonly<any>;

    await InspectionExpectation.validate(note);

    const customUpdated = {};
    const statusGenerateNote = InspectionExpectationStatus.Pending;
    const checkPropertyWithNewStatuses = [InspectionExpectationStatus.Pending, InspectionExpectationStatus.Approved];
    
    await this.doUpdateStatus<InspectionExpectationStatusType>(
      note, data,
      statusGenerateNote, customUpdated, account,
      beans.inspectionExpectationManager,
      beans.inspectionExpectationRepository,
      InspectionExpectationStatus.Approved,
      InspectionExpectationStatus.Rejected,
      checkPropertyWithNewStatuses,
      beans,
      PropertyProgressType.KSUT,
    );
    if (data.status === InspectionExpectationStatus.Approved) {
      await beans.propertyManager.updateStatusWhenApprovedKUNote(note.property, account.id);
    }

    const result = await this.get(data.id, beans);
    if (data.status === InspectionExpectationStatus.Pending) {
      await this.saveEventAccountForSubmit(data.id, account.id, beans);
      await this.sendKUNotification(result, account, NOTIFICATION.KU.GUI_DUYET, beans);
      await this.triggerAccountActivity<InspectionExpectation>(result, ActivityGroup.KU, account, ACTIVITY.KU.GUI_DUYET, beans);
    } else if (data.status === InspectionExpectationStatus.Approved) {
      await this.sendKUNotification(result, account, NOTIFICATION.KU.PHE_DUYET, beans);
      await this.triggerAccountActivity<InspectionExpectation>(result, ActivityGroup.KU, account, ACTIVITY.KU.PHE_DUYET, beans);
    } else if (data.status === InspectionExpectationStatus.Rejected) {
      await this.sendKUNotification(result, account, NOTIFICATION.KU.TU_CHOI, beans);
      await this.triggerAccountActivity<InspectionExpectation>(result, ActivityGroup.KU, account, ACTIVITY.KU.TU_CHOI, beans, data.rejectionNote);
    }
    return result;
  }

  public static async delete(
    id: number,
    account: Account,
    beans: {
      inspectionExpectationRepository: IInspectionExpectationRepository,
      appraisalExpectationRepository: IAppraisalExpectationRepository,
      eventEmitter: EventEmitterService,
      inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>,
      accountEventRepository: IAccountEventRepository,
    }
  ): Promise<any> {
    const canDeleteStatusList = [InspectionExpectationStatus.Drafting, InspectionExpectationStatus.Approved];
    const noteIdName = "inspectionExpectationId";
    const childOfNoteDeleteStatus = AppraisalExpectationStatus.Deleted;
    const childOfNoteRepository = beans.appraisalExpectationRepository;
    const note = await this.doDelete<InspectionExpectationStatusType, AppraisalExpectationStatusType>(
      id,
      beans.inspectionExpectationRepository,
      noteIdName,
      account,
      canDeleteStatusList,
      InspectionExpectationStatus.Drafting,
      InspectionExpectationStatus.Deleted,
      childOfNoteDeleteStatus,
      childOfNoteRepository,
      beans.inspectionExpectationManager,
      beans
    );
    await this.triggerAccountActivity<InspectionExpectation>(note, ActivityGroup.KU, account, ACTIVITY.KU.XOA, beans);
    if (note.status === InspectionExpectationStatus.Approved) {
      await this.sendKUNotification(note, account, NOTIFICATION.KU.XOA_DA_DUYET, beans);
    }
    return await this.doGetExcludeStatus(id, beans.inspectionExpectationRepository, []);
  }

  public static async restore(
    id: number,
    account: Account,
    beans: {
      inspectionExpectationRepository: IInspectionExpectationRepository;
      investmentPlanRepository: IInvestmentPlanRepository;
      inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>;
    }
  ): Promise<any> {
    const canRestoreStatusList = [InspectionExpectationStatus.Deleted];
    const parentOfNoteValidStatusList = [InvestmentPlanStatus.Approved];
    const parentOfNoteQueryCheckValid = {
      isDeleted: false
    }; // Note: parent of note is property use { isActive: true }, parent of note is note use : { isDeleted: false } 
    const parentOfNoteIdName = "investmentPlanId";
    const parentOfNoteRepository = beans.investmentPlanRepository;
    await this.doRestore<InspectionExpectationStatusType, InvestmentPlanStatusType>(
      id,
      beans.inspectionExpectationRepository,
      account,
      AppraisalExpectationStatus.Approved,
      canRestoreStatusList,
      parentOfNoteIdName,
      parentOfNoteRepository,
      parentOfNoteQueryCheckValid,
      parentOfNoteValidStatusList,
      beans.inspectionExpectationManager,
    );
    return await this.get(id, beans);
  }

  private static async checkInvestmentPlan(investmentPlanId: number, propertyId: number, beans: {
    investmentPlanRepository: IInvestmentPlanRepository,
  }): Promise<void> {
    if (investmentPlanId) {
      await beans.investmentPlanRepository.findOneOrFail({
        id: investmentPlanId,
        propertyId,
        status: InvestmentPlanStatus.Approved,
        isDeleted: false,
      });
    }
  }

  public static async getFullNoteStatistic(
    account: Account,
    beans: {
      inspectionExpectationThisMonthStatisticsViewRepository: IInspectionExpectationThisMonthStatisticsViewRepository;
      inspectionExpectationLastMonthStatisticsViewRepository: IInspectionExpectationLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {

    const thisMonth = await this.getNoteStatistics(account.id, beans.inspectionExpectationThisMonthStatisticsViewRepository);
    const lastMonth = await this.getNoteStatistics(account.id, beans.inspectionExpectationLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }

}
