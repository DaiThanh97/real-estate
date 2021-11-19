import "reflect-metadata";

import * as data from "./data.json";
import {
  IAccountRepository,
  IMasterValueRepository,
  IPropertyBookmarkRepository,
  IPropertyRepository
} from "../../src/domain/services/contract";
import { mock } from "jest-mock-extended";
import { PropertyManager } from "../../src/domain/services/PropertyManager";
import { EmployeeManager } from "../../src/domain/services/EmployeeManager";
import { PropertySerializer } from "../../src/interfaces/serializers/PropertySerializer";
import { plainToClass } from "class-transformer";
import { EAccountType } from "../../src/domain/models/Account";
import { BadRequestError, NotFoundError } from "../../src/infrastructure/error";
import * as MockDate from "mockdate";
import { BusinessStatus, PropertyStatus } from "../../src/infrastructure/orm/typeorm/models/Property";
import { BusinessStatusType } from "../../src/infrastructure/types/Property";

describe("PropertyManager", () => {
  let mAccountRepository: IAccountRepository;
  let mMasterValueRepository: IMasterValueRepository;
  let mPropertyRepository: IPropertyRepository;
  let mPropertyManager: PropertyManager;
  let mPropertyBookmarkRepository: IPropertyBookmarkRepository;
  let mEmployeeManager: EmployeeManager;

  beforeAll(() => {
    mAccountRepository = mock<IAccountRepository>();
    mMasterValueRepository = mock<IMasterValueRepository>();
    mPropertyRepository = mock<IPropertyRepository>();
    mPropertyBookmarkRepository = mock<IPropertyBookmarkRepository>();
    mEmployeeManager = mock<EmployeeManager>();
    mPropertyManager = new PropertyManager(
      mAccountRepository, mMasterValueRepository, mPropertyRepository,
      mPropertyBookmarkRepository, mEmployeeManager,
    );
  });

  describe("assign source", () => {
    let dto: PropertySerializer;
    let mockFineOne: jest.Mock;

    beforeAll(() => {
      dto = plainToClass(PropertySerializer, data[0]);
      mockFineOne = jest.fn();
      mAccountRepository.findOne = mockFineOne;
    });

    test("should assign current account id while source is not set", async () => {
      const currentAccountId = 1;
      const rv = await mPropertyManager.assignSource(dto, currentAccountId);
      expect(rv.sourceId).toEqual(currentAccountId);
    });

    test("should bypass without any error while source id is set with collaborator id", async () => {
      mockFineOne.mockReturnValue({ type: EAccountType.COLLABORATOR });

      const collaboratorId = 1;
      dto.sourceId = collaboratorId;
      const rv = await mPropertyManager.assignSource(dto, 2);
      expect(rv.sourceId).toEqual(collaboratorId);
    });

    test("should throw error while source id is set with employee id", async () => {
      mockFineOne.mockReturnValue({ type: EAccountType.EMPLOYEE });

      expect.assertions(1);
      try {
        dto.sourceId = 1;
        await mPropertyManager.assignSource(dto, 2);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw not found error while source is is not exists", async () => {
      mockFineOne.mockReturnValue(null);

      expect.assertions(1);
      try {
        dto.sourceId = 1;
        await mPropertyManager.assignSource(dto, 2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundError);
      }
    });
  });

  describe("generateCode", () => {
    let mockMasterValueFindOneOrFail: jest.Mock;
    let mockPropertyFindOne: jest.Mock;
    let dto: PropertySerializer;
    const district = { valueCode: "Q1" };
    const lastProperty = { code: "BDS21Q10001" };

    beforeAll(() => {
      mockMasterValueFindOneOrFail = jest.fn();
      mMasterValueRepository.findOneOrFail = mockMasterValueFindOneOrFail;
      mockMasterValueFindOneOrFail.mockReturnValue(district);

      mockPropertyFindOne = jest.fn();
      mPropertyRepository.findOne = mockPropertyFindOne;
      MockDate.set("2021-12-15T11:01:58.135Z");
    });

    afterAll(() => {
      MockDate.reset();
    });

    test("should generate code which match rule in case no one exists!", async () => {
      dto = plainToClass(PropertySerializer, data[0]);
      mockPropertyFindOne.mockReturnValue(null);
      const rv = await mPropertyManager.generateCode(dto);
      expect(rv.code).toEqual("BDS21Q10001");
    });

    test("should generate code which match rule in case one property is exists!", async () => {
      dto = plainToClass(PropertySerializer, data[0]);
      mockPropertyFindOne.mockReturnValue(lastProperty);
      const rv = await mPropertyManager.generateCode(dto);
      expect(rv.code).toEqual("BDS21Q10002");
    });
  });

  describe("updateStatus", () => {
    let dto: PropertySerializer;

    beforeAll(() => {
      dto = plainToClass(PropertySerializer, data[0]);
    });

    test("should throw error while update status to pending from other but not drafting", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Rejected;
        await mPropertyManager.updateStatus(dto, PropertyStatus.Pending);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw error while update status to approved from other but not pending", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Rejected;
        await mPropertyManager.updateStatus(dto, PropertyStatus.Approved);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw error while update status to drafting from other but not pending", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Rejected;
        await mPropertyManager.updateStatus(dto, PropertyStatus.Drafting);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should update status successfully", async () => {
      dto.status = PropertyStatus.Drafting;
      const rv = await mPropertyManager.updateStatus(dto, PropertyStatus.Pending);
      expect(rv.status).toEqual(PropertyStatus.Pending);
    });
  });

  describe("initStatus", () => {
    let dto: PropertySerializer;

    beforeAll(() => {
      dto = plainToClass(PropertySerializer, data[0]);
    });

    test("should throw error in case invalid init status", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Rejected;
        await mPropertyManager.initStatus(dto);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should assign Drafting status while property status is not set", async () => {
      dto.status = undefined;
      const rv = await mPropertyManager.initStatus(dto);
      expect(rv.status).toEqual(PropertyStatus.Drafting);
    });

  });

  describe("checkExistAddress", () => {
    let mockPropertyFindOne: jest.Mock;
    let dto: PropertySerializer;

    beforeAll(() => {
      mockPropertyFindOne = jest.fn();
      mPropertyRepository.findOne = mockPropertyFindOne;

      dto = plainToClass(PropertySerializer, data[0]);
    });

    test("should update status to existed while same address is already existed!", async () => {
      dto.id = undefined;
      const rv = await mPropertyManager.checkExistAddress(dto, dto.id);
      expect(rv.status).toEqual(PropertyStatus.Pending);
    });

    test("should do nothing while address is still not exists!", async () => {
      dto.status = PropertyStatus.Approved;
      mockPropertyFindOne.mockReturnValue(null);
      const rv = await mPropertyManager.checkExistAddress(dto, dto.id);
      expect(rv.status).toEqual(PropertyStatus.Approved);
    });

    test("should do nothing while found entity is update entity!", async () => {
      dto.status = PropertyStatus.Approved;
      dto.id = 1;
      mockPropertyFindOne.mockReturnValue({ id: 1 });
      const rv = await mPropertyManager.checkExistAddress(dto, dto.id);
      expect(rv.status).toEqual(PropertyStatus.Approved);
    });
  });

  describe("processBookmark", () => {
    let mockPropertyBookmarkFindAndCount: jest.Mock;
    let mockPropertyBookmarkFindOne: jest.Mock;
    let mockPropertyBookmarkUpdateOrCreate: jest.Mock;
    let mockEmployeeManagerCheckLimitTotal: jest.Mock;
    let mockEmployeeManagerCheckLimitRanger: jest.Mock;
    let dto: PropertySerializer;

    beforeAll(() => {
      mockPropertyBookmarkFindAndCount = jest.fn();
      mockPropertyBookmarkFindOne = jest.fn();
      mockPropertyBookmarkUpdateOrCreate = jest.fn();
      mockEmployeeManagerCheckLimitTotal = jest.fn();
      mockEmployeeManagerCheckLimitRanger = jest.fn();

      mPropertyBookmarkRepository.findAndCount = mockPropertyBookmarkFindAndCount;
      mPropertyBookmarkRepository.findOne = mockPropertyBookmarkFindOne;
      mPropertyBookmarkRepository.updateOrCreate = mockPropertyBookmarkUpdateOrCreate;
      mEmployeeManager.checkLimitTotal = mockEmployeeManagerCheckLimitTotal;
      mEmployeeManager.checkLimitRange = mockEmployeeManagerCheckLimitRanger;

      dto = plainToClass(PropertySerializer, data[0]);
    });

    test("should throw error in case exist bookmark in property!", async () => {
      try {
        mockPropertyBookmarkFindOne.mockReturnValue(true);
        const accountId = 0;
        const employeeId = 1;
        dto.status = PropertyStatus.Approved;
        dto.id = 44;
        await mPropertyManager.processBookmark(dto.id, accountId, employeeId, "");
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should success bookmark in property!", async () => {
      mockPropertyBookmarkFindAndCount.mockReturnValue(["pass", 0]);
      mockPropertyBookmarkFindOne.mockReturnValue(null);
      mockPropertyBookmarkUpdateOrCreate.mockReturnValue(true);
      mockEmployeeManagerCheckLimitTotal.mockReturnValue([]);
      mockEmployeeManagerCheckLimitRanger.mockReturnValue([]);
      const accountId = 2;
      const employeeId = 0;
      dto.status = PropertyStatus.Approved;
      dto.id = 44;
      const rv = await mPropertyManager.processBookmark(dto.id, accountId, employeeId, "");
      expect(rv).toEqual(true);
    });

  });

  describe("processUnBookmark", () => {
    let mockPropertyBookmarkFindOne: jest.Mock;
    let mockPropertyBookmarkDelete: jest.Mock;
    let mockEmployeeManagerCheckLimitTotal: jest.Mock;
    let mockEmployeeManagerCheckLimitRanger: jest.Mock;
    let dto: PropertySerializer;

    beforeAll(() => {
      mockPropertyBookmarkFindOne = jest.fn();
      mockPropertyBookmarkDelete = jest.fn();
      mockEmployeeManagerCheckLimitTotal = jest.fn();
      mockEmployeeManagerCheckLimitRanger = jest.fn();

      mPropertyBookmarkRepository.findOne = mockPropertyBookmarkFindOne;
      mPropertyBookmarkRepository.delete = mockPropertyBookmarkDelete;
      mEmployeeManager.checkLimitTotal = mockEmployeeManagerCheckLimitTotal;
      mEmployeeManager.checkLimitRange = mockEmployeeManagerCheckLimitRanger;

      dto = plainToClass(PropertySerializer, data[0]);
    });

    test("should throw error in case not exist unBookmark in property!", async () => {
      try {
        mockPropertyBookmarkFindOne.mockReturnValue(null);
        const accountId = 2;
        dto.status = PropertyStatus.Approved;
        dto.id = 44;
        await mPropertyManager.processUnBookmark(dto.id, accountId);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should success unBookmark in property!", async () => {
      mockPropertyBookmarkFindOne.mockReturnValue(true);
      mockPropertyBookmarkDelete.mockReturnValue([]);
      mockEmployeeManagerCheckLimitTotal.mockReturnValue([]);
      mockEmployeeManagerCheckLimitRanger.mockReturnValue([]);
      const accountId = 2;
      dto.status = PropertyStatus.Approved;
      dto.id = 44;
      const rv = await mPropertyManager.processUnBookmark(dto.id, accountId);
      expect(rv).toEqual(true);
    });

  });

  describe("getNewBusinessStatus", () => {
    let dto: PropertySerializer;

    beforeAll(() => {
      dto = plainToClass(PropertySerializer, data[0]);
    });

    test("should throw error while update business status to OnSubmit from other but status not Approved", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Rejected;
        await mPropertyManager.getNewBusinessStatus(dto.status, dto.businessStatus, BusinessStatus.OnSubmit);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw error while update business status to OnSubmit from other but business status not None", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Approved;
        dto.businessStatus = BusinessStatus.OnSubmit;
        await mPropertyManager.getNewBusinessStatus(dto.status, dto.businessStatus, BusinessStatus.OnSubmit);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should update business status OnSubmit successfully", async () => {
      dto.status = PropertyStatus.Approved;
      dto.businessStatus = BusinessStatus.None;
      const rv = await mPropertyManager.getNewBusinessStatus(dto.status, dto.businessStatus, BusinessStatus.OnSubmit);
      expect(rv).toEqual(BusinessStatus.OnSubmit);
    });

    test("should throw error while update business status to Submitted from other but status not Approved", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Rejected;
        await mPropertyManager.getNewBusinessStatus(dto.status, dto.businessStatus, BusinessStatus.Submitted);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw error while update business status to Submitted from other but business status not OnSubmit", async () => {
      expect.assertions(1);
      try {
        dto.status = PropertyStatus.Approved;
        dto.businessStatus = BusinessStatus.None;
        await mPropertyManager.getNewBusinessStatus(dto.status, dto.businessStatus, BusinessStatus.Submitted);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should update business status Submitted successfully", async () => {
      dto.status = PropertyStatus.Approved;
      dto.businessStatus = BusinessStatus.OnSubmit;
      const rv = await mPropertyManager.getNewBusinessStatus(dto.status, dto.businessStatus, BusinessStatus.Submitted);
      expect(rv).toEqual(BusinessStatus.Submitted);
    });
  });

  describe("updateStatusWhenCreateNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the note", async () => {
      const businessStatusNew: BusinessStatusType = BusinessStatus.OnSubmit;
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreateNote(property, businessStatusNew, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the note", async () => {
      const businessStatusNew: BusinessStatusType = BusinessStatus.OnSubmit;
      const property = {
        id: 1,
        businessStatus: BusinessStatus.None,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateNote(property, businessStatusNew, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same", async () => {
      const businessStatusNew: BusinessStatusType = BusinessStatus.OnSubmit;
      const property = {
        id: 1,
        businessStatus: BusinessStatus.OnSubmit,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateNote(property, businessStatusNew, 1);
      expect(rv).toEqual(false);
    });

  });

  describe("updateStatusWhenCreateKHNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the KHNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreateKHNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the KHNote", async () => {
      const expectedBusinessStatusList = [BusinessStatus.None, BusinessStatus.OnSubmit, BusinessStatus.Submitted];
      expectedBusinessStatusList.forEach(async businessStatus => {
        const property = {
          id: 1,
          businessStatus: businessStatus,
        };
        const rv = await mPropertyManager.updateStatusWhenCreateKHNote(property, 1);
        expect(rv).toEqual(true);
      }); 
    });

    test("should not update business status with business status is the same when create the KH Note", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingTLDA,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateTLNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenApprovedTHNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the THNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenApprovedTHNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the THNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.Verifying,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedTHNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when approve the THNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.Verified,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedTHNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenCreatePDNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the PDNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreatePDNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the PDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.Verified,
      };
      const rv = await mPropertyManager.updateStatusWhenCreatePDNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when create the PDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.Planing,
      };
      const rv = await mPropertyManager.updateStatusWhenCreatePDNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenApprovedPDNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the PDNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenApprovedPDNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the PDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.Planing,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedPDNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when approve the PDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedPADT,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedPDNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenCreateKUNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the KUNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreateKUNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the KUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedPADT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateKUNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when create the KUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingKSUT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateKUNote(property, 1);
      expect(rv).toEqual(false);
    });

  });

  describe("updateStatusWhenApprovedKUNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the KUNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenApprovedKUNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the KUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingKSUT,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedKUNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when approve the KUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedKSUT,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedKUNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenCreateTUNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the TUNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreateTUNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the TUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedKSUT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateTUNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when create the TUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingTDUT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateTUNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenApprovedTUNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the TUNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenApprovedTUNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the TUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingTDUT,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedTUNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when approve the TUNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedTDUT,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedTUNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenCreateHDNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the HD Note", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreateHDNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the HDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedTDUT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateHDNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when create the HDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingHQDT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateHDNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenApproveHDNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the HD Note", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenApproveHDNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the HD Note", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingHQDT,
      };
      const rv = await mPropertyManager.updateStatusWhenApproveHDNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when approve the HDNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedHQDT,
      };
      const rv = await mPropertyManager.updateStatusWhenApproveHDNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenCreateTLNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when create the TLNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenCreateTLNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when create the TLNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedHQDT,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateTLNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when create the TLNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingTLDA,
      };
      const rv = await mPropertyManager.updateStatusWhenCreateTLNote(property, 1);
      expect(rv).toEqual(false);
    });
  });

  describe("updateStatusWhenApprovedTLNote", () => {
    let mockPropertyUpdate: jest.Mock;
    beforeAll(() => {
      mockPropertyUpdate = jest.fn();
      mPropertyRepository.update = mockPropertyUpdate;
    });

    test("should not update status with invalid property when approve the TLNote", async () => {
      const property = {};
      const rv = await mPropertyManager.updateStatusWhenApprovedTLNote(property, 1);
      expect(rv).toEqual(false);
    });

    test("should update status successfully when approve the TLNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifyingTLDA,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedTLNote(property, 1);
      expect(rv).toEqual(true);
    });

    test("should not update business status with business status is the same when approve the TLNote", async () => {
      const property = {
        id: 1,
        businessStatus: BusinessStatus.VerifiedTLDA,
      };
      const rv = await mPropertyManager.updateStatusWhenApprovedTLNote(property, 1);
      expect(rv).toEqual(false);
    });
  });
});
