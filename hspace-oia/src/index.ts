import connectDatabase from "./infrastructure/orm/typeorm";
import logger from "./infrastructure/logger";
import Server from "./infrastructure/webserver/server";
import Socket from "./infrastructure/webserver/socket";
import buildBeans from "./infrastructure/config/service-locator";
import { QueryRunner } from "typeorm";

(async () => {
  const conn = await connectDatabase();
  const queryRunner: QueryRunner = conn.createQueryRunner();
  await queryRunner.query("truncate table chat_sockets restart identity;");
  const beans = await buildBeans();
  await Server.start(beans);
  await Socket.start(beans);
  if (process.env.NODE_ENV === "development" && process.env.SWAGGER_FILE_GENERATION === "true") {
    await Server.generateSwaggerFile();
  }
})();

process.on("SIGINT", async () => {
  logger.info("Stopping hapi server");

  const err = await Server.stop();
  const errSocket = await Socket.stop();
  if (err) {
    logger.info(err);
  }
  if (errSocket) {
    logger.info(errSocket);
  }
  logger.info("Server stopped");
  logger.info("Socket stopped");
  process.exit(err ? 1 : 0);
});
