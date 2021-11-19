import { IBaseRepository, IFeatureRepository, IInvestmentPlanManager, IInvestmentPlanRepository } from "./contract";
import { NoteManager } from "./NoteManager";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import constants from "../../infrastructure/config/constants";
import { InvestmentPlanStatus } from "../../infrastructure/orm/typeorm/models/InvestmentPlan";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { InvestmentPlanStatusType } from "../../infrastructure/types/Note";


@Service(ContainerTokens.InvestmentPlanManager)
export class InvestmentPlanManager extends NoteManager<InvestmentPlanStatusType> implements IInvestmentPlanManager<InvestmentPlanStatusType> {

  public constructor(
    @Inject(ContainerTokens.InvestmentPlanRepository)
      investmentPlanRepository: IInvestmentPlanRepository,
    @Inject(ContainerTokens.InvestmentPlanItemRepository)
    private investmentPlanItemRepository: IBaseRepository,
    @Inject(ContainerTokens.FeatureRepository)
      featureRepository: IFeatureRepository,
    @Inject(ContainerTokens.AccountGroupFeatureRepository)
      accountGroupFeatureRepository: IBaseRepository,
  ) {
    super();
    this.noteRepository = investmentPlanRepository;
    this.statusErrCode = ErrorCode.InvestmentPlan.InvalidStatus;
    this.prefix = constants.PropertyNoteIdPrefix.InvestmentPlan;
    this.statusWorkflow = [
      {
        status: InvestmentPlanStatus.Pending,
        expectedStatus: [InvestmentPlanStatus.Drafting],
      },
      {
        status: InvestmentPlanStatus.Approved,
        expectedStatus: [InvestmentPlanStatus.Pending],
      },
      {
        status: InvestmentPlanStatus.Rejected,
        expectedStatus: [InvestmentPlanStatus.Pending],
      }
    ];
    this.featureRepository = featureRepository;
    this.accountGroupFeatureRepository = accountGroupFeatureRepository;
    this.fullSearchAccessFeatures = [
      {
        action: "Duyệt",
        resourcePath: "/investment/plan/view",
      },
      {
        action: "Phân công thực hiện",
        resourcePath: "/investment/plan/edit"
      }
    ];

    // @see docs/noteClasses.md
    this.groupStatuses = {
      A: {},
      B: {
        only: [InvestmentPlanStatus.Drafting],
      },
      C: {
        exclude: [InvestmentPlanStatus.Drafting],
      }
    };
  }

  public async updatePlanItemPriceWhenApprovedTUNote(planItems: any): Promise<void> {
    if (planItems && planItems.length > 0) {
      planItems.forEach((item: { sourceId: number; price: any; }) => {
          if(item.sourceId && item.price){
            this.investmentPlanItemRepository.update(item.sourceId, {
              price: item.price
            });
          }
      });
    }
  }

}
