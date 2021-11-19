import * as Hapi from "@hapi/hapi";
import { IRouter } from "../AppRouter";
import { accountResponseWrapperSchema } from "../../schemas/account/accountResponse";
import { AccountControllers } from "../../controllers/AccountControllers";

export default class AccountRouter implements IRouter {
  public namespace: string;
  public tags: string[];

  constructor(namespace: string, tags: string[]) {
    this.namespace = namespace;
    this.tags = tags;
  }

  public async register(server: Hapi.Server): Promise<void> {
    return new Promise((resolve) => {
      const controller = new AccountControllers();
      const pathApi = `${this.namespace}`;
      server.route([
        {
          method: "GET",
          path: `${pathApi}/me`,
          options: {
            auth: "firebaseJwt",
            handler: controller.getCurrentAccount,
            description: "Find current account",
            tags: this.tags,
            response: {
              schema: accountResponseWrapperSchema,
            },
          },
        },
      ]);

      resolve();
    });
  }
}
