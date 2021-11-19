import {
  ChangeablePriceRequestSerializer,
  DealPropertyRequestSerializer,
  PropertyBusinessStatusSerializer,
  PropertyQuerySerializer,
  PropertySerializer,
  PropertyStatusSerializer,
} from "../interfaces/serializers/PropertySerializer";
import { Account, EAccountType } from "../domain/models/Account";
import {
  IAccountEventRepository,
  IAccountRepository,
  IAccountSourceViewRepository,
  IInspectionStatementManager,
  IInspectionStatementRepository,
  IProjectNegotiationManager,
  IPropertyBookmarkRepository,
  IPropertyHistoryNoteRepository,
  IPropertyLastMonthStatisticsViewRepository,
  IPropertyManager,
  IPropertyPriceViewRepository,
  IPropertyProgressRepository,
  IPropertyPurchaseRepository,
  IPropertyRepository,
  IPropertySaleRepository,
  IPropertyThisMonthStatisticsViewRepository,
  IPropertyViewRepository,
  ITopicRepository,
} from "../domain/services/contract";
import { ILike, In, Not } from "typeorm";
import { BusinessStatus, DealStage, PropertyStatus, } from "../infrastructure/orm/typeorm/models/Property";
import { InspectionStatementStatus, } from "../infrastructure/orm/typeorm/models/InspectionStatement";
import { PropertyHistoryNote } from "../domain/models/PropertyHistoryNote";
import logger from "../infrastructure/logger";
import { BadRequestError } from "../infrastructure/error";
import ErrorCode from "../infrastructure/config/constants/errorCode";
import { PagingSerializer } from "../interfaces/serializers/PagingSerializer";
import { Utilities } from "./utils";
import { serialize } from "class-transformer";
import { EventEmitterService } from "../infrastructure/config/beans";
import { EVENT } from "../infrastructure/config/constants/event";
import { NOTIFICATION } from "../infrastructure/config/constants/notification";
import { NotificationGroup } from "../infrastructure/orm/typeorm/models/Notification";
import { AccountEventModel, AccountEventType, } from "../infrastructure/orm/typeorm/models/AccountEvent";
import { ActivityGroup } from "../infrastructure/orm/typeorm/models/ActivityTemplate";
import { ACTIVITY } from "../infrastructure/config/constants/activity";
import { ChangeablePropertyPurchaseSerializer } from "../interfaces/serializers/PropertyPurchaseSerializer";
import { ChangeablePropertySaleSerializer } from "../interfaces/serializers/PropertySaleSerializer";
import { AppraisalStatementRatioViewName } from "../infrastructure/orm/typeorm/views/AppraisalStatementRatioView";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import { PropertyRatioViewName } from "../infrastructure/orm/typeorm/views/PropertyRatioView";
import { PropertyViewQuerySerializer } from "../interfaces/serializers/PropertyViewSerializer";
import { PropertyView } from "../infrastructure/orm/typeorm/views/PropertyView";
import { InspectionStatementStatusType, ProjectNegotiationStatusType } from "../infrastructure/types/Note";
import { EmployeeRegion } from "../domain/models/Employee";
import { PropertyProgressType } from "../infrastructure/orm/typeorm/models/PropertyProgress";


export default class PropertyAppUseCases {
  public static async get(
    id: number,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<any> {
    return await beans.propertyRepository.findOneOrFail({
      where: {
        id,
        isActive: true,
      },
      relations: [
        "city",
        "district",
        "ward",
        "street",
        "locationType",
        "urgentLevel",
        "source",
        "updatedBy",
        "createdBy",
        "propertyType",
        "propertyPeriod",
        "propertyUsing",
        "propertyBookmarks",
        "propertyBookmarks.bookmarker",
        "approvedBy",
        "broker",
        "propertyHistoryNotes",
        "propertyHistoryNotes.reason",
      ],
    });
  }

  public static async getPropertyRatio(
    id: number,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyPriceViewRepository: IPropertyPriceViewRepository;
    }
  ): Promise<any> {
    const rv = await beans.propertyPriceViewRepository.findOne({
      where: {
        id,
      }
    });
    if (!rv) {
      await Utilities.refreshTableView(PropertyRatioViewName);
    }

    return rv;
  }

  public static async getPropertyProgress(
    id: number,
    beans: {
      propertyProgressRepository: IPropertyProgressRepository,
    }
  ): Promise<any> {
    return await beans.propertyProgressRepository.findOne({
      where: {
        propertyId: id,
      },
      order: {
        createdAt: "DESC"
      },
    });
  }

  public static async sendPropertyNotification(
    property: any,
    account: Account,
    action: string,
    beans: {
      eventEmitter: EventEmitterService;
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
    },
    sendMoreAccounts: number[] = []
  ) {
    const address = await beans.propertyManager.generateAddressPropertyForSendNotification(property.id);
    const data = {
      refCode: property.code,
      byAccount: account.displayName,
      ...address,
    } as any;

    beans.eventEmitter.emit(
      EVENT.CREATE_NOTIFICATION,
      {
        refCode: property.code,
        propertyId: property.id,
        refId: property.id,
        group: NotificationGroup.BDS,
        action,
        createdBy: account.id,
        updatedBy: account.id,
        url: `/property/view/${property.id}`,
        data,
      },
      account.id,
      sendMoreAccounts
    );
  }

  public static triggerAccountActivity(
    property: any,
    account: Account,
    action: string,
    beans: { eventEmitter: EventEmitterService },
    quote: string = ""
  ) {
    const data = {
      refCode: property.code,
      byAccount: account.displayName,
    } as any;

    beans.eventEmitter.emit(EVENT.CREATE_ACTIVITY, {
      refCode: property.code,
      propertyId: property.id,
      refId: property.id,
      group: ActivityGroup.BDS,
      action,
      createdBy: account.id,
      updatedBy: account.id,
      data,
      quote,
    });
  }

  public static async getShort(
    propertyId: number,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<any> {
    return await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        isActive: true,
      },
    });
  }

  public static async getExcludeStatus(
    propertyId: number,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<any> {
    return await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
      },
    });
  }

  public static async create(
    data: PropertySerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      topicRepository: ITopicRepository;
      propertyProgressRepository: IPropertyProgressRepository,
    }
  ): Promise<any> {
    data = await beans.propertyManager.initStatus(data);
    data = await beans.propertyManager.assignSource(data, account.id);
    data = await beans.propertyManager.generateCode(data);

    const topic = await beans.topicRepository.save({
      isActive: true,
      createdBy: account.id,
      updatedBy: account.id,
    });

    const result = await beans.propertyRepository.save({
      ...data,
      createdBy: account.id,
      updatedBy: account.id,
      changeablePrice: data.price || 0,
      topicId: topic.id,
    });

    await beans.propertyProgressRepository.save({
      propertyId: result.id,
      type: PropertyProgressType.BDS,
      createdBy: account.id,
    });

    return result;
  }

  public static async update(
    propertyId: number,
    data: PropertySerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      propertyProgressRepository: IPropertyProgressRepository;
    }
  ): Promise<any> {
    const property = await this.getShort(propertyId, beans) as Readonly<any>;
    if (data.status && data.status !== property.status) {
      throw new BadRequestError(
        "Property Invalid Status",
        ErrorCode.Property.InvalidStatus
      );
    }
    const currentStatus = data.status || property.status;
    if (
      currentStatus === PropertyStatus.Drafting ||
      currentStatus === PropertyStatus.Rejected
    ) {
      data.status = PropertyStatus.Drafting;
    }
    const serializationData = JSON.parse(serialize(data));
    await beans.propertyRepository.update(propertyId, {
      ...serializationData,
      updatedBy: account.id,
      changeablePrice: data.price || 0,
      ...(property.status !== PropertyStatus.Drafting ? {
        changedStatusTime: new Date(),
      } : {}),
      ...(property.status !== PropertyStatus.Drafting ? {
        version: Utilities.increaseMajorVersion(property.version),
      } : {
        version: Utilities.increasePatchVersion(property.version),
      }),
    });
    await beans.propertyProgressRepository.save({
      propertyId,
      type: PropertyProgressType.BDS,
      createdBy: account.id,
    });

    return await this.get(propertyId, beans);
  }

  public static async updateStatus(
    data: PropertyStatusSerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      propertyProgressRepository: IPropertyProgressRepository;
    }
  ): Promise<any> {
    let property = await this.getShort(data.id, beans);
    property = await beans.propertyManager.updateStatus(property, data.status);
    let updateApproved = {};
    if (property.status === PropertyStatus.Approved) {
      property = await beans.propertyManager.generateCode(property);
      const propertyExistAddress = await beans.propertyManager.checkExistAddress(
        property,
        data.id
      );
      if (
        propertyExistAddress &&
        propertyExistAddress.status === PropertyStatus.Existed
      ) {
        property.status = PropertyStatus.Existed;
      } else {
        // case update data for approved
        updateApproved = {
          approvedBy: account.id,
          approvedAt: new Date(),
          changeablePrice: property.price,
          code: property.code,
        };

        // update status property pending to existed #1220
        beans.propertyManager.updatePropertiesSameAddressPendingToExisted(property, data.id);
      }
    }
    await beans.propertyRepository.update(property.id, {
      status: property.status,
      updatedBy: account.id,
      ...updateApproved,
    });
    if (property.status === PropertyStatus.Approved) {
      await beans.propertyProgressRepository.save({
        propertyId: data.id,
        type: PropertyProgressType.BDS,
        createdBy: account.id,
      });
    }

    this.asyncCreateHistoryNote(data, account, beans);
    return await this.get(data.id, beans);
  }

  public static async getAll(
    options: PropertyQuerySerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<any> {
    if (options.createdFrom) {
      options.createdFrom.setHours(0, 0, 0);
    }

    if (options.createdTo) {
      options.createdTo.setHours(23, 59, 59);
    }

    const query = {
      ...(options.code ? { code: ILike("%" + options.code + "%") } : {}),
      ...(options.streetNumber
        ? { streetNumber: ILike("%" + options.streetNumber + "%") }
        : {}),
      ...(options.districtId ? { districtId: options.districtId } : {}),
      ...(options.streetId ? { streetId: options.streetId } : {}),
      ...(options.wardId ? { wardId: options.wardId } : {}),
      ...(options.locationTypeId
        ? { locationTypeId: options.locationTypeId }
        : {}),
      ...(options.price ? { price: options.price } : {}),
      ...(options.status ? { status: options.status } : {}),
      ...(options.urgentLevelId
        ? { urgentLevelId: options.urgentLevelId }
        : {}),
      ...(options.sourceId ? { sourceId: options.sourceId } : {}),
      ...(options.businessStatus
        ? { businessStatus: options.businessStatus }
        : {}),
      ...(options.assigneeId ? { updatedBy: options.assigneeId } : {}),
      ...(options.isActive
        ? { isActive: options.isActive }
        : { isActive: true }),
      ...(options.dealStage ? { dealStage: options.dealStage } : {}),
      ...(options.approvedBy ? { approvedBy: options.approvedBy } : {}),
      ...Utilities.buildWhereSearchFromAndTo(
        options.priceFrom,
        options.priceTo,
        "price"
      ),
      ...Utilities.buildWhereSearchFromAndTo(
        options.createdFrom,
        options.createdTo,
        "createdAt"
      ),
    } as any;

    if (account.type === EAccountType.COLLABORATOR) {
      query.sourceId = account.id;
    }
    const order = {} as any;
    order[options.orderField] = options.order;
    return await beans.propertyRepository.findAndCount({
      join: {
        alias: "property",
        leftJoin: {
          propertyBookmarks: "property.propertyBookmarks",
          source: "property.source", // table account
          collaborator: "source.collaborator", // table collaborator (search companyId, collaborator Type)
        },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where(query);
        Utilities.buildQueryEmployeeRule(account, "", qb);
        Utilities.buildQueryAccountRule(
          account,
          "property",
          PropertyStatus.Drafting,
          qb
        );
        if (options.followerId) {
          qb.andWhere("propertyBookmarks.bookmarkerId = :bookmarkerId", {
            bookmarkerId: options.followerId,
          });
        }
        if (options.followDate) {
          Utilities.buildAndWhereSearchDate(
            "propertyBookmarks",
            "bookmarkDate",
            options.followDate,
            qb
          );
        }
        if (options.companyId) {
          qb.andWhere("collaborator.companyId = :companyId", {
            companyId: options.companyId,
          });
        }
        if (options.collaboratorTypeId) {
          qb.andWhere("collaborator.collaboratorTypeId = :collaboratorTypeId", {
            collaboratorTypeId: options.collaboratorTypeId,
          });
        }
      },
      take: options.take,
      skip: options.skip,
      relations: [
        "city",
        "district",
        "ward",
        "street",
        "locationType",
        "urgentLevel",
        "source",
        "propertyBookmarks",
        "propertyBookmarks.bookmarker",
        "updatedBy",
        "createdBy",
        "approvedBy",
      ],
      order,
    });
  }

  public static async submit(
    data: PropertyStatusSerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    let property = await this.getShort(data.id, beans);
    if (property.status !== PropertyStatus.Drafting) {
      throw new BadRequestError(
        "The status must be drafting",
        ErrorCode.Property.InvalidStatus
      );
    }
    property = await beans.propertyManager.updateStatus(
      property,
      PropertyStatus.Pending
    );
    property = await beans.propertyManager.generateCode(property);
    if (property.status === PropertyStatus.Existed) {
      data.status = PropertyStatus.Existed;
    }
    await beans.propertyRepository.update(property.id, {
      status: property.status,
      updatedBy: account.id,
      code: property.code,
    });
    await beans.accountEventRepository.updateOrCreate({
      referenceId: data.id,
      accountId: account.id,
      type: AccountEventType.BDS.GUI_DUYET,
      model: AccountEventModel.Property,
    });

    this.asyncCreateHistoryNote(data, account, beans);
    const result = await this.get(data.id, beans);
    this.sendPropertyNotification(
      result,
      account,
      NOTIFICATION.BDS.GUI_DUYET,
      beans
    );
    this.triggerAccountActivity(result, account, ACTIVITY.BDS.GUI_DUYET, beans);
    return result;
  }

  public static async createOrUnBookmark(
    id: number,
    account: Account,
    isCreateBook: boolean,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyBookmarkRepository: IPropertyBookmarkRepository;
      propertyManager: IPropertyManager;
    },
    type: string
  ): Promise<any> {
    if (!account.employeeId) {
      throw new BadRequestError(
        "The account is not mapping employee.",
        ErrorCode.EntityNotFound
      );
    }
    const expectedStatuses = [PropertyStatus.Approved];
    const property = await beans.propertyRepository.findOneOrFail({
      select: ["id", "status"],
      where: {
        id,
        status: In(expectedStatuses),
        isActive: true,
      },
    }) as Readonly<any>;

    if (isCreateBook) {
      await beans.propertyManager.processBookmark(
        property.id,
        account.id,
        account.employeeId,
        type
      );
    } else {
      await beans.propertyManager.processUnBookmark(property.id, account.id);
    }
    return await this.get(property.id, beans);
  }

  public static async updateBusinessStatus(
    data: PropertyBusinessStatusSerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;
      propertyManager: IPropertyManager;
      accountEventRepository: IAccountEventRepository;
    }
  ): Promise<any> {
    const property = await this.getShort(data.id, beans);
    const newBusinessStatus = await beans.propertyManager.getNewBusinessStatus(
      property.status,
      property.businessStatus,
      data.businessStatus
    );
    await beans.propertyRepository.update(property.id, {
      businessStatus: newBusinessStatus,
      updatedBy: account.id,
    });

    if (data.businessStatus === BusinessStatus.OnSubmit) {
      await beans.accountEventRepository.updateOrCreate({
        referenceId: data.id,
        accountId: account.id,
        type: AccountEventType.BDS.YEU_CAU_DINH_GIA,
        model: AccountEventModel.Property,
      });
    }

    this.asyncCreateHistoryNoteForBusinessStatus(data, account, beans);
    return await this.get(data.id, beans);
  }

  public static async getSources(
    propertyId: number,
    queryOptions: PagingSerializer,
    beans: {
      propertyRepository: IPropertyRepository;
      accountSourceViewRepository: IAccountSourceViewRepository;
    }
  ): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;
    const property = await beans.propertyRepository.findOneOrFail(propertyId);
    const [result, total] = await beans.accountSourceViewRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      select: ["id", "displayName"],
      where: {
        districtId: property.districtId,
        cityId: property.cityId,
        streetId: property.streetId,
        wardId: property.wardId,
        streetNumber: property.streetNumber
      },
    });
    return {
      items: result,
      total,
    };
  }

  public static async getSourcesByStatuses(
    statuses: string[],
    queryOptions: PagingSerializer,
    beans: {
      propertyRepository: IPropertyRepository;
      accountRepository: IAccountRepository;
    }
  ): Promise<any> {
    const query = beans.accountRepository
      .createQueryBuilder("a")
      .select("a.*")
      .addSelect("a.display_name", "displayName")
      .addSelect("a.identity_name", "identityName")
      .innerJoin("properties", "p", "p.sourceId = a.id")
      .where("a.type = 'Collaborator'")
      .andWhere("p.isActive = true")
      .andWhere("p.status IN (:...arr)", { arr: statuses })
      .groupBy("a.id");

    const total = await query.getCount();
    const rv = await query
      .limit(queryOptions.take)
      .offset(queryOptions.skip)
      .orderBy(`a.${queryOptions.orderField}`, queryOptions.order)
      .getRawMany();

    return {
      items: rv,
      total,
    };
  }

  public static async getNoteList(
    propertyId: number,
    beans: {
      propertyRepository: IPropertyRepository;
    }
  ): Promise<any> {
    const notesData = await beans.propertyRepository.getNoteList(propertyId);
    return await Utilities.convertRawDataQueryToObject(notesData);
  }

  public static async deal(
    propertyId: number,
    data: DealPropertyRequestSerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;
      eventEmitter: EventEmitterService;
      propertyManager: IPropertyManager;
    }
  ): Promise<any> {
    const expectedDealStatuses = [PropertyStatus.Approved, PropertyStatus.Transacted];
    await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        isActive: true,
        status: In(expectedDealStatuses),
      },
    });
    await beans.propertyRepository.update(propertyId, {
      ...data,
      dealStage: DealStage.Transacted,
      status: PropertyStatus.Transacted,
      updatedBy: account.id,
    });

    // update view asynchronous
    Utilities.refreshTableView(AppraisalStatementRatioViewName).then((res) => {
      console.log(res);
    });
    const property = await this.get(propertyId, beans);
    await beans.inspectionStatementManager.updateUnitPrice(property, account.id);
    this.sendPropertyNotification(
      property,
      account,
      NOTIFICATION.BDS.DA_GIAO_DICH,
      beans
    );
    this.triggerAccountActivity(
      property,
      account,
      ACTIVITY.BDS.DA_GIAO_DICH,
      beans
    );

    return property;
  }

  public static async updateChangeablePrice(
    propertyId: number,
    data: ChangeablePriceRequestSerializer,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;
      projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>;
      eventEmitter: EventEmitterService;
      propertyManager: IPropertyManager;
    }
  ): Promise<any> {
    await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        status: PropertyStatus.Approved,
        isActive: true,
      },
    });
    await beans.propertyRepository.update(propertyId, {
      ...data,
      updatedBy: account.id,
    });

    const property = await this.get(propertyId, beans);
    beans.projectNegotiationManager.updateChangeablePrice(property);
    this.sendPropertyNotification(
      property,
      account,
      NOTIFICATION.BDS.CAP_NHAT_GIA_BAN,
      beans
    );
    this.triggerAccountActivity(
      property,
      account,
      ACTIVITY.BDS.CAP_NHAT_GIA_BAN,
      beans
    );

    return property;
  }

  public static async getPropertyPurchase(
    propertyId: number,
    beans: {
      propertyPurchaseRepository: IPropertyPurchaseRepository;
    }
  ): Promise<any> {
    return await beans.propertyPurchaseRepository.findOneOrFail({
      relations: ["property", "assignee", "supporter", "createdBy", "updatedBy"],
      where: {
        propertyId,
      }
    });
  }

  public static async purchase(
    propertyId: number,
    account: Account,
    dto: ChangeablePropertyPurchaseSerializer,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      propertyPurchaseRepository: IPropertyPurchaseRepository;
    }
  ): Promise<any> {
    await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        status: In([
          PropertyStatus.Approved,
          PropertyStatus.Purchased,
        ]),
        isActive: true,
      }
    });
    await beans.propertyRepository.update(propertyId, {
      status: PropertyStatus.Purchased,
      updatedBy: account.id,
    });
    let propertyPurchase = await beans.propertyPurchaseRepository.findOne({
      select: ["id"],
      where: {
        propertyId,
      }
    });
    if (propertyPurchase) {
      await beans.propertyPurchaseRepository.update(propertyPurchase.id, dto);
    } else {
      await beans.propertyPurchaseRepository.save({
        propertyId,
        ...dto
      });
    }

    propertyPurchase = await this.getPropertyPurchase(propertyId, beans);
    this.sendPropertyNotification(
      propertyPurchase.property,
      account,
      NOTIFICATION.BDS.DA_MUA,
      beans
    );
    this.triggerAccountActivity(
      propertyPurchase.property,
      account,
      ACTIVITY.BDS.DA_MUA,
      beans
    );

    return propertyPurchase;
  }

  public static async getPropertySale(
    propertyId: number,
    beans: {
      propertySaleRepository: IPropertySaleRepository;
    }
  ): Promise<any> {
    return await beans.propertySaleRepository.findOneOrFail({
      relations: ["property", "seller", "saleSource", "createdBy", "updatedBy"],
      where: {
        propertyId,
      }
    });
  }

  public static async sale(
    propertyId: number,
    account: Account,
    dto: ChangeablePropertySaleSerializer,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
      eventEmitter: EventEmitterService;
      propertySaleRepository: IPropertySaleRepository;
    }
  ): Promise<any> {
    await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        status: In([
          PropertyStatus.Purchased,
          PropertyStatus.Sale,
        ]),
        isActive: true,
      }
    });
    await beans.propertyRepository.update(propertyId, {
      status: PropertyStatus.Sale,
      updatedBy: account.id,
    });
    let propertySale = await beans.propertySaleRepository.findOne({
      select: ["id"],
      where: {
        propertyId,
      }
    });
    if (propertySale) {
      await beans.propertySaleRepository.update(propertySale.id, dto);
    } else {
      await beans.propertySaleRepository.save({
        propertyId,
        ...dto
      });
    }

    propertySale = await this.getPropertySale(propertyId, beans);
    this.sendPropertyNotification(
      propertySale.property,
      account,
      NOTIFICATION.BDS.DA_BAN,
      beans
    );
    this.triggerAccountActivity(
      propertySale.property,
      account,
      ACTIVITY.BDS.DA_BAN,
      beans
    );

    return propertySale;
  }

  private static async asyncCreateHistoryNote(
    data: PropertyStatusSerializer,
    account: Account,
    beans: {
      propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;
    }
  ) {
    let propertyHistoryNote: Partial<PropertyHistoryNote> = new PropertyHistoryNote(
      data.id,
      data.reasonId,
      data.reason,
      data.notes
    );
    propertyHistoryNote = PropertyHistoryNote.analyzeUpdateTypeFromStatus(
      propertyHistoryNote,
      data.status
    );
    await this.asyncBaseCreateHistoryNote(propertyHistoryNote, account, beans);
  }

  private static async asyncCreateHistoryNoteForBusinessStatus(
    data: PropertyBusinessStatusSerializer,
    account: Account,
    beans: {
      propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;
    }
  ) {
    let propertyHistoryNote: Partial<PropertyHistoryNote> = new PropertyHistoryNote(
      data.id,
      null,
      null,
      null
    );
    propertyHistoryNote = PropertyHistoryNote.analyzeUpdateTypeFromBusinessStatus(
      propertyHistoryNote,
      data.businessStatus
    );
    await this.asyncBaseCreateHistoryNote(propertyHistoryNote, account, beans);
  }

  private static async asyncBaseCreateHistoryNote(
    propertyHistoryNote: Partial<PropertyHistoryNote>,
    account: Account,
    beans: {
      propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;
    }
  ) {
    try {
      propertyHistoryNote = Account.addAuditInfo(
        propertyHistoryNote,
        account.id
      );
      await beans.propertyHistoryNoteRepository.save(propertyHistoryNote);
    } catch (e) {
      logger.error("Error asyncBaseCreateHistoryNote", e);
    }
  }

  private static async validateExistInspectionStatements(
    propertyId: number,
    beans: {
      inspectionStatementRepository: IInspectionStatementRepository;
    }
  ) {
    const existChildOfNotes = await beans.inspectionStatementRepository.findOne(
      {
        where: {
          propertyId,
          isDeleted: false,
          status: Not(InspectionStatementStatus.Deleted),
        },
      }
    );
    if (existChildOfNotes) {
      throw new BadRequestError(
        "The property is exist inspection statement notes",
        ErrorCode.Property.PropertyDeleteExistNotes
      );
    }
  }

  public static async delete(
    propertyId: number,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      inspectionStatementRepository: IInspectionStatementRepository;
      eventEmitter: EventEmitterService;
      propertyManager: IPropertyManager;
    }
  ): Promise<any> {
    const expectStatuses = [PropertyStatus.Drafting, PropertyStatus.Approved];
    const property = await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        isActive: true,
        status: In(expectStatuses),
      },
    });
    let trigger = false;
    if (property.status === PropertyStatus.Drafting) {
      await beans.propertyRepository.update(property.id, {
        isActive: false,
        updatedBy: account.id,
      });
    } else {
      await this.validateExistInspectionStatements(propertyId, beans);
      await beans.propertyRepository.update(property.id, {
        status: PropertyStatus.Deleted,
        updatedBy: account.id,
      });
      trigger = true;
    }
    const result = await this.getExcludeStatus(propertyId, beans);
    if (trigger) {
      this.sendPropertyNotification(
        result,
        account,
        NOTIFICATION.BDS.XOA_DA_DUYET,
        beans
      );
      this.triggerAccountActivity(result, account, ACTIVITY.BDS.XOA, beans);
    }

    return result;
  }

  public static async restore(
    propertyId: number,
    account: Account,
    beans: {
      propertyRepository: IPropertyRepository;
      propertyManager: IPropertyManager;
    }
  ): Promise<any> {
    let property: any = await beans.propertyRepository.findOneOrFail({
      where: {
        id: propertyId,
        isActive: true,
        status: PropertyStatus.Deleted,
      },
    });

    property = await beans.propertyManager.checkExistAddress(
      property,
      propertyId
    );
    if(property.status === PropertyStatus.Existed){
      throw new BadRequestError(
        "The property is exist address with status approved.",
        ErrorCode.Property.PropertyRestoreExistAddress
      );
    }
    await beans.propertyRepository.update(propertyId, {
      status: PropertyStatus.Approved,
      updatedBy: account.id,
    });

    return await this.get(propertyId, beans);
  }

  public static async getPropertyView(
    propertyQueryOptions: PropertyViewQuerySerializer,
    account: Account,
    beans: {
      propertyViewRepository: IPropertyViewRepository;
    }
  ): Promise<any> {
    const order = {} as any;
    const whereQuery = Utilities.buildWhereQuery(propertyQueryOptions);
    order[propertyQueryOptions.orderField] = propertyQueryOptions.order;
    const [result, total] = await beans.propertyViewRepository.findAndCount({
      take: propertyQueryOptions.take,
      skip: propertyQueryOptions.skip,
      order,
      where: (qb: SelectQueryBuilder<PropertyView>) => {
        qb.where(whereQuery);
        Utilities.buildQueryEmployeeRule(account, "", qb);
      }
    });

    return {
      items: result,
      total,
    };
  }

  public static async getFullPropertyStatistic(
    account: Account,
    beans: {
      propertyThisMonthStatisticsViewRepository: IPropertyThisMonthStatisticsViewRepository;
      propertyLastMonthStatisticsViewRepository: IPropertyLastMonthStatisticsViewRepository;
    }
  ): Promise<any> {
    let districtIds: number[] = [];
    if (account.type !== EAccountType.ADMIN) {
      districtIds = (account.employee?.employeeRegions || []).filter(obj => obj.isActive).map((el: EmployeeRegion) => el.districtId);
    }
    const thisMonth = await this.getPropertyStatistics(districtIds, beans.propertyThisMonthStatisticsViewRepository);
    const lastMonth = await this.getPropertyStatistics(districtIds, beans.propertyLastMonthStatisticsViewRepository);

    return {
      thisMonth,
      lastMonth,
    };
  }

  private static async getPropertyStatistics(
    districtIds: number[],
    repository: IPropertyThisMonthStatisticsViewRepository | IPropertyLastMonthStatisticsViewRepository
  ): Promise<any> {
    let queryBuilder = repository.createQueryBuilder();

    if (districtIds && districtIds.length > 0) {
      queryBuilder = queryBuilder.andWhere("district_id IN (:...districtIds)", { districtIds });
    }

    const result = await queryBuilder
      .select("district_id", "districtId")
      .addSelect("status", "status")
      .addSelect("CAST(count AS INT)", "sum")
      .getRawMany();

    const rv: { sum: number } | null = await queryBuilder
      .select(("CAST(SUM(count) AS INT)"), "sum")
      .getRawOne();

    const totalByDistrict: { districtId: string, sum: number }[] = await queryBuilder
      .select("district_id", "districtId")
      .addSelect("CAST(SUM(count) AS INT)", "sum")
      .groupBy("district_id")
      .getRawMany();

    const totalByStatus: { status: string, sum: number }[] = await queryBuilder
      .select("status", "status")
      .addSelect("CAST(SUM(count) AS INT)", "sum")
      .groupBy("status")
      .getRawMany();

    return {
      items: result,
      totalByDistrict,
      totalByStatus,
      sum: rv?.sum || 0,
    };
  }
}
