import {
  IAccountRepository,
  IChatManager,
  IChatSocketRepository,
  IConversationRepository,
  IMessageRepository
} from "../domain/services/contract";
import { ChatSocketSerializer } from "../interfaces/serializers/ChatSerializer";
import { plainToClass } from "class-transformer";
import { MessageSerializer } from "../interfaces/serializers/MessageSerializer";
import ConversationAppUseCases from "./ConversationAppUseCases";

export default class ChatAppUseCases {
  public static async createChatSocket(
    chatSocket: ChatSocketSerializer, beans: { chatSocketRepository: IChatSocketRepository }
  ): Promise<any> {
    return await beans.chatSocketRepository.save(chatSocket);
  }

  public static async getChatSocket(
    condition: any, beans: { chatSocketRepository: IChatSocketRepository }
  ): Promise<any> {
    return await beans.chatSocketRepository.findOne({
      where: condition,
      relations: ["account", "session"]
    });
  }

  public static async removeChatSocket(
    condition: any, beans: { chatSocketRepository: IChatSocketRepository }
  ): Promise<any> {
    return await beans.chatSocketRepository.delete(condition);
  }

  public static async doChat(message: { identityName: string; conversationId: number; },
                             socketId: number,
                             beans: {
                               messageRepository: IMessageRepository,
                               conversationRepository: IConversationRepository,
                               accountRepository: IAccountRepository,
                               chatManager: IChatManager,
                             }): Promise<any> {
    const { chatSocket, fromChatSocket } = await beans.chatManager.checkChatSocket(
      socketId,
      message.identityName,
      message.conversationId,
    );

    if (chatSocket) {
      const dto = plainToClass(MessageSerializer, message, { excludeExtraneousValues: true });
      const msg = await ConversationAppUseCases.sendMessage(
        dto,
        chatSocket.account.id,
        beans,
      );
      if (fromChatSocket) {
        return msg;
      }
    }

    return null;
  }

  public static async readMessage(
    conversationId: number,
    lastSeenId: number,
    socketId: number,
    beans: {
      chatSocketRepository: IChatSocketRepository,
      chatManager: IChatManager,
      messageRepository: IMessageRepository,
      conversationRepository: IConversationRepository,
    }
  ) {
    const chatSocket = await beans.chatSocketRepository.findOneOrFail({ where: { socketId } });
    await beans.chatManager.readMessage(conversationId, chatSocket.accountId, lastSeenId);
    const conversation = await ConversationAppUseCases.get(conversationId, null, beans);

    return {
      accountId: chatSocket.accountId,
      conversation,
    };
  }
}
