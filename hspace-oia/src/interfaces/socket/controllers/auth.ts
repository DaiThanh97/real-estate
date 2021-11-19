import { BaseController } from "./base";
import logger from "../../../infrastructure/logger";
import * as _ from "underscore";
import events from "../events";
import { plainToClass } from "class-transformer";
import { ChatSocketSerializer } from "../../serializers/ChatSerializer";
import ChatAppUseCases from "../../../application/ChatAppUseCases";


export class AuthController extends BaseController {
  public authenticate = async (data: { token: string, isUserWeb: boolean }) => {
    try {
      const decoded = await this.beans.accessTokenManager.decode(data.token);
      const { isValid, account } = await this.beans.tokenManager.validate(decoded, data.isUserWeb);
      if (isValid) {
        const chatInfo = {
          accountId: account.id,
          identityName: account.identityName,
          socketId: this.socket.id,
          sessionId: decoded["custom:session"],
        };
        const chatSocket = plainToClass(ChatSocketSerializer, chatInfo, {
          excludeExtraneousValues: true,
          groups: ["create"],
        });
        await ChatAppUseCases.createChatSocket(chatSocket, this.beans);
        this.socket.auth = true;
        this.socket.account = account;

        logger.info("Authenticated socket:", chatInfo);
        _.each(this.io.nsps, (nsp: any) => {
          if (_.findWhere(nsp.sockets, { id: this.socket.id })) {
            nsp.connected[this.socket.id] = this.socket;
          }
        });
        this.socket.join(account.identityName);
        this.socket.emit(events.ChatInfo, chatInfo);
      }
    } catch (err) {
      logger.info(err);
    }
  };
}
