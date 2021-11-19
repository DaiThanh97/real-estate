import { IAccountRepository } from "../../../domain/repositories/IAccountRepository";
import { Account, EAccountType } from "../../../domain/models/Account";
import { auth } from "../../IoC/typeDi.config";
import * as uuid from "uuid";
import { logger } from "../../IoC/typeDiLogger.config";

export class NewRootAdmin {
  ACCOUNT_CODE = "admin";
  ACCOUNT_IDENTITY_NAME = "admin";
  ACCOUNT_DISPLAY_NAME = "admin";
  // TODO waiting update email & password
  FIREBASE_ROOT_ADMIN_EMAIL = "sonthepham@gmail.com";
  FIREBASE_ROOT_ADMIN_PASSWORD = "Pa$$Word@halato2020";

  constructor(private readonly accountRepository: IAccountRepository) {}

  async handler() {
    const isExistRootAccount = await this.isExistDatabaseRootAdmin();
    if (isExistRootAccount) {
      logger.info(`create root admin is exist with identity_name: ${this.ACCOUNT_IDENTITY_NAME}`);
      return;
    }
    logger.info(
      `start create root admin is with identity_name: ${this.ACCOUNT_IDENTITY_NAME} | firebase email: ${this.FIREBASE_ROOT_ADMIN_EMAIL} `,
    );
    const firebaseAccounCreated = await this.getOrCreateFirebaseRootAdmin();
    await this.createDatabaseRootAdmin(firebaseAccounCreated.uid);
  }

  async getOrCreateFirebaseRootAdmin(): Promise<{ uid: string; email?: string }> {
    // Check email is exist account in firebase,
    // if exist will don't create in firebase
    let userRecord = await auth.getUserByEmail(this.FIREBASE_ROOT_ADMIN_EMAIL);
    logger.debug(`response userRecord from firebase :${userRecord}`);
    if (!userRecord) {
      userRecord = await auth.createUser(this.FIREBASE_ROOT_ADMIN_EMAIL, this.FIREBASE_ROOT_ADMIN_PASSWORD);
    }
    return userRecord;
  }

  async isExistDatabaseRootAdmin(): Promise<boolean> {
    return !!(await this.accountRepository.findByIdentityName(this.ACCOUNT_IDENTITY_NAME));
  }

  async createDatabaseRootAdmin(connectedFirebaseAuthId: string): Promise<void> {
    const newId = uuid.v4();
    const now = new Date();
    const newAccount = Account.create(
      newId,
      {
        type: EAccountType.ADMIN,
        employeeId: null,
        collaboratorId: null,
        code: this.ACCOUNT_CODE,
        identityName: this.ACCOUNT_IDENTITY_NAME,
        displayName: this.ACCOUNT_DISPLAY_NAME,
        connectedFirebaseAuthId,
      },
      {
        isActive: true,
        accountAccountGroups: null,
      },
      null,
      now,
    );
    newAccount.code = this.ACCOUNT_CODE;
    newAccount.identityName = this.ACCOUNT_IDENTITY_NAME;
    newAccount.displayName = this.ACCOUNT_DISPLAY_NAME;
    newAccount.connectedFirebaseAuthId = connectedFirebaseAuthId;
    await this.accountRepository.create(newAccount);
  }
}
