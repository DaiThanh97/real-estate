import * as Boom from "@hapi/boom";
import logger from "./logger";

export class BoomError extends Error {
  public boomError: any;

  constructor(boomError: Boom.Boom, errorCode: string = "", detail?: any) {
    if (process.env.SOCKET === String(true)) {
      logger.error(boomError.message);
      const err = new Error(boomError.message);
      (err as any).errorCode = errorCode;
      throw err;
    }
    super(boomError.message);
    if (errorCode) {
      (boomError.output.payload as any).errorCode = errorCode;
    }

    if (detail) {
      (boomError.output.payload as any).detail = detail;
    }

    this.boomError = boomError;
  }
}

export class NotFoundError extends BoomError {
  constructor(message: string, errorCode: string = "") {
    super(Boom.notFound(message), errorCode);
  }
}

export class BadImplementationError extends BoomError {
  constructor(message: string = "", errorCode: string = "") {
    super(Boom.badImplementation(message), errorCode);
  }
}

export class BadRequestError extends BoomError {
  constructor(message: string = "", errorCode: string = "", detail?: any) {
    super(Boom.badRequest(message), errorCode, detail);
  }
}

export class UnauthorizedError extends BoomError {
  constructor(message: string = "", errorCode: string = "") {
    super(Boom.unauthorized(message), errorCode);
  }
}

export class ConflictError extends BoomError {
  constructor(message: string = "", errorCode: string = "") {
    super(Boom.conflict(message), errorCode);
  }
}

export class ForbiddenError extends BoomError {
  constructor(message: string = "", errorCode: string = "") {
    super(Boom.forbidden(message), errorCode);
  }
}
