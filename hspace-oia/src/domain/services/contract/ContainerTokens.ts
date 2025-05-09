import { Token } from "typedi";
import { IBaseRepository } from "./IBaseRepository";
import { IMenuRepository } from "./IMenuRepository";
import { IInvestmentPlanManager } from "./IInvestmentPlanManager";
import { IMenuManager } from "./IMenuManager";
import { IAppraisalAuditDetailRepository } from "./IAppraisalAuditDetailRepository";
import { IInspectionStatementManager } from "./IInspectionStatementManager";
import { IEmployeeRepository } from "./IEmployeeRepository";
import { IMasterValueRepository } from "./IMasterValueRepository";
import { IAccountRepository } from "./IAccountRepository";
import { IPropertyBookmarkRepository } from "./IPropertyBookmarkRepository";
import { IEmployeeManager } from "./IEmployeeManager";
import { IGroupValueRepository } from "./IGroupValueRepository";
import { IProjectNegotiationManager } from "./IProjectNegotiationManager";
import {
  IAccountActivityRepository,
  IAccountDeviceTokenManager,
  IAccountDeviceTokenRepository,
  IAccountEventRepository,
  IAccountGroupManager,
  IAccountGroupRepository,
  IAccountNotificationRepository,
  IAccountSettingRepository,
  IAccountSourceViewRepository,
  IActivityTemplateRepository,
  IAppraisalExpectationLastMonthStatisticsViewRepository,
  IAppraisalExpectationManager,
  IAppraisalExpectationRepository,
  IAppraisalExpectationThisMonthStatisticsViewRepository,
  IAppraisalStatementLastMonthStatisticsViewRepository,
  IAppraisalStatementManager,
  IAppraisalStatementRatioViewRepository,
  IAppraisalStatementRepository,
  IAppraisalStatementThisMonthStatisticsViewRepository,
  IChatSocketRepository,
  ICollaboratorRepository,
  ICommentRepository,
  IConversationRepository,
  IDefaultAccountSettingRepository,
  IEndpointPermissionRepository,
  IFeatureRepository,
  IInspectionExpectationLastMonthStatisticsViewRepository,
  IInspectionExpectationManager,
  IInspectionExpectationRepository,
  IInspectionExpectationThisMonthStatisticsViewRepository,
  IInspectionStatementLastMonthStatisticsViewRepository,
  IInspectionStatementRepository,
  IInspectionStatementThisMonthStatisticsViewRepository,
  IInvestmentEfficiencyLastMonthStatisticsViewRepository,
  IInvestmentEfficiencyManager,
  IInvestmentEfficiencyRepository,
  IInvestmentEfficiencyThisMonthStatisticsViewRepository,
  IInvestmentPlanLastMonthStatisticsViewRepository,
  IInvestmentPlanRepository,
  IInvestmentPlanThisMonthStatisticsViewRepository,
  ILatestApprovedNoteRepository,
  IMessageRepository,
  INotificationManager,
  INotificationRepository,
  INotificationTemplateRepository,
  IParticipantRepository,
  IProjectNegotiationActionDetailRepository,
  IProjectNegotiationLastMonthStatisticsViewRepository,
  IProjectNegotiationOpinionDetailRepository,
  IProjectNegotiationPlanStepRepository,
  IProjectNegotiationReferItemRepository,
  IProjectNegotiationRepository,
  IProjectNegotiationThisMonthStatisticsViewRepository,
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
  IResetTokenRepository,
  IResourceRepository,
  ISessionRepository,
  ISystemConfigRepository,
  ITopicRepository,
} from "./index";
import { IPolicyManager } from "./IPolicyManager";
import {
  AppraisalExpectationStatusType,
  AppraisalStatementStatusType,
  InspectionExpectationStatusType,
  InspectionStatementStatusType,
  InvestmentEfficiencyStatusType,
  InvestmentPlanStatusType,
  ProjectNegotiationStatusType
} from "../../../infrastructure/types/Note";

export default {
  InvestmentPlanRepository: new Token<IInvestmentPlanRepository>(),
  InvestmentPlanItemRepository: new Token<IBaseRepository>(),
  InvestmentPlanLandRepository: new Token<IBaseRepository>(),
  MenuRepository: new Token<IMenuRepository>(),
  InvestmentPlanManager: new Token<IInvestmentPlanManager<InvestmentPlanStatusType>>(),
  MenuManager: new Token<IMenuManager>(),
  AppraisalStatementRepository: new Token<IAppraisalStatementRepository>(),
  AppraisalAuditDetailRepository: new Token<IAppraisalAuditDetailRepository>(),
  AppraisalStatementManager: new Token<IAppraisalStatementManager<AppraisalStatementStatusType>>(),
  InspectionExpectationRepository: new Token<IInspectionExpectationRepository>(),
  InspectionExpectationPlanItemRepository: new Token<IBaseRepository>(),
  InspectionExpectationPlanLandRepository: new Token<IBaseRepository>(),
  InspectionExpectationAdvantageLevelRepository: new Token<IBaseRepository>(),
  InspectionExpectationDisadvantageLevelRepository: new Token<IBaseRepository>(),
  InspectionExpectationManager: new Token<IInspectionExpectationManager<InspectionExpectationStatusType>>(),
  AppraisalExpectationRepository: new Token<IAppraisalExpectationRepository>(),
  AppraisalExpectationPlanItemRepository: new Token<IBaseRepository>(),
  AppraisalExpectationPlanLandRepository: new Token<IBaseRepository>(),
  AppraisalExpectationManager: new Token<IAppraisalExpectationManager<AppraisalExpectationStatusType>>(),
  InspectionStatementRepository: new Token<IInspectionStatementRepository>(),
  InspectionStatementManager: new Token<IInspectionStatementManager<InspectionStatementStatusType>>(),
  AdvantageLevelRepository: new Token<IBaseRepository>(),
  DisadvantageLevelRepository: new Token<IBaseRepository>(),
  InvestmentEfficiencyRepository: new Token<IInvestmentEfficiencyRepository>(),
  InvestmentEfficiencyPlanItemRepository: new Token<IBaseRepository>(),
  InvestmentEfficiencyLandRepository: new Token<IBaseRepository>(),
  InvestmentEfficiencyManager: new Token<IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>>(),
  PropertyRepository: new Token<IPropertyRepository>(),
  EmployeeRepository: new Token<IEmployeeRepository>(),
  EmployeeLimitRepository: new Token<IEmployeeRepository>(),
  EmployeeRegionRepository: new Token<IEmployeeRepository>(),
  MasterValueRepository: new Token<IMasterValueRepository>(),
  AccountRepository: new Token<IAccountRepository>(),
  PropertyBookmarkRepository: new Token<IPropertyBookmarkRepository>(),
  EmployeeManager: new Token<IEmployeeManager>(),
  PropertyManager: new Token<IPropertyManager>(),
  GroupValueRepository: new Token<IGroupValueRepository>(),
  ProjectNegotiationRepository: new Token<IProjectNegotiationRepository>(),
  ProjectNegotiationManager: new Token<IProjectNegotiationManager<ProjectNegotiationStatusType>>(),
  ProjectNegotiationPlanStepRepository: new Token<IProjectNegotiationPlanStepRepository>(),
  ProjectNegotiationActionDetailRepository: new Token<IProjectNegotiationActionDetailRepository>(),
  ProjectNegotiationOpinionDetailRepository: new Token<IProjectNegotiationOpinionDetailRepository>(),
  ProjectNegotiationReferItemRepository: new Token<IProjectNegotiationReferItemRepository>(),
  ChatSocketRepository: new Token<IChatSocketRepository>(),
  ConversationRepository: new Token<IConversationRepository>(),
  MessageRepository: new Token<IMessageRepository>(),
  ParticipantRepository: new Token<IParticipantRepository>(),
  AccountAccountGroupRepository: new Token<IBaseRepository>(),
  SessionRepository: new Token<ISessionRepository>(),
  ResourceRepository: new Token<IResourceRepository>(),
  FeatureRepository: new Token<IFeatureRepository>(),
  AccountGroupRepository: new Token<IAccountGroupRepository>(),
  AccountGroupFeatureRepository: new Token<IBaseRepository>(),
  AccountGroupResourceRepository: new Token<IBaseRepository>(),
  ResetTokenRepository: new Token<IResetTokenRepository>(),
  PropertyHistoryNoteRepository: new Token<IPropertyHistoryNoteRepository>(),
  CollaboratorRepository: new Token<ICollaboratorRepository>(),
  NotificationRepository: new Token<INotificationRepository>(),
  AccountNotificationRepository: new Token<IAccountNotificationRepository>(),
  NotificationManager: new Token<INotificationManager>(),
  NotificationTemplateRepository: new Token<INotificationTemplateRepository>(),
  AccountDeviceTokenRepository: new Token<IAccountDeviceTokenRepository>(),
  AccountDeviceTokenManager: new Token<IAccountDeviceTokenManager>(),
  PolicyManager: new Token<IPolicyManager>(),
  AccountEventRepository: new Token<IAccountEventRepository>(),
  EndpointPermissionRepository: new Token<IEndpointPermissionRepository>(),
  SystemConfigRepository: new Token<ISystemConfigRepository>(),
  AccountGroupManager: new Token<IAccountGroupManager>(),
  TopicRepository: new Token<ITopicRepository>(),
  CommentRepository: new Token<ICommentRepository>(),
  ActivityTemplateRepository: new Token<IActivityTemplateRepository>(),
  AccountActivityRepository: new Token<IAccountActivityRepository>(),
  PropertyPurchaseRepository: new Token<IPropertyPurchaseRepository>(),
  PropertySaleRepository: new Token<IPropertySaleRepository>(),
  LatestApprovedNoteRepository: new Token<ILatestApprovedNoteRepository>(),
  PropertyViewRepository: new Token<IPropertyViewRepository>(),
  PropertyPriceViewRepository: new Token<IPropertyPriceViewRepository>(),
  AppraisalStatementRatioViewRepository: new Token<IAppraisalStatementRatioViewRepository>(),
  AccountSourceViewRepository: new Token<IAccountSourceViewRepository>(),
  PropertyThisMonthStatisticsViewRepository: new Token<IPropertyThisMonthStatisticsViewRepository>(),
  PropertyLastMonthStatisticsViewRepository: new Token<IPropertyLastMonthStatisticsViewRepository>(),
  InspectionExpectationThisMonthStatisticsViewRepository: new Token<IInspectionExpectationThisMonthStatisticsViewRepository>(),
  InspectionExpectationLastMonthStatisticsViewRepository: new Token<IInspectionExpectationLastMonthStatisticsViewRepository>(),
  AccountSettingRepository: new Token<IAccountSettingRepository>(),
  DefaultAccountSettingRepository: new Token<IDefaultAccountSettingRepository>(),
  AppraisalExpectationThisMonthStatisticsViewRepository: new Token<IAppraisalExpectationThisMonthStatisticsViewRepository>(),
  AppraisalExpectationLastMonthStatisticsViewRepository: new Token<IAppraisalExpectationLastMonthStatisticsViewRepository>(),
  InspectionStatementThisMonthStatisticsViewRepository: new Token<IInspectionStatementThisMonthStatisticsViewRepository>(),
  InspectionStatementLastMonthStatisticsViewRepository: new Token<IInspectionStatementLastMonthStatisticsViewRepository>(),
  ProjectNegotiationThisMonthStatisticsViewRepository: new Token<IProjectNegotiationThisMonthStatisticsViewRepository>(),
  ProjectNegotiationLastMonthStatisticsViewRepository: new Token<IProjectNegotiationLastMonthStatisticsViewRepository>(),
  InvestmentEfficiencyThisMonthStatisticsViewRepository: new Token<IInvestmentEfficiencyThisMonthStatisticsViewRepository>(),
  InvestmentEfficiencyLastMonthStatisticsViewRepository: new Token<IInvestmentEfficiencyLastMonthStatisticsViewRepository>(),
  InvestmentPlanThisMonthStatisticsViewRepository: new Token<IInvestmentPlanThisMonthStatisticsViewRepository>(),
  InvestmentPlanLastMonthStatisticsViewRepository: new Token<IInvestmentPlanLastMonthStatisticsViewRepository>(),
  AppraisalStatementThisMonthStatisticsViewRepository: new Token<IAppraisalStatementThisMonthStatisticsViewRepository>(),
  AppraisalStatementLastMonthStatisticsViewRepository: new Token<IAppraisalStatementLastMonthStatisticsViewRepository>(),
  PropertyProgressRepository: new Token<IPropertyProgressRepository>(),
};
