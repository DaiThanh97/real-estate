import { Account } from "../../domain/models/Account";
import EmployeeAppUseCases from "../../application/EmployeeAppUseCases";
import { plainToClass } from "class-transformer";
import {
  EmployeeChangeBasicInfoSerializer,
  EmployeeCurrentSerializer,
  EmployeeQuery,
  EmployeeSerializer
} from "../serializers/EmployeeSerializer";
import { BadRequestError } from "../../infrastructure/error";
import { ILike } from "typeorm";
import { employeeResponse, employeesCurrentResponse, employeesResponse } from "../schemas/response";
import {
  addingEmployeeSchema,
  employeeChangeBasicInfoSchema,
  employeeQuerySchema,
  employeeSchema
} from "../schemas/employee";
import { idSchema } from "../schemas/base";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Get, Post, Put } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Param } from "../routing-controllers/decorator/Param";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Payload } from "../routing-controllers/decorator/Payload";
import { Queries } from "../routing-controllers/decorator/Queries";
import Beans from "../../infrastructure/config/beans";

@Controller("employees", ["employee"])
export default class EmployeeController {

  @Post({
    description: "Create new an employee",
    validateSchemas: {
      payload: addingEmployeeSchema,
    },
    responseSchema: employeeResponse,
  })
  public async create(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: EmployeeSerializer
    }) dto: EmployeeSerializer,
  ): Promise<any> {
    const rv = await EmployeeAppUseCases.create(dto, account, serviceLocator);
    return plainToClass(EmployeeSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    route: "/{id}",
    description: "Get employee by ID",
    validateSchemas: {
      params: idSchema,
    },
    responseSchema: employeeResponse,
  })
  public async get(
    @Param("id") id: number,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const rv = await EmployeeAppUseCases.get(id, serviceLocator);
    return plainToClass(EmployeeSerializer, rv, { excludeExtraneousValues: true });
  }

  @Put({
    route: "/{id}",
    description: "Update an employee",
    validateSchemas: {
      params: idSchema,
      payload: employeeSchema,
    },
    responseSchema: employeeResponse,
  })
  public async update(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Param("id") id: number,
    @Payload({
      type: EmployeeSerializer
    }) dto: EmployeeSerializer,
  ): Promise<any> {
    if (dto.id !== id) {
      throw new BadRequestError();
    }
    const rv = await EmployeeAppUseCases.update(dto, account, serviceLocator);
    return plainToClass(EmployeeSerializer, rv, { excludeExtraneousValues: true });
  }

  @Get({
    description:   "Get employee list",
    validateSchemas: {
      query: employeeQuerySchema,
    },
    responseSchema: employeesResponse,
  })
  public async getList(
    @ServiceLocator() serviceLocator: Beans,
    @Queries({
      type: EmployeeQuery,
    }) queryOptions: EmployeeQuery,
  ): Promise<any> {
    const query = {
      ...(queryOptions.code ? { "code": ILike("%" + queryOptions.code + "%") } : {}),
      ...(queryOptions.fullName ? { fullName: ILike("%" + queryOptions.fullName + "%") } : {}),
      ...(queryOptions.email ? { email: ILike("%" + queryOptions.email + "%") } : {}),
      ...(queryOptions.phone ? { phone: ILike("%" + queryOptions.phone + "%") } : {}),
      ...(queryOptions.departmentId ? { departmentId: queryOptions.departmentId } : {}),
      ...(queryOptions.titleId ? { titleId: queryOptions.titleId } : {}),
      ...(queryOptions.managerId ? { managerId: queryOptions.managerId } : {}),
      ...(queryOptions.statusId ? { statusId: queryOptions.statusId } : {}),
    } as any;

    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await serviceLocator.employeeRepository.findAndCount({
      where: query,
      take: queryOptions.take,
      skip: queryOptions.skip,
      relations: [
        "department",
        "manager",
        "status",
        "title",
        "createdBy",
        "updatedBy",
        "employeeLimits",
        "employeeRegions",
        "employeeLimits.type",
        "employeeRegions.city",
        "employeeRegions.ward",
        "employeeRegions.district"
      ],
      order,
    });
    const serialize = plainToClass(EmployeeSerializer, result, { excludeExtraneousValues: true });

    return {
      items: serialize,
      total
    }; 
  }

  @Get({
    route: "/me",
    description: "Get current employee information",
    responseSchema: employeesCurrentResponse,
  })
  public async getCurrentEmployee(
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
  
    const rv = await EmployeeAppUseCases.getCurrentEmployee(account, serviceLocator);
    return plainToClass(EmployeeCurrentSerializer, rv, { excludeExtraneousValues: true });
  }

  @Post({
    route: "/changeBasicInfo",
    description: "Change current employee update basic info (birthday...)",
    validateSchemas: {
      payload: employeeChangeBasicInfoSchema,
    },
    responseSchema: employeesCurrentResponse,
  })
  public async changeBasicInfo(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: EmployeeChangeBasicInfoSerializer
    }) dto: EmployeeChangeBasicInfoSerializer,
  ): Promise<any> {
    const rv = await EmployeeAppUseCases.changeBasicInfo(dto, account, serviceLocator);
    return plainToClass(EmployeeCurrentSerializer, rv, { excludeExtraneousValues: true });
  }
}
