import * as Hapi from "@hapi/hapi";
import logger from "../logger";
import * as Boom from "@hapi/boom";
import ErrorCode from "../config/constants/errorCode";
import { EAccountType } from "../../domain/models/Account";

function logReq(request: Hapi.Request) {
  const msg = `End: ${request.method.toUpperCase()} - ${request.url.href} --> ${
    (request.response as any).statusCode
  }:`;

  const payload = request.payload as any;
  if (payload) {
    if (payload.password) {
      payload.password = "you-never-know";
    }

    if (payload.newPassword) {
      payload.newPassword = "you-never-know";
    }
  }

  let email = null;
  const account = (request.app as any).currentAccount;
  if (account) {
    if (account.type === EAccountType.EMPLOYEE) {
      email = account.employee.email;
    } else if (account.type === EAccountType.COLLABORATOR) {
      email = account.collaborator.email;
    }
  }

  logger.info(msg, {
    email,
    identityName: (request.app as any).currentAccount?.identityName || null,
    method: request.method.toUpperCase(),
    url: request.url.href,
    env: process.env.API_ENV,
    header: request.headers,
    request: payload,
    param: request.params,
    response: (request.response as any).source,
  });
}

export const failAction = async (
  _request: Hapi.Request,
  _toolkit: Hapi.ResponseToolkit,
  err: any
) => {
  err.output.payload.errorCode = ErrorCode.ValidationError;
  err.output.payload.detail = err.output.payload.message.replace(/['"]+/g, "");
  err.output.payload.message = "Invalid request payload input";
  logger.error(`ValidationError: ${err.message}`);
  throw err;
};

export const onRequest = (
  request: Hapi.Request,
  toolkit: Hapi.ResponseToolkit
) => {
  // logger.info(`Start: ${request.method.toUpperCase()} - ${request.url.href}`);
  return toolkit.continue;
};

export const onPreResponse = (
  request: Hapi.Request,
  toolkit: Hapi.ResponseToolkit
) => {
  const response = request.response as any;
  if (!response.isBoom) {
    return toolkit.continue;
  }

  logger.error("ErrorException", {
    identityName: (request.app as any).currentAccount?.identityName || null,
    method: request.method.toUpperCase(),
    url: request.url.href,
    env: process.env.API_ENV,
    header: request.headers,
    param: request.params,
    response: response.source,
    responseObject: response,
    error: response.boomError,
  });

  if (response.name === "EntityNotFound") {
    const err = Boom.notFound("Entity not found.");
    (err.output.payload as any).errorCode = ErrorCode.EntityNotFound;
    if (process.env.NODE_ENV === "development") {
      const message = response.message;
      const msgErr = message
        .substr(0, message.indexOf(": "))
        .replace(/['"]+/g, "");
      const entityQueryErr = message.substr(message.indexOf(": ") + 1) as any;
      (err.output.payload as any).detail = `${msgErr}.`;
      (err.output.payload as any).entityQueryError = JSON.parse(entityQueryErr);
    }
    // Note: Extract entity name in case query not found, e.g: message = "Could not find any entity of type "property" matching:..."
    const msgEntityNotFound = response?.message.match(/type "(.*)" matching/);
    if (msgEntityNotFound && msgEntityNotFound[1]) {
      (err.output.payload as any).entity = msgEntityNotFound[1];
    }
    return err;
  }

  if (response.boomError) {
    return response.boomError;
  }

  return toolkit.continue;
};

export const onResponse = (request: Hapi.Request) => {
  if (!process.env.REQUEST_LOG || process.env.REQUEST_LOG !== String(false)) {
    // logReq(request);
  }
};
