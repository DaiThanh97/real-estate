import * as Hapi from "@hapi/hapi";
import { IRouter, IRouterGroup } from "./AppRouter";

export class ApiGroup implements IRouterGroup {
  public namespace: string;
  public server: Hapi.Server;

  constructor(namespace: string, server: Hapi.Server) {
    this.namespace = namespace;
    this.server = server;
  }

  public async includeRouter(router: IRouter): Promise<void> {
    await router.register(this.server, this.namespace);
  }
}
