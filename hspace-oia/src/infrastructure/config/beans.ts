import "reflect-metadata";
import { IPasswordManager } from "../../application/security/IPasswordManager";
import { AccessTokenManager } from "../../application/security/AccessTokenManager";
import { ServerApplicationState } from "@hapi/hapi";
import {
  IAccountActivityRepository,
  IAccountDeviceTokenManager,
  IAccountDeviceTokenRepository,
  IAccountEventRepository,
  IAccountGroupManager,
  IAccountGroupRepository,
  IAccountManager,
  IAccountNotificationRepository,
  IAccountRepository,
  IAccountSettingRepository,
  IAccountSourceViewRepository,
  IActivityTemplateRepository,
  IAppraisalAuditDetailRepository,
  IAppraisalExpectationLastMonthStatisticsViewRepository,
  IAppraisalExpectationManager,
  IAppraisalExpectationRepository,
  IAppraisalExpectationThisMonthStatisticsViewRepository,
  IAppraisalStatementLastMonthStatisticsViewRepository,
  IAppraisalStatementManager,
  IAppraisalStatementRatioViewRepository,
  IAppraisalStatementRepository,
  IAppraisalStatementThisMonthStatisticsViewRepository,
  IBaseRepository,
  IChatManager,
  IChatSocketRepository,
  ICollaboratorRepository,
  ICommentRepository,
  IConversationRepository,
  IDefaultAccountSettingRepository,
  IEmployeeManager,
  IEmployeeRepository,
  IEndpointPermissionRepository,
  IFeatureRepository,
  IInspectionExpectationLastMonthStatisticsViewRepository,
  IInspectionExpectationManager,
  IInspectionExpectationRepository,
  IInspectionExpectationThisMonthStatisticsViewRepository,
  IInspectionStatementLastMonthStatisticsViewRepository,
  IInspectionStatementManager,
  IInspectionStatementRepository,
  IInspectionStatementThisMonthStatisticsViewRepository,
  IInvestmentEfficiencyLastMonthStatisticsViewRepository,
  IInvestmentEfficiencyManager,
  IInvestmentEfficiencyRepository,
  IInvestmentEfficiencyThisMonthStatisticsViewRepository,
  IInvestmentPlanLastMonthStatisticsViewRepository,
  IInvestmentPlanManager,
  IInvestmentPlanRepository,
  IInvestmentPlanThisMonthStatisticsViewRepository,
  ILatestApprovedNoteRepository,
  IMasterValueRepository,
  IMenuManager,
  IMenuRepository,
  IMessageRepository,
  INotificationManager,
  INotificationRepository,
  INotificationTemplateRepository,
  IParticipantRepository,
  IProjectNegotiationActionDetailRepository,
  IProjectNegotiationLastMonthStatisticsViewRepository,
  IProjectNegotiationManager,
  IProjectNegotiationOpinionDetailRepository,
  IProjectNegotiationPlanStepRepository,
  IProjectNegotiationReferItemRepository,
  IProjectNegotiationRepository,
  IProjectNegotiationThisMonthStatisticsViewRepository,
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
  IResetTokenRepository,
  IResourceRepository,
  ISessionRepository,
  ISystemConfigRepository,
  ITokenManager,
  ITopicRepository,
} from "../../domain/services/contract";
import { IFileManager } from "../service/contract/IFileManager";
import { Enforcer } from "casbin/lib/cjs/enforcer";
import { IEmailService } from "../service/contract/IEmailService";
import { IFCMNotificationService } from "../service/contract/IFCMNotificationService";
import { Inject, Service } from "typedi";
import ContainerTokens from "../../domain/services/contract/ContainerTokens";
import * as events from "events";
import { IPolicyManager } from "../../domain/services/contract/IPolicyManager";
import {
  AppraisalExpectationStatusType,
  AppraisalStatementStatusType,
  InspectionExpectationStatusType,
  InspectionStatementStatusType,
  InvestmentEfficiencyStatusType,
  InvestmentPlanStatusType,
  ProjectNegotiationStatusType
} from "../types/Note";

@Service()
export class EventEmitterService extends events.EventEmitter {
}

@Service()
export default class Beans implements ServerApplicationState {
  public enforcer: Enforcer;

  @Inject()
  public eventEmitter: EventEmitterService;

  public accessTokenManager: AccessTokenManager;
  public tokenManager: ITokenManager;
  public passwordManager: IPasswordManager;

  @Inject(ContainerTokens.AccountRepository)
  public accountRepository: IAccountRepository;

  @Inject(ContainerTokens.AccountAccountGroupRepository)
  public accountAccountGroupRepository: IBaseRepository;

  @Inject(ContainerTokens.SessionRepository)
  public sessionRepository: ISessionRepository;

  @Inject(ContainerTokens.MasterValueRepository)
  public masterValueRepository: IMasterValueRepository;

  @Inject(ContainerTokens.ResourceRepository)
  public resourceRepository: IResourceRepository;

  @Inject(ContainerTokens.FeatureRepository)
  public featureRepository: IFeatureRepository;

  @Inject(ContainerTokens.AccountGroupRepository)
  public accountGroupRepository: IAccountGroupRepository;

  @Inject(ContainerTokens.AccountGroupFeatureRepository)
  public accountGroupFeatureRepository: IBaseRepository;

  @Inject(ContainerTokens.AccountGroupResourceRepository)
  public accountGroupResourceRepository: IBaseRepository;

  @Inject(ContainerTokens.ResetTokenRepository)
  public resetTokenRepository: IResetTokenRepository;

  @Inject(ContainerTokens.EmployeeRepository)
  public employeeRepository: IEmployeeRepository;

  @Inject(ContainerTokens.EmployeeLimitRepository)
  public employeeLimitRepository: IBaseRepository;

  @Inject(ContainerTokens.EmployeeRegionRepository)
  public employeeRegionRepository: IBaseRepository;

  @Inject(ContainerTokens.GroupValueRepository)
  public groupValueRepository: IBaseRepository;

  @Inject(ContainerTokens.PropertyRepository)
  public propertyRepository: IPropertyRepository;

  @Inject(ContainerTokens.PropertyManager)
  public propertyManager: IPropertyManager;

  public accountManager: IAccountManager;

  @Inject(ContainerTokens.CollaboratorRepository)
  public collaboratorRepository: ICollaboratorRepository;

  public fileManager: IFileManager;

  @Inject(ContainerTokens.PropertyHistoryNoteRepository)
  public propertyHistoryNoteRepository: IPropertyHistoryNoteRepository;

  public emailService: IEmailService;

  @Inject(ContainerTokens.PropertyBookmarkRepository)
  public propertyBookmarkRepository: IPropertyBookmarkRepository;

  @Inject(ContainerTokens.EmployeeManager)
  public employeeManager: IEmployeeManager;

  @Inject(ContainerTokens.ChatSocketRepository)
  public chatSocketRepository: IChatSocketRepository;

  @Inject(ContainerTokens.ConversationRepository)
  public conversationRepository: IConversationRepository;

  @Inject(ContainerTokens.MessageRepository)
  public messageRepository: IMessageRepository;

  @Inject(ContainerTokens.ParticipantRepository)
  public participantRepository: IParticipantRepository;

  public chatManager: IChatManager;

  @Inject(ContainerTokens.AppraisalStatementRepository)
  public appraisalStatementRepository: IAppraisalStatementRepository;

  @Inject(ContainerTokens.AppraisalAuditDetailRepository)
  public appraisalAuditDetailRepository: IAppraisalAuditDetailRepository;

  @Inject(ContainerTokens.AppraisalStatementManager)
  public appraisalStatementManager: IAppraisalStatementManager<AppraisalStatementStatusType>;

  @Inject(ContainerTokens.InspectionStatementRepository)
  public inspectionStatementRepository: IInspectionStatementRepository;

  @Inject(ContainerTokens.InspectionStatementManager)
  public inspectionStatementManager: IInspectionStatementManager<InspectionStatementStatusType>;

  @Inject(ContainerTokens.AdvantageLevelRepository)
  public advantageLevelRepository: IBaseRepository;

  @Inject(ContainerTokens.DisadvantageLevelRepository)
  public disadvantageLevelRepository: IBaseRepository;

  @Inject(ContainerTokens.InvestmentPlanRepository)
  public investmentPlanRepository: IInvestmentPlanRepository;

  @Inject(ContainerTokens.InvestmentPlanManager)
  public investmentPlanManager: IInvestmentPlanManager<InvestmentPlanStatusType>;

  @Inject(ContainerTokens.InspectionExpectationRepository)
  public inspectionExpectationRepository: IInspectionExpectationRepository;

  @Inject(ContainerTokens.InspectionExpectationPlanLandRepository)
  public inspectionExpectationPlanLandRepository: IBaseRepository;

  @Inject(ContainerTokens.InspectionExpectationPlanItemRepository)
  public inspectionExpectationPlanItemRepository: IBaseRepository;

  @Inject(ContainerTokens.InspectionExpectationAdvantageLevelRepository)
  public inspectionExpectationAdvantageLevelRepository: IBaseRepository;

  @Inject(ContainerTokens.InspectionExpectationDisadvantageLevelRepository)
  public inspectionExpectationDisadvantageLevelRepository: IBaseRepository;

  @Inject(ContainerTokens.InspectionExpectationManager)
  public inspectionExpectationManager: IInspectionExpectationManager<InspectionExpectationStatusType>;

  @Inject(ContainerTokens.MenuRepository)
  public menuRepository: IMenuRepository;

  @Inject(ContainerTokens.MenuManager)
  public menuManager: IMenuManager;

  @Inject(ContainerTokens.InvestmentPlanItemRepository)
  public investmentPlanItemRepository: IBaseRepository;

  @Inject(ContainerTokens.InvestmentPlanLandRepository)
  public investmentPlanLandRepository: IBaseRepository;
  @Inject(ContainerTokens.AppraisalExpectationRepository)
  public appraisalExpectationRepository: IAppraisalExpectationRepository;
  @Inject(ContainerTokens.AppraisalExpectationPlanItemRepository)
  public appraisalExpectationPlanItemRepository: IBaseRepository;
  @Inject(ContainerTokens.AppraisalExpectationPlanLandRepository)
  public appraisalExpectationPlanLandRepository: IBaseRepository;
  @Inject(ContainerTokens.AppraisalExpectationManager)
  public appraisalExpectationManager: IAppraisalExpectationManager<AppraisalExpectationStatusType>;

  @Inject(ContainerTokens.InvestmentEfficiencyRepository)
  public investmentEfficiencyRepository: IInvestmentEfficiencyRepository;

  @Inject(ContainerTokens.InvestmentEfficiencyPlanItemRepository)
  public investmentEfficiencyPlanItemRepository: IBaseRepository;

  @Inject(ContainerTokens.InvestmentEfficiencyLandRepository)
  public investmentEfficiencyLandRepository: IBaseRepository;

  @Inject(ContainerTokens.InvestmentEfficiencyManager)
  public investmentEfficiencyManager: IInvestmentEfficiencyManager<InvestmentEfficiencyStatusType>;

  @Inject(ContainerTokens.ProjectNegotiationRepository)
  public projectNegotiationRepository: IProjectNegotiationRepository;

  @Inject(ContainerTokens.ProjectNegotiationManager)
  public projectNegotiationManager: IProjectNegotiationManager<ProjectNegotiationStatusType>;

  @Inject(ContainerTokens.ProjectNegotiationPlanStepRepository)
  public projectNegotiationPlanStepRepository: IProjectNegotiationPlanStepRepository;

  @Inject(ContainerTokens.ProjectNegotiationActionDetailRepository)
  public projectNegotiationActionDetailRepository: IProjectNegotiationActionDetailRepository;

  @Inject(ContainerTokens.ProjectNegotiationOpinionDetailRepository)
  public projectNegotiationOpinionDetailRepository: IProjectNegotiationOpinionDetailRepository;

  @Inject(ContainerTokens.ProjectNegotiationReferItemRepository)
  public projectNegotiationReferItemRepository: IProjectNegotiationReferItemRepository;

  @Inject(ContainerTokens.NotificationRepository)
  public notificationRepository: INotificationRepository;

  @Inject(ContainerTokens.AccountNotificationRepository)
  public accountNotificationRepository: IAccountNotificationRepository;

  @Inject(ContainerTokens.NotificationManager)
  public notificationManager: INotificationManager;

  @Inject(ContainerTokens.NotificationTemplateRepository)
  public notificationTemplateRepository: INotificationTemplateRepository;

  public fcmNotificationService: IFCMNotificationService;

  @Inject(ContainerTokens.PolicyManager)
  public policyManager: IPolicyManager;

  @Inject(ContainerTokens.AccountDeviceTokenRepository)
  public accountDeviceTokenRepository: IAccountDeviceTokenRepository;

  @Inject(ContainerTokens.AccountDeviceTokenManager)
  public accountDeviceTokenManager: IAccountDeviceTokenManager;

  @Inject(ContainerTokens.AccountEventRepository)
  public accountEventRepository: IAccountEventRepository;

  @Inject(ContainerTokens.EndpointPermissionRepository)
  public endpointPermissionRepository: IEndpointPermissionRepository;

  @Inject(ContainerTokens.SystemConfigRepository)
  public systemConfigRepository: ISystemConfigRepository;

  @Inject(ContainerTokens.AccountGroupManager)
  public accountGroupManager: IAccountGroupManager;

  @Inject(ContainerTokens.TopicRepository)
  public topicRepository: ITopicRepository;

  @Inject(ContainerTokens.CommentRepository)
  public commentRepository: ICommentRepository;

  @Inject(ContainerTokens.ActivityTemplateRepository)
  public activityTemplateRepository: IActivityTemplateRepository;

  @Inject(ContainerTokens.AccountActivityRepository)
  public accountActivityRepository: IAccountActivityRepository;

  @Inject(ContainerTokens.PropertyPurchaseRepository)
  public propertyPurchaseRepository: IPropertyPurchaseRepository;

  @Inject(ContainerTokens.PropertySaleRepository)
  public propertySaleRepository: IPropertySaleRepository;

  @Inject(ContainerTokens.LatestApprovedNoteRepository)
  public latestApprovedNoteRepository: ILatestApprovedNoteRepository;

  @Inject(ContainerTokens.PropertyViewRepository)
  public propertyViewRepository: IPropertyViewRepository;

  @Inject(ContainerTokens.PropertyPriceViewRepository)
  public propertyPriceViewRepository: IPropertyPriceViewRepository;

  @Inject(ContainerTokens.AppraisalStatementRatioViewRepository)
  appraisalStatementRatioViewRepository: IAppraisalStatementRatioViewRepository;

  @Inject(ContainerTokens.AccountSourceViewRepository)
  public accountSourceViewRepository: IAccountSourceViewRepository;

  @Inject(ContainerTokens.PropertyThisMonthStatisticsViewRepository)
  public propertyThisMonthStatisticsViewRepository: IPropertyThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.PropertyLastMonthStatisticsViewRepository)
  public propertyLastMonthStatisticsViewRepository: IPropertyLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InspectionExpectationThisMonthStatisticsViewRepository)
  public inspectionExpectationThisMonthStatisticsViewRepository: IInspectionExpectationThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InspectionExpectationLastMonthStatisticsViewRepository)
  public inspectionExpectationLastMonthStatisticsViewRepository: IInspectionExpectationLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.AccountSettingRepository)
  public accountSettingRepository: IAccountSettingRepository;

  @Inject(ContainerTokens.DefaultAccountSettingRepository)
  public defaultAccountSettingRepository: IDefaultAccountSettingRepository;

  @Inject(ContainerTokens.AppraisalExpectationThisMonthStatisticsViewRepository)
  public appraisalExpectationThisMonthStatisticsViewRepository: IAppraisalExpectationThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.AppraisalExpectationLastMonthStatisticsViewRepository)
  public appraisalExpectationLastMonthStatisticsViewRepository: IAppraisalExpectationLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InspectionStatementThisMonthStatisticsViewRepository)
  public inspectionStatementThisMonthStatisticsViewRepository: IInspectionStatementThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InspectionStatementLastMonthStatisticsViewRepository)
  public inspectionStatementLastMonthStatisticsViewRepository: IInspectionStatementLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.ProjectNegotiationThisMonthStatisticsViewRepository)
  public projectNegotiationThisMonthStatisticsViewRepository: IProjectNegotiationThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.ProjectNegotiationLastMonthStatisticsViewRepository)
  public projectNegotiationLastMonthStatisticsViewRepository: IProjectNegotiationLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InvestmentEfficiencyThisMonthStatisticsViewRepository)
  public investmentEfficiencyThisMonthStatisticsViewRepository: IInvestmentEfficiencyThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InvestmentEfficiencyLastMonthStatisticsViewRepository)
  public investmentEfficiencyLastMonthStatisticsViewRepository: IInvestmentEfficiencyLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InvestmentPlanThisMonthStatisticsViewRepository)
  public investmentPlanThisMonthStatisticsViewRepository: IInvestmentPlanThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.InvestmentPlanLastMonthStatisticsViewRepository)
  public investmentPlanLastMonthStatisticsViewRepository: IInvestmentPlanLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.AppraisalStatementThisMonthStatisticsViewRepository)
  public appraisalStatementThisMonthStatisticsViewRepository: IAppraisalStatementThisMonthStatisticsViewRepository;

  @Inject(ContainerTokens.AppraisalStatementLastMonthStatisticsViewRepository)
  public appraisalStatementLastMonthStatisticsViewRepository: IAppraisalStatementLastMonthStatisticsViewRepository;

  @Inject(ContainerTokens.PropertyProgressRepository)
  public propertyProgressRepository: IPropertyProgressRepository;
}
