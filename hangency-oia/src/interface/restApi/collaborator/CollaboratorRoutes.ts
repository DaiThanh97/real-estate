import * as Hapi from "@hapi/hapi";
import { IRouter } from "../AppRouter";
import { CollaboratorControllers } from "../../controllers/CollaboratorControllers";
import { collaboratorBodySchema } from "../../schemas/collaborator/collaboratorBody";
import { collaboratorResponseWrapperSchema } from "../../schemas/collaborator/collaboratorResponse";

export default class CollaboratorRouter implements IRouter {
  public namespace: string;
  public tags: string[];

  constructor(namespace: string, tags: string[]) {
    this.namespace = namespace;
    this.tags = tags;
  }

  public async register(server: Hapi.Server): Promise<void> {
    return new Promise((resolve) => {
      const controller = new CollaboratorControllers();
      const pathApi = `${this.namespace}`;
      server.route([
        {
          method: "POST",
          path: `${pathApi}`,
          options: {
            auth: "firebaseJwt",
            handler: controller.create,
            description: "Create a collaborator & account",
            tags: this.tags,
            validate: {
              payload: collaboratorBodySchema,
            },
            response: {
              schema: collaboratorResponseWrapperSchema,
            },
          },
        },
      ]);

      resolve();
    });
  }
}
