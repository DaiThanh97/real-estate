import { AccessTokenManager } from "./security/AccessTokenManager";
import { Account } from "../domain/models/Account";
import { Session } from "../domain/models/Session";
import { plainToClass } from "class-transformer";
import { ISessionRepository } from "../domain/services/contract";


export default class SessionAppUseCases {
  public static async generateSession(
    account: Account,
    beans: {
      sessionRepository: ISessionRepository,
    }): Promise<any> {
    const session: Partial<Session> = new Session(account);
    return await beans.sessionRepository.save(session);
  }

  public static async generateAccessToken(session: Session, beans: {
    accessTokenManager: AccessTokenManager,
  }): Promise<any> {
    const payload = session.generatePayload();
    return beans.accessTokenManager.generate(payload);
  }

  public static async terminate(sessionId: number, beans: {
    sessionRepository: ISessionRepository,
  }): Promise<any> {
    const findResult = await beans.sessionRepository.findOne(sessionId);
    if (findResult) {
      const session: Session = plainToClass(Session, findResult);
      session.deactivate();
      await beans.sessionRepository.save(session);
      return true;
    }
    return false;
  }
}
