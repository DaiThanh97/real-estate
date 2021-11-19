import {
  IAccountRepository,
  IChatManager,
  IConversationRepository,
  IMessageRepository
} from "../domain/services/contract";
import { Account } from "../domain/models/Account";
import { MessageSerializer } from "../interfaces/serializers/MessageSerializer";
import { PagingSerializer } from "../interfaces/serializers/PagingSerializer";
import { plainToClass } from "class-transformer";
import { QueryParticipantSerializer } from "../interfaces/serializers/ConversationSerializer";
import { Not, Raw } from "typeorm";

export default class ConversationAppUseCases {
  private static queryOptionDefault = {
    order: "DESC",
    take: 30,
    skip: 0,
    orderField: "createdAt",
  };

  public static async get(conversationId: number, queryOptions: PagingSerializer, beans: {
    messageRepository: IMessageRepository,
    conversationRepository: IConversationRepository,
  }) {
    if (!queryOptions) {
      queryOptions = plainToClass(
        PagingSerializer,
        ConversationAppUseCases.queryOptionDefault,
        { excludeExtraneousValues: true },
      );
    }
    const conversation = await beans.conversationRepository.findOneOrFail({
      where: { id: conversationId },
      relations: [
        "participants",
        "participants.account",
        "participants.lastSeen",
        "createdBy",
        "updatedBy",
        "lastMessage",
      ]
    });

    const order = {} as any;
    if (queryOptions.orderField) {
      order[queryOptions.orderField] = queryOptions.order;
    } else {
      order["createdAt"] = "DESC";
    }

    const messages = await beans.messageRepository.find({
      where: {
        conversationId,
        content: Not(""),
      },
      relations: ["createdBy", "updatedBy"],
      take: queryOptions.take || ConversationAppUseCases.queryOptionDefault.take,
      skip: queryOptions.skip || ConversationAppUseCases.queryOptionDefault.skip,
      order,
    });

    return {
      ...conversation,
      messages,
    };
  }

  public static async getOrCreate(accountId: number, account: Account, beans: {
    messageRepository: IMessageRepository,
    conversationRepository: IConversationRepository,
    accountRepository: IAccountRepository,
  }) {
    const accountIds = [account.id, accountId];
    let result = await beans.conversationRepository.getConversationByAccountIds(accountIds);

    if (!result) {
      const toAccount = await beans.accountRepository.findOneOrFail(accountId);
      let conversation = {
        participants: [{ accountId: account.id }, { accountId: toAccount.id }]
      };
      conversation = Account.addAuditInfo(conversation, account.id);
      result = await beans.conversationRepository.save(conversation);
    }

    return await this.get(result.id, null, beans);
  }

  public static async sendMessage(message: MessageSerializer, accountId: number, beans: {
    messageRepository: IMessageRepository,
    conversationRepository: IConversationRepository,
    accountRepository: IAccountRepository,
    chatManager: IChatManager,
  }): Promise<void> {
    const rv = await beans.chatManager.addNewMessage(message, accountId);

    return await beans.messageRepository.findOneOrFail({
      where: { id: rv.id },
      relations: [
        "createdBy",
        "updatedBy",
        "conversation",
        "conversation.participants",
        "conversation.participants.account",
        "conversation.participants.lastSeen",
        "conversation.createdBy",
        "conversation.updatedBy",
        "conversation.lastMessage",
      ]
    });
  }

  public static async getAll(queryOptions: QueryParticipantSerializer, account: Account, beans: {
    messageRepository: IMessageRepository,
    conversationRepository: IConversationRepository,
  }): Promise<any> {

    if (!queryOptions.orderField) {
      queryOptions.orderField = "updateAt";
    }
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await beans.conversationRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      relations: ["createdBy", "updatedBy", "participants", "lastMessage", "participants.account", "participants.lastSeen"],
      where: (qb: any) => {
        let subQuery = qb.subQuery()
          .select("participants.conversationId")
          .from("participants")
          .groupBy("participants.conversationId")
          .having(`Array_agg(participants.account_id) @> '{${account.id}}'`);
        if (queryOptions.unread !== null && queryOptions.unread !== undefined) {

          subQuery = subQuery.leftJoin("conversations", "conversations", "conversations.id = participants.conversationId")
            .addGroupBy("participants.lastSeenId")
            .addGroupBy("conversations.lastMessageId");
          let opt = "!=";
          if (queryOptions.unread === false) {
            opt = "=";
          }
          subQuery = subQuery.andHaving(`conversations.lastMessageId ${opt} participants.lastSeenId`);
        }
        subQuery = subQuery.getQuery();
        qb.where({
          id: Raw((alias: any) => `${alias} IN ${subQuery}`)
        });
      },
    }) as [Readonly<any[]>, number];

    return {
      data: result,
      total,
    };
  }
}
