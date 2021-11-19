import * as Hapi from "@hapi/hapi";
import Beans from "../../infrastructure/config/beans";
import { Account } from "../../domain/models/Account";
import { ClassConstructor, plainToClass } from "class-transformer";
import createResponse from "../rest_api/wrapper";
import { ChangeStatusNoteSerializer } from "../serializers/Base";

export abstract class AbstractNoteController {

  // serializer for post create 
  protected serializerClassPostCreateIn: ClassConstructor<any>;
  protected serializerClassPostCreateOut: ClassConstructor<any>;
  // serializer for put create
  protected serializerClassPutUpdateIn: ClassConstructor<any>;
  protected serializerClassPutUpdateOut: ClassConstructor<any>;
  // serializer for get query
  protected serializerClassGetByIdOut: ClassConstructor<any>;
  // serializer for get query
  protected serializerClassQueryIn: ClassConstructor<any>;
  protected serializerClassQueryOut: ClassConstructor<any>;
  // serializer for put status
  protected serializerClassStatusOut: ClassConstructor<any>;

  abstract doPostCreate(data: any, account: Account, serviceLocator: Beans): Promise<any> ;

  abstract doPutUpdate(id: number, data: any, account: Account, serviceLocator: Beans): Promise<any> ;

  abstract doGetById(id: number, serviceLocator: Beans): Promise<any> ;

  abstract doGetAllQuery(queryOptions: any, account: Account, serviceLocator: Beans): Promise<any> ;

  abstract doPutUpdateStatus(data: ChangeStatusNoteSerializer, account: Account, serviceLocator: Beans): Promise<any> ;

  protected createNote = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const note = plainToClass(
      this.serializerClassPostCreateIn,
      request.payload, {
        excludeExtraneousValues: true,
      });
    const rv = await this.doPostCreate(note, account, serviceLocator);
    const dataOut = plainToClass(
      this.serializerClassPostCreateOut,
      rv, {
        excludeExtraneousValues: true,
      });
    const res = createResponse(request, {
      value: dataOut
    });
    return toolkit.response(res);
  };

  public updateNote = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<any> => {
    const serviceLocator = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const { id } = request.params as { id: number };
    const dataIn = plainToClass(
      this.serializerClassPutUpdateIn,
      request.payload, {
        excludeExtraneousValues: true,
      });
    const rv = await this.doPutUpdate(id, dataIn, account, serviceLocator);
    const dataOut = plainToClass(
      this.serializerClassPutUpdateOut,
      rv, {
        excludeExtraneousValues: true,
      });
    const res = createResponse(request, {
      value: dataOut
    });
    return toolkit.response(res);
  };
  

  protected getById = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const { id } = request.params as { id: number };
    const rv = await this.doGetById(id, serviceLocator);
    const dataOut = plainToClass(
      this.serializerClassGetByIdOut,
      rv, {
        excludeExtraneousValues: true,
      });
    const res = createResponse(request, {
      value: dataOut
    });
    return toolkit.response(res);
  };

  protected getAllQuery = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<any> => {
    const serviceLocator = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const queryOptions = plainToClass(this.serializerClassQueryIn, request.query, { excludeExtraneousValues: true });
    const { data, total } = await this.doGetAllQuery(queryOptions, account, serviceLocator);
    const serialize = plainToClass(this.serializerClassQueryOut, data, { excludeExtraneousValues: true });

    const res = createResponse(request, {
      value: {
        items: serialize,
        total
      }
    });

    return toolkit.response(res);
  };

  protected putStatus = async (data: ChangeStatusNoteSerializer, request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const account: Account = (request.app as any).currentAccount as Account;
    const note = await this.doPutUpdateStatus(data, account, serviceLocator);

    const rv = plainToClass(this.serializerClassStatusOut, note, { excludeExtraneousValues: true });
    const res = createResponse(request, {
      value: rv
    });

    return toolkit.response(res);
  };

}
