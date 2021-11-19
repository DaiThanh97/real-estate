import "reflect-metadata";

import * as data from "./data.json";
import { IAppraisalStatementRepository, IBaseRepository, IFeatureRepository } from "../../src/domain/services/contract";
import { AppraisalStatementManager } from "../../src/domain/services/AppraisalStatementManager";
import { mock } from "jest-mock-extended";
import { AppraisalStatement, AppraisalStatementStatus } from "../../src/domain/models/AppraisalStatement";
import { plainToClass } from "class-transformer";
import * as MockDate from "mockdate";
import { PropertySerializer } from "../../src/interfaces/serializers/PropertySerializer";
import { BadRequestError } from "../../src/infrastructure/error";

describe("AppraisalStatementManager", () => {
  let mAppraisalStatementRepository: IAppraisalStatementRepository;
  let mAppraisalStatementManager: AppraisalStatementManager;
  let mFeatureRepository: IFeatureRepository;
  let mAccountGroupFeatureRepository: IBaseRepository;


  beforeAll(() => {
    mAppraisalStatementRepository = mock<IAppraisalStatementRepository>();
    mFeatureRepository = mock<IFeatureRepository>();
    mAccountGroupFeatureRepository = mock<IBaseRepository>();
    mAppraisalStatementManager = new AppraisalStatementManager(
      mAppraisalStatementRepository,
      mFeatureRepository,
      mAccountGroupFeatureRepository
    );
  });

  describe("generateNoteId", () => {
    let dto: AppraisalStatement;
    let propertyDto: PropertySerializer;
    let mockAppraisalStatementRepositoryFindAndCount: jest.Mock;

    beforeAll(() => {
      dto = plainToClass(AppraisalStatement, data.appraisalStatement);
      propertyDto = plainToClass(PropertySerializer, data.property);

      mockAppraisalStatementRepositoryFindAndCount = jest.fn();
      mAppraisalStatementRepository.findAndCount = mockAppraisalStatementRepositoryFindAndCount;

      MockDate.set("2021-12-15T11:01:58.135Z");
  
    });

    afterAll(() => {
      MockDate.reset();
    });

    test("should generate node id which match rule in case no one exists!", async () => {
      mockAppraisalStatementRepositoryFindAndCount.mockReturnValue(["pass", 0]);
      const rv = await mAppraisalStatementManager.generateNoteId(null, null);
      expect(rv).toEqual("TH210001");
    });

    test("should generate node id which match rule in case one appraisal statement is exists!", async () => {
      mockAppraisalStatementRepositoryFindAndCount.mockReturnValue(["pass", 1]);
      const rv = await mAppraisalStatementManager.generateNoteId(null, null);
      expect(rv).toEqual("TH210002");
    });

    test("should generate node id which match rule in propertyId is exists!", async () => {
      mockAppraisalStatementRepositoryFindAndCount.mockReturnValue(["pass", 0]);
      const rv = await mAppraisalStatementManager.generateNoteId(propertyDto, "TH21Q10001");
      expect(rv).toEqual("TH20q1000101");
    });

  });

  describe("checkStatus", () => {
   
    test("should throw error while update status to finished from other but not drafting", async () => {
      expect.assertions(1);
      try {
        const currentStatus = AppraisalStatementStatus.Pending;
        const newStatus = AppraisalStatementStatus.Finished;
        await mAppraisalStatementManager.checkStatus(currentStatus, newStatus);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw error while update status to pending from other but not finished", async () => {
      expect.assertions(1);
      try {
        const currentStatus = AppraisalStatementStatus.Drafting;
        const newStatus = AppraisalStatementStatus.Pending;
        await mAppraisalStatementManager.checkStatus(currentStatus, newStatus);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should check status successfully to pending from Finished", async () => {
      const currentStatus = AppraisalStatementStatus.Finished;
      const newStatus = AppraisalStatementStatus.Pending;
      await mAppraisalStatementManager.checkStatus(currentStatus, newStatus);
      expect(1).toEqual(1);
    });

    test("should throw error while update status to approved from other but not pending", async () => {
      expect.assertions(1);
      try {
        const currentStatus = AppraisalStatementStatus.Drafting;
        const newStatus = AppraisalStatementStatus.Approved;
        await mAppraisalStatementManager.checkStatus(currentStatus, newStatus);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should check status successfully to approved from Pending", async () => {
      const currentStatus = AppraisalStatementStatus.Pending;
      const newStatus = AppraisalStatementStatus.Approved;
      await mAppraisalStatementManager.checkStatus(currentStatus, newStatus);
      expect(1).toEqual(1);
    });

    test("should check status successfully", async () => {
      const currentStatus = AppraisalStatementStatus.Drafting;
      const newStatus = AppraisalStatementStatus.Finished;
      await mAppraisalStatementManager.checkStatus(currentStatus, newStatus);
      expect(1).toEqual(1);
    });
  });

});
