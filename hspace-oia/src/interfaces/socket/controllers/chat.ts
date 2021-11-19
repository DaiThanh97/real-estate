import events from "../events";
import logger from "../../../infrastructure/logger";
import { BaseController } from "./base";
import ChatAppUseCases from "../../../application/ChatAppUseCases";
import { plainToClass } from "class-transformer";
import { MessageSerializer } from "../../serializers/MessageSerializer";
import { ConversationSerializer } from "../../serializers/ConversationSerializer";
import { chatMessageRequestSchema, readMessageRequestSchema } from "../../schemas/chat";


export class ChatController extends BaseController {
  public chatMessage = async (message: { content: string, identityName: string, conversationId: number }) => {
    try {
      logger.info("Chat message", message);
      const { error, value } = chatMessageRequestSchema.validate(message);
      if (error) {
        return this.handleValidationError(error);
      }
      const msg = await ChatAppUseCases.doChat(value, this.socket.id, this.beans);

      if (msg) {
        const rv = plainToClass(MessageSerializer, msg, { excludeExtraneousValues: true });
        const conversation = plainToClass(ConversationSerializer, msg.conversation, { excludeExtraneousValues: true });
        this.io.to(value.identityName).emit(events.Message, {
          ...rv,
          conversation,
          to: value.identityName,
          socketId: this.socket.id,
        });
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  public readMessage = async (data: { conversationId: number, lastSeenId: number }) => {
    try {
      const { error, value } = readMessageRequestSchema.validate(data);
      if (error) {
        return this.handleValidationError(error);
      }

      const { accountId, conversation } = await ChatAppUseCases.readMessage(
        value.conversationId,
        value.lastSeenId,
        this.socket.id,
        this.beans
      ) as any;
      if (conversation) {
        let identityName = conversation.participants[0].account.identityName;
        if (conversation.participants[0].id === accountId) {
          identityName = conversation.participants[1].account.identityName;
        }
        const rv = plainToClass(ConversationSerializer, conversation, { excludeExtraneousValues: true });
        this.io.to(identityName).emit(events.Conversation, rv);
        this.socket.emit(events.Conversation, rv);
      }
    } catch (err) {
      this.handleError(err);
    }
  };

  public disconnect = async () => {
    await ChatAppUseCases.removeChatSocket({ socketId: this.socket.id }, this.beans);
  };
}
