import { EntitySchema } from "typeorm";
import { BaseColumnSchemaPart } from "./Base";
import { IAccount } from "./Account";
import { ISession } from "./Session";

export interface IChatSocket {
  id: number;
  accountId: number;
  identityName: string;
  socketId: string;
  sessionId: number;
  updatedAt: Date;
  createdAt: Date;
  account: IAccount;
  session: ISession;
}

export const ChatSocket = new EntitySchema<IChatSocket>({
  name: "chat_socket",
  tableName: "chat_sockets",
  columns: {
    ...BaseColumnSchemaPart,
    accountId: {
      name: "account_id",
      type: Number,
      nullable: false,
    },
    identityName: {
      name: "identity_name",
      type: String,
      nullable: false,
    },
    socketId: {
      name: "socket_id",
      type: String,
      nullable: false,
    },
    sessionId: {
      name: "session_id",
      type: Number,
      nullable: false,
    },
  },
  relations: {
    account: {
      type: "many-to-one",
      target: "account",
      joinColumn: { name: "account_id", referencedColumnName: "id" }
    },
    session: {
      type: "many-to-one",
      target: "session",
      joinColumn: { name: "session_id", referencedColumnName: "id" }
    }
  },
  uniques: [
    {
      name: "UNIQUE_CHAT_SOCKET",
      columns: [
        "socketId",
      ]
    }
  ],
});
