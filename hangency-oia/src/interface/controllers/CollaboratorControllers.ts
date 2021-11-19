import * as Hapi from "@hapi/hapi";
import { CreateCollaborator } from "../../application/collaborator/CreateCollaborator";
import { collaboratorRepository, accountManager, accountGroupRepository } from "../../infrastructure/IoC/typeDi.config";
import { ApiResponseWrapper } from "../restApi/ApiResponseWrapper";
import { CollaboratorDTO } from "../DTOs/collaborator/CollaboratorDTO";
import { CreateCollaboratorBody } from "../DTOs/collaborator/CreateCollaboratorBody";
import { Account } from "../../domain/models/Account";

export class CollaboratorControllers {
  public create = async (request: Hapi.Request, toolkit: Hapi.ResponseToolkit): Promise<Hapi.ResponseObject> => {
    try {
      const currentAccount = request.auth.credentials.user as Account;
      // create collaborator
      const useCase = new CreateCollaborator(collaboratorRepository, accountManager, accountGroupRepository);
      const payload = request.payload as CreateCollaboratorBody;
      const result = await useCase.execute(payload, currentAccount);

      const res = ApiResponseWrapper.createHandlerResponse(request, {
        value: CollaboratorDTO.toDTO(result),
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
