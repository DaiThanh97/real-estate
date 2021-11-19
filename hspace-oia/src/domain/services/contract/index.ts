import { IBaseRepository } from "./IBaseRepository";
import { INoteManager } from "./INoteManager";

export * from "./IBaseRepository";
export * from "./IAccountManager";
export * from "./ISessionRepository";
export * from "./ITokenManager";
export * from "./IAccountGroupRepository";
export * from "./ICollaboratorRepository";
export * from "./IResetTokenRepository";
export * from "./IAccountRepository";
export * from "./IPropertyRepository";
export * from "./IPropertyManager";
export * from "./IPropertyBookmarkRepository";
export * from "./INoteManager";
export * from "./IEmployeeRepository";
export * from "./IEmployeeManager";
export * from "./IInspectionStatementManager";
export * from "./IMasterValueRepository";
export * from "./IGroupValueRepository";
export * from "./IFeatureRepository";
export * from "./IResourceRepository";
export * from "./IChatManager";
export * from "./IAccountRepository";
export * from "./IConversationRepository";
export * from "./IMessageRepository";
export * from "./IMenuManager";
export * from "./IMenuRepository";
export * from "./IProjectNegotiationManager";
export * from "./IAppraisalAuditDetailRepository";
export * from "./IInvestmentPlanManager";
export * from "./IChatSocketRepository";
export * from "./IParticipantRepository";
export * from "./IParticipantRepository";
export * from "./IPropertyHistoryNoteRepository";
export * from "./INotificationManager";
export * from "./IAccountDeviceTokenManager";
export * from "./IAccountEventRepository";
export * from "./IAccountGroupManager";
export * from "./ILatestApprovedNoteRepository";

export type INoteRepository = IBaseRepository;

export type IViewRepository = IBaseRepository;

export type IInspectionStatementRepository = INoteRepository;

export type IAppraisalStatementRepository = INoteRepository;

export type IInspectionExpectationRepository = INoteRepository;

export type IAppraisalExpectationRepository = INoteRepository;

export type IProjectNegotiationRepository = INoteRepository;

export type IInvestmentPlanRepository = INoteRepository;

export type IInvestmentEfficiencyRepository = INoteRepository;

export type IInspectionExpectationManager<StatusType> = INoteManager<StatusType>;

export type IAppraisalExpectationManager<StatusType> = INoteManager<StatusType>;

export type IInvestmentEfficiencyManager<StatusType> = INoteManager<StatusType>;

export type IAppraisalStatementManager<StatusType> = INoteManager<StatusType>;

export type IProjectNegotiationPlanStepRepository = IBaseRepository;

export type IProjectNegotiationActionDetailRepository = IBaseRepository;

export type IProjectNegotiationOpinionDetailRepository = IBaseRepository;

export type IProjectNegotiationReferItemRepository = IBaseRepository;

export type INotificationRepository = IBaseRepository;

export type IAccountNotificationRepository = IBaseRepository;

export type INotificationTemplateRepository = IBaseRepository;

export type IAccountDeviceTokenRepository = IBaseRepository;

export type IEndpointPermissionRepository = IBaseRepository;

export type ISystemConfigRepository = IBaseRepository;

export type ITopicRepository = IBaseRepository;

export type ICommentRepository = IBaseRepository;

export type IActivityTemplateRepository = IBaseRepository;

export type IAccountActivityRepository = IBaseRepository;

export type IPropertyPurchaseRepository = IBaseRepository;

export type IPropertySaleRepository = IBaseRepository;

export type IPropertyViewRepository = IViewRepository;

export type IPropertyPriceViewRepository = IViewRepository;

export type IAppraisalStatementRatioViewRepository = IViewRepository;

export type IAccountSourceViewRepository = IViewRepository;

export type IPropertyThisMonthStatisticsViewRepository = IViewRepository;

export type IPropertyLastMonthStatisticsViewRepository = IViewRepository;

export type IInspectionExpectationThisMonthStatisticsViewRepository = IViewRepository;

export type IInspectionExpectationLastMonthStatisticsViewRepository = IViewRepository;

export type IAppraisalExpectationThisMonthStatisticsViewRepository = IViewRepository;

export type IAppraisalExpectationLastMonthStatisticsViewRepository = IViewRepository;

export type IAccountSettingRepository = IBaseRepository;

export type IDefaultAccountSettingRepository = IBaseRepository;

export type IInspectionStatementThisMonthStatisticsViewRepository = IBaseRepository;

export type IInspectionStatementLastMonthStatisticsViewRepository = IBaseRepository;

export type IProjectNegotiationThisMonthStatisticsViewRepository = IBaseRepository;

export type IProjectNegotiationLastMonthStatisticsViewRepository = IBaseRepository;

export type IInvestmentEfficiencyThisMonthStatisticsViewRepository = IBaseRepository;

export type IInvestmentEfficiencyLastMonthStatisticsViewRepository = IBaseRepository;

export type IInvestmentPlanThisMonthStatisticsViewRepository = IBaseRepository;

export type IInvestmentPlanLastMonthStatisticsViewRepository = IBaseRepository;

export type IAppraisalStatementThisMonthStatisticsViewRepository = IBaseRepository;

export type IAppraisalStatementLastMonthStatisticsViewRepository = IBaseRepository;

export type IPropertyProgressRepository = IBaseRepository;
