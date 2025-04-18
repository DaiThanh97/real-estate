export default {
  PermissionDenied: "PermissionDenied",
  EntityNotFound: "EntityNotFound",
  ValidationError: "ValidationError",
  InvalidIdentity: "InvalidIdentity",
  Employee: {
    CodeExist: "EmployeeCodeExist",
    EmailExist: "EmployeeEmailCodeExist",
    InvalidManager: "EmployeeInvalidManager",
    InvalidLimitTotalValue: "InvalidLimitTotalValue",
    InvalidLimitTotalConfig: "InvalidLimitTotalConfig",
    InvalidLimitRangeValue: "InvalidLimitRangeValue",
    InvalidLimitRangeConfig: "InvalidLimitRangeConfig"
  },
  Collaborator: {
    PhoneExist: "CollaboratorPhoneExist",
    EmailExist: "CollaboratorEmailCodeExist"
  },
  GroupValue: {
    ExistCodeAndNameWithParent: "ExistCodeAndNameWithParent",
    UsedInMasterValue: "UsedInMasterValue",
    ParentGroupCannotBeChild: "ParentGroupCannotBeChild",
  },
  MasterValue: {
    Exist: "MasterValueExist",
    DuplicateParentCode: "MasterValueDuplicateParentCode",
    InvalidParent: "MasterValueInvalidParent",
    InvalidEmployeeLimits: "MasterValueInvalidEmployeeLimits",
    InvalidEmployeeRegions: "MasterValueInvalidEmployeeRegions",
  },
  AccountGroup: {
    CodeExist: "AccountGroupCodeExist",
    ResourcesInvalid: "AccountGroupResourcesInvalid",
    FeaturesInvalid: "AccountGroupFeaturesInvalid",
    FeatureInvalid: "AccountGroupFeatureInvalid",
    AccountAccountGroupExist: "AccountAccountGroupExist",
  },
  Account: {
    AccountAccountGroupsInvalid: "AccountAccountGroupsInvalid",
    AccountPasswordInvalid: "AccountPasswordInvalid",
    AccountForgotPasswordNotFound: "AccountForgotPasswordNotFound",
    AccountForgotPasswordCodeInvalid: "AccountForgotPasswordCodeInvalid",
    AccountForgotPasswordExpired: "AccountForgotPasswordExpired",
    AccountForgotPasswordLimitCallAPI: "AccountForgotPasswordLimitCallAPI",
    AccountInvalidType: "AccountInvalidType",
  },
  Property: {
    InvalidBrokerType: "InvalidBrokerType",
    InvalidStatus: "InvalidStatus",
    NotSupportStatus: "NotSupportStatus",
    InvalidBusinessStatus: "InvalidBusinessStatus",
    NotSupportBusinessStatus: "NotSupportBusinessStatus",
    InvalidUnBookmarkNotExist: "InvalidUnBookmarkNotExist",
    InvalidBookmarkExist: "InvalidBookmarkExist",
    ApprovedProjectNegotiationNotFound: "PropertyApprovedProjectNegotiationNotFound",
    PropertyDeleteExistNotes: "PropertyDeleteExistNotes",
    PropertyRestoreExistAddress: "PropertyRestoreExistAddress"
  },
  Chat: {
    InvalidMessageContent: "ChatInvalidMessageContent",
    InvalidConversation: "ChatInvalidConversation",
    InvalidAccount: "ChatInvalidAccount",
  },
  AppraisalStatement: {
    InvalidStatus: "AppraisalStatementInvalidStatus",
    InvalidFields: "AppraisalStatementInvalidFields",
  },
  InspectionStatement: {
    InvalidFields: "InspectionStatementInvalidFields",
    InvalidStatus: "InspectionStatementInvalidStatus",
  },
  InspectionExpectation: {
    InvalidFields: "InspectionExpectationInvalidFields",
    InvalidStatus: "InspectionExpectationInvalidStatus",
  },
  InvestmentPlan: {
    InvalidStatus: "InvestmentPlanInvalidStatus",
    InvalidFields: "InvestmentPlanInvalidFields",
  },
  AppraisalExpectation: {
    InvalidStatus: "AppraisalExpectationInvalidStatus",
    InvalidFields: "AppraisalExpectationInvalidFields",
  },
  InvestmentEfficiency: {
    InvalidStatus: "InvestmentEfficiencyInvalidStatus",
    InvalidFields: "InvestmentEfficiencyInvalidFields",
  },
  ProjectNegotiation: {
    InvalidStatus: "ProjectNegotiationInvalidStatus",
    InvalidFields: "ProjectNegotiationInvalidFields",
  },
  Note: {
    NoteDeleteExistLinkNotes: "NoteDeleteExistLinkNotes",
    NoteRestoreLinkNoteInvalid: "NoteRestoreLinkNoteInvalid"
  },
  LicenseErrors: [
    {
      apis: [
        "/inspection_statements/{id}",
        "/investment_plans/{id}",
        "/appraisal_statements/{id}",
        "/project_negotiations/{id}",
        "/investment_efficiencies/{id}",
        "/appraisal_expectations/{id}",
        "/inspection_expectations/{id}",
        "/account_groups/{id}",
      ],
      method: "DELETE",
      errorCode: "LicenseDeletePermissionDenied"
    },
    {
      apis: [
        "/inspection_statements/{id}/_restore",
        "/appraisal_statements/{id}/_restore",
        "/investment_plans/{id}/_restore",
        "/appraisal_expectations/{id}/_restore",
        "/inspection_expectations/{id}/_restore",
        "/project_negotiations/{id}/_restore",
        "/investment_efficiencies/{id}/_restore",
      ],
      method: "PUT",
      errorCode: "LicenseRestorePermissionDenied"
    },

  ]
} as const;
