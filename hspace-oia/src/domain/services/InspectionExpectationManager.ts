import {
  IBaseRepository,
  IFeatureRepository,
  IInspectionExpectationManager,
  IInspectionExpectationRepository
} from "./contract";
import constants from "../../infrastructure/config/constants";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { InspectionExpectationStatus } from "../models/InspectionExpectation";
import { NoteManager } from "./NoteManager";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { InspectionExpectationStatusType } from "../../infrastructure/types/Note";

@Service(ContainerTokens.InspectionExpectationManager)
export class InspectionExpectationManager extends NoteManager<InspectionExpectationStatusType>
  implements IInspectionExpectationManager<InspectionExpectationStatusType> {
  public constructor(
    @Inject(ContainerTokens.InspectionExpectationRepository)
      inspectionExpectationRepository: IInspectionExpectationRepository,
    @Inject(ContainerTokens.FeatureRepository)
      featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
      accountGroupFeatureRepository: IBaseRepository,
  ) {
    super();
    this.noteRepository = inspectionExpectationRepository;
    this.statusErrCode = ErrorCode.InspectionExpectation.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.InspectionExpectation;
    this.statusWorkflow = [
      {
        status: InspectionExpectationStatus.Pending,
        expectedStatus: [InspectionExpectationStatus.Drafting],
      },
      {
        status: InspectionExpectationStatus.Approved,
        expectedStatus: [InspectionExpectationStatus.Pending],
      },
      {
        status: InspectionExpectationStatus.Rejected,
        expectedStatus: [InspectionExpectationStatus.Pending],
      }
    ];

    this.featureRepository = featureRepository;
    this.accountGroupFeatureRepository = accountGroupFeatureRepository;
    this.fullSearchAccessFeatures = [
      {
        action: "Duyệt",
        resourcePath: "/inspection/expectation/view",
      },
      {
        action: "Phân công thực hiện",
        resourcePath: "/inspection/expectation/edit"
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [InspectionExpectationStatus.Drafting],
      },
      C: {
        exclude: [InspectionExpectationStatus.Drafting],
      }
    };
  }
}
