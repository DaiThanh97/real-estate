import * as Hapi from "@hapi/hapi";
import { IRouter } from "../AppRouter";
import { PropertyControllers } from "../../controllers/PropertyControllers";
import { propertyResponseWrapperSchema } from "../../schemas/property/propertyResponse";
import { propertyBodySchema } from "../../schemas/property/propertyBody";
import { idSchema } from "../../schemas/shared/base";
export default class PropertyRouter implements IRouter {
  public namespace: string;
  public tags: string[];

  constructor(namespace: string, tags: string[]) {
    this.namespace = namespace;
    this.tags = tags;
  }

  public async register(server: Hapi.Server): Promise<void> {
    return new Promise((resolve) => {
      const controller = new PropertyControllers();
      const pathApi = `${this.namespace}`;
      server.route([
        {
          method: "POST",
          path: `${pathApi}`,
          options: {
            auth: "firebaseJwt",
            handler: controller.create,
            description: "Create a property",
            tags: this.tags,
            validate: {
              payload: propertyBodySchema,
            },
            response: {
              schema: propertyResponseWrapperSchema,
            },
          },
        },
        {
          method: "GET",
          path: `${pathApi}/{id}`,
          options: {
            auth: "firebaseJwt",
            handler: controller.getById,
            description: "get a property by id",
            tags: this.tags,
            validate: {
              params: idSchema,
            },
            response: {
              schema: propertyResponseWrapperSchema,
            },
          },
        },
      ]);

      resolve();
    });
  }
}
