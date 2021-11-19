import { LicenseRequestSerializer } from "../../../interfaces/serializers/Base";
import { Account } from "../../models/Account";

export interface IPolicyManager {
  getEndpointPermission(
    dto: LicenseRequestSerializer,
    account: Account
  ): Promise<void>;

  hasPermissionAccountGroup(
    account: any,
    res: any,
    act: string
  ): Promise<boolean>;

  hasPropertyPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasInspectionStatementPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasAppraisalStatementPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasInspectionExpectationPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasInvestmentPlanPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasInvestmentEfficiencyPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasAppraisalExpectationPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasPropertyMobilePermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasProjectNegotiationPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  keyMatchFunc(
    requestKey: string,
    policyKey: string,
  ): Promise<boolean>;

  hasViewPropertyPermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasViewNotePermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasDeleteNotePermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;

  hasRestoreNotePermission(
    account: any,
    res: any,
    act: any
  ): Promise<boolean>;
}
