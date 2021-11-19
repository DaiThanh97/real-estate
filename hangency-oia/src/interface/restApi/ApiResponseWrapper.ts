import * as Hapi from "@hapi/hapi";
import { GeneralError } from "../../domain/exceptions/error";

interface ResponseMetaSchema {
  operation: string;
  method: string;
}

interface ErrorResponseSchema {
  code: string | number;
  message: string;
}

interface ResponseSchema<T> {
  meta: ResponseMetaSchema;
  data?: T;
  errors: ErrorResponseSchema[];
}

interface IResponseOptions<T> {
  value?: T | null;
  error?: GeneralError;
}

export class ApiResponseWrapper {
  static createHandlerResponse<T>(
    request: Hapi.Request,
    { value = null, error = undefined }: IResponseOptions<T>,
  ): ResponseSchema<T> {
    const errorDetails: ErrorResponseSchema[] = [];

    if (error) {
      errorDetails.push({
        code: error.errorCode || "",
        message: error.message,
      });
    }

    return {
      meta: {
        method: request.method.toUpperCase(),
        operation: request.url.pathname,
      },
      data: value ? value : undefined,
      errors: errorDetails,
    };
  }
}
