import events from "./events";
import { ChatController } from "./controllers/chat";
import Beans from "../../infrastructure/config/beans";
import { AuthController } from "./controllers/auth";
import logger from "../../infrastructure/logger";

export const registerEvents = (io: any, socket: any, beans: Beans) => {
  const chatController = new ChatController(io, socket, beans);
  const authController = new AuthController(io, socket, beans);

  socket.on(events.Authenticate, authController.authenticate);

  socket.on(events.ChatMessage, chatController.chatMessage);

  socket.on(events.ReadMessage, chatController.readMessage);

  socket.on(events.Disconnect, chatController.disconnect);

  socket.on(events.Error, (error: any) => {
    logger.error("Socket error ", error);
  });
};
