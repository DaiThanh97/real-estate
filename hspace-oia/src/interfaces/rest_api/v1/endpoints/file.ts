import * as Hapi from "@hapi/hapi";
import { Router } from "../../router";
import FileController from "../../../controllers/file";
import { fileUploadSchema } from "../../../schemas/file";
import { uploadFileResponse } from "../../../schemas/response";

export default class FileRouter implements Router {
    public prefix: string;
    public tags: string[];

    constructor(prefix: string, tags: string[]) {
        this.prefix = prefix;
        this.tags = tags;
    }

    public async register(server: Hapi.Server, namespace: string): Promise<any> {
        return new Promise<void>((resolve) => {
            const controller = new FileController();
            const pathApi = `${namespace}/${this.prefix}`;

            server.route([
                {
                    method: "POST",
                    path: `${pathApi}`,
                    options: {
                        auth: "jwt",
                        handler: controller.upload,
                        description: "Upload file to storage",
                        tags: this.tags,
                        plugins: {
                            "hapi-swagger": {
                                payloadType: "form"
                            }
                        },
                        payload: {
                            maxBytes: +process.env.FILE_MAX_LIMIT_UPLOAD_SIZE,
                            parse: true,
                            allow: "multipart/form-data",
                            multipart: {
                                output: "stream"
                            }
                        },
                        validate: {
                            payload: fileUploadSchema
                        },
                        response: {
                            schema: uploadFileResponse,
                        }
                    }
                },
            ]);

            resolve();
        });
    }
}
