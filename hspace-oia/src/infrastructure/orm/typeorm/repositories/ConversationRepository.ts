import { EntityRepository, Repository } from "typeorm";
import { Conversation } from "../models/Conversation";
import { IConversationRepository } from "../../../../domain/services/contract";

@EntityRepository(Conversation)
export class ConversationRepository extends Repository<any> implements IConversationRepository {
  async getConversationByAccountIds(accountIds: number[]) {
    const ids = accountIds.toString();
    return this.createQueryBuilder("c")
      .select("c.*")
      .addSelect("Array_agg(account_id)", "accountIds")
      .leftJoin("participants", "p", "c.id = p.conversationId")
      .groupBy("c.id")
      .having(`Array_agg(account_id) @> '{${ids}}' AND Array_agg(account_id) <@ '{${ids}}'`)
      .limit(1)
      .getRawOne();
  }
}
