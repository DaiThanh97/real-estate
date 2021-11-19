import * as Boom from "@hapi/boom";
import * as Hapi from "@hapi/hapi";

interface ResponseMetaSchema {
  operation?: string;
  method?: string;
}

interface ErrorResponseSchema {
  code?: string | number;
  message?: string;
  error?: string;
}

interface ResponseSchema<T> {
  meta: ResponseMetaSchema;
  data?: T[];
  errors: ErrorResponseSchema[];
}

interface IResponseOptions<T> {
  value?: T | null | undefined;
  boom?: Boom.Boom | null | undefined;
}

export default function createResponse<T>(
  request: Hapi.Request,
  { value = null, boom = null }: IResponseOptions<T>
): ResponseSchema<T> {
  const errors: ErrorResponseSchema[] = [];
  const data: any = value;

  if (boom) {
    errors.push({
      code: boom.output.payload.statusCode,
      error: boom.output.payload.error,
      message: boom.output.payload.message
    });
  }

  return {
    meta: {
      method: request.method.toUpperCase(),
      operation: request.url.pathname
    },
    data,
    errors
  };
}
