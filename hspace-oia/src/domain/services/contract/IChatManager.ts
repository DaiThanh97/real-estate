import { MessageSerializer } from "../../../interfaces/serializers/MessageSerializer";
import { PropertySerializer } from "../../../interfaces/serializers/PropertySerializer";

export interface IChatManager {
  addNewMessage(message: MessageSerializer, accountId: number): Promise<PropertySerializer>;

  checkChatSocket(socketId: number, identityName: string, conversationId: number): Promise<any>;

  readMessage(conversationId: number, accountId: number, lastSeenId: number): Promise<any>;
}
