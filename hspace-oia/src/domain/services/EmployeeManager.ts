import { Employee, EmployeeLimit } from "../models/Employee";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { IEmployeeManager, IEmployeeRepository } from "./contract";
import { Inject, Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";

@Service(ContainerTokens.EmployeeManager)
export class EmployeeManager implements IEmployeeManager {
  public constructor(
    @Inject(ContainerTokens.EmployeeRepository)
    private employeeRepository: IEmployeeRepository,
  ) {
  }

  private async findEmployee(employeeId: number): Promise<Employee> {
    return await this.employeeRepository.findOneOrFail({
      where: { id: employeeId },
      relations: [
        "employeeLimits",
        "employeeLimits.type",
      ],
    });
  }

  private async isEmpty(items: any[]): Promise<boolean> {
    return (!items || items.length === 0);
  }

  private async findEmployeeLimitByGroupCode(employeeLimits: EmployeeLimit[], groupConfig: string): Promise<EmployeeLimit[]> {
    return (employeeLimits || []).filter(limit => limit.type?.valueCode.toUpperCase() === groupConfig && limit.isActive);
  }

  public async checkLimitTotal(employeeId: number, totalValue: number, configKey: string): Promise<void> {
    const employee = await this.findEmployee(employeeId);
    const employeeLimits = await this.findEmployeeLimitByGroupCode(employee.employeeLimits, configKey);

    if (await this.isEmpty(employeeLimits)) {
      throw new BadRequestError("Property invalid limit total value not config", ErrorCode.Employee.InvalidLimitTotalConfig);
    }
    const valueConfig = employeeLimits[0].value || 0;
    if (valueConfig < totalValue) {
      throw new BadRequestError(`Property invalid limit total value valueConfig=${valueConfig} < totalValue=${totalValue}`, ErrorCode.Employee.InvalidLimitTotalValue);
    }
  }

  public async checkLimitRange(employeeId: number, totalValue: number, keyFrom: string, keyTo: string): Promise<void> {
    const employee = await this.findEmployee(employeeId);
    if (!employee.employeeLimits || employee.employeeLimits.length === 0) {
      throw new BadRequestError("Property invalid limit Range value not config", ErrorCode.Employee.InvalidLimitRangeConfig);
    }
    const employeeLimitsFrom: EmployeeLimit[] = await this.findEmployeeLimitByGroupCode(employee.employeeLimits, keyFrom);
    const employeeLimitsTo: EmployeeLimit[] = await this.findEmployeeLimitByGroupCode(employee.employeeLimits, keyTo);

    if (await this.isEmpty(employeeLimitsFrom) && await this.isEmpty(employeeLimitsTo)) {
      throw new BadRequestError("Property invalid limit Range not config", ErrorCode.Employee.InvalidLimitRangeConfig);
    }

    const valueFrom = employeeLimitsFrom?.[0]?.value || 0;
    let valueTo = employeeLimitsTo?.[0]?.value || 0;
    if (!employeeLimitsTo || employeeLimitsTo.length === 0) {
      valueTo = Number.MAX_VALUE;
    }

    if (valueFrom > totalValue || totalValue > valueTo) {
      throw new BadRequestError(`Property invalid limit Range totalValue= ${totalValue} -> from=${valueFrom} -> to= ${valueTo}`, ErrorCode.Employee.InvalidLimitRangeValue);
    }
  }

}
