import "reflect-metadata";
import { Container } from "typedi";
import { TYPES } from "./types";
import { ILogger } from "../../application/tools/ILogger";
import { WinstonLogger } from "../logger/WinstonLogger";

Container.set<ILogger>(TYPES.logger, new WinstonLogger());
const logger = Container.get<ILogger>(TYPES.logger);

export { logger };
