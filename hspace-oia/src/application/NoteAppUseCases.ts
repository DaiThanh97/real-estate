import {
  IAccountEventRepository,
  IAccountRepository,
  INoteManager,
  INoteRepository,
  IPropertyProgressRepository,
  IPropertyRepository,
  IViewRepository,
} from "../domain/services/contract";
import { Account, EAccountType } from "../domain/models/Account";
import { PropertyStatus } from "../infrastructure/orm/typeorm/models/Property";
import { Brackets, ILike, In, Not } from "typeorm";
import { Utilities } from "./utils";
import { ChangeStatusNoteSerializer } from "../interfaces/serializers/Base";
import { BadRequestError } from "../infrastructure/error";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import { ChangeableNoteSerializer } from "../interfaces/serializers/NoteSerializer";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { ActivityGroupType } from "../infrastructure/types/ActivityTemplate";

export default class NoteAppUseCases {
  protected manager: any;
  protected repository: any;

  protected static baseNoteRelations = [
    "property",
    "property.approvedBy",
    "property.createdBy",
    "property.updatedBy",
  ];

  static accountEvents: {
    HOAN_THANH?: string;
    GUI_DUYET: string;
    NGUOI_THUC_HIEN_TRUOC: string;
    NGUOI_THUC_HIEN: string;
    NGUOI_XOA: string;
  };
  static accountEventModel: string;

  static propertyLinkAvailableStatuses: string[] = [PropertyStatus.Approved];

  protected static async getAvailableProperty(
    propertyId: number,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<any> {
    return (await beans.propertyRepository.findOneOrFail({
      id: propertyId,
      status: In(this.propertyLinkAvailableStatuses),
      isActive: true,
    })) as Readonly<any>;
  }

  protected static async doCreate<NoteStatusType, T extends ChangeableNoteSerializer>(
    data: T,
    account: Account,
    manager: INoteManager<NoteStatusType>,
    repository: INoteRepository,
    beans: any,
    flowStatus: NoteStatusType,
    propertyProgressType: string,
  ): Promise<any> {
    let property: any;
    if (data.propertyId) {
      property = await this.getAvailableProperty(data.propertyId, beans);
    }
    await this.checkAssignee(data.assigneeId, beans);
    await this.checkInstructor(data.instructorId, beans);
    const noteId = await manager.generateNoteId(property);
    const classes = await manager.classify(flowStatus, false);

    const topic = await beans.topicRepository.save({
      isActive: true,
      createdBy: account.id,
      updatedBy: account.id,
    });

    const rv = await repository.save({
      ...data,
      noteId,
      createdBy: account.id,
      updatedBy: account.id,
      status: flowStatus,
      classes,
      topicId: topic.id,
    });

    await this.saveEventAccountForAssignee(
      rv.id,
      rv.assigneeId,
      rv.assigneeId,
      account,
      beans
    );

    if (property) {
      await beans.propertyProgressRepository.save({
        propertyId: property.id,
        type: propertyProgressType,
        createdBy: account.id,
      });
    }

    return { rv, property };
  }

  protected static async doUpdate<NoteStatusType, T extends ChangeableNoteSerializer>(
    id: number,
    data: T,
    account: Account,
    repository: INoteRepository,
    beans: any,
    canUpdateStatusList: NoteStatusType[],
    draftingStatus: NoteStatusType,
    manager: INoteManager<NoteStatusType>,
    propertyProgressType: string,
  ): Promise<any> {
    let property: any;
    const note = await repository.findOneOrFail(id);
    if (data.propertyId) {
      property = await this.getAvailableProperty(data.propertyId, beans);
    }
    await this.checkIdForUpdate<NoteStatusType>(id, repository, canUpdateStatusList);
    await this.checkAssignee(data.assigneeId, beans);
    await this.checkInstructor(data.instructorId, beans);
    const classes = await manager.classify(draftingStatus, false);

    const rv = await repository.save({
      id,
      ...data,
      updatedBy: account.id,
      status: draftingStatus, // force drafting when updated
      ...(note.status !== draftingStatus ? { changedStatusTime: new Date() } : {}),
      classes,
      ...(note.status !== draftingStatus ? {
        version: Utilities.increaseMajorVersion(note.version),
      } : {
        version: Utilities.increasePatchVersion(note.version),
      }),
    });

    if (note.assigneeId !== rv.assigneeId) {
      await this.saveEventAccountForAssignee(
        id,
        note.assigneeId,
        rv.assigneeId,
        account,
        beans
      );
    }

    if (property) {
      await beans.propertyProgressRepository.save({
        propertyId: property.id,
        type: propertyProgressType,
        createdBy: account.id,
      });
    }

    return { rv, property, noteBeforeUpdate: note };
  }

  protected static async doUpdateStatus<NoteStatusType>(
    note: any,
    data: ChangeStatusNoteSerializer,
    statusGenerateNote: NoteStatusType,
    customUpdated: any,
    account: Account,
    manager: INoteManager<NoteStatusType>,
    repository: INoteRepository,
    approvedStatus: NoteStatusType,
    rejectedStatus: NoteStatusType,
    checkPropertyWithNewStatuses: NoteStatusType[] = [],
    beans: {
      propertyRepository: IPropertyRepository;
      propertyProgressRepository: IPropertyProgressRepository;
    },
    propertyProgressType: string,
  ): Promise<any> {
    const currentStatus: NoteStatusType = note.status;
    const newStatus: NoteStatusType = data.status as unknown as NoteStatusType;
    if(note.propertyId && checkPropertyWithNewStatuses.includes(newStatus)){
      await this.checkAvailableProperty(note.propertyId, beans);
    }
    await manager.checkStatus(currentStatus, newStatus);
    let noteId = note.noteId;
    if (newStatus === statusGenerateNote) {
      noteId = await manager.generateNoteId(note.property, noteId);
    }
    const currentTime = await Utilities.currentTime();
    const classes = await manager.classify(newStatus, false);
    await repository.update(note.id, {
      status: newStatus,
      updatedBy: account.id,
      noteId,
      ...(newStatus === approvedStatus
        ? { approvedAt: currentTime, approvedBy: account.id }
        : {}),
      ...(newStatus === rejectedStatus
        ? {
          rejectionNote: data.rejectionNote,
          rejectedAt: currentTime,
          rejectedBy: account.id,
        }
        : {}),
      ...customUpdated,
      classes,
    });

    if (newStatus === approvedStatus) {
      await beans.propertyProgressRepository.save({
        propertyId: note.propertyId,
        type: propertyProgressType,
        createdBy: account.id,
      });
    }
  }

  protected static async checkInstructor(
    instructorId: number,
    beans: {
      accountRepository: IAccountRepository;
    }
  ): Promise<void> {
    if (instructorId) {
      await beans.accountRepository.findOneOrFail({
        id: instructorId,
        isActive: true,
        type: EAccountType.COLLABORATOR,
      });
    }
  }

  protected static async checkAssignee(
    assigneeId: number,
    beans: {
      accountRepository: IAccountRepository;
    }
  ): Promise<void> {
    if (assigneeId) {
      await beans.accountRepository.findOneOrFail({
        id: assigneeId,
        isActive: true,
        type: EAccountType.EMPLOYEE,
      });
    }
  }

  protected static async checkAvailableProperty(
    propertyId: number,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<void> {
    await this.getAvailableProperty(propertyId, beans);
  }

  protected static async checkIdForUpdate<NoteStatusType>(
    id: number,
    repository: any,
    canUpdateStatusList: NoteStatusType[]
  ): Promise<void> {
    await repository.findOneOrFail({
      id,
      status: In(canUpdateStatusList),
      isDeleted: false,
    });
  }

  protected static async doGet(
    id: number,
    repository: INoteRepository,
    relations: string[]
  ): Promise<any> {
    return (await repository.findOneOrFail({
      where: {
        id,
        isDeleted: false,
      },
      relations: [...relations, ...this.baseNoteRelations],
    })) as Readonly<any>;
  }

  protected static async doGetExcludeStatus(
    id: number,
    repository: INoteRepository,
    relations: string[]
  ): Promise<any> {
    return (await repository.findOneOrFail({
      where: {
        id,
      },
      relations: [...relations, ...this.baseNoteRelations],
    })) as Readonly<any>;
  }

  protected static async getQueryOptionFull(queryOptions: any): Promise<void> {
    await Utilities.setStartDate(queryOptions.createdFrom);
    await Utilities.setEndDate(queryOptions.createdTo);
    await Utilities.setStartDate(queryOptions.approvedFrom);
    await Utilities.setEndDate(queryOptions.approvedTo);
    const executionDataFrom =
      queryOptions.monthYear &&
      (await Utilities.getFirstDayMonth(queryOptions.monthYear));
    const executionDataTo =
      queryOptions.monthYear &&
      (await Utilities.getLastDayMonth(queryOptions.monthYear));

    return {
      ...queryOptions,
      executionDataFrom,
      executionDataTo,
    };
  }

  protected static async doGetAllQueryBuilder(
    qb: SelectQueryBuilder<any>,
    queryOptions: any,
    queryWheres: any = {},
    account: Account,
    withPermission: boolean,
    alias: string
  ) {
    qb.where({
      isDeleted: false,
      ...(queryOptions.propertyId
        ? { propertyId: queryOptions.propertyId }
        : {}),
      ...(queryOptions.address
        ? { address: ILike(`%${queryOptions.address}%`) }
        : {}),
      ...(queryOptions.noteId
        ? { noteId: ILike(`%${queryOptions.noteId}%`) }
        : {}),
      ...(queryOptions.noteType ? { noteType: queryOptions.noteType } : {}),
      ...(queryOptions.streetNumber
        ? { streetNumber: ILike(`%${queryOptions.streetNumber}%`) }
        : {}),
      ...(queryOptions.streetId ? { streetId: queryOptions.streetId } : {}),
      ...(queryOptions.wardId ? { wardId: queryOptions.wardId } : {}),
      ...(queryOptions.districtId
        ? { districtId: queryOptions.districtId }
        : {}),
      ...(queryOptions.assigneeId
        ? { assigneeId: queryOptions.assigneeId }
        : {}),
      ...(queryOptions.approvedBy
        ? { approvedBy: queryOptions.approvedBy }
        : {}),
      ...(queryOptions.status ? { status: queryOptions.status } : {}),
      ...Utilities.buildWhereSearchFromAndTo(
        queryOptions.createdFrom,
        queryOptions.createdTo,
        "createdAt"
      ),
      ...Utilities.buildWhereSearchFromAndTo(
        queryOptions.approvedFrom,
        queryOptions.approvedTo,
        "approvedAt"
      ),
      ...Utilities.buildWhereSearchFromAndTo(
        queryOptions.executionDataFrom,
        queryOptions.executionDataTo,
        "executionDate"
      ),
      ...queryWheres,
    });
    if (queryOptions.propertyCode) {
      qb.andWhere("property.code Like :propertyCode", {
        propertyCode: `%${queryOptions.propertyCode}%`,
      });
    }
    if (queryOptions.propertyStatus) {
      qb.andWhere("property.status = :propertyStatus", {
        propertyStatus: queryOptions.propertyStatus,
      });
    }
    Utilities.buildQueryEmployeeRule(account, "property", qb);
    // TODO updated by - [BDS-1244] Điều chỉnh thức năng Tìm chứng từ- Remove quyền theo user
    withPermission = false; 
    if (withPermission && account.type !== EAccountType.ADMIN) {
      qb.andWhere(new Brackets(qb2 => {
        qb2.orWhere(
          `${alias}.classes ?| (:arr)`, { arr: account.classes }
        ).orWhere(
          `${alias}.assignee_id = :personId`, { personId: account.id }
        );
      }));
    }
  }

  protected static async doDelete<NoteStatusType, ChildNoteStatusType>(
    id: number,
    repository: INoteRepository,
    noteIdName: string,
    account: Account,
    canDeleteStatusList: string[],
    draftingStatus: NoteStatusType,
    deletedStatus: NoteStatusType,
    childOfNoteDeleteStatus: ChildNoteStatusType,
    childOfNoteRepository: INoteRepository,
    manager: INoteManager<NoteStatusType>,
    beans: {
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    const note = (await repository.findOneOrFail({
      where: {
        id,
        isDeleted: false,
        status: In(canDeleteStatusList),
      },
    })) as Readonly<any>;
    if (note.status === draftingStatus) {
      await repository.update(id, {
        isDeleted: true,
        updatedBy: account.id,
      });
    } else {
      if (childOfNoteRepository) {
        await this.validateDeleteCheckExistChildOfNotes<ChildNoteStatusType>(
          id,
          noteIdName,
          childOfNoteDeleteStatus,
          childOfNoteRepository
        );
      }

      let classes: string[] = [];
      if (manager) {
        classes = await manager.classify(deletedStatus, false);
      }

      await repository.update(id, {
        status: deletedStatus,
        updatedBy: account.id,
        ...(classes?.length > 0 ? { classes } : {}),
      });

      await this.saveEventAccountForDelete(id, account.id, beans);
    }

    return note;
  }

  protected static async doRestore<NoteStatusType, ParentStatusType>(
    id: number,
    repository: INoteRepository,
    account: Account,
    approvedStatus: NoteStatusType,
    canRestoreStatusList: NoteStatusType[],
    parentOfNoteIdName: string,
    parentOfNoteRepository: INoteRepository,
    parentOfNoteQueryCheckValid: any,
    parentOfNoteValidStatusList: ParentStatusType[],
    manager: INoteManager<NoteStatusType>,
  ): Promise<any> {
    const note = (await repository.findOneOrFail({
      where: {
        id,
        isDeleted: false,
        status: In(canRestoreStatusList),
      },
    })) as any;
    await this.validateRestoreCheckValidParentOfNote<ParentStatusType>(
      note[parentOfNoteIdName],
      parentOfNoteRepository,
      parentOfNoteValidStatusList,
      parentOfNoteQueryCheckValid,
    );
    let classes: string[] = [];
    if (manager) {
      classes = await manager.classify(approvedStatus, false);
    }
    await repository.update(id, {
      status: approvedStatus,
      updatedBy: account.id,
      ...(classes?.length > 0 ? { classes } : {}),
    });
  }

  protected static async saveEventAccountForAssignee(
    referenceId: number,
    preAccountId: number,
    newAccountId: number,
    account: Account,
    beans: {
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    if (
      this.accountEvents &&
      this.accountEvents.NGUOI_THUC_HIEN &&
      this.accountEventModel
    ) {
      await beans.accountEventRepository.updateOrCreate({
        referenceId,
        accountId: newAccountId,
        type: this.accountEvents.NGUOI_THUC_HIEN,
        model: this.accountEventModel,
        updatedBy: account.id,
        createdBy: account.id,
      });
    }

    if (
      this.accountEvents &&
      this.accountEvents.NGUOI_THUC_HIEN_TRUOC &&
      this.accountEventModel
    ) {
      await beans.accountEventRepository.updateOrCreate({
        referenceId,
        accountId: preAccountId,
        type: this.accountEvents.NGUOI_THUC_HIEN_TRUOC,
        model: this.accountEventModel,
        updatedBy: account.id,
        createdBy: account.id,
      });
    }
  }

  protected static async saveEventAccountForSubmit(
    referenceId: number,
    accountId: number,
    beans: {
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    if (
      this.accountEvents &&
      this.accountEvents.GUI_DUYET &&
      this.accountEventModel
    ) {
      await beans.accountEventRepository.updateOrCreate({
        referenceId,
        accountId,
        type: this.accountEvents.GUI_DUYET,
        model: this.accountEventModel,
      });
    }
  }

  protected static async saveEventAccountForFinish(
    referenceId: number,
    accountId: number,
    beans: {
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    if (
      this.accountEvents &&
      this.accountEvents.HOAN_THANH &&
      this.accountEventModel
    ) {
      await beans.accountEventRepository.updateOrCreate({
        referenceId,
        accountId,
        type: this.accountEvents.HOAN_THANH,
        model: this.accountEventModel,
      });
    }
  }

  protected static async saveEventAccountForDelete(
    referenceId: number,
    accountId: number,
    beans: {
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    if (
      this.accountEvents &&
      this.accountEvents.NGUOI_XOA &&
      this.accountEventModel
    ) {
      await beans.accountEventRepository.updateOrCreate({
        referenceId,
        accountId,
        type: this.accountEvents.NGUOI_XOA,
        model: this.accountEventModel,
      });
    }
  }

  private static async validateDeleteCheckExistChildOfNotes<ChildNoteStatusType>(
    id: number,
    noteIdName: string,
    childOfNoteDeleteStatus: ChildNoteStatusType,
    childOfNoteRepository: INoteRepository
  ) {
    const existChildNotes = (await childOfNoteRepository.find({
      where: {
        [noteIdName]: id,
        isDeleted: false,
        status: Not(childOfNoteDeleteStatus),
      },
    })) as Readonly<any>;
    if (existChildNotes && existChildNotes.length > 0) {
      throw new BadRequestError(
        "Don't delete note with exist child notes",
        ErrorCode.Note.NoteDeleteExistLinkNotes
      );
    }
  }

  private static async validateRestoreCheckValidParentOfNote<ParentStatusType>(
    id: Readonly<number>,
    parentOfNoteRepository: INoteRepository,
    parentOfNoteValidStatusList: ParentStatusType[],
    parentOfNoteQueryCheckValid: any = {},
  ) {
    if (id) {
      const existParentOfNotes = (await parentOfNoteRepository.find({
        where: {
          id,
          status: In(parentOfNoteValidStatusList),
          ...parentOfNoteQueryCheckValid,
        },
      })) as Readonly<any>;
      if (!existParentOfNotes || existParentOfNotes.length === 0) {
        throw new BadRequestError(
          "Don't restore note with parent of note invalid",
          ErrorCode.Note.NoteRestoreLinkNoteInvalid
        );
      }
    }
  }

  protected static async generateAddressForSendNotification(
    id: number,
    noteRepository: INoteRepository
  ) {
    const note = await noteRepository.findOneOrFail({
      where: {
        id
      },
      relations: ["ward", "district", "street"]
    }) as any;
    const address = {
      streetNumber: note.streetNumber,
      street: note.street?.valueName,
      ward: note.ward?.valueName,
      district: note.district?.valueName,
    };
    return address;
  }

  protected static async triggerAccountActivity<T extends {
    id: number,
    noteId: string,
    propertyId: number,
  }>(
    note: T,
    activityGroup: ActivityGroupType,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService },
    quote: string = ""
  ) {
    const data = {
      refCode: note.noteId,
      byAccount: account.displayName,
    } as any;

    beans.eventEmitter.emit(EVENT.CREATE_ACTIVITY, {
      refCode: note.noteId,
      propertyId: note.propertyId,
      refId: note.id,
      group: activityGroup,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      data,
      quote,
    });
  }

  protected static async getNoteStatistics(
    accountId: Readonly<number>,
    repository: IViewRepository
  ): Promise<any> {
    let queryBuilder = repository.createQueryBuilder();
    let queryExtendBuilder = repository.createQueryBuilder();

    if (accountId) {
      queryBuilder = queryBuilder.andWhere("assignee_id = :accountId", { accountId });
      queryExtendBuilder = queryExtendBuilder.andWhere("approved_by = :accountId", { accountId });
    }

    const result = await queryBuilder
      .select("assignee_id", "accountId")
      .addSelect("status", "status")
      .addSelect("CAST(SUM(count) AS INT)", "sum")
      .groupBy("assignee_id")
      .addGroupBy("status")
      .getRawMany();

    const totalByAccount: { accountId: number, sum: number }[] = await queryBuilder
      .select("assignee_id", "accountId")
      .addSelect("CAST(SUM(count) AS INT)", "sum")
      .groupBy("assignee_id")
      .getRawMany();

    const extendItems: { status: string, action: number, owner: number }[] = await queryExtendBuilder
    .select("approved_by", "accountId")
    .addSelect("status", "status")
    .addSelect("CAST(SUM(count) AS INT)", "action")
    .addSelect("CAST(COALESCE(SUM(count) FILTER (WHERE approved_by = assignee_id), 0) AS INT)", "owner")
    .groupBy("approved_by")
    .addGroupBy("status")
    .getRawMany();  

    return {
      items: result,
      totalByAccount,
      extendItems
    };
  }
}
