import * as Hapi from "@hapi/hapi";
import createResponse from "../rest_api/wrapper";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Delete } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { fileKeySchema } from "../schemas/base";
import { msgResponse } from "../schemas/response";
import { Param } from "../routing-controllers/decorator/Param";
import Beans from "../../infrastructure/config/beans";

@Controller("files", ["file"])
export default class FileController {
  public upload = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<any> => {
    const serviceLocator = (request.server.app as any).serviceLocator;
    const { file } = request.payload as { file: File };
    const rv = await serviceLocator.fileManager.upload(file);
    rv.size = request.headers["content-length"];
    rv.mimeType = (file as any).hapi.headers["content-type"];
    rv.fileName = (file as any).hapi.filename;
    const res = createResponse(request, {
      value: rv
    });

    return toolkit.response(res);
  };

  @Delete({
    route: "/{key}",
    description: "Delete file in storage",
    validateSchemas: {
      params: fileKeySchema,
    },
    responseSchema: msgResponse,
  })
  public async delete(
    @ServiceLocator() serviceLocator: Beans,
    @Param("key") key: string,
  ): Promise<any> {
    await serviceLocator.fileManager.delete(key);
    return {
      msg: "The file has been successfully removed.", success: true
    };
  }

}
