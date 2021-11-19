import "reflect-metadata";
import * as data from "./data.json";
import {
  IAppraisalExpectationRepository,
  IAppraisalStatementRepository,
  IBaseRepository,
  IEndpointPermissionRepository,
  IFeatureRepository,
  IInspectionExpectationRepository,
  IInspectionStatementRepository,
  IInvestmentEfficiencyRepository,
  IInvestmentPlanRepository,
  IProjectNegotiationRepository,
  IPropertyRepository,
  IAccountEventRepository,
} from "../../src/domain/services/contract";
import { mock } from "jest-mock-extended";
import { AppraisalStatementStatus } from "../../src/domain/models/AppraisalStatement";
import { InspectionExpectationStatus } from "../../src/domain/models/InspectionExpectation";
import { InspectionStatementStatus } from "../../src/infrastructure/orm/typeorm/models/InspectionStatement";
import { InvestmentPlanStatus } from "../../src/infrastructure/orm/typeorm/models/InvestmentPlan";
import { AppraisalExpectationStatus } from "../../src/infrastructure/orm/typeorm/models/AppraisalExpectation";
import { InvestmentEfficiencyStatus } from "../../src/infrastructure/orm/typeorm/models/InvestmentEfficiency";
import { ProjectNegotiationStatus } from "../../src/infrastructure/orm/typeorm/models/ProjectNegotiation";
import { Account } from "../../src/domain/models/Account";
import { plainToClass } from "class-transformer";
import { PolicyManager } from "../../src/domain/services/PolicyManager";
import { ACTIONS } from "../../src/infrastructure/config/constants/actions";

describe("PolicyManager", () => {
  let mPolicyManager: PolicyManager;

  let mFeatureRepository: IFeatureRepository;
  let mAccountGroupFeatureRepository: IBaseRepository;
  let mAccountGroupResourceRepository: IBaseRepository;
  let mPropertyRepository: IPropertyRepository;
  let mInspectionStatementRepository: IInspectionStatementRepository;
  let mAppraisalStatementRepository: IAppraisalStatementRepository;
  let mEndpointPermissionRepository: IEndpointPermissionRepository;
  let mInspectionExpectationRepository: IInspectionExpectationRepository;
  let mInvestmentPlanRepository: IInvestmentPlanRepository;
  let mInvestmentEfficiencyRepository: IInvestmentEfficiencyRepository;
  let mAppraisalExpectationRepository: IAppraisalExpectationRepository;
  let mProjectNegotiationRepository: IProjectNegotiationRepository;
  let mAccountEventRepository: IAccountEventRepository;

  beforeAll(() => {
    mFeatureRepository = mock<IFeatureRepository>();
    mAccountGroupFeatureRepository = mock<IBaseRepository>();
    mAccountGroupResourceRepository = mock<IBaseRepository>();
    mPropertyRepository = mock<IPropertyRepository>();
    mInspectionStatementRepository = mock<IInspectionStatementRepository>();
    mAppraisalStatementRepository = mock<IAppraisalStatementRepository>();
    mEndpointPermissionRepository = mock<IEndpointPermissionRepository>();
    mInspectionExpectationRepository = mock<IInspectionExpectationRepository>();
    mInvestmentPlanRepository = mock<IInvestmentPlanRepository>();
    mInvestmentEfficiencyRepository = mock<IInvestmentEfficiencyRepository>();
    mAppraisalExpectationRepository = mock<IAppraisalExpectationRepository>();
    mProjectNegotiationRepository = mock<IProjectNegotiationRepository>();
    mAccountEventRepository = mock<IAccountEventRepository>();

    mPolicyManager = new PolicyManager(
      mFeatureRepository,
      mAccountGroupFeatureRepository,
      mAccountGroupResourceRepository,
      mPropertyRepository,
      mInspectionStatementRepository,
      mAppraisalStatementRepository,
      mEndpointPermissionRepository,
      mInspectionExpectationRepository,
      mInvestmentPlanRepository,
      mInvestmentEfficiencyRepository,
      mAppraisalExpectationRepository,
      mProjectNegotiationRepository,
      mAccountEventRepository
    );
  });

  describe("hasViewPropertyPermission", () => {
    let dtoAccount: Account;
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
    });

    test("should bypass success with account admin", async () => {
      const rv = await mPolicyManager.hasViewPropertyPermission(dtoAccount, null, null);
      expect(rv).toEqual(true);
    });
  });

  describe("hasViewNotePermission", () => {
    let dtoAccount: Account;
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
    });

    test("should bypass success with account admin", async () => {
      const rv = await mPolicyManager.hasViewNotePermission(dtoAccount, null, null);
      expect(rv).toEqual(true);
    });
  });

  describe("hasInspectionStatementPermission", () => {
    let dtoAccount: Account;
    let mockInspectionStatementRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.KSHT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockInspectionStatementRepositoryFindOne = jest.fn();
      mInspectionStatementRepository.findOne = mockInspectionStatementRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, SUBMIT, DELETE] in data status `Drafting`", async () => {
      mockInspectionStatementRepositoryFindOne.mockReturnValue({
        status: InspectionStatementStatus.Drafting
      });

      const acts = [actions.UPDATE, actions.SUBMIT, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in status `Pending`", async () => {
      mockInspectionStatementRepositoryFindOne.mockReturnValue({
        status: InspectionStatementStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in status `Approved`", async () => {
      mockInspectionStatementRepositoryFindOne.mockReturnValue({
        status: InspectionStatementStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in status `Rejected`", async () => {
      mockInspectionStatementRepositoryFindOne.mockReturnValue({
        status: InspectionStatementStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
    test("should allow call API with acts [RESTORE] in status `Deleted`", async () => {
      mockInspectionStatementRepositoryFindOne.mockReturnValue({
        status: InspectionStatementStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("hasAppraisalStatementPermission", () => {
    let dtoAccount: Account;
    let mockAppraisalStatementRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.TDHT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockAppraisalStatementRepositoryFindOne = jest.fn();
      mAppraisalStatementRepository.findOne = mockAppraisalStatementRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, FINISH, DELETE] in data status `Drafting`", async () => {
      mockAppraisalStatementRepositoryFindOne.mockReturnValue({
        status: AppraisalStatementStatus.Drafting
      });
      const acts = [actions.UPDATE, actions.FINISH, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [SUBMIT, REJECT] in data status `Finished`", async () => {
      mockAppraisalStatementRepositoryFindOne.mockReturnValue({
        status: AppraisalStatementStatus.Finished
      });
      const acts = [actions.SUBMIT, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in data status `Pending`", async () => {
      mockAppraisalStatementRepositoryFindOne.mockReturnValue({
        status: AppraisalStatementStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in data status `Approved`", async () => {
      mockAppraisalStatementRepositoryFindOne.mockReturnValue({
        status: AppraisalStatementStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in data status `Rejected`", async () => {
      mockAppraisalStatementRepositoryFindOne.mockReturnValue({
        status: AppraisalStatementStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in data status `Deleted`", async () => {
      mockAppraisalStatementRepositoryFindOne.mockReturnValue({
        status: AppraisalStatementStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalStatementPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("hasInspectionExpectationPermission", () => {
    let dtoAccount: Account;
    let mockInspectionExpectationRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.KSUT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockInspectionExpectationRepositoryFindOne = jest.fn();
      mInspectionExpectationRepository.findOne = mockInspectionExpectationRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, SUBMIT, DELETE] in data status `Drafting`", async () => {
      mockInspectionExpectationRepositoryFindOne.mockReturnValue({
        status: InspectionExpectationStatus.Drafting
      });
      const acts = [actions.UPDATE, actions.SUBMIT, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in status `Pending`", async () => {
      mockInspectionExpectationRepositoryFindOne.mockReturnValue({
        status: InspectionExpectationStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in status `Approved`", async () => {
      mockInspectionExpectationRepositoryFindOne.mockReturnValue({
        status: InspectionExpectationStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in status `Rejected`", async () => {
      mockInspectionExpectationRepositoryFindOne.mockReturnValue({
        status: InspectionExpectationStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
    test("should allow call API with acts [RESTORE] in status `Deleted`", async () => {
      mockInspectionExpectationRepositoryFindOne.mockReturnValue({
        status: InspectionExpectationStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInspectionExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("hasAppraisalExpectationPermission", () => {
    let dtoAccount: Account;
    let mockAppraisalExpectationRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.TDUT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockAppraisalExpectationRepositoryFindOne = jest.fn();
      mAppraisalExpectationRepository.findOne = mockAppraisalExpectationRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, FINISH, DELETE] in data status `Drafting`", async () => {
      mockAppraisalExpectationRepositoryFindOne.mockReturnValue({
        status: AppraisalExpectationStatus.Drafting
      });
      const acts = [actions.UPDATE, actions.FINISH, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [SUBMIT, REJECT] in data status `Finished`", async () => {
      mockAppraisalExpectationRepositoryFindOne.mockReturnValue({
        status: AppraisalExpectationStatus.Finished
      });
      const acts = [actions.SUBMIT, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in data status `Pending`", async () => {
      mockAppraisalExpectationRepositoryFindOne.mockReturnValue({
        status: AppraisalExpectationStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in data status `Approved`", async () => {
      mockAppraisalExpectationRepositoryFindOne.mockReturnValue({
        status: AppraisalExpectationStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in data status `Rejected`", async () => {
      mockAppraisalExpectationRepositoryFindOne.mockReturnValue({
        status: AppraisalExpectationStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in data status `Deleted`", async () => {
      mockAppraisalExpectationRepositoryFindOne.mockReturnValue({
        status: AppraisalExpectationStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasAppraisalExpectationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("hasInvestmentPlanPermission", () => {
    let dtoAccount: Account;
    let mockInvestmentPlanRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.PADT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockInvestmentPlanRepositoryFindOne = jest.fn();
      mInvestmentPlanRepository.findOne = mockInvestmentPlanRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, SUBMIT, DELETE] in data status `Drafting`", async () => {
      mockInvestmentPlanRepositoryFindOne.mockReturnValue({
        status: InvestmentPlanStatus.Drafting
      });
      const acts = [actions.UPDATE, actions.SUBMIT, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentPlanPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in status `Pending`", async () => {
      mockInvestmentPlanRepositoryFindOne.mockReturnValue({
        status: InvestmentPlanStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentPlanPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in status `Approved`", async () => {
      mockInvestmentPlanRepositoryFindOne.mockReturnValue({
        status: InvestmentPlanStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentPlanPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in status `Rejected`", async () => {
      mockInvestmentPlanRepositoryFindOne.mockReturnValue({
        status: InvestmentPlanStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentPlanPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
    test("should allow call API with acts [RESTORE] in status `Deleted`", async () => {
      mockInvestmentPlanRepositoryFindOne.mockReturnValue({
        status: InvestmentPlanStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentPlanPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("hasInvestmentEfficiencyPermission", () => {
    let dtoAccount: Account;
    let mockInvestmentEfficiencyRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.HQDT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockInvestmentEfficiencyRepositoryFindOne = jest.fn();
      mInvestmentEfficiencyRepository.findOne = mockInvestmentEfficiencyRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, SUBMIT, DELETE] in data status `Drafting`", async () => {
      mockInvestmentEfficiencyRepositoryFindOne.mockReturnValue({
        status: InvestmentEfficiencyStatus.Drafting
      });
      const acts = [actions.UPDATE, actions.SUBMIT, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentEfficiencyPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in status `Pending`", async () => {
      mockInvestmentEfficiencyRepositoryFindOne.mockReturnValue({
        status: InvestmentEfficiencyStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentEfficiencyPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in status `Approved`", async () => {
      mockInvestmentEfficiencyRepositoryFindOne.mockReturnValue({
        status: InvestmentEfficiencyStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentEfficiencyPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in status `Rejected`", async () => {
      mockInvestmentEfficiencyRepositoryFindOne.mockReturnValue({
        status: InvestmentEfficiencyStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentEfficiencyPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
    test("should allow call API with acts [RESTORE] in status `Deleted`", async () => {
      mockInvestmentEfficiencyRepositoryFindOne.mockReturnValue({
        status: InvestmentEfficiencyStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasInvestmentEfficiencyPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("hasProjectNegotiationPermission", () => {
    let dtoAccount: Account;
    let mockProjectNegotiationRepositoryFindOne: jest.Mock;
    let mockFeatureRepositoryFind: jest.Mock;
    let mockAccountGroupFeatureRepositoryFindOne: jest.Mock;
    const actions = ACTIONS.HQDT;
    const res = {
      id: 1
    };
    beforeAll(() => {
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockProjectNegotiationRepositoryFindOne = jest.fn();
      mProjectNegotiationRepository.findOne = mockProjectNegotiationRepositoryFindOne;
      mockFeatureRepositoryFind = jest.fn();
      mFeatureRepository.find = mockFeatureRepositoryFind;
      mockAccountGroupFeatureRepositoryFindOne = jest.fn();
      mAccountGroupFeatureRepository.findOne = mockAccountGroupFeatureRepositoryFindOne;

      mockFeatureRepositoryFind.mockReturnValue([{ id: 1 }]);
      mockAccountGroupFeatureRepositoryFindOne.mockReturnValue({});
    });

    test("should allow call API with acts [UPDATE, SUBMIT, DELETE] in data status `Drafting`", async () => {
      mockProjectNegotiationRepositoryFindOne.mockReturnValue({
        status: ProjectNegotiationStatus.Drafting
      });
      const acts = [actions.UPDATE, actions.SUBMIT, actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasProjectNegotiationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [APPROVE, REJECT] in status `Pending`", async () => {
      mockProjectNegotiationRepositoryFindOne.mockReturnValue({
        status: ProjectNegotiationStatus.Pending
      });
      const acts = [actions.APPROVE, actions.REJECT];
      for (const act of acts) {
        const rv = await mPolicyManager.hasProjectNegotiationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [DELETE] in status `Approved`", async () => {
      mockProjectNegotiationRepositoryFindOne.mockReturnValue({
        status: ProjectNegotiationStatus.Approved
      });
      const acts = [actions.DELETE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasProjectNegotiationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });

    test("should allow call API with acts [UPDATE] in status `Rejected`", async () => {
      mockProjectNegotiationRepositoryFindOne.mockReturnValue({
        status: ProjectNegotiationStatus.Rejected
      });
      const acts = [actions.UPDATE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasProjectNegotiationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
    test("should allow call API with acts [RESTORE] in status `Deleted`", async () => {
      mockProjectNegotiationRepositoryFindOne.mockReturnValue({
        status: ProjectNegotiationStatus.Deleted
      });
      const acts = [actions.RESTORE];
      for (const act of acts) {
        const rv = await mPolicyManager.hasProjectNegotiationPermission(dtoAccount, res, act);
        expect(rv).toEqual(true);
      }
    });
  });

  describe("keyMatchFunc", () => {


    test("should return true with case requestKey: `get` in policyKey: `(get)|(get_list)`", async () => {
      const requestKey = "get";
      const policyKey = "(get)|(get_list)";
      const rv = await mPolicyManager.keyMatchFunc(requestKey, policyKey);
      expect(rv).toEqual(true);
    });

    test("should return false with case requestKey: `get` in policyKey: `(get_list)`", async () => {
      const requestKey = "get";
      const policyKey = "(get_list)";
      const rv = await mPolicyManager.keyMatchFunc(requestKey, policyKey);
      expect(rv).toEqual(false);
    });
  });
});
