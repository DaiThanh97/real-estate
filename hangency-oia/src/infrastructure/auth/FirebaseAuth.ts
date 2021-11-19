import { IAuth, JwtDecoded } from "../../application/tools/IAuth";
import { authConnectionHolder } from "../IoC/typeDi.config";
import { decodedToken } from "@halato/user";
import { logger } from "../IoC/typeDiLogger.config";

export class FirebaseAuth implements IAuth {
  async decode(token: string): Promise<JwtDecoded> {
    const firebaseAdmin = authConnectionHolder.getInstance();
    return await decodedToken(firebaseAdmin, token);
  }

  async getUserByEmail(email: string): Promise<{ uid: string; email?: string } | void> {
    const firebaseAdmin = authConnectionHolder.getInstance();
    return await firebaseAdmin
      .auth()
      .getUserByEmail(email)
      .catch((err) => {
        logger.info(`not found with firebase email ${email} | ${err}`);
      });
  }

  async createUser(email: string, password: string): Promise<{ uid: string; email?: string }> {
    const firebaseAdmin = authConnectionHolder.getInstance();
    return await firebaseAdmin.auth().createUser({
      email: email,
      password: password,
    });
  }
}
