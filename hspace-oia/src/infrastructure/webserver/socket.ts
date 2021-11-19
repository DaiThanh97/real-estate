import * as Hapi from "@hapi/hapi";
import logger from "../logger";
import { registerEvents } from "../../interfaces/socket/register";
import RootRoute from "../../interfaces/rest_api/root";
import * as _ from "underscore";
import { getConnection, In } from "typeorm";
import ChatAppUseCases from "../../application/ChatAppUseCases";
import Beans from "../config/beans";
import { EVENT } from "../config/constants/event";
import { NotificationController } from "../../interfaces/socket/controllers/notification";

const getSocketConfig = () => {
  let socketTransports = ["websocket"];
  if (process.env.SOCKET_TRANSPORTS) {
    logger.info(`Load socket transports from env: ${process.env.SOCKET_TRANSPORTS}`);
    socketTransports = process.env.SOCKET_TRANSPORTS.split(",");
  }

  const config = {
    path: "/socket.io",
    transports: socketTransports,
  } as any;
  if (process.env.SOCKET_SECURE === String(true)) {
    config.secure = true;
  }

  return config;
};

export default class Socket {
  private static _instance: Hapi.Server;
  private static io: any;

  public static async start(beans: Beans): Promise<Hapi.Server> {
    try {
      process.env.SOCKET = String(false);
      Socket._instance = new Hapi.Server({
        port: process.env.SOCKER_PORT,
        debug: {
          log: ["*"],
          request: ["*"]
        },
      });

      const socketConfig = getSocketConfig();
      const io = require("socket.io")(Socket._instance.listener, socketConfig);
      this.io = io;
      _.each(io.nsps, (nsp: any) => {
        nsp.on("connect", (socket: any) => {
          if (!socket.auth) {
            delete nsp.connected[socket.id];
          }
        });
      });

      (Socket._instance.app as any).serviceLocator = beans;

      io.on("connection", (socket: any) => {
        socket.removeAllListeners();
        registerEvents(io, socket, beans);

        setTimeout(async () => {
          if (!socket.auth) {
            logger.info(`Disconnecting socket: ${socket.id}`);
            await socket.disconnect("Unauthorized");
          }
        }, 5000);
      });

      await new RootRoute(["api", "root"]).register(Socket._instance);

      Socket.addEventListener();
      await Socket._instance.start();

      return Socket._instance;
    } catch (error) {
      logger.info(`Socket - There was something wrong: ${error}`);
      throw error;
    }
  }

  public static async stop(): Promise<Error | void> {
    logger.info("Socket - Stopping execution");
    const connectedSockets: any = Object.values(Socket.io.of("/").connected);
    const beans = (Socket._instance.app as any).serviceLocator;
    const socketIds = connectedSockets.map((el: { id: any; }) => el.id);
    await ChatAppUseCases.removeChatSocket({ socketId: In(socketIds) }, beans);
    const connection = await getConnection();
    await connection.close();

    return await Socket._instance.stop();
  }

  public static addEventListener() {
    const beans = (Socket._instance.app as any).serviceLocator;
    const controller = new NotificationController(Socket.io, beans);
    beans.eventEmitter.on(EVENT.SEND_NOTIFICATION, (notificationId: number) => {
      return controller.sendNotification({ notificationId });
    });
  }
}
