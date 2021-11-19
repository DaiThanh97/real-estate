import { newEnforcer } from "casbin";
import TypeORMAdapter from "typeorm-adapter";
import { getConnection } from "typeorm";
import { Enforcer } from "casbin/lib/cjs/enforcer";
import { IPolicyManager } from "../../../../domain/services/contract/IPolicyManager";

export default async (policyManager: IPolicyManager): Promise<Enforcer> => {
  const conn = await getConnection();
  const a = await TypeORMAdapter.newAdapter(conn.options);

  const configFile = process.env.ABAC_CONF || "abac.conf";
  const e = await newEnforcer(configFile, a, true);
  await e.addFunction(
    "has_permission_account_group",
    policyManager.hasPermissionAccountGroup
  );
  await e.addFunction(
    "has_property_permission",
    policyManager.hasPropertyPermission
  );
  await e.addFunction(
    "has_inspection_statement_permission",
    policyManager.hasInspectionStatementPermission
  );
  await e.addFunction(
    "has_appraisal_statement_permission",
    policyManager.hasAppraisalStatementPermission
  );
  await e.addFunction(
    "has_inspection_expectation_permission",
    policyManager.hasInspectionExpectationPermission
  );
  await e.addFunction(
    "has_investment_plan_permission",
    policyManager.hasInvestmentPlanPermission
  );
  await e.addFunction(
    "has_investment_efficiency_permission",
    policyManager.hasInvestmentEfficiencyPermission
  );
  await e.addFunction(
    "has_appraisal_expectation_permission",
    policyManager.hasAppraisalExpectationPermission
  );
  await e.addFunction(
    "has_property_mobile_permission",
    policyManager.hasPropertyMobilePermission
  );
  await e.addFunction(
    "has_project_negotiation_permission",
    policyManager.hasProjectNegotiationPermission
  );

  await e.addFunction(
    "key_match_func",
    policyManager.keyMatchFunc
  );

  await e.addFunction(
    "has_view_property_permission",
    policyManager.hasViewPropertyPermission,
  );

  await e.addFunction(
    "has_view_note_permission",
    policyManager.hasViewNotePermission,
  );

  await e.addFunction(
    "has_delete_note_permission",
    policyManager.hasDeleteNotePermission,
  );

  await e.addFunction(
    "has_restore_note_permission",
    policyManager.hasRestoreNotePermission,
  );

  return e;
};
