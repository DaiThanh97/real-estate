import * as Hapi from "@hapi/hapi";
import { IRouter } from "../AppRouter";
import { FileControllers } from "../../controllers/FileControllers";
import { propertyResponseWrapperSchema } from "../../schemas/property/propertyResponse";
import { fileResponseWrapperSchema } from "../../schemas/file/fileResponse";
import { fileBodySchema } from "../../schemas/file/fileBody";
import { fileKeySchema } from "../../schemas/file/fileKey";
import { msgResponse } from "../../schemas/response";

export default class FileRouter implements IRouter {
  public namespace: string;
  public tags: string[];

  constructor(namespace: string, tags: string[]) {
    this.namespace = namespace;
    this.tags = tags;
  }

  public async register(server: Hapi.Server): Promise<void> {
    return new Promise((resolve) => {
      const controller = new FileControllers();
      const pathApi = `${this.namespace}`;
      server.route([
        {
          method: "POST",
          path: `${pathApi}`,
          options: {
            auth: "firebaseJwt",
            handler: controller.upload,
            description: "Upload file to storage",
            tags: this.tags,
            plugins: {
              "hapi-swagger": {
                payloadType: "form",
              },
            },
            payload: {
              maxBytes: +process.env.FILE_MAX_LIMIT_UPLOAD_SIZE,
              parse: true,
              allow: "multipart/form-data",
              multipart: {
                output: "stream",
              },
            },
            validate: {
              payload: fileBodySchema,
            },
            response: {
              schema: fileResponseWrapperSchema,
            },
          },
        },
        {
          method: "DELETE",
          path: `${pathApi}/{key}`,
          options: {
            auth: "firebaseJwt",
            handler: controller.delete,
            description: "Delete file in storage",
            tags: this.tags,
            validate: {
              params: fileKeySchema,
            },
            response: {
              schema: msgResponse,
            },
          },
        },
      ]);

      resolve();
    });
  }
}
