import * as Hapi from "@hapi/hapi";
import ErrorCode from "../config/constants/errorCode";
import { logger } from "../IoC/typeDiLogger.config";
import { Boom } from "@hapi/boom";

export const failAction = async (_request: Hapi.Request, _toolkit: Hapi.ResponseToolkit, err?: Boom) => {
  err.output.payload.errorCode = ErrorCode.ValidationError;
  err.output.payload.detail = err.output.payload.message.replace(/['"]+/g, "");
  err.output.payload.message = "Invalid request payload input";
  throw err;
};

export const onRequest = (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
  // logger.info(`Start: ${request.method.toUpperCase()} - ${request.url.href}`);
  return toolkit.continue;
};

export const onPreResponse = (request: Hapi.Request, toolkit: Hapi.ResponseToolkit) => {
  const response = request.response;
  if (!(response as Boom)?.isBoom) {
    return toolkit.continue;
  } else {
    logger.error("ErrorException", {
      method: request.method.toUpperCase(),
      url: request.url.href,
      env: process.env.API_ENV,
      header: request.headers,
      param: request.params,
      responseObject: response,
    });

    return toolkit.continue;
  }
};

export const onResponse = (request: Hapi.Request) => {
  if (!process.env.REQUEST_LOG || process.env.REQUEST_LOG !== String(false)) {
    // logReq(request);
  }
};
