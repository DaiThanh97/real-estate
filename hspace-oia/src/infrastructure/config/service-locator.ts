import "reflect-metadata";
import AccessTokenManager from "../security/AccessTokenManager";
import PasswordManager from "../security/PasswordManager";
import { getManager } from "typeorm";
import Beans from "./beans";
import AWS from "aws-sdk";
import { AccountManager } from "../../domain/services/AccountManager";
import { S3Service } from "../service/S3Service";
import { IBucketOptions } from "../service/contract/IAWSService";
import casbinAdapter from "../orm/typeorm/adapters/casbin";
import { SESService } from "../service/SESService";
import { TokenManager } from "../../domain/services/TokenManager";
import { ChatManager } from "../../domain/services/ChatManager";
import { Container } from "typedi";
import { customRepositories, defaultRepositories } from "./repositories";
import services from "./services";
import { FCMNotificationService } from "../service/FCMNotificationService";
import { EntityManager } from "typeorm/entity-manager/EntityManager";

AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION,
});

const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const ses = new AWS.SES({ apiVersion: "2010-12-01" });
const s3Options: IBucketOptions = {
  partSize: +process.env.FILE_MAX_LIMIT_UPLOAD_SIZE,
  queueSize: 1,
};

export default async (manager?: EntityManager): Promise<Beans> => {
  if (!manager) {
    manager = getManager();
  }
  for (const repo of defaultRepositories) {
    Container.set(repo.token, manager.getRepository(repo.entity));
  }
  for (const repo of customRepositories) {
    Container.set(repo.token, manager.getCustomRepository(repo.customRepository));
  }
  Container.import(services);
  const beans = Container.get(Beans);

  if(!beans.enforcer) {
    beans.enforcer = await casbinAdapter(beans.policyManager);
  }

  beans.passwordManager = new PasswordManager();
  beans.accessTokenManager = new AccessTokenManager();

  beans.fileManager = new S3Service(
    s3,
    process.env.AWS_S3_BUCKET_NAME,
    s3Options
  );
  beans.emailService = new SESService(ses, process.env.AWS_SES_SENDER);
  beans.fcmNotificationService = new FCMNotificationService();
  beans.accountManager = new AccountManager(
    beans.passwordManager,
    beans.emailService,
    beans.employeeRepository,
    beans.collaboratorRepository,
    beans.accountRepository,
    beans.resetTokenRepository,
    beans.accountSettingRepository,
    beans.defaultAccountSettingRepository,
  );
  beans.tokenManager = new TokenManager(
    beans.accountRepository,
    beans.sessionRepository
  );

  beans.chatManager = new ChatManager(
    beans.messageRepository,
    beans.conversationRepository,
    beans.chatSocketRepository,
    beans.accountRepository,
    beans.participantRepository
  );

  return beans;
};
