import * as Hapi from "@hapi/hapi";
import { FindCurrentAccount } from "../../application/account/FindCurrentAccount";
import { accountRepository } from "../../infrastructure/IoC/typeDi.config";
import { ApiResponseWrapper } from "../restApi/ApiResponseWrapper";
import { AccountDTO } from "../DTOs/account/AccountDTO";

export class AccountControllers {
  public getCurrentAccount = async (
    request: Hapi.Request,
    toolkit: Hapi.ResponseToolkit,
  ): Promise<Hapi.ResponseObject> => {
    try {
      // get account id from authenticate token request
      const { id } = request.auth.credentials.user as { id: string };
      const useCase = new FindCurrentAccount(accountRepository);
      const result = await useCase.execute(id);
      const res = ApiResponseWrapper.createHandlerResponse(request, {
        value: AccountDTO.toDTO(result),
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
