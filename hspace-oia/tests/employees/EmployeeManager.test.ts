import "reflect-metadata";

import * as data from "./data.json";
import { IEmployeeRepository } from "../../src/domain/services/contract";
import { mock } from "jest-mock-extended";
import { Account } from "../../src/domain/models/Account";
import { Employee } from "../../src/domain/models/Employee";
import { plainToClass } from "class-transformer";
import { EmployeeManager } from "../../src/domain/services/EmployeeManager";
import { BadRequestError } from "../../src/infrastructure/error";
import constants from "../../src/infrastructure/config/constants";

describe("EmployeeManager", () => {
  let mEmployeeRepository: IEmployeeRepository;
  let mEmployeeManager: EmployeeManager;

  beforeAll(() => {
    mEmployeeRepository = mock<IEmployeeRepository>();
    mEmployeeManager = new EmployeeManager(mEmployeeRepository);
  });

  describe("checkLimitTotal", () => {
    let dto: Employee;
    let dtoAccount: Account;
    let mockEmployeeFindOneOrFail: jest.Mock;

    beforeAll(() => {
      dto = plainToClass(Employee, data.employees[0]);
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockEmployeeFindOneOrFail = jest.fn();
      mEmployeeRepository.findOneOrFail = mockEmployeeFindOneOrFail;
      mockEmployeeFindOneOrFail.mockReturnValue(dto);
    });

    test("should throw invalid with value total 1000", async () => {
      const totalValue = 1000;
      try {
        await mEmployeeManager.checkLimitTotal(dtoAccount.employeeId, totalValue, constants.EmployeeLimit.SLQT);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw invalid with wrong config key", async () => {
      const totalValue = 1000;
      try {
        await mEmployeeManager.checkLimitTotal(dtoAccount.employeeId, totalValue, "no_key");
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should valid with value total 1", async () => {
      const mockMEmployeeReFindOneOrFail = jest.fn();
      mockMEmployeeReFindOneOrFail.mockReturnValue(dto);
      mEmployeeRepository.findOneOrFail = mockMEmployeeReFindOneOrFail;
      const totalValue = 1;
      await mEmployeeManager.checkLimitTotal(dtoAccount.employeeId, totalValue, constants.EmployeeLimit.SLQT);
      expect(mockMEmployeeReFindOneOrFail).toHaveBeenCalledTimes(1);
    });
  
  });

  describe("checkLimitRange", () => {
    let dto: Employee;
    let dtoAccount: Account;
    let mockEmployeeFindOneOrFail: jest.Mock;

    beforeAll(() => {
      dto = plainToClass(Employee, data.employees[0]);
      dtoAccount = plainToClass(Account, data.accounts[0]);
      mockEmployeeFindOneOrFail = jest.fn();
      mEmployeeRepository.findOneOrFail = mockEmployeeFindOneOrFail;
      mockEmployeeFindOneOrFail.mockReturnValue(dto);
    });

    test("should throw invalid with range value total 1000", async () => {
      const totalValue = 1000;
      try {
        await mEmployeeManager.checkLimitRange(dtoAccount.employeeId, totalValue, constants.EmployeeLimit.PKT, constants.EmployeeLimit.PKD);
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should throw invalid with wrong config key", async () => {
      const totalValue = 1000;
      try {
        await mEmployeeManager.checkLimitRange(dtoAccount.employeeId, totalValue, "no_key", "no_key");
      } catch (e) {
        expect(e).toBeInstanceOf(BadRequestError);
      }
    });

    test("should valid with range value 10", async () => {
      const mockMEmployeeReFindOneOrFail = jest.fn();
      mockMEmployeeReFindOneOrFail.mockReturnValue(dto);
      mEmployeeRepository.findOneOrFail = mockMEmployeeReFindOneOrFail;
      const totalValue = 1;
      await mEmployeeManager.checkLimitRange(dtoAccount.employeeId, totalValue, constants.EmployeeLimit.PKT, constants.EmployeeLimit.PKD);
      expect(mockMEmployeeReFindOneOrFail).toHaveBeenCalledTimes(1);
    });
  
  });

});
