import {
  IAccountEventRepository,
  IAccountNotificationRepository,
  IAppraisalExpectationRepository,
  IAppraisalStatementRepository,
  IBaseRepository,
  IInspectionExpectationRepository,
  IInspectionStatementRepository,
  IInvestmentEfficiencyRepository,
  IInvestmentPlanRepository,
  INotificationManager,
  INotificationRepository,
  INotificationTemplateRepository,
  IProjectNegotiationRepository,
  IPropertyRepository,
} from "./contract";
import * as nunjucks from "nunjucks";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { NOTIFICATION } from "../../infrastructure/config/constants/notification";
import _ from "lodash";
import { AccountEventModel, AccountEventType, } from "../../infrastructure/orm/typeorm/models/AccountEvent";
import { NotificationGroup } from "../../infrastructure/orm/typeorm/models/Notification";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";
import {
  AccountIdsGettingList,
  AccountIdsHasAction,
  AccountIdsHasEvent,
  AccountIdsInObject,
  IAccountIdsGetting,
  IAccountIdsGettingList
} from "../models/notifications/AccountIdsGetting";

@Service(ContainerTokens.NotificationManager)
export class NotificationManager implements INotificationManager {
  public constructor(
    @Inject(ContainerTokens.NotificationRepository)
    private notificationRepository: INotificationRepository,
    @Inject(ContainerTokens.AccountNotificationRepository)
    private accountNotificationRepository: IAccountNotificationRepository,
    @Inject(ContainerTokens.NotificationTemplateRepository)
    private notificationTemplateRepository: INotificationTemplateRepository,
    @Inject(ContainerTokens.PropertyRepository)
    private propertyRepository: IPropertyRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
    private accountGroupFeatureRepository: IBaseRepository,
    @Inject(ContainerTokens.AccountAccountGroupRepository)
    private accountAccountGroupRepository: IBaseRepository,
    @Inject(ContainerTokens.AccountEventRepository)
    private accountEventRepository: IAccountEventRepository,
    @Inject(ContainerTokens.InspectionStatementRepository)
    private inspectionStatementRepository: IInspectionStatementRepository,
    @Inject(ContainerTokens.InspectionExpectationRepository)
    private inspectionExpectationRepository: IInspectionExpectationRepository,
    @Inject(ContainerTokens.AppraisalStatementRepository)
    private appraisalStatementRepository: IAppraisalStatementRepository,
    @Inject(ContainerTokens.InvestmentEfficiencyRepository)
    private investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    @Inject(ContainerTokens.InvestmentPlanRepository)
    private investmentPlanRepository: IInvestmentPlanRepository,
    @Inject(ContainerTokens.AppraisalExpectationRepository)
    private appraisalExpectationRepository: IAppraisalExpectationRepository,
    @Inject(ContainerTokens.ProjectNegotiationRepository)
    private projectNegotiationRepository: IProjectNegotiationRepository,
  ) {}

  public async getNotificationAccountIdsForBDS(
    notification: any,
    result: number[]
  ) {
    const property = (await this.propertyRepository.findOneOrFail({
      where: {
        id: notification.propertyId,
        isActive: true,
      },
      relations: ["approvedBy", "broker", "source", "updatedBy", "createdBy"],
    })) as Readonly<any>;
    let idsGettingList: IAccountIdsGetting[];

    switch (notification.action) {
      case NOTIFICATION.BDS.GUI_DUYET: {
        idsGettingList = [new AccountIdsHasAction(NOTIFICATION.BDS.PHE_DUYET)];
        break;
      }
      case NOTIFICATION.BDS.PHE_DUYET: {
        idsGettingList = [
          new AccountIdsInObject(property, ["sourceId"]),
          new AccountIdsHasEvent(
            notification.propertyId,
            AccountEventType.BDS.GUI_DUYET,
            AccountEventModel.Property
          ),
        ];
        break;
      }
      case NOTIFICATION.BDS.TU_CHOI: {
        idsGettingList = [
          new AccountIdsInObject(property, ["sourceId"]),
          new AccountIdsHasEvent(
            notification.propertyId,
            AccountEventType.BDS.GUI_DUYET,
            AccountEventModel.Property
          ),
        ];

        break;
      }
      case NOTIFICATION.BDS.YEU_CAU_DINH_GIA: {
        idsGettingList = [
          new AccountIdsHasAction(NOTIFICATION.BDS.TIEP_NHAN),
        ];

        break;
      }
      case NOTIFICATION.BDS.TIEP_NHAN: {
        idsGettingList = [
          new AccountIdsHasEvent(
            notification.propertyId,
            AccountEventType.BDS.YEU_CAU_DINH_GIA,
            AccountEventModel.Property,
          ),
        ];

        break;
      }
      case NOTIFICATION.BDS.DA_GIAO_DICH: {
        idsGettingList = [
          new AccountIdsHasAction(NOTIFICATION.BDS.DA_GIAO_DICH),
        ];

        break;
      }
      case NOTIFICATION.BDS.CAP_NHAT_GIA_BAN: {
        idsGettingList = [
          new AccountIdsHasAction(NOTIFICATION.BDS.CAP_NHAT_GIA_BAN),
        ];
        break;
      }
      case NOTIFICATION.BDS.XOA_NHAP: {
        idsGettingList = [
          new AccountIdsInObject(property, ["sourceId", "createdBy"]),
        ];
        break;
      }
      case NOTIFICATION.BDS.XOA_DA_DUYET: {
        idsGettingList = [
          new AccountIdsInObject(property, ["sourceId"]),
        ];
        break;
      }
      case NOTIFICATION.BDS.DA_MUA: {
        idsGettingList = [
          new AccountIdsHasAction(NOTIFICATION.BDS.DA_MUA),
        ];

        break;
      }
      case NOTIFICATION.BDS.DA_BAN: {
        idsGettingList = [
          new AccountIdsHasAction(NOTIFICATION.BDS.DA_BAN),
        ];

        break;
      }
    }
    const accountIdsGettingList: IAccountIdsGettingList = new AccountIdsGettingList(idsGettingList);
    result = await accountIdsGettingList.getAccountIds();

    return result;
  }

  public async getNotificationAccountIdsForKH(
    notification: any,
    result: number[]
  ) {
    const note = (await this.inspectionStatementRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: ["approvedBy"],
    })) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.KH.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.KH.PHE_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.KH.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KH.GUI_DUYET,
          model: AccountEventModel.InspectionStatement,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.KH.TU_CHOI: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KH.GUI_DUYET,
          model: AccountEventModel.InspectionStatement,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.KH.CAP_NHAT_NGUOI_THUC_HIEN: {
        const before = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KH.NGUOI_THUC_HIEN_TRUOC,
          model: AccountEventModel.InspectionStatement,
        });

        const after = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KH.NGUOI_THUC_HIEN,
          model: AccountEventModel.InspectionStatement,
        });
        if (before && before.accountId !== after.accountId) {
          if (before && before.accountId) {
            result.push(before.accountId);
          }

          if (after && after.accountId) {
            result.push(after.accountId);
          }
        }
        break;
      }
      case NOTIFICATION.KH.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KH.GUI_DUYET,
          model: AccountEventModel.InspectionStatement,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIdsForKU(
    notification: any,
    result: number[]
  ) {
    const note = (await this.inspectionExpectationRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: ["approvedBy"],
    })) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.KU.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.KU.PHE_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.KU.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KU.GUI_DUYET,
          model: AccountEventModel.InspectionExpectation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.KU.TU_CHOI: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KU.GUI_DUYET,
          model: AccountEventModel.InspectionExpectation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.KU.CAP_NHAT_NGUOI_THUC_HIEN: {
        const before = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KU.NGUOI_THUC_HIEN_TRUOC,
          model: AccountEventModel.InspectionExpectation,
        });

        const after = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KU.NGUOI_THUC_HIEN,
          model: AccountEventModel.InspectionExpectation,
        });
        if (before && before.accountId !== after.accountId) {
          if (before && before.accountId) {
            result.push(before.accountId);
          }

          if (after && after.accountId) {
            result.push(after.accountId);
          }
        }
        break;
      }
      case NOTIFICATION.KU.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.KU.GUI_DUYET,
          model: AccountEventModel.InspectionExpectation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIdsForPD(
    notification: any,
    result: number[]
  ) {
    const note = (await this.investmentPlanRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: [
        "approvedBy",
        "appraisalStatement",
        "appraisalStatement.completedBy",
      ],
    })) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.PD.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.PD.PHE_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.PD.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.PD.GUI_DUYET,
          model: AccountEventModel.InvestmentPlan,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.PD.TU_CHOI: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.PD.GUI_DUYET,
          model: AccountEventModel.InvestmentPlan,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.PD.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.PD.GUI_DUYET,
          model: AccountEventModel.InvestmentPlan,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIdsForTH(
    notification: any,
    result: number[]
  ) {
    const note = (await this.appraisalStatementRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: ["approvedBy", "completedBy"],
    })) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.TH.HOAN_THANH: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.TH.GUI_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.TH.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.TH.PHE_DUYET
        );
        if (note?.completedBy) {
          result.push(note.completedBy.id);
        }
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.TH.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: notification.propertyId,
          type: AccountEventType.BDS.YEU_CAU_DINH_GIA,
          model: AccountEventModel.Property,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        const accountEvent = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TH.GUI_DUYET,
          model: AccountEventModel.AppraisalStatement,
        });
        if (accountEvent && accountEvent.accountId) {
          result.push(accountEvent.accountId);
        }

        if (note?.completedBy) {
          result.push(note.completedBy.id);
        }

        break;
      }
      case NOTIFICATION.TH.TU_CHOI_HOAN_THANH: {
        if (note?.completedBy?.id) {
          result.push(note.completedBy.id);
        }
        break;
      }
      case NOTIFICATION.TH.TU_CHOI_GUI_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TH.GUI_DUYET,
          model: AccountEventModel.AppraisalStatement,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.TH.CAP_NHAT_NGUOI_THUC_HIEN: {
        const before = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TH.NGUOI_THUC_HIEN_TRUOC,
          model: AccountEventModel.AppraisalStatement,
        });

        const after = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TH.NGUOI_THUC_HIEN,
          model: AccountEventModel.AppraisalStatement,
        });
        if (before && before.accountId !== after.accountId) {
          if (before && before.accountId) {
            result.push(before.accountId);
          }

          if (after && after.accountId) {
            result.push(after.accountId);
          }
        }
        break;
      }
      case NOTIFICATION.TH.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TH.GUI_DUYET,
          model: AccountEventModel.AppraisalStatement,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIdsForHD(
    notification: any,
    result: number[]
  ) {
    const note = (await this.investmentEfficiencyRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: ["approvedBy"],
    })) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.HD.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.HD.PHE_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.HD.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.HD.GUI_DUYET,
          model: AccountEventModel.InvestmentEfficiency,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.HD.TU_CHOI: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.HD.GUI_DUYET,
          model: AccountEventModel.InvestmentEfficiency,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.HD.CAP_NHAT_NGUOI_THUC_HIEN: {
        const before = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.HD.NGUOI_THUC_HIEN_TRUOC,
          model: AccountEventModel.InvestmentEfficiency,
        });

        const after = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.HD.NGUOI_THUC_HIEN,
          model: AccountEventModel.InvestmentEfficiency,
        });
        if (before && before.accountId !== after.accountId) {
          if (before && before.accountId) {
            result.push(before.accountId);
          }

          if (after && after.accountId) {
            result.push(after.accountId);
          }
        }
        break;
      }
      case NOTIFICATION.HD.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.HD.GUI_DUYET,
          model: AccountEventModel.InvestmentEfficiency,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIdsForTU(
    notification: any,
    result: number[]
  ) {
    const note = (await this.appraisalExpectationRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: ["approvedBy", "completedBy"],
    })) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.TU.HOAN_THANH: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.TU.GUI_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.TU.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.TU.PHE_DUYET
        );
        if (note?.completedBy) {
          result.push(note.completedBy.id);
        }
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.TU.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TU.GUI_DUYET,
          model: AccountEventModel.AppraisalExpectation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note?.completedBy) {
          result.push(note.completedBy.id);
        }

        break;
      }
      case NOTIFICATION.TU.TU_CHOI_GUI_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TU.GUI_DUYET,
          model: AccountEventModel.AppraisalExpectation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.TU.TU_CHOI_HOAN_THANH: {
        if (note?.completedBy) {
          result.push(note.completedBy.id);
        }
        break;
      }
      case NOTIFICATION.TU.CAP_NHAT_NGUOI_THUC_HIEN: {
        const before = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TU.NGUOI_THUC_HIEN_TRUOC,
          model: AccountEventModel.AppraisalExpectation,
        });

        const after = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TU.NGUOI_THUC_HIEN,
          model: AccountEventModel.AppraisalExpectation,
        });
        if (before && before.accountId !== after.accountId) {
          if (before && before.accountId) {
            result.push(before.accountId);
          }

          if (after && after.accountId) {
            result.push(after.accountId);
          }
        }
        break;
      }
      case NOTIFICATION.TU.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TU.GUI_DUYET,
          model: AccountEventModel.AppraisalExpectation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIdsForTL(notification: any, result: number[]) {
    const note = await this.projectNegotiationRepository.findOneOrFail({
      where: {
        id: notification.refId,
      },
      relations: ["approvedBy"],
    }) as Readonly<any>;

    switch (notification.action) {
      case NOTIFICATION.TL.GUI_DUYET: {
        const accountIds = await this.getAccountIdsByNotificationAction(
          NOTIFICATION.TL.PHE_DUYET
        );
        if (accountIds) {
          result = _.union(result, accountIds);
        }
        break;
      }
      case NOTIFICATION.TL.PHE_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TL.GUI_DUYET,
          model: AccountEventModel.ProjectNegotiation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.TL.TU_CHOI: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TL.GUI_DUYET,
          model: AccountEventModel.ProjectNegotiation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }
        break;
      }
      case NOTIFICATION.TL.XOA_DA_DUYET: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TL.GUI_DUYET,
          model: AccountEventModel.ProjectNegotiation,
        });
        if (res && res.accountId) {
          result.push(res.accountId);
        }

        if (note.approvedBy) {
          result.push(note.approvedBy.id);
        }
        break;
      }
      case NOTIFICATION.TL.LUU_Y_KIEN_QUAN_LY: {
        const res = await this.accountEventRepository.findOne({
          referenceId: note.id,
          type: AccountEventType.TL.NGUOI_THUC_HIEN,
          model: AccountEventModel.ProjectNegotiation,
        });

        if (res && res.accountId) {
          result.push(res.accountId);
        }

        break;
      }
    }

    return result;
  }

  public async getNotificationAccountIds(
    notification: any,
    currentAccountId: number,
    sendMoreAccounts: number[]
  ): Promise<any> {
    let result: number[] = [];

    switch (notification.group) {
      case NotificationGroup.BDS: {
        result = await this.getNotificationAccountIdsForBDS(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.KH: {
        result = await this.getNotificationAccountIdsForKH(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.KU: {
        result = await this.getNotificationAccountIdsForKU(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.TH: {
        result = await this.getNotificationAccountIdsForTH(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.PD: {
        result = await this.getNotificationAccountIdsForPD(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.HD: {
        result = await this.getNotificationAccountIdsForHD(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.TU: {
        result = await this.getNotificationAccountIdsForTU(
          notification,
          result
        );
        break;
      }
      case NotificationGroup.TL: {
        result = await this.getNotificationAccountIdsForTL(notification, result);
        break;
      }
    }

    _.remove(result, (el: number) => el === currentAccountId);
    return _.uniq(_.union(result, sendMoreAccounts));
  }

  public async getNotificationContent(
    group: string,
    action: string,
    data: any
  ): Promise<any> {
    const template = await this.notificationTemplateRepository.findOneOrFail({
      where: {
        group,
        action,
        isActive: true,
      },
    });

    if (template) {
      return nunjucks.renderString(template.raw, data);
    }
  }

  public async sendNotification(
    notification: any,
    accountId: number,
    sendMoreAccounts: number[]
  ): Promise<any> {
    const content = await this.getNotificationContent(
      notification.group,
      notification.action,
      notification.data
    );
    const result = await this.notificationRepository.save({
      ...notification,
      content,
    });
    const accountIds: number[] = await this.getNotificationAccountIds(
      notification,
      accountId,
      sendMoreAccounts
    );
    for (const accountId of accountIds) {
      await this.accountNotificationRepository.save({
        accountId,
        notificationId: result.id,
      });
    }

    return result;
  }

  public async getAccountIdsByNotificationAction(
    action: string
  ): Promise<any> {
    const accountGroupFeatures = await this.accountGroupFeatureRepository.find({
      join: {
        alias: "accountGroupFeature",
        leftJoinAndSelect: { feature: "accountGroupFeature.feature" },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({});
        qb.andWhere("feature.notificationAction = :action", { action });
        qb.andWhere("feature.isActive = :isActive", { isActive: true });
      },
    });
    if (!accountGroupFeatures || accountGroupFeatures.length === 0) {
      return [];
    }
    const accountGroupIds = _.map(
      accountGroupFeatures,
      (el) => el.accountGroupId
    );
    if (!accountGroupIds || accountGroupIds.length === 0) {
      return [];
    }
    const accountAccountGroups = await this.accountAccountGroupRepository.find({
      join: {
        alias: "accountAccountGroup",
        leftJoinAndSelect: {
          accountGroup: "accountAccountGroup.accountGroup",
          account: "accountAccountGroup.account",
        },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({});
        if (accountGroupIds.length > 0) {
          qb.andWhere("accountGroup.id IN (:...accountGroupIds)", {
            accountGroupIds,
          });
        }

        qb.andWhere("accountGroup.isActive = :isActive", { isActive: true });
        qb.andWhere("account.isActive = :isActive", { isActive: true });
      },
    });
    if (!accountAccountGroups || accountAccountGroups.length === 0) {
      return [];
    }
    return _.map(accountAccountGroups, (el) => el.accountId);
  }
}
