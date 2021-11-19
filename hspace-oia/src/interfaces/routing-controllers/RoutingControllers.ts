import * as Hapi from "@hapi/hapi";
import { ActionMetadata } from "./metadata/ActionMetadata";
import logger from "../../infrastructure/logger";
import { BadRequestError, ForbiddenError } from "../../infrastructure/error";
import { ParamMetadata } from "./metadata/ParamMetadata";
import { plainToClass } from "class-transformer";
import { validateOrReject, ValidationError } from "class-validator";
import { getFromContainer } from "./container";
import createResponse from "../rest_api/wrapper";
import { MetadataBuilder } from "./metadata-builder/MetadataBuilder";
import { Account } from "../../domain/models/Account";
import { Base64 } from "js-base64";
import ErrorCode from "../../infrastructure/config/constants/errorCode";

export class RoutingControllers {
  constructor(
    public server: Hapi.Server,
    public namespace: string,
  ) {
  }

  registerAction(pathApi: string,
                 tags: string[],
                 actionMetadata: ActionMetadata,
                 executeCallback: (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => any): void {
    const routeHandler = (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
      return executeCallback(request, toolkit);
    };

    if (tags === undefined || !tags) {
      tags = ["api"];
    } else if (tags && !tags.includes("api")) {
      tags.push("api");
    }

    let app = {} as any;
    if (actionMetadata.policy) {
      app = {
        rule: {
          res: actionMetadata.policy.res,
          act: actionMetadata.policy.act,
        }
      } as any;
    }
    if (actionMetadata.platforms) {
      app["platforms"] = actionMetadata.platforms;
    }

    if (actionMetadata.secure) {
      app["secure"] = {
        api: `${pathApi}${actionMetadata.route}`,
        method: actionMetadata.type.toUpperCase(),
      };
    }

    this.server.route([
      {
        method: actionMetadata.type.toUpperCase(),
        path: `${this.namespace}${pathApi}${actionMetadata.route}`,
        options: {
          handler: routeHandler,
          description: actionMetadata.description || "",
          tags,
          auth: actionMetadata.auth,
          response: {
            schema: actionMetadata.responseSchema,
          } || {},
          validate: actionMetadata.validateSchemas || {},
          app,
        }
      }
    ]);
  }

  async normalizeStringValue(value: string, parameterName: string, parameterType: string) {
    const errStr = "NormalizeStringValueError";
    switch (parameterType) {
      case "number": {
        if (value === "") {
          logger.error(errStr, {
            value, parameterName, parameterType,
          });
          throw new BadRequestError(errStr);
        }

        const valueNumber = +value;
        if (isNaN(valueNumber)) {
          logger.error(errStr, {
            value, parameterName, parameterType,
          });
          throw new BadRequestError(errStr);
        }

        return valueNumber;
      }
      case "boolean": {
        if (value === "true" || value === "1" || value === "") {
          return true;
        } else if (value === "false" || value === "0") {
          return false;
        } else {
          logger.error(errStr, {
            value, parameterName, parameterType,
          });
          throw new BadRequestError(errStr);
        }

      }
      case "date": {
        const parsedDate = new Date(value);
        if (Number.isNaN(parsedDate.getTime())) {
          logger.error(errStr, {
            value, parameterName, parameterType,
          });
          throw new BadRequestError(errStr);
        }
        return parsedDate;
      }

      case "string":
      default:
        return value;
    }
  }

  parseValue(value: any, paramMetadata: ParamMetadata): any {
    const errStr = "ParsingValueError";
    if (typeof value === "string") {
      try {
        if (Base64.isValid(value)) {
          value = Base64.decode(value);
        }
        return JSON.parse(value);
      } catch (error) {
        logger.error(errStr, {
          paramMetadataName: paramMetadata.name,
          value
        });
        throw new ForbiddenError(errStr);
      }
    }

    return value;
  }

  transformValue(value: any, paramMetadata: ParamMetadata): any {
    if (paramMetadata.actionMetadata.options.transformRequest !== false &&
      paramMetadata.targetType &&
      paramMetadata.targetType !== Object &&
      !(value instanceof paramMetadata.targetType)) {

      const options = paramMetadata.classTransform || { excludeExtraneousValues: true };
      value = plainToClass(paramMetadata.targetType, value, options);
    }

    return value;
  }

  async validateValue(value: any, paramMetadata: ParamMetadata): Promise<any> {
    const isValidationEnabled = (paramMetadata.validate instanceof Object || paramMetadata.validate === true)
      || (paramMetadata.validate !== false);
    const shouldValidate = paramMetadata.targetType
      && (paramMetadata.targetType !== Object)
      && (value instanceof paramMetadata.targetType);

    if (isValidationEnabled && shouldValidate) {
      const options = paramMetadata.validate instanceof Object ? paramMetadata.validate : {};
      try {
        await validateOrReject(value, options);
      } catch (err: any) {
        const errors = err as ValidationError[];
        const detail: { field: string, errors: { [type: string]: string }, value?: any }[] = [];
        for (const e of errors) {
          detail.push({
            field: e.property,
            value: e.value,
            errors: e.constraints,
          });
        }
        throw new BadRequestError(
          `Invalid ${paramMetadata.type}, check 'detail' for more info.`,
          ErrorCode.ValidationError,
          detail,
        );
      }
    }

    return value;
  }

  async normalizeParamValue(value: any, param: ParamMetadata): Promise<any> {
    if (value === null || value === undefined)
      return value;

    if (typeof value === "string") {
      switch (param.targetName) {
        case "number":
        case "string":
        case "boolean":
        case "date":
          return this.normalizeStringValue(value, param.name, param.targetName);
      }
    }

    if ((["number", "string", "boolean"].indexOf(param.targetName) === -1)
      && (param.parse || param.isTargetObject)
    ) {
      value = this.parseValue(value, param);
      value = this.transformValue(value, param);
      await this.validateValue(value, param);
    }

    return value;
  }

  getParamFromRequest(request: Hapi.Request, param: ParamMetadata): any {
    switch (param.type) {
      case "payload":
        return request.payload;

      case "body":
        return (request.payload as any)[param.name];

      case "param":
        return request.params[param.name];

      case "params":
        return request.params;

      case "service-locator": {
        return (request.server.app as any).serviceLocator;
      }

      case "queries": {
        return request.query;
      }

      case "query": {
        return request.query[param.name];
      }

      case "request-auth": {
        return request.auth;
      }

      case "current-account": {
        return (request.app as any).currentAccount as Account;
      }

      case "header-query": {
        return request.headers[param?.name.toLowerCase()];
      }

    }
  }

  parameterHandle(request: Hapi.Request, toolkit: Hapi.ResponseToolkit, param: ParamMetadata) {
    if (param.type === "request")
      return request;

    if (param.type === "toolkit")
      return toolkit;

    return this.normalizeParamValue(this.getParamFromRequest(request, param), param);
  }


  async executeAction(actionMetadata: ActionMetadata,
                      request: Hapi.Request, toolkit: Hapi.ResponseToolkit) {
    const paramsPromises = actionMetadata.params
      .sort((param1, param2) => param1.index - param2.index)
      .map(param => this.parameterHandle(request, toolkit, param));

    return Promise.all(paramsPromises).then(async params => {
      const controllerInstance = getFromContainer(actionMetadata.target) as any;
      const result = await controllerInstance[actionMetadata.method].apply(controllerInstance, [...params]);
      const res = createResponse(request, {
        value: result,
      });

      return toolkit.response(res);
    });
  }

  registerControllers(classes: any[]): this {
    const metadataBuilder = new MetadataBuilder();
    const controllers = metadataBuilder.buildControllerMetadata(classes);
    controllers.forEach(ctrl => {
      ctrl.actions.forEach(actionMetadata => {
        this.registerAction(
          `/${ctrl.route}`,
          ctrl.tags,
          actionMetadata,
          async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
            return await this.executeAction(actionMetadata, request, toolkit);
          });
      });
    });
    return this;
  }
}
