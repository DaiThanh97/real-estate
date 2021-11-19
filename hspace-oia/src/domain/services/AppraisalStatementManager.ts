import { AppraisalStatementStatus } from "../models/AppraisalStatement";
import {
  IAppraisalStatementManager,
  IAppraisalStatementRepository,
  IBaseRepository,
  IFeatureRepository
} from "./contract";
import constants from "../../infrastructure/config/constants";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { NoteManager } from "./NoteManager";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { AppraisalStatementStatusType } from "../../infrastructure/types/Note";

@Service(ContainerTokens.AppraisalStatementManager)
export class AppraisalStatementManager extends NoteManager<AppraisalStatementStatusType>
  implements IAppraisalStatementManager<AppraisalStatementStatusType> {
  public constructor(
    @Inject(ContainerTokens.AppraisalStatementRepository)
      appraisalStatementRepository: IAppraisalStatementRepository,
    @Inject(ContainerTokens.FeatureRepository)
      featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
      accountGroupFeatureRepository: IBaseRepository,
  ) {
    super();
    this.noteRepository = appraisalStatementRepository;
    this.statusErrCode = ErrorCode.AppraisalStatement.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.AppraisalStatement;
    this.statusWorkflow = [
      {
        status: AppraisalStatementStatus.Finished,
        expectedStatus: [AppraisalStatementStatus.Drafting],
      },
      {
        status: AppraisalStatementStatus.Pending,
        expectedStatus: [AppraisalStatementStatus.Finished],
      },
      {
        status: AppraisalStatementStatus.Approved,
        expectedStatus: [AppraisalStatementStatus.Pending],
      },
      {
        status: AppraisalStatementStatus.Rejected,
        expectedStatus: [AppraisalStatementStatus.Pending, AppraisalStatementStatus.Finished],
      }
    ];
    this.featureRepository = featureRepository;
    this.accountGroupFeatureRepository = accountGroupFeatureRepository;
    this.fullSearchAccessFeatures = [
      {
        action: "Duyệt",
        resourcePath: "/appraisal/statement/view",
      },
      {
        action: "Gửi duyệt",
        resourcePath: "/appraisal/statement/view",
      },
      {
        action: "Phân công thực hiện",
        resourcePath: "/appraisal/statement/edit"
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [AppraisalStatementStatus.Drafting],
      },
      C: {
        exclude: [AppraisalStatementStatus.Drafting],
      }
    };
  }

}

