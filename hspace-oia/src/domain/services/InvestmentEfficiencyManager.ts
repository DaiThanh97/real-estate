import {
  IBaseRepository,
  IFeatureRepository,
  IInvestmentEfficiencyManager,
  IInvestmentEfficiencyRepository
} from "./contract";
import { NoteManager } from "./NoteManager";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import constants from "../../infrastructure/config/constants";
import { InvestmentEfficiencyStatus, } from "../../infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { InvestmentEfficiencyStatusType } from "../../infrastructure/types/Note";

@Service(ContainerTokens.InvestmentEfficiencyManager)
export class InvestmentEfficiencyManager extends NoteManager<InvestmentEfficiencyStatusType>
  implements IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType> {
  public constructor(
    @Inject(ContainerTokens.InvestmentEfficiencyRepository)
      investmentEfficiencyRepository: IInvestmentEfficiencyRepository,
    @Inject(ContainerTokens.FeatureRepository)
      featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
      accountGroupFeatureRepository: IBaseRepository,
  ) {
    super();
    this.noteRepository = investmentEfficiencyRepository;
    this.statusErrCode = ErrorCode.InvestmentEfficiency.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.InvestmentEfficiency;
    this.statusWorkflow = [
      {
        status: InvestmentEfficiencyStatus.Pending,
        expectedStatus: [InvestmentEfficiencyStatus.Drafting],
      },
      {
        status: InvestmentEfficiencyStatus.Approved,
        expectedStatus: [InvestmentEfficiencyStatus.Pending],
      },
      {
        status: InvestmentEfficiencyStatus.Rejected,
        expectedStatus: [InvestmentEfficiencyStatus.Pending],
      }
    ];
    this.featureRepository = featureRepository;
    this.accountGroupFeatureRepository = accountGroupFeatureRepository;
    this.fullSearchAccessFeatures = [
      {
        action: "Duyệt",
        resourcePath: "/investment/efficiency/view",
      },
      {
        action: "Phân công thực hiện",
        resourcePath: "/investment/efficiency/edit"
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [InvestmentEfficiencyStatus.Drafting],
      },
      C: {
        exclude: [InvestmentEfficiencyStatus.Drafting],
      }
    };
  }
}
