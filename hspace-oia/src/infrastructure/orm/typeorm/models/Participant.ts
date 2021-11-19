import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { IConversation } from "./Conversation";
import { BaseColumnSchemaPart } from "./Base";
import { IMessage } from "./Message";

export interface IParticipant {
  id: number;
  conversationId: number;
  accountId: number;
  lastSeenId: number;
  lastSeen: IMessage;
  account: IAccount;
  conversation: IConversation;
  createdAt: Date;
  updatedAt: Date;
}

export const Participant = new EntitySchema<IParticipant>({
  name: "participant",
  tableName: "participants",
  columns: {
    ...BaseColumnSchemaPart,
    conversationId: {
      type: Number,
      name: "conversation_id",
      nullable: false,
    },
    accountId: {
      type: Number,
      name: "account_id",
      nullable: false,
    },
    lastSeenId: {
      type: Number,
      name: "last_seen_id",
      nullable: true,
    }
  },
  relations: {
    conversation: {
      type: "many-to-one",
      target: "conversation",
      inverseSide: "participants",
      joinColumn: { name: "conversation_id", referencedColumnName: "id" },
    },
    account: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "account_id", referencedColumnName: "id" },
    },
    lastSeen: {
      type: "many-to-one",
      target: "message",
      joinColumn: { name: "last_seen_id", referencedColumnName: "id" },
    }
  }
});
