export class GeneralError<T = unknown> extends Error {
  public errorCode: string;
  public detail?: T;

  constructor(message: string, errorCode: string = "", detail?: T) {
    super(message);
    this.errorCode = errorCode;
    this.detail = detail;
  }
}

export class NotFoundError extends GeneralError {
  constructor(message: string, errorCode: string = "") {
    super(message, errorCode);
  }
}

export class BadImplementationError extends GeneralError {
  constructor(message: string = "", errorCode: string = "") {
    super(message, errorCode);
  }
}

export class BadRequestError<T> extends GeneralError<T> {
  constructor(message: string = "", errorCode: string = "", detail?: T) {
    super(message, errorCode, detail);
  }
}

export class UnauthorizedError extends GeneralError {
  constructor(message: string = "", errorCode: string = "") {
    super(message, errorCode);
  }
}

export class ConflictError extends GeneralError {
  constructor(message: string = "", errorCode: string = "") {
    super(message, errorCode);
  }
}

export class ForbiddenError extends GeneralError {
  constructor(message: string = "", errorCode: string = "") {
    super(message, errorCode);
  }
}

export class InvalidRequestError extends GeneralError {
  constructor(message: string = "", errorCode: string = "") {
    super(message, errorCode);
  }
}
