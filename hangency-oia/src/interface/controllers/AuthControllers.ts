import * as Hapi from "@hapi/hapi";
import * as Boom from "@hapi/boom";
import { auth } from "../../infrastructure/IoC/typeDi.config";
import { logger } from "../../infrastructure/IoC/typeDiLogger.config";
import { accountRepository } from "../../infrastructure/IoC/typeDi.config";
import { FindAccountByAuthId } from "../../application/account/FindAccountByAuthId";

export class AuthControllers {
  public static tokenAuthentication = () => {
    return {
      authenticate: async (request: Hapi.Request, h: Hapi.ResponseToolkit) => {
        const req = request.raw.req;
        const authorization = req.headers.authorization;
        if (!authorization) {
          throw Boom.unauthorized(null, "firebaseJwtCustom");
        }
        const bearerToken = authorization.split(" ")[1];
        try {
          const jwtDecoded = await auth.decode(bearerToken);
          // query db to get account info
          const useCase = new FindAccountByAuthId(accountRepository);
          const account = await useCase.execute(jwtDecoded.id);

          return h.authenticated({
            credentials: {
              user: account,
            },
          });
        } catch (err) {
          logger.error(`decode error: ${err}`);
          throw Boom.unauthorized("invalid token", "firebaseJwtCustom");
        }
      },
    };
  };
}
