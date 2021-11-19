import Beans from "../../../infrastructure/config/beans";
import events from "../events";
import logger from "../../../infrastructure/logger";

export class BaseController {
  protected socket: any;
  protected io: any;
  protected beans: Beans;

  constructor(io: any, socket: any, beans: Beans) {
    this.socket = socket;
    this.io = io;
    this.beans = beans;
  }

  public handleError(err: any) {
    this.socket.emit(events.Exception, {
      message: err.message,
      errorCode: err.errorCode,
      name: err.name,
    });
  }

  public handleValidationError(err: any) {
    this.handleError(err);
    logger.error("Validation Error:", err);
  }
}
