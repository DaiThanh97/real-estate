import * as Hapi from "@hapi/hapi";
import { Router, RouterGroup } from "./router";

export default class ApiGroup implements RouterGroup {
  public namespace: string;
  public server: Hapi.Server;

  constructor(namespace: string, server: Hapi.Server) {
    this.namespace = namespace;
    this.server = server;
  }

  public async includeRouter(router: Router): Promise<void> {
    await router.register(
      this.server,
      this.namespace
    );
  }
}
