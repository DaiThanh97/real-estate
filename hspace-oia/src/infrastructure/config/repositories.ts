import ContainerTokens from "../../domain/services/contract/ContainerTokens";
import { InvestmentPlanItem } from "../orm/typeorm/models/InvestmentPlanItem";
import { InvestmentPlanLand } from "../orm/typeorm/models/InvestmentPlanLand";
import { Menu } from "../orm/typeorm/models/Menu";
import { AppraisalAuditDetail } from "../orm/typeorm/models/AppraisalAuditDetail";
import { InspectionExpectationPlanItem } from "../orm/typeorm/models/InspectionExpectationPlanItem";
import { InspectionExpectationPlanLand } from "../orm/typeorm/models/InspectionExpectationPlanLand";
import {
  InspectionExpectationAdvantageLevel,
  InspectionExpectationDisadvantageLevel
} from "../orm/typeorm/models/InspectionExpectationLevel";
import { AppraisalExpectationPlanItem } from "../orm/typeorm/models/AppraisalExpectationPlanItem";
import { AppraisalExpectationPlanLand } from "../orm/typeorm/models/AppraisalExpectationPlanLand";
import { AdvantageLevel, DisadvantageLevel } from "../orm/typeorm/models/InspectionStatementLevel";
import { InvestmentEfficiencyPlanItem } from "../orm/typeorm/models/InvestmentEfficiencyPlanItem";
import { InvestmentEfficiencyLand } from "../orm/typeorm/models/InvestmentEfficiencyLand";
import { Property } from "../orm/typeorm/models/Property";
import { EntitySchema } from "typeorm";
import { Token } from "typedi";
import { PropertyRepository } from "../orm/typeorm/repositories/PropertyRepository";
import { MasterValueRepository } from "../orm/typeorm/repositories/MasterValueRepository";
import { Employee } from "../orm/typeorm/models/Employee";
import { EmployeeLimit } from "../orm/typeorm/models/EmployeeLimit";
import { EmployeeRegion } from "../orm/typeorm/models/EmployeeRegion";
import { Account } from "../orm/typeorm/models/Account";
import { GroupValue } from "../orm/typeorm/models/GroupValue";
import { ProjectNegotiationReferItem } from "../orm/typeorm/models/ProjectNegotiationReferItem";
import {
  ProjectNegotiationActionDetail,
  ProjectNegotiationOpinionDetail,
  ProjectNegotiationPlanStep
} from "../orm/typeorm/models/ProjectNegotiationPlanStep";
import { ChatSocket } from "../orm/typeorm/models/ChatSocket";
import { ConversationRepository } from "../orm/typeorm/repositories/ConversationRepository";
import { Message } from "../orm/typeorm/models/Message";
import { Participant } from "../orm/typeorm/models/Participant";
import { AccountAccountGroup } from "../orm/typeorm/models/AccountAccountGroup";
import { Session } from "../orm/typeorm/models/Session";
import { Resource } from "../orm/typeorm/models/Resource";
import { Feature } from "../orm/typeorm/models/Feature";
import { AccountGroup } from "../orm/typeorm/models/AccountGroup";
import { AccountGroupFeature } from "../orm/typeorm/models/AccountGroupFeature";
import { AccountGroupResource } from "../orm/typeorm/models/AccountGroupResource";
import { ResetToken } from "../orm/typeorm/models/ResetToken";
import { PropertyHistoryNote } from "../orm/typeorm/models/PropertyHistoryNote";
import { Collaborator } from "../orm/typeorm/models/Collaborator";
import { Notification } from "../orm/typeorm/models/Notification";
import { AccountNotification } from "../orm/typeorm/models/AccountNotification";
import { NotificationTemplate } from "../orm/typeorm/models/NotificatonTemplate";
import { AccountDeviceToken } from "../orm/typeorm/models/AccountDeviceToken";
import { AccountEventRepository } from "../orm/typeorm/repositories/AccountEventRepository";
import { EndpointPermission } from "../orm/typeorm/models/EndpointPermission";
import { SystemConfig } from "../orm/typeorm/models/SystemConfig";
import { Topic } from "../orm/typeorm/models/Topic";
import { Comment } from "../orm/typeorm/models/Comment";
import { AccountActivity } from "../orm/typeorm/models/AccountActivity";
import { ActivityTemplate } from "../orm/typeorm/models/ActivityTemplate";
import { PropertyPurchase } from "../orm/typeorm/models/ProperyPurchase";
import { PropertySale } from "../orm/typeorm/models/PropertySale";
import { LatestApprovedNoteRepository } from "../orm/typeorm/repositories/LatestApprovedNoteRepository";
import { PropertyView } from "../orm/typeorm/views/PropertyView";
import { PropertyRatioView } from "../orm/typeorm/views/PropertyRatioView";
import { AppraisalStatementRatioView } from "../orm/typeorm/views/AppraisalStatementRatioView";
import { PropertyBookmarkRepository } from "../orm/typeorm/repositories/PropertyBookmarkRepository";
import { AccountSourceView } from "../orm/typeorm/views/AccountSourceView";
import {
  AppraisalExpectationRepository,
  AppraisalStatementRepository,
  InspectionExpectationRepository,
  InspectionStatementRepository,
  InvestmentEfficiencyRepository,
  InvestmentPlanRepository,
  ProjectNegotiationRepository
} from "../orm/typeorm/repositories/NoteRepository";
import {
  PropertyLastMonthStatisticsView,
  PropertyThisMonthStatisticsView
} from "../orm/typeorm/views/PropertyStatisticsView";
import {
  InspectionExpectationLastMonthStatisticsView,
  InspectionExpectationThisMonthStatisticsView
} from "../orm/typeorm/views/InspectionExpectationStatisticsView";
import { AccountSetting, DefaultAccountSetting } from "../orm/typeorm/models/AccountSetting";
import {
  AppraisalExpectationLastMonthStatisticsView,
  AppraisalExpectationThisMonthStatisticsView
} from "../orm/typeorm/views/AppraisalExpectationStatisticsView";
import {
  InspectionStatementLastMonthStatisticsView,
  InspectionStatementThisMonthStatisticsView
} from "../orm/typeorm/views/InspectionStatementStatisticsView";
import {
  ProjectNegotiationLastMonthStatisticsView,
  ProjectNegotiationThisMonthStatisticsView
} from "../orm/typeorm/views/ProjectNegotiationStatisticsView";
import {
  InvestmentEfficiencyLastMonthStatisticsView,
  InvestmentEfficiencyThisMonthStatisticsView
} from "../orm/typeorm/views/InvestmentEfficiencyStatisticsView";
import {
  InvestmentPlanLastMonthStatisticsView,
  InvestmentPlanThisMonthStatisticsView
} from "../orm/typeorm/views/InvestmentPlanStatisticsView";
import {
  AppraisalStatementLastMonthStatisticsView,
  AppraisalStatementThisMonthStatisticsView
} from "../orm/typeorm/views/AppraisalStatementStatisticsView";
import { PropertyProgress } from "../orm/typeorm/models/PropertyProgress";

type entityViewTypes = typeof PropertyView |
  typeof PropertyRatioView |
  typeof AppraisalStatementRatioView |
  typeof AccountSourceView |
  typeof PropertyLastMonthStatisticsView |
  typeof InspectionExpectationLastMonthStatisticsView |
  typeof InspectionExpectationThisMonthStatisticsView |
  typeof AppraisalExpectationLastMonthStatisticsView |
  typeof AppraisalExpectationThisMonthStatisticsView;
type DefaultMapRepository = { token: Token<any>, entity: EntitySchema | entityViewTypes };
type CustomMapRepository = { token: Token<any>, customRepository: any };

export const defaultRepositories: DefaultMapRepository[] = [
  {
    token: ContainerTokens.InvestmentPlanItemRepository,
    entity: InvestmentPlanItem,
  },
  {
    token: ContainerTokens.InvestmentPlanLandRepository,
    entity: InvestmentPlanLand,
  },
  {
    token: ContainerTokens.MenuRepository,
    entity: Menu,
  },
  {
    token: ContainerTokens.AppraisalAuditDetailRepository,
    entity: AppraisalAuditDetail,
  },
  {
    token: ContainerTokens.InspectionExpectationPlanItemRepository,
    entity: InspectionExpectationPlanItem,
  },
  {
    token: ContainerTokens.InspectionExpectationPlanLandRepository,
    entity: InspectionExpectationPlanLand,
  },
  {
    token: ContainerTokens.InspectionExpectationAdvantageLevelRepository,
    entity: InspectionExpectationAdvantageLevel,
  },
  {
    token: ContainerTokens.InspectionExpectationDisadvantageLevelRepository,
    entity: InspectionExpectationDisadvantageLevel,
  },
  {
    token: ContainerTokens.AppraisalExpectationPlanItemRepository,
    entity: AppraisalExpectationPlanItem,
  },
  {
    token: ContainerTokens.AppraisalExpectationPlanLandRepository,
    entity: AppraisalExpectationPlanLand,
  },
  {
    token: ContainerTokens.AdvantageLevelRepository,
    entity: AdvantageLevel,
  },
  {
    token: ContainerTokens.DisadvantageLevelRepository,
    entity: DisadvantageLevel,
  },
  {
    token: ContainerTokens.InvestmentEfficiencyPlanItemRepository,
    entity: InvestmentEfficiencyPlanItem,
  },
  {
    token: ContainerTokens.InvestmentEfficiencyLandRepository,
    entity: InvestmentEfficiencyLand,
  },
  {
    token: ContainerTokens.PropertyRepository,
    entity: Property,
  },
  {
    token: ContainerTokens.EmployeeRepository,
    entity: Employee,
  },
  {
    token: ContainerTokens.EmployeeLimitRepository,
    entity: EmployeeLimit,
  },
  {
    token: ContainerTokens.EmployeeRegionRepository,
    entity: EmployeeRegion,
  },
  {
    token: ContainerTokens.AccountRepository,
    entity: Account,
  },
  {
    token: ContainerTokens.GroupValueRepository,
    entity: GroupValue,
  },
  {
    token: ContainerTokens.ProjectNegotiationReferItemRepository,
    entity: ProjectNegotiationReferItem,
  },
  {
    token: ContainerTokens.ProjectNegotiationPlanStepRepository,
    entity: ProjectNegotiationPlanStep,
  },
  {
    token: ContainerTokens.ProjectNegotiationActionDetailRepository,
    entity: ProjectNegotiationActionDetail,
  },
  {
    token: ContainerTokens.ProjectNegotiationOpinionDetailRepository,
    entity: ProjectNegotiationOpinionDetail,
  },
  {
    token: ContainerTokens.ChatSocketRepository,
    entity: ChatSocket,
  },
  {
    token: ContainerTokens.MessageRepository,
    entity: Message,
  },
  {
    token: ContainerTokens.ParticipantRepository,
    entity: Participant,
  },
  {
    token: ContainerTokens.AccountAccountGroupRepository,
    entity: AccountAccountGroup,
  },
  {
    token: ContainerTokens.SessionRepository,
    entity: Session,
  },
  {
    token: ContainerTokens.ResourceRepository,
    entity: Resource,
  },
  {
    token: ContainerTokens.FeatureRepository,
    entity: Feature,
  },
  {
    token: ContainerTokens.AccountGroupRepository,
    entity: AccountGroup,
  },
  {
    token: ContainerTokens.AccountGroupFeatureRepository,
    entity: AccountGroupFeature,
  },
  {
    token: ContainerTokens.AccountGroupResourceRepository,
    entity: AccountGroupResource,
  },
  {
    token: ContainerTokens.ResetTokenRepository,
    entity: ResetToken,
  },
  {
    token: ContainerTokens.PropertyHistoryNoteRepository,
    entity: PropertyHistoryNote,
  },
  {
    token: ContainerTokens.CollaboratorRepository,
    entity: Collaborator,
  },
  {
    token: ContainerTokens.NotificationRepository,
    entity: Notification,
  },
  {
    token: ContainerTokens.AccountNotificationRepository,
    entity: AccountNotification,
  },
  {
    token: ContainerTokens.NotificationTemplateRepository,
    entity: NotificationTemplate,
  },
  {
    token: ContainerTokens.AccountDeviceTokenRepository,
    entity: AccountDeviceToken,
  },
  {
    token: ContainerTokens.EndpointPermissionRepository,
    entity: EndpointPermission,
  },
  {
    token: ContainerTokens.SystemConfigRepository,
    entity: SystemConfig,
  },
  {
    token: ContainerTokens.TopicRepository,
    entity: Topic,
  },
  {
    token: ContainerTokens.CommentRepository,
    entity: Comment,
  },
  {
    token: ContainerTokens.AccountActivityRepository,
    entity: AccountActivity,
  },
  {
    token: ContainerTokens.ActivityTemplateRepository,
    entity: ActivityTemplate,
  },
  {
    token: ContainerTokens.PropertyPurchaseRepository,
    entity: PropertyPurchase,
  },
  {
    token: ContainerTokens.PropertySaleRepository,
    entity: PropertySale,
  },
  {
    token: ContainerTokens.PropertyViewRepository,
    entity: PropertyView,
  },
  {
    token: ContainerTokens.PropertyPriceViewRepository,
    entity: PropertyRatioView,
  },
  {
    token: ContainerTokens.AppraisalStatementRatioViewRepository,
    entity: AppraisalStatementRatioView,
  },
  {
    token: ContainerTokens.AccountSourceViewRepository,
    entity: AccountSourceView,
  },
  {
    token: ContainerTokens.PropertyLastMonthStatisticsViewRepository,
    entity: PropertyLastMonthStatisticsView,
  },
  {
    token: ContainerTokens.PropertyThisMonthStatisticsViewRepository,
    entity: PropertyThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.InspectionExpectationThisMonthStatisticsViewRepository,
    entity: InspectionExpectationThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.InspectionExpectationLastMonthStatisticsViewRepository,
    entity: InspectionExpectationLastMonthStatisticsView
  },
  {
    token: ContainerTokens.AccountSettingRepository,
    entity: AccountSetting,
  },
  {
    token: ContainerTokens.DefaultAccountSettingRepository,
    entity: DefaultAccountSetting,
  },
  {
    token: ContainerTokens.AppraisalExpectationThisMonthStatisticsViewRepository,
    entity: AppraisalExpectationThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.AppraisalExpectationLastMonthStatisticsViewRepository,
    entity: AppraisalExpectationLastMonthStatisticsView,
  },
  {
    token: ContainerTokens.InspectionStatementThisMonthStatisticsViewRepository,
    entity: InspectionStatementThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.InspectionStatementLastMonthStatisticsViewRepository,
    entity: InspectionStatementLastMonthStatisticsView,
  },
  { 
    token: ContainerTokens.ProjectNegotiationThisMonthStatisticsViewRepository,
    entity: ProjectNegotiationThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.ProjectNegotiationLastMonthStatisticsViewRepository,
    entity: ProjectNegotiationLastMonthStatisticsView,
  },
  { 
    token: ContainerTokens.InvestmentEfficiencyThisMonthStatisticsViewRepository,
    entity: InvestmentEfficiencyThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.InvestmentEfficiencyLastMonthStatisticsViewRepository,
    entity: InvestmentEfficiencyLastMonthStatisticsView,
  },
  {
    token: ContainerTokens.InvestmentPlanThisMonthStatisticsViewRepository,
    entity: InvestmentPlanThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.InvestmentPlanLastMonthStatisticsViewRepository,
    entity: InvestmentPlanLastMonthStatisticsView,
  },
  {
    token: ContainerTokens.AppraisalStatementThisMonthStatisticsViewRepository,
    entity: AppraisalStatementThisMonthStatisticsView,
  },
  {
    token: ContainerTokens.AppraisalStatementLastMonthStatisticsViewRepository,
    entity: AppraisalStatementLastMonthStatisticsView,
  },
  {
    token: ContainerTokens.PropertyProgressRepository,
    entity: PropertyProgress,
  }
];

export const customRepositories: CustomMapRepository[] = [
  {
    token: ContainerTokens.PropertyRepository,
    customRepository: PropertyRepository,
  },
  {
    token: ContainerTokens.MasterValueRepository,
    customRepository: MasterValueRepository,
  },
  {
    token: ContainerTokens.ConversationRepository,
    customRepository: ConversationRepository,
  },
  {
    token: ContainerTokens.AccountEventRepository,
    customRepository: AccountEventRepository,
  },
  {
    token: ContainerTokens.LatestApprovedNoteRepository,
    customRepository: LatestApprovedNoteRepository,
  },
  {
    token: ContainerTokens.PropertyBookmarkRepository,
    customRepository: PropertyBookmarkRepository,
  },
  {
    token: ContainerTokens.InspectionStatementRepository,
    customRepository: InspectionStatementRepository,
  },
  {
    token: ContainerTokens.AppraisalStatementRepository,
    customRepository: AppraisalStatementRepository,
  },
  {
    token: ContainerTokens.InspectionExpectationRepository,
    customRepository: InspectionExpectationRepository,
  },
  {
    token: ContainerTokens.AppraisalExpectationRepository,
    customRepository: AppraisalExpectationRepository,
  },
  {
    token: ContainerTokens.ProjectNegotiationRepository,
    customRepository: ProjectNegotiationRepository,
  },
  {
    token: ContainerTokens.InvestmentPlanRepository,
    customRepository: InvestmentPlanRepository,
  },
  {
    token: ContainerTokens.InvestmentEfficiencyRepository,
    customRepository: InvestmentEfficiencyRepository
  },
];
