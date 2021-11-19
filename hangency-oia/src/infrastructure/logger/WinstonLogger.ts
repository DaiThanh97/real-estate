import { ILogger } from "../../application/tools/ILogger";
import * as Winston from "winston";
import { Service } from "typedi";
import { TYPES } from "../IoC/types";

@Service({ id: TYPES.logger })
export class WinstonLogger implements ILogger {
  private loggerInstance: Winston.Logger = null;
  async initialize(): Promise<void> {
    if (!this.loggerInstance) {
      const consoleTransport = new Winston.transports.Console({
        format: Winston.format.combine(
          Winston.format.colorize(),
          Winston.format.timestamp(),
          Winston.format.align(),
          Winston.format.printf((info) => {
            const { timestamp, level, message, ...args } = info;

            const ts = timestamp.slice(0, 19).replace("T", " ");
            return `${ts} [${level}]: ${message} ${Object.keys(args).length ? JSON.stringify(args, null, 2) : ""}`;
          }),
        ),
        level: process.env.LOG_LEVEL,
      });

      this.loggerInstance = Winston.createLogger({ transports: [consoleTransport] });
    }
  }
  info(message: string): void {
    this.loggerInstance.info(message);
  }
  error<T>(message: string, errorObj: T): void {
    this.loggerInstance.error(message, errorObj);
  }
  debug<T>(message: string, obj: T): void {
    this.loggerInstance.debug(message, obj);
  }
}
