import * as Hapi from "@hapi/hapi";
import { ApiResponseWrapper } from "../restApi/ApiResponseWrapper";
import { file as fileManager } from "../../infrastructure/IoC/typeDi.config";
import * as Boom from "@hapi/boom";

export class FileControllers {
  public upload = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const { file } = request.payload as { file: File };
      const { key, url } = await fileManager.upload(file);
      if (!url) {
        throw Boom.badImplementation("Upload Error.", "fileUpload");
      }
      const size = request.headers["content-length"];
      const mimeType = (file as any).hapi.headers["content-type"];
      const fileName = (file as any).hapi.filename;
      const res = ApiResponseWrapper.createHandlerResponse(request, {
        value: {
          key,
          url,
          size,
          mimeType,
          fileName,
        },
      });
      return toolkit.response(res);
    } catch (error) {
      const errRes = ApiResponseWrapper.createHandlerResponse(request, {
        error,
      });
      return toolkit.response(errRes);
    }
  };
  public delete = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const { key } = request.params as { key: string };
      const result = await fileManager.delete(key);
      if (!result) {
        throw Boom.badImplementation("Delete File Error.", "fileUpload");
      }
      const res = ApiResponseWrapper.createHandlerResponse(request, {
        value: {
          msg: "The file has been successfully removed.",
          success: true,
        },
      });
      return toolkit.response(res);
    } catch (error) {
      const errRes = ApiResponseWrapper.createHandlerResponse(request, {
        error,
      });
      return toolkit.response(errRes);
    }
  };
}
