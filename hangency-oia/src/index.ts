import Server from "./infrastructure/webserver/server";
import { logger } from "./infrastructure/IoC/typeDiLogger.config";
import { dBConnectionHolder, authConnectionHolder, fileConnectionHolder } from "./infrastructure/IoC/typeDi.config";
import loadEnv from "./infrastructure/config/environment";
import AWS from "aws-sdk";

(async () => {
  loadEnv();
  AWS.config.update({
    region: process.env.AWS_DEFAULT_REGION,
  });
  await logger.initialize();
  await dBConnectionHolder.initialize();
  await authConnectionHolder.initialize();
  await fileConnectionHolder.initialize();
  await Server.start();
  if (process.env.NODE_ENV === "development" && process.env.SWAGGER_FILE_GENERATION === "true") {
    await Server.generateSwaggerFile();
  }
})();

process.on("SIGINT", async () => {
  logger.info("Stopping hapi server");

  const err = await Server.stop();
  if (err) {
    logger.error("error", err);
  }
  logger.info("Server stopped");
  process.exit(err ? 1 : 0);
});
