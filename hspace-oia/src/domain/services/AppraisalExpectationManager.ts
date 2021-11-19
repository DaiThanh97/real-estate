import {
  IAppraisalExpectationManager,
  IAppraisalExpectationRepository,
  IBaseRepository,
  IFeatureRepository
} from "./contract";
import { NoteManager } from "./NoteManager";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import constants from "../../infrastructure/config/constants";
import { AppraisalExpectationStatus, } from "../../infrastructure/orm/typeorm/models/AppraisalExpectation";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { AppraisalExpectationStatusType } from "../../infrastructure/types/Note";

@Service(ContainerTokens.AppraisalExpectationManager)
export class AppraisalExpectationManager extends NoteManager<AppraisalExpectationStatusType>
  implements IAppraisalExpectationManager<AppraisalExpectationStatusType> {
  public constructor(
    @Inject(ContainerTokens.AppraisalExpectationRepository)
      appraisalExpectationRepository: IAppraisalExpectationRepository,
    @Inject(ContainerTokens.FeatureRepository)
      featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
      accountGroupFeatureRepository: IBaseRepository,
  ) {
    super();
    this.noteRepository = appraisalExpectationRepository;
    this.statusErrCode = ErrorCode.AppraisalExpectation.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.AppraisalExpectation;
    this.statusWorkflow = [
      {
        status: AppraisalExpectationStatus.Finished,
        expectedStatus: [AppraisalExpectationStatus.Drafting],
      },
      {
        status: AppraisalExpectationStatus.Pending,
        expectedStatus: [AppraisalExpectationStatus.Finished],
      },
      {
        status: AppraisalExpectationStatus.Approved,
        expectedStatus: [AppraisalExpectationStatus.Pending],
      },
      {
        status: AppraisalExpectationStatus.Rejected,
        expectedStatus: [AppraisalExpectationStatus.Pending, AppraisalExpectationStatus.Finished],
      }
    ];
    this.featureRepository = featureRepository;
    this.accountGroupFeatureRepository = accountGroupFeatureRepository;
    this.fullSearchAccessFeatures = [
      {
        action: "Duyệt",
        resourcePath: "/appraisal/expectation/view",
      },
      {
        action: "Gửi duyệt",
        resourcePath: "/appraisal/expectation/view",
      },
      {
        action: "Phân công thực hiện",
        resourcePath: "/appraisal/expectation/edit"
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [AppraisalExpectationStatus.Drafting],
      },
      C: {
        exclude: [AppraisalExpectationStatus.Drafting],
      }
    };
  }
}
