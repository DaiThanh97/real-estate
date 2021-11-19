import {
  IAccountRepository,
  IChatManager,
  IChatSocketRepository,
  IConversationRepository,
  IMessageRepository,
  IParticipantRepository
} from "./contract";
import { MessageSerializer } from "../../interfaces/serializers/MessageSerializer";
import { Account } from "../models/Account";
import { PropertySerializer } from "../../interfaces/serializers/PropertySerializer";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass } from "class-transformer";
import { ChatSocketSerializer } from "../../interfaces/serializers/ChatSerializer";
import { Message, MessageStatus } from "../../infrastructure/orm/typeorm/models/Message";

export class ChatManager implements IChatManager {
  constructor(
    private messageRepository: IMessageRepository,
    private conversationRepository: IConversationRepository,
    private chatSocketRepository: IChatSocketRepository,
    private accountRepository: IAccountRepository,
    private participantRepository: IParticipantRepository,
  ) {
  }

  public async addNewMessage(message: MessageSerializer, accountId: number): Promise<PropertySerializer> {
    if (!message.content) {
      throw new BadRequestError("Invalid conversation", ErrorCode.Chat.InvalidMessageContent);
    }
    const conservation = await this.conversationRepository.findOneOrFail({
      where: { id: message.conversationId },
      relations: ["participants"]
    });
    if (conservation.participants.length !== 2) {
      throw new BadRequestError("Invalid conversation", ErrorCode.Chat.InvalidConversation);
    }

    if (conservation.participants.length === 2 &&
      conservation.participants[0].accountId !== accountId && conservation.participants[1].accountId !== accountId) {
      throw new BadRequestError("Invalid account", ErrorCode.Chat.InvalidAccount);
    }

    const msg = Account.addAuditInfo(message, accountId);
    const rv = await this.messageRepository.save(msg);
    await this.conversationRepository.update(conservation.id, {
      snapshot: rv.content.substring(0, 50),
      lastMessageId: rv.id,
      updatedBy: accountId,
    });
    await this.readMessage(conservation.id, accountId, rv.id);

    return rv;
  }

  public async checkChatSocket(socketId: number, identityName: string, conversationId: number): Promise<any> {
    const findCurrentResult = await this.chatSocketRepository.findOneOrFail({
      where: { socketId },
      relations: ["account", "session"]
    });

    const chatSocket = plainToClass(ChatSocketSerializer, findCurrentResult);
    const fromAccount = await this.accountRepository.findOneOrFail({ where: { identityName } });
    const accountIds = [chatSocket.account.id, fromAccount.id];
    const conversation = await this.conversationRepository.getConversationByAccountIds(accountIds);
    if (!conversation || conversation.id !== conversationId) {
      throw new BadRequestError("Invalid conversation", ErrorCode.Chat.InvalidConversation);
    }

    const findResult = await this.chatSocketRepository.findOne({
      where: { identityName },
      relations: ["account", "session"]
    });
    const fromChatSocket = plainToClass(ChatSocketSerializer, findResult);

    return {
      chatSocket,
      fromChatSocket,
    };
  }

  public async readMessage(conversationId: number, accountId: number, lastSeenId: number): Promise<any> {
    const participant: any = await this.participantRepository.findOneOrFail({
      where: {
        conversationId,
        accountId,
      },
      relations: ["lastSeen"]
    });
    const message = await this.messageRepository.findOneOrFail({
      where: {
        id: lastSeenId,
        conversationId,
      }
    });
    if (!participant.lastSeen || participant.lastSeen.createdAt < message.createdAt) {
      await this.participantRepository.update(participant.id, { lastSeenId });
      await this.messageRepository
        .createQueryBuilder("message")
        .update(Message)
        .set({ status: MessageStatus.Seen, updatedBy: accountId })
        .where("createdAt <= :createdAt", { createdAt: message.createdAt })
        .andWhere("conversationId = :conversationId", { conversationId })
        .andWhere("createdBy != :createdBy", { createdBy: accountId })
        .execute();
    }
  }
}
