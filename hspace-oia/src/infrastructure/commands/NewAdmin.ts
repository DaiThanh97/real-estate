import * as yargs from "yargs";
import { Connection, QueryRunner } from "typeorm";
import chalk from "chalk";
import process from "process";
import PasswordManager from "../security/PasswordManager";
import { Account } from "../orm/typeorm/models/Account";
import { EAccountType } from "../../domain/models/Account";
import { getConnectionWithArgs } from "../orm/typeorm";

/**
 * Create new admin command.
 */
export class NewAdminRunCommand implements yargs.CommandModule {
  command = "create_admin";
  describe = "Create new admin account command";
  aliases = "admin";

  builder(args: yargs.Argv) {
    return args
      .option("connection", {
        alias: "c",
        default: "default",
        describe: "Name of the connection on which run a query."
      })
      .option("config", {
        alias: "f",
        default: "ormconfig",
        describe: "Name of the file with connection configuration."
      })
      .option("name", {
        alias: "n",
        demand: true,
        describe: "Name of the new admin account."
      })
      .option("password", {
        alias: "p",
        demand: true,
        describe: "Password of the new admin account.",
        type: "string",
      });
  }

  async handler(args: yargs.Arguments) {
    let connection: Connection | undefined;
    try {
      connection = await getConnectionWithArgs(args);
      const queryRunner: QueryRunner = connection.createQueryRunner();

      const name = args.n as string;
      const result = await queryRunner.manager.findOne(Account, { identityName: name });
      if (result) {
        console.log(chalk.black.bgRed("This account already exists!"));
      } else {
        const password = args.p as string;
        const passwordManager = new PasswordManager();
        const hash = await passwordManager.hashPassword(password);

        await queryRunner.manager.insert(Account, {
          type: EAccountType.ADMIN,
          employeeId: null,
          collaboratorId: null,
          identityName: name,
          hash,
          code: name,
          displayName: name,
          isActive: true,
          lastLoginAt: null,
          createdBy: null,
          updatedBy: null,
        });
      }

      await connection.close();
      // exit process if no errors
      process.exit(0);

    } catch (err) {
      if (connection) await (connection as Connection).close();

      console.log(chalk.black.bgRed("Error:"));
      console.error(err);
      process.exit(1);
    }
  }
}
