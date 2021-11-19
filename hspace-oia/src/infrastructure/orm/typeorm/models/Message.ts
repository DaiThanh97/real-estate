import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { IConversation } from "./Conversation";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";

export const MessageStatus = {
  Sent: "Sent",
  Seen: "Seen",
};

export interface IMessage {
  id: number;
  content: string;
  conversationId: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  status: string;
  conversation: IConversation;
}


export const Message = new EntitySchema<IMessage>({
  name: "message",
  tableName: "messages",
  columns: {
    ...BaseColumnSchemaPart,
    content: {
      type: "text",
      name: "content",
      nullable: false,
    },
    status: {
      type: "varchar",
      name: "status",
      nullable: false,
      length: 20,
      default: MessageStatus.Sent,
    },
    conversationId: {
      type: Number,
      name: "conversation_id",
      nullable: false,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    conversation: {
      type: "many-to-one",
      target: "conversation",
      joinColumn: { name: "conversation_id", referencedColumnName: "id" },
      nullable: false,
    }
  }
});
