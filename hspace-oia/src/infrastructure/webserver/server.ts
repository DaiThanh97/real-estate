import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import logger from "../logger";
import loadEnv from "../config/environment";
import { loadRouters } from "../../interfaces/rest_api/router";
import plugins from "./plugin";
import AuthController from "../../interfaces/controllers/auth";
import { failAction, onPreResponse, onRequest, onResponse } from "./events";
import { getConnection } from "typeorm";
import * as fs from "fs";
import Beans from "../config/beans";
import { EVENT } from "../config/constants/event";
import NotificationAppUseCases from "../../application/NotificationAppUseCases";
import AccountActivityAppUseCases from "../../application/AccountActivityAppUseCases";


export default class Server {
  private static _instance: Hapi.Server;

  public static async start(beans: Beans): Promise<Hapi.Server> {
    try {
      loadEnv();
      Server._instance = new Hapi.Server({
        port: process.env.PORT,
        debug: {
          log: ["*"],
          request: ["*"]
        },
        routes: {
          cors: {
            origin: process.env.CORS_ORIGINS.split(","),
            headers: process.env.CORS_HEADERS.split(","),
            credentials: true,
          },
          validate: {
            failAction,
          }
        }
      });

      Server._instance.validator(Joi);
      Server._instance.ext("onRequest", onRequest);
      Server._instance.ext("onPreResponse", onPreResponse);
      Server._instance.events.on("response", onResponse);

      await plugins.registerAll(Server._instance);
      const auth = new AuthController();
      Server._instance.auth.strategy("jwt", "jwt", {
        key: process.env.JWT_SECRET_KEY,
        validate: auth.validateToken,
        verifyOptions: {
          ignoreExpiration: false,
          algorithms: ["HS256"],
        }
      });

      Server._instance.auth.default("jwt");

      await loadRouters(Server._instance);
      (Server._instance.app as any).serviceLocator = beans;

      Server.addEventListener();
      await Server._instance.start();

      logger.info(`Server - Up and running at http://${process.env.HOST}:${process.env.PORT}`);

      return Server._instance;
    } catch (error) {
      logger.info(`Server - There was something wrong: ${error}`);

      throw error;
    }
  }

  public static async stop(): Promise<Error | void> {
    logger.info("Server - Stopping execution");
    const connection = await getConnection();
    await connection.close();

    return await Server._instance.stop();
  }

  public static async inject(options: string | Hapi.ServerInjectOptions): Promise<Hapi.ServerInjectResponse> {
    return await Server._instance.inject(options);
  }

  public static async generateSwaggerFile(): Promise<void> {
    const response = await Server._instance.inject({
      method: "GET",
      url: "/swagger.json",
    });
    fs.writeFileSync("openapi.json", response.payload);
  }

  public static addEventListener() {
    const beans = (Server._instance.app as any).serviceLocator;
    beans.eventEmitter.on(EVENT.CREATE_NOTIFICATION,
      (notificationData: any,
       accountId: number,
       sendMoreAccounts: number[] = [],
      ) => {
        return NotificationAppUseCases.create(
          notificationData,
          accountId,
          sendMoreAccounts,
          beans,
        );
      });

    beans.eventEmitter.on(EVENT.CREATE_ACTIVITY,
      (activity: any,
      ) => {
        return AccountActivityAppUseCases.create(
          activity,
          beans,
        );
      });
  }
}
