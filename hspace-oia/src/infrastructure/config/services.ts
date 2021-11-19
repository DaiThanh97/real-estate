import { InvestmentPlanManager } from "../../domain/services/InvestmentPlanManager";
import { MenuManager } from "../../domain/services/MenuManager";
import { AppraisalStatementManager } from "../../domain/services/AppraisalStatementManager";
import { InspectionExpectationManager } from "../../domain/services/InspectionExpectationManager";
import { AppraisalExpectationManager } from "../../domain/services/AppraisalExpectationManager";
import { InspectionStatementManager } from "../../domain/services/InspectionStatementManager";
import { InvestmentEfficiencyManager } from "../../domain/services/InvestmentEfficiencyManager";
import { EmployeeManager } from "../../domain/services/EmployeeManager";
import { PropertyManager } from "../../domain/services/PropertyManager";
import { ProjectNegotiationManager } from "../../domain/services/ProjectNegotiationManager";
import { NotificationManager } from "../../domain/services/NotificationManager";
import { PolicyManager } from "../../domain/services/PolicyManager";
import { AccountDeviceTokenManager } from "../../domain/services/AccountDeviceTokenManager";
import { AccountGroupManager } from "../../domain/services/AccountGroupManager";

export default [
  InvestmentPlanManager,
  MenuManager,
  AppraisalStatementManager,
  InspectionExpectationManager,
  AppraisalExpectationManager,
  InspectionStatementManager,
  InvestmentEfficiencyManager,
  EmployeeManager,
  PropertyManager,
  ProjectNegotiationManager,
  NotificationManager,
  AccountDeviceTokenManager,
  PolicyManager,
  AccountGroupManager,
];
