import * as Hapi from "@hapi/hapi";
import logger from "../../infrastructure/logger";
import RootRoute from "./root";
import ApiGroup from "./group";
import FileRouter from "./v1/endpoints/file";
import AuthController from "../controllers/auth";
import InspectionStatementController from "../controllers/inspectionStatement";
import AppraisalStatementController from "../controllers/appraisalStatement";
import InspectionExpectationController from "../controllers/inspectionExpectation";
import AppraisalExpectationController from "../controllers/appraisalExpectation";
import { RoutingControllers } from "../routing-controllers/RoutingControllers";
import InvestmentPlanController from "../controllers/investmentPlan";
import InvestmentEfficiencyController from "../controllers/investmentEfficiency";
import ProjectNegotiationController from "../controllers/projectNegotiation";
import PropertyController from "../controllers/property";
import AccountController from "../controllers/account";
import AccountGroupController from "../controllers/accountGroup";
import CollaboratorController from "../controllers/collaborator";
import EmployeeController from "../controllers/employee";
import ConversationController from "../controllers/conversation";
import GroupValueController from "../controllers/groupValue";
import MasterValueController from "../controllers/masterValue";
import ResourceController from "../controllers/resource";
import FileController from "../controllers/file";
import NotificationController from "../controllers/notification";
import AccountDeviceTokenController from "../controllers/accountDeviceToken";
import TopicController from "../controllers/topic";

const controllers = [
  AuthController, InspectionStatementController, InvestmentPlanController, AppraisalStatementController,
  InspectionExpectationController, AppraisalExpectationController, InvestmentEfficiencyController,
  ProjectNegotiationController, PropertyController, AccountController, AccountGroupController,
  CollaboratorController, EmployeeController, ConversationController,
  GroupValueController, MasterValueController, ResourceController, FileController,
  NotificationController, AccountDeviceTokenController, TopicController,
];

export interface Router {
  prefix: string;
  tags: string[];

  register(server: Hapi.Server, namespace?: string): Promise<any>;
}

export interface RouterGroup {
  namespace: string;

  includeRouter(router: Router): Promise<void>;
}

export async function loadRouters(server: Hapi.Server): Promise<void> {
  logger.info("Router - Start adding routes");
  const namespace = "/api/v1";
  await new RootRoute(["api", "root"]).register(server);

  const apiRouterGroup = new ApiGroup(namespace, server);
  await apiRouterGroup.includeRouter(new FileRouter("files", ["api", "file"]));
  
  const routingControllers = new RoutingControllers(server, namespace);
  routingControllers.registerControllers(controllers);

  logger.info("Router - Finish adding routes");
}
