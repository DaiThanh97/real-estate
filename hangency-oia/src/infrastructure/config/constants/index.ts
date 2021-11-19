export default {
  swagger: {
    options: {
      info: {
        title: "API Documentation",
        version: "v1.0.0",
      },
      grouping: "tags",
      sortEndpoints: "ordered",
    },
  },
  status: {
    options: {
      path: "/status",
      title: "API Monitor test_new_deploy",
      routeConfig: {
        auth: false,
      },
    },
  },
  masterValueRelations: [
    {
      columns: ["parent_id"],
      name: "master_values",
    },
    {
      columns: ["type_id"],
      name: "employee_limits",
    },
    {
      columns: ["city_id", "ward_id", "district_id"],
      name: "employee_regions",
    },
    {
      columns: ["department_id", "title_id", "status_id"],
      name: "employees",
    },
    {
      columns: [
        "city_id",
        "ward_id",
        "district_id",
        "street_id",
        "location_type_id",
        "property_type_id",
        "property_period_id",
        "property_using_id",
      ],
      name: "properties",
    },
    {
      columns: ["city_id", "ward_id", "district_id", "street_id", "company_id", "street_group_id", "position_group_id"],
      name: "inspection_statement_notes",
    },
    {
      columns: ["group_id", "type_id"],
      name: "advantage_levels",
    },
    {
      columns: ["group_id", "type_id"],
      name: "disadvantage_levels",
    },
    {
      columns: ["city_id", "ward_id", "district_id", "street_id", "company_id"],
      name: "appraisal_statement_notes",
    },
    {
      columns: ["city_id", "ward_id", "district_id", "street_id", "company_id"],
      name: "inspection_expectation_notes",
    },
    {
      columns: ["plan_type_id", "construction_type_id"],
      name: "inspection_expectation_plan_items",
    },
    {
      columns: ["city_id", "ward_id", "district_id", "street_id", "street_group_id", "position_group_id"],
      name: "inspection_expectation_plan_lands",
    },
    {
      columns: ["group_id", "type_id"],
      name: "inspection_expectation_advantage_levels",
    },
    {
      columns: ["group_id", "type_id"],
      name: "inspection_expectation_disadvantage_levels",
    },
    {
      columns: ["city_id", "ward_id", "district_id", "street_id", "company_id"],
      name: "appraisal_expectation_notes",
    },
    {
      columns: ["plan_type_id", "construction_type_id"],
      name: "appraisal_expectation_plan_items",
    },
    {
      columns: ["city_id", "ward_id", "district_id", "street_id", "company_id"],
      name: "project_negotiation_notes",
    },
    {
      columns: ["negotiation_refer_id"],
      name: "project_negotiation_refer_items",
    },
    {
      columns: ["category_id"],
      name: "project_negotiation_plan_steps",
    },
  ],
  propertyNotesListQuery: [
    {
      columns: ["'KH' as type"],
      name: "inspection_statement_notes",
    },
    {
      columns: ["'TH' as type"],
      name: "appraisal_statement_notes",
    },
    {
      columns: ["'KU' as type"],
      name: "inspection_expectation_notes",
    },
    {
      columns: ["'PD' as type"],
      name: "investment_plan_notes",
    },
    {
      columns: ["'TU' as type"],
      name: "appraisal_expectation_notes",
    },
    {
      columns: ["'HD' as type"],
      name: "investment_efficiency_notes",
    },
    {
      columns: ["'TL' as type"],
      name: "project_negotiation_notes",
    },
  ],
  AccountManager: {
    forgotPassExpiredInMinutes: 5,
    forgotPassCheckLimitCallInMinutes: 1,
    forgotPassCheckLimitCountCall: 10,
    displayNamePrefixForEmployee: "HLT",
    regExpPassword: /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/,
  },
  EmployeeLimit: {
    PKT: "MD.EMPQUOTA.PKT",
    PKD: "MD.EMPQUOTA.PKD",
    SLQT: "MD.EMPQUOTA.SLQT",
  },
  PropertyNoteIdPrefix: {
    InspectionStatement: "KH",
    AppraisalStatement: "TH",
    InspectionExpectation: "KU",
    InvestmentPlan: "PD",
    AppraisalExpectation: "TU",
    InvestmentEfficiency: "HD",
    ProjectNegotiation: "TL",
  },
  NoteSubClasses: {
    A: "A",
    B: "B",
    C: "C",
  },
  Headers: {
    CorsUserHeader: "X-Halato-User",
    CorsWebValue: "Web",
    LicenseHeader: "X-Halato-License",
  },
  System: {
    Config: {
      API: {
        CHECK_PERMISSION: "api.check_permission",
        CHECK_POLICY: "api.check_policy",
      },
    },
  },
} as const;
