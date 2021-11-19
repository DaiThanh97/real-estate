import * as Hapi from "@hapi/hapi";
import { RootRoute } from "./RootRoute";
import PropertyRoutes from "./property/PropertyRoutes";
import AccountRoutes from "./account/AccountRoutes";
import { logger } from "../../infrastructure/IoC/typeDiLogger.config";
import CollaboratorRouter from "./collaborator/CollaboratorRoutes";
import FileRoutes from "./file/FileRoutes";

export interface IRouter {
  namespace: string;
  tags: string[];

  register(server: Hapi.Server, namespace?: string): Promise<void>;
}

export interface IRouterGroup {
  namespace: string;

  includeRouter(router: IRouter): Promise<void>;
}

export class AppRouter {
  public static async loadRoutes(server: Hapi.Server): Promise<void> {
    logger.info("Router - Start adding routes");
    const namespace = "/api/v1";
    await new RootRoute(["api", "root"]).register(server);

    await new PropertyRoutes(`${namespace}/properties`, ["api", "property"]).register(server);
    await new AccountRoutes(`${namespace}/accounts`, ["api", "account"]).register(server);
    await new CollaboratorRouter(`${namespace}/collaborators`, ["api", "collaborator"]).register(server);
    await new FileRoutes(`${namespace}/files`, ["api", "file"]).register(server);

    logger.info("Router - Finish adding routes");
  }
}
