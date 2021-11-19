import { IAccount } from "./Account";
import { EntitySchema } from "typeorm";
import { AccountLogColumnSchemaPart, BaseColumnSchemaPart } from "./Base";
import { IParticipant } from "./Participant";
import { IMessage } from "./Message";

export interface IConversation {
  id: number;
  updatedAt: Date;
  createdAt: Date;
  createdBy: IAccount;
  updatedBy: IAccount;
  participants: IParticipant[];
  snapshot: string;
  lastMessage: IMessage;
  lastMessageId: number;
}


export const Conversation = new EntitySchema<IConversation>({
  name: "conversation",
  tableName: "conversations",
  columns: {
    ...BaseColumnSchemaPart,
    snapshot: {
      type: "varchar",
      default: "",
      name: "snapshot",
      length: 255,
    },
    lastMessageId: {
      type: "int",
      name: "last_message_id",
      nullable: true,
    }
  },
  relations: {
    ...AccountLogColumnSchemaPart,
    participants: {
      type: "one-to-many",
      target: "participant",
      inverseSide: "conversation",
      cascade: true,
      joinTable: true,
    },
    lastMessage: {
      type: "many-to-one",
      target: "message",
      joinColumn: { name: "last_message_id", referencedColumnName: "id" },
    }
  }
});
