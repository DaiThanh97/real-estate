import { IPolicyManager } from "./contract/IPolicyManager";
import ContainerTokens from "./contract/ContainerTokens";
import { Inject, Service } from "typedi";
import _ from "lodash";
import {
  IAccountEventRepository,
  IAppraisalExpectationRepository,
  IAppraisalStatementRepository,
  IBaseRepository,
  IEndpointPermissionRepository,
  IFeatureRepository,
  IInspectionExpectationRepository,
  IInspectionStatementRepository,
  IInvestmentEfficiencyRepository,
  IInvestmentPlanRepository,
  IProjectNegotiationRepository,
  IPropertyRepository
} from "./contract";
import { Account, EAccountType } from "../models/Account";
import { PropertyStatus } from "../../infrastructure/orm/typeorm/models/Property";
import { InspectionStatementStatus } from "../../infrastructure/orm/typeorm/models/InspectionStatement";
import { Brackets, ILike, In } from "typeorm";
import { ACTIONS } from "../../infrastructure/config/constants/actions";
import { AppraisalStatementStatus } from "../models/AppraisalStatement";
import { InspectionExpectationStatus } from "../models/InspectionExpectation";
import { InvestmentPlanStatus } from "../../infrastructure/orm/typeorm/models/InvestmentPlan";
import { InvestmentEfficiencyStatus } from "../../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { AppraisalExpectationStatus } from "../../infrastructure/orm/typeorm/models/AppraisalExpectation";
import { ProjectNegotiationStatus } from "../../infrastructure/orm/typeorm/models/ProjectNegotiation";
import { AccountEventModel, AccountEventType, } from "../../infrastructure/orm/typeorm/models/AccountEvent";
import { SelectQueryBuilder } from "typeorm/browser/query-builder/SelectQueryBuilder";

@Service(ContainerTokens.PolicyManager)
export class PolicyManager implements IPolicyManager {

  readonly noteEndpoints = {
    "inspection_statements": {
      repository: this.inspectionStatementRepository,
      getExpectedStatuses: [InspectionStatementStatus.Approved, InspectionStatementStatus.Deleted],
      getDeleteExpectedStatuses: [InspectionStatementStatus.Drafting, InspectionStatementStatus.Approved],
      getRestoreExpectedStatuses: [InspectionStatementStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.KSHT.APPROVE,
        Delete: ACTIONS.KSHT.DELETE,
        Restore: ACTIONS.KSHT.RESTORE,
      },
      status: {
        Drafting: InspectionStatementStatus.Drafting,
        Approved: InspectionStatementStatus.Approved,
        Deleted: InspectionStatementStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.InspectionStatement,
        type: {
          Deleted: AccountEventType.KH.NGUOI_XOA
        }
      },
    },
    "investment_efficiencies": {
      repository: this.investmentEfficiencyRepository,
      getExpectedStatuses: [InvestmentEfficiencyStatus.Approved, InvestmentEfficiencyStatus.Deleted],
      getDeleteExpectedStatuses: [InvestmentEfficiencyStatus.Drafting, InvestmentEfficiencyStatus.Approved],
      getRestoreExpectedStatuses: [InvestmentEfficiencyStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.HQDT.APPROVE,
        Delete: ACTIONS.HQDT.DELETE,
        Restore: ACTIONS.HQDT.RESTORE,
      },
      status: {
        Drafting: InvestmentEfficiencyStatus.Drafting,
        Approved: InvestmentEfficiencyStatus.Approved,
        Deleted: InvestmentEfficiencyStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.InvestmentEfficiency,
        type: {
          Deleted: AccountEventType.HD.NGUOI_XOA
        }
      },
    },
    "project_negotiations": {
      repository: this.projectNegotiationRepository,
      getExpectedStatuses: [ProjectNegotiationStatus.Approved, ProjectNegotiationStatus.Deleted],
      getDeleteExpectedStatuses: [ProjectNegotiationStatus.Drafting, ProjectNegotiationStatus.Approved],
      getRestoreExpectedStatuses: [ProjectNegotiationStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.TLDA.APPROVE,
        Delete: ACTIONS.TLDA.DELETE,
        Restore: ACTIONS.TLDA.RESTORE,
      },
      status: {
        Drafting: ProjectNegotiationStatus.Drafting,
        Approved: ProjectNegotiationStatus.Approved,
        Deleted: ProjectNegotiationStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.ProjectNegotiation,
        type: {
          Deleted: AccountEventType.TL.NGUOI_XOA
        }
      },
    },
    "investment_plans": {
      repository: this.investmentPlanRepository,
      getExpectedStatuses: [InvestmentPlanStatus.Approved, InvestmentPlanStatus.Deleted],
      getDeleteExpectedStatuses: [InvestmentPlanStatus.Drafting, InvestmentPlanStatus.Approved],
      getRestoreExpectedStatuses: [InvestmentPlanStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.PADT.APPROVE,
        Delete: ACTIONS.PADT.DELETE,
        Restore: ACTIONS.PADT.RESTORE,
      },
      status: {
        Drafting: InvestmentPlanStatus.Drafting,
        Approved: InvestmentPlanStatus.Approved,
        Deleted: InvestmentPlanStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.InvestmentPlan,
        type: {
          Deleted: AccountEventType.PD.NGUOI_XOA
        }
      },
    },
    "appraisal_statements": {
      repository: this.appraisalStatementRepository,
      getExpectedStatuses: [AppraisalStatementStatus.Approved, AppraisalStatementStatus.Deleted],
      getDeleteExpectedStatuses: [AppraisalStatementStatus.Drafting, AppraisalStatementStatus.Approved],
      getRestoreExpectedStatuses: [AppraisalStatementStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.TDHT.APPROVE,
        Delete: ACTIONS.TDHT.DELETE,
        Restore: ACTIONS.TDHT.RESTORE,
      },
      status: {
        Drafting: AppraisalStatementStatus.Drafting,
        Approved: AppraisalStatementStatus.Approved,
        Deleted: AppraisalStatementStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.AppraisalStatement,
        type: {
          Deleted: AccountEventType.TH.NGUOI_XOA
        }
      },
    },
    "appraisal_expectations": {
      repository: this.appraisalExpectationRepository,
      getExpectedStatuses: [AppraisalExpectationStatus.Approved, AppraisalExpectationStatus.Deleted],
      getDeleteExpectedStatuses: [AppraisalExpectationStatus.Drafting, AppraisalExpectationStatus.Approved],
      getRestoreExpectedStatuses: [AppraisalExpectationStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.TDUT.APPROVE,
        Delete: ACTIONS.TDUT.DELETE,
        Restore: ACTIONS.TDUT.RESTORE,
      },
      status: {
        Drafting: AppraisalExpectationStatus.Drafting,
        Approved: AppraisalExpectationStatus.Approved,
        Deleted: AppraisalExpectationStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.AppraisalExpectation,
        type: {
          Deleted: AccountEventType.TU.NGUOI_XOA
        }
      },
    },
    "inspection_expectations": {
      repository: this.inspectionExpectationRepository,
      getExpectedStatuses: [InspectionExpectationStatus.Approved, InspectionExpectationStatus.Deleted],
      getDeleteExpectedStatuses: [InspectionExpectationStatus.Drafting, InspectionExpectationStatus.Approved],
      getRestoreExpectedStatuses: [InspectionExpectationStatus.Deleted],
      featureActs: {
        Approved: ACTIONS.KSUT.APPROVE,
        Delete: ACTIONS.KSUT.DELETE,
        Restore: ACTIONS.KSUT.RESTORE,
      },
      status: {
        Drafting: InspectionExpectationStatus.Drafting,
        Approved: InspectionExpectationStatus.Approved,
        Deleted: InspectionExpectationStatus.Deleted,
      },
      accountEvent: {
        model: AccountEventModel.InspectionExpectation,
        type: {
          Deleted: AccountEventType.KU.NGUOI_XOA
        }
      },
    }
  } as any;

  public constructor(
    @Inject(ContainerTokens.FeatureRepository)
    private featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
    private accountGroupFeatureRepository: IBaseRepository,
    @Inject(ContainerTokens.AccountGroupResourceRepository)
    private accountGroupResourceRepository: IBaseRepository,
    @Inject(ContainerTokens.PropertyRepository)
    private propertyRepository: IPropertyRepository,
    @Inject(ContainerTokens.InspectionStatementRepository)
    private inspectionStatementRepository: IInspectionStatementRepository,
    @Inject(ContainerTokens.AppraisalStatementRepository)
    private appraisalStatementRepository: IAppraisalStatementRepository,
    @Inject(ContainerTokens.EndpointPermissionRepository)
    private endpointPermissionRepository: IEndpointPermissionRepository,
    @Inject(ContainerTokens.InspectionExpectationRepository)
    private inspectionExpectationRepository: IInspectionExpectationRepository,
    @Inject(ContainerTokens.InvestmentPlanRepository)
    private investmentPlanRepository: IInvestmentPlanRepository,
    @Inject(ContainerTokens.InvestmentEfficiencyRepository)
    private investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    @Inject(ContainerTokens.AppraisalExpectationRepository)
    private appraisalExpectationRepository: IAppraisalExpectationRepository,
    @Inject(ContainerTokens.ProjectNegotiationRepository)
    private projectNegotiationRepository: IProjectNegotiationRepository,
    @Inject(ContainerTokens.AccountEventRepository)
    private accountEventRepository: IAccountEventRepository,
  ) {
  }

  public async getEndpointPermission(
    data: {
      id: number,
      api: string,
      method: string,
      resourceId: number,
    },
    account: Account
  ): Promise<any> {
    if (
      !account.accountAccountGroups ||
      account.accountAccountGroups.length === 0
    ) {
      return null;
    }

    const endpointPermission = await this.endpointPermissionRepository.findOne({
      where: {
        api: data.api,
        resourceId: data.resourceId,
        method: ILike(data.method),
        isActive: true,
      },
      relations: ["resource"]
    });

    if (!endpointPermission) {
      return null;
    }

    const accountGroups = _.filter(
      account.accountAccountGroups,
      (el) => el.accountGroup.isActive === true
    );
    if (!accountGroups || accountGroups.length === 0) {
      return null;
    }
    const accountGroupIds = _.map(accountGroups, (el) => el.accountGroupId);

    const result = await this.accountGroupResourceRepository.findOne({
      join: {
        alias: "accountGroupResource",
        leftJoinAndSelect: {
          accountGroup: "accountGroupResource.accountGroup",
        },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          resourceId: data.resourceId,
          ...(accountGroupIds.length > 0
            ? { accountGroupId: In(accountGroupIds) }
            : {}),
        });
        qb.andWhere("accountGroup.isActive = :isActive", { isActive: true });
      },
    });

    if (!result) {
      return null;
    }

    return endpointPermission;
  }

  public hasPermissionAccountGroup = async (
    account: any,
    res: any,
    act: string
  ): Promise<boolean> => {
    if (
      !account.accountAccountGroups ||
      account.accountAccountGroups.length === 0
    ) {
      return false;
    }

    const features = await this.featureRepository.find({
      join: {
        alias: "feature",
        leftJoinAndSelect: { resource: "feature.resource" },
      },
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          isActive: true,
          act,
        });
        qb.andWhere("resource.isActive = :isActive", { isActive: true });
        qb.andWhere("resource.model = :model", { model: res.name });
      },
      cache: 60000,
    });

    if (!features || features.length === 0) {
      return false;
    }

    for (const feature of features) {
      const accountGroups = _.filter(
        account.accountAccountGroups,
        (el) => el.accountGroup.isActive === true
      );
      if (!accountGroups || accountGroups.length === 0) {
        return false;
      }
      const accountGroupIds = _.map(accountGroups, (el) => el.accountGroupId);
      const result = await this.accountGroupFeatureRepository.findOne({
        join: {
          alias: "accountGroupFeature",
          leftJoinAndSelect: {
            accountGroup: "accountGroupFeature.accountGroup",
          },
        },
        where: (qb: SelectQueryBuilder<unknown>) => {
          qb.where({
            featureId: feature.id,
            ...(accountGroupIds.length > 0
              ? { accountGroupId: In(accountGroupIds) }
              : {}),
          });
          qb.andWhere("accountGroup.isActive = :isActive", { isActive: true });
        },
      });

      if (result) {
        return true;
      }
    }

    return false;
  };

  public hasPropertyPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    if (!res.id) {
      return true;
    }

    const property = await this.propertyRepository.findOne({
      where: {
        id: res.id,
        isActive: true,
      },
      relations: ["createdBy", "updatedBy"],
    });
    if (!property) {
      return false;
    }
    if (account.type === EAccountType.COLLABORATOR) {
      if (property.sourceId !== account.id) {
        return false;
      }
      if (act === "delete" || act === "submit") {
        if (property.status !== PropertyStatus.Drafting) {
          return false;
        }

        return await this.hasPermissionAccountGroup(account, {
          name: "mobile_property",
          id: res.id,
        }, act);
      }
    } else {
      if (
        property.status === PropertyStatus.Drafting &&
        property.createdBy.id !== account.id
      ) {
        return false;
      }

      const actions = [
        "submit",
        "delete",
        "deal",
        "update_changeable_price",
        "purchase",
        "sale",
        "update",
        "reject",
        "approve",
        "req_on_submit",
        "req_submitted",
        "bookmark",
        "restore",
      ];
      if (actions.includes(act)) {
        return await this.hasPermissionAccountGroup(account, res, act);
      }
    }

    return true;
  };

  private hasNotePermission = async (
    account: any,
    res: any,
    act: any,
    noteRepository: any,
    statusSupportActsFlow: any,
    actions: string[]
  ): Promise<boolean> => {
    if (res.id) {
      const note = (await noteRepository.findOne({
        where: {
          id: res.id,
          isDeleted: false,
        },
        relations: ["createdBy", "updatedBy"],
      })) as Readonly<any>;
      if (!note) {
        return false;
      }
      if (
        statusSupportActsFlow[note.status] &&
        !statusSupportActsFlow[note.status].includes(act)
      ) {
        return false;
      }
    }
    if (actions.includes(act)) {
      return await this.hasPermissionAccountGroup(account, res, act);
    }
    return true;
  };

  public hasInspectionStatementPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.KSHT;
    const statusSupportActsFlow = {
      [InspectionStatementStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.SUBMIT,
        acts.DELETE,
      ],
      [InspectionStatementStatus.Pending]: [
        acts.GET,
        acts.APPROVE,
        acts.REJECT,
      ],
      [InspectionStatementStatus.Approved]: [acts.GET, acts.DELETE],
      [InspectionStatementStatus.Rejected]: [
        acts.GET,
        acts.UPDATE,
        acts.SUBMIT,
      ],
      [InspectionStatementStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.inspectionStatementRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public hasAppraisalStatementPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.TDHT;
    const statusSupportActsFlow = {
      [AppraisalStatementStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.FINISH,
        acts.DELETE,
      ],
      [AppraisalStatementStatus.Finished]: [acts.GET, acts.SUBMIT, acts.REJECT],
      [AppraisalStatementStatus.Pending]: [acts.GET, acts.APPROVE, acts.REJECT],
      [AppraisalStatementStatus.Approved]: [acts.GET, acts.DELETE],
      [AppraisalStatementStatus.Rejected]: [acts.GET, acts.UPDATE],
      [AppraisalStatementStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.FINISH,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.appraisalStatementRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public hasInspectionExpectationPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.KSUT;
    const statusSupportActsFlow = {
      [InspectionExpectationStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.SUBMIT,
        acts.DELETE,
      ],
      [InspectionExpectationStatus.Pending]: [
        acts.GET,
        acts.APPROVE,
        acts.REJECT,
      ],
      [InspectionExpectationStatus.Approved]: [acts.GET, acts.DELETE],
      [InspectionExpectationStatus.Rejected]: [acts.GET, acts.UPDATE],
      [InspectionExpectationStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.inspectionExpectationRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public hasInvestmentPlanPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.PADT;
    const statusSupportActsFlow = {
      [InvestmentPlanStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.SUBMIT,
        acts.DELETE,
      ],
      [InvestmentPlanStatus.Pending]: [acts.GET, acts.APPROVE, acts.REJECT],
      [InvestmentPlanStatus.Approved]: [acts.GET, acts.DELETE],
      [InvestmentPlanStatus.Rejected]: [acts.GET, acts.UPDATE],
      [InvestmentPlanStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.investmentPlanRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public hasInvestmentEfficiencyPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.HQDT;
    const statusSupportActsFlow = {
      [InvestmentEfficiencyStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.SUBMIT,
        acts.DELETE,
      ],
      [InvestmentEfficiencyStatus.Pending]: [
        acts.GET,
        acts.APPROVE,
        acts.REJECT,
      ],
      [InvestmentEfficiencyStatus.Approved]: [acts.GET, acts.DELETE],
      [InvestmentEfficiencyStatus.Rejected]: [
        acts.GET,
        acts.UPDATE,
        acts.SUBMIT,
      ],
      [InvestmentEfficiencyStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.investmentEfficiencyRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public hasAppraisalExpectationPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.TDUT;
    const statusSupportActsFlow = {
      [AppraisalExpectationStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.FINISH,
        acts.DELETE,
      ],
      [AppraisalExpectationStatus.Finished]: [
        acts.GET,
        acts.SUBMIT,
        acts.REJECT,
      ],
      [AppraisalExpectationStatus.Pending]: [
        acts.GET,
        acts.APPROVE,
        acts.REJECT,
      ],
      [AppraisalExpectationStatus.Approved]: [acts.GET, acts.DELETE],
      [AppraisalExpectationStatus.Rejected]: [acts.GET, acts.UPDATE],
      [AppraisalExpectationStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.FINISH,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.appraisalExpectationRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public hasPropertyMobilePermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    if (account.type !== EAccountType.COLLABORATOR) {
      return false;
    }

    if (
      act === "update_general_info" ||
      act === "get_short"
    ) {
      if (!res.id) {
        return false;
      }

      const property = await this.propertyRepository.findOne({
        where: {
          id: res.id,
          isActive: true,
        },
      });
      if (!property) {
        return false;
      }

      if (property?.sourceId !== account.id) {
        return false;
      }

      if (act === "update_general_info") {
        if (
          property.status !== PropertyStatus.Drafting &&
          property.status !== PropertyStatus.Rejected
        ) {
          return false;
        }
      }
    }

    const actions = [
      "create_general_info",
      "update_general_info",
      "get_short",
      "get_short_list"
    ];
    if (actions.includes(act)) {
      return await this.hasPermissionAccountGroup(account, res, act);
    }

    return true;
  };

  public hasProjectNegotiationPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    const acts = ACTIONS.TLDA;
    const statusSupportActsFlow = {
      [ProjectNegotiationStatus.Drafting]: [
        acts.GET,
        acts.UPDATE,
        acts.DELETE,
        acts.SUBMIT,
      ],
      [ProjectNegotiationStatus.Pending]: [
        acts.GET,
        acts.APPROVE,
        acts.REJECT,
      ],
      [ProjectNegotiationStatus.Approved]: [acts.GET, acts.DELETE, acts.UPDATE_REF_INFO, acts.UPDATE_PLAN_STEP, acts.UPDATE_ACTION, acts.UPDATE_OPINION],
      [ProjectNegotiationStatus.Rejected]: [acts.GET, acts.UPDATE],
      [ProjectNegotiationStatus.Deleted]: [acts.GET, acts.RESTORE],
    };
    const actions = [
      acts.CREATE,
      acts.UPDATE,
      acts.SUBMIT,
      acts.APPROVE,
      acts.REJECT,
      acts.DELETE,
      acts.RESTORE,
      acts.UPDATE_REF_INFO,
      acts.UPDATE_PLAN_STEP,
      acts.UPDATE_ACTION,
      acts.UPDATE_OPINION,
      acts.GET_LIST,
    ];
    return await this.hasNotePermission(
      account,
      res,
      act,
      this.projectNegotiationRepository,
      statusSupportActsFlow,
      actions
    );
  };

  public keyMatchFunc = async (
    requestKey: string,
    policyKey: string,
  ): Promise<boolean> => {
    if (policyKey === requestKey) {
      return true;
    }

    return (policyKey || "").includes(`(${requestKey})`);
  };

  public checkViewNotePermission = async (
    endpointPermission: any,
    account: Account,
    id: number,
  ): Promise<boolean> => {
    const group = endpointPermission.api.split("/")[1];
    const noteEndpoint = this.noteEndpoints[group];
    const repository = noteEndpoint.repository;

    if (group === endpointPermission.resource.api) {
      return !!await repository.findOne({
        select: ["id"],
        where: (qb: SelectQueryBuilder<unknown>) => {
          qb.where({
            id,
          });
          qb.andWhere(new Brackets(qb2 => {
            qb2.orWhere(
              "classes ?| (:arr)", { arr: account.classes }
            ).orWhere(
              "assignee_id = :personId", { personId: account.id }
            );
          }));
        }
      });
    } else {
      return !!await repository.findOne({
        select: ["id"],
        where: {
          id,
          status: In(noteEndpoint.getExpectedStatuses),
        }
      });
    }
  };

  public checkDeleteNotePermission = async (
    endpointPermission: any,
    account: Account,
    id: number,
  ): Promise<boolean> => {
    const group = endpointPermission.api.split("/")[1];
    const noteEndpoint = this.noteEndpoints[group];
    const repository = noteEndpoint.repository;
    const res = {
      name: endpointPermission?.resource?.model
    };
    const hasDelete = await this.hasPermissionAccountGroup(account, res, noteEndpoint.featureActs.Delete);
    if (!hasDelete) {
      return false;
    }
    const note = await repository.findOne({
      select: ["id", "status", "assigneeId", "approvedBy"],
      relations: ["approvedBy"],
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          id,
          status: In(noteEndpoint.getDeleteExpectedStatuses),
        });
      }
    });
    if (!note) {
      return false;
    }
    if (note.status === noteEndpoint.status.Drafting) {
      return note.assigneeId === account.id;
    } else {
      const hasApproved = await this.hasPermissionAccountGroup(account, res, noteEndpoint.featureActs.Approved);
      return hasApproved && note.approvedBy?.id === account.id;
    }
  };

  public checkRestoreNotePermission = async (
    endpointPermission: any,
    account: Account,
    id: number,
  ): Promise<boolean> => {
    const group = endpointPermission.api.split("/")[1];
    const noteEndpoint = this.noteEndpoints[group];
    const repository = noteEndpoint.repository;
    const res = {
      name: endpointPermission?.resource?.model
    };
    const hasRestore = await this.hasPermissionAccountGroup(account, res, noteEndpoint.featureActs.Restore);
    const hasApproved = await this.hasPermissionAccountGroup(account, res, noteEndpoint.featureActs.Approved);
    if (!hasRestore || !hasApproved) {
      return false;
    }
    const note = await repository.findOne({
      select: ["id"],
      where: (qb: SelectQueryBuilder<unknown>) => {
        qb.where({
          id,
          status: In(noteEndpoint.getRestoreExpectedStatuses),
        });
      }
    });
    if (!note) {
      return false;
    }

    const accountEvent = await this.accountEventRepository.findOne({
      referenceId: note.id,
      type: noteEndpoint.accountEvent.type.Deleted,
      model: noteEndpoint.accountEvent.model,
    });

    return account.id === accountEvent?.accountId;
  };

  public hasViewNotePermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    if (account.type === EAccountType.ADMIN) {
      return true;
    }
    const endpointPermission = await this.getEndpointPermission({
      id: res.id,
      api: res.name,
      method: act,
      resourceId: res.resourceId,
    }, account);

    return !!endpointPermission;

    // BDS-1245 Todo: Điều chỉnh chức năng Xem chứng từ - Remove quyền theo user
    // if (!endpointPermission) {
    //   return false;
    // }
    // return await this.checkViewNotePermission(endpointPermission, account, res.id);
  };

  public hasViewPropertyPermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    if (account.type === EAccountType.ADMIN) {
      return true;
    }
    const result = await this.getEndpointPermission({
      id: res.id,
      api: res.name,
      method: act,
      resourceId: res.resourceId,
    }, account);

    return !!result;
  };

  public hasDeleteNotePermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    if (account.type === EAccountType.ADMIN) {
      return true;
    }
    const endpointPermission = await this.getEndpointPermission({
      id: res.id,
      api: res.name,
      method: act,
      resourceId: res.resourceId,
    }, account);
    if (!endpointPermission) {
      return false;
    }
    return await this.checkDeleteNotePermission(endpointPermission, account, res.id);
  };

  public hasRestoreNotePermission = async (
    account: any,
    res: any,
    act: any
  ): Promise<boolean> => {
    if (account.type === EAccountType.ADMIN) {
      return true;
    }
    const endpointPermission = await this.getEndpointPermission({
      id: res.id,
      api: res.name,
      method: act,
      resourceId: res.resourceId,
    }, account);
    if (!endpointPermission) {
      return false;
    }
    return await this.checkRestoreNotePermission(endpointPermission, account, res.id);
  };

}
