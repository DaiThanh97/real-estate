import { QueryRunner } from "typeorm";
import PasswordManager from "../../security/PasswordManager";
import { EAccountType } from "../../../domain/models/Account";
import { Account } from "./models/Account";


export default class MigrationData {
  public static addDefaultAdmin = async (queryRunner: QueryRunner) => {
    const passwordManager = new PasswordManager();
    const hash = await passwordManager.hashPassword("Pa$$Word@halato2020");

    await queryRunner.manager.insert(Account, {
      type: EAccountType.ADMIN,
      employeeId: null,
      collaboratorId: null,
      identityName: "admin",
      hash,
      code: "admin",
      displayName: "admin",
      isActive: true,
      lastLoginAt: null,
      createdBy: null,
      updatedBy: null,
    });
  };

  public static removeDefaultAdmin = async (queryRunner: QueryRunner) => {
    await queryRunner.manager.delete(Account, { identityName: "admin" });
  };
}
