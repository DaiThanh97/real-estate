import * as Hapi from "@hapi/hapi";
import { CreateProperty } from "../../application/property/CreateProperty";
import { FindPropertyById } from "../../application/property/FindPropertyById";
import { propertyRepository } from "../../infrastructure/IoC/typeDi.config";
import { ApiResponseWrapper } from "../restApi/ApiResponseWrapper";
import { PropertyDTO } from "../DTOs/property/PropertyDTO";

export class PropertyControllers {
  public create = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const useCase = new CreateProperty(propertyRepository);
      const { name } = request.payload as { name: string };
      const result = await useCase.execute({ name });
      const res = ApiResponseWrapper.createHandlerResponse(request, {
        value: PropertyDTO.toDTO(result),
      });

      return toolkit.response(res);
    } catch (error) {
      const errRes = ApiResponseWrapper.createHandlerResponse(request, {
        error,
      });
      return toolkit.response(errRes);
    }
  };
  public getById = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const useCase = new FindPropertyById(propertyRepository);
      const { id } = request.params as { id: string };
      const result = await useCase.execute(id);
      const res = ApiResponseWrapper.createHandlerResponse(request, {
        value: PropertyDTO.toDTO(result),
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
