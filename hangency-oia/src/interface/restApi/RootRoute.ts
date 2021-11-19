import { AppRouter } from "./AppRouter";
import * as Hapi from "@hapi/hapi";
import { ResponseToolkit } from "@hapi/hapi";
import { ApiResponseWrapper } from "./ApiResponseWrapper";
import { msgResponse } from "../schemas/response";

export class RootRoute implements AppRouter {
  public prefix: string;
  public tags: string[];

  constructor(tags: string[], prefix?: string) {
    this.prefix = prefix;
    this.tags = tags;
  }

  public async register(server: Hapi.Server): Promise<void> {
    return new Promise<void>((resolve) => {
      server.route([
        {
          method: "GET",
          path: "/",
          options: {
            handler: (request: Hapi.Request, toolkit: ResponseToolkit) => {
              const res = ApiResponseWrapper.createHandlerResponse(request, {
                value: { msg: "ok", success: true },
              });
              return toolkit.response(res);
            },
            response: {
              schema: msgResponse,
            },
            description: "root",
            tags: this.tags,
            auth: false,
          },
        },
      ]);

      resolve();
    });
  }
}
