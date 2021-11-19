import * as Hapi from "@hapi/hapi";
import * as Joi from "joi";
import { AppRouter } from "../../interface/restApi/AppRouter";
import plugins from "./plugin";
import { failAction, onPreResponse, onRequest, onResponse } from "./events";
import { getConnection } from "typeorm";
import * as fs from "fs";
import { logger } from "../IoC/typeDiLogger.config";
import { accountRepository } from "../IoC/typeDi.config";
import { NewRootAdmin } from "../database/seed/NewRootAdmin";
import { AuthControllers } from "../../interface/controllers/AuthControllers";

export default class Server {
  private static _instance: Hapi.Server;

  public static async start(): Promise<Hapi.Server> {
    try {
      Server._instance = new Hapi.Server({
        port: process.env.PORT,
        debug: {
          log: ["*"],
          request: ["*"],
        },
        routes: {
          cors: {
            origin: process.env.CORS_ORIGINS.split(","),
            headers: process.env.CORS_HEADERS.split(","),
            credentials: true,
          },
          validate: {
            failAction,
          },
        },
      });

      Server._instance.validator(Joi);
      Server._instance.ext("onRequest", onRequest);
      Server._instance.ext("onPreResponse", onPreResponse);
      Server._instance.events.on("response", onResponse);

      await plugins.registerAll(Server._instance);

      const scheme = (server: Hapi.Server, options?: Hapi.ServerAuthSchemeOptions): Hapi.ServerAuthSchemeObject => {
        // firebase authentication
        return AuthControllers.tokenAuthentication();
      };

      Server._instance.auth.scheme("firebaseJwtCustom", scheme);
      Server._instance.auth.strategy("firebaseJwt", "firebaseJwtCustom");
      Server._instance.auth.default("firebaseJwt");

      await AppRouter.loadRoutes(Server._instance);

      await Server.addRootAdmin();

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

  public static async addRootAdmin(): Promise<void> {
    await new NewRootAdmin(accountRepository).handler();
  }
}
