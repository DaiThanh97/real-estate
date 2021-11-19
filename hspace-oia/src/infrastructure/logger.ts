import * as Dotenv from "dotenv";
import * as Winston from "winston";
import LogzioWinstonTransport from "winston-logzio";

Dotenv.config();

export class ApiLogger {
  public static newInstance(): Winston.Logger {
    const transports: any[] = [];
    const consoleTransport = new Winston.transports.Console({
      format: Winston.format.combine(
        Winston.format.colorize(),
        Winston.format.timestamp(),
        Winston.format.align(),
        Winston.format.printf((info) => {
          const { timestamp, level, message, ...args } = info;

          const ts = timestamp.slice(0, 19).replace("T", " ");
          return `${ts} [${level}]: ${message} ${
            Object.keys(args).length ? JSON.stringify(args, null, 2) : ""
          }`;
        })
      ),
      level: process.env.LOG_LEVEL
    });
    transports.push(consoleTransport);

    if (process.env.API_ENV === "production" || process.env.API_ENV === "staging" || process.env.API_ENV === "qa") {
      const logzioWinstonTransport = new LogzioWinstonTransport({
        level: "info",
        name: "winston_logzio",
        token: process.env.LOGZIO_TOKEN || "TrjoWFhAHZAsBRyPMxNrfoWQtZojraBx",
        host: process.env.LOGZIO_LISTENER || "listener-au.logz.io",
      });
      transports.push(logzioWinstonTransport);
    }


      return Winston.createLogger({transports});
  }
}

export default ApiLogger.newInstance();
