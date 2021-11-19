import { Connection, QueryRunner } from "typeorm";
import ResourceSeed from "../orm/typeorm/seed/resource";
import * as process from "process";
import * as yargs from "yargs";
import chalk from "chalk";
import FeatureSeed from "../orm/typeorm/seed/feature";
import NotificationTemplateSeed from "../orm/typeorm/seed/notificationTemplate";
import MenuSeed from "../orm/typeorm/seed/menu";
import { getConnectionWithArgs } from "../orm/typeorm";
import PolicySeed from "../orm/typeorm/seed/policy";
import EndpointPermissionSeed from "../orm/typeorm/seed/endpointPermission";
import SystemConfigSeed from "../orm/typeorm/seed/systemConfig";
import ActivityTemplateSeed from "../orm/typeorm/seed/activityTemplate";
import DefaultAccountSettingSeed from "../orm/typeorm/seed/defaultAccountSetting";

/**
 * Runs seed command.
 */
export class SeedRunCommand implements yargs.CommandModule {
  command = "seed";
  describe = "Seed data";
  aliases = "seed";

  builder(args: yargs.Argv) {
    return args
      .option("connection", {
        alias: "c",
        default: "default",
        describe: "Name of the connection on which run a query.",
      })
      .option("config", {
        alias: "f",
        default: "ormconfig",
        describe: "Name of the file with connection configuration.",
      })
      .option("model", {
        alias: "m",
        describe: `Name of the model:
        - resource: Resource model
        - feature: Feature model
        - menu: Menu model
        - notification_template\n
        - activity_template\n
        - default_account_setting\n
        Example: -m resource`,
        demand: true,
        type: "string",
      });
  }

  async handler(args: yargs.Arguments) {
    let connection: Connection | undefined;
    try {
      connection = await getConnectionWithArgs(args);
      const queryRunner: QueryRunner = connection.createQueryRunner();
      switch (args.m) {
        case "resource": {
          await ResourceSeed.run(queryRunner);
          break;
        }
        case "feature": {
          await FeatureSeed.run(queryRunner);
          break;
        }
        case "notification_template": {
          await NotificationTemplateSeed.run(queryRunner);
          break;
        }
        case "activity_template": {
          await ActivityTemplateSeed.run(queryRunner);
          break;
        }
        case "menu": {
          await MenuSeed.run(queryRunner);
          break;
        }
        case "policy": {
          await PolicySeed.run(queryRunner);
          break;
        }
        case "endpoint_permission": {
          await EndpointPermissionSeed.run(queryRunner);
          break;
        }
        case "system_config": {
          await SystemConfigSeed.run(queryRunner);
          break;
        }
        case "default_account_setting": {
          await DefaultAccountSettingSeed.run(queryRunner);
          break;
        }
        default: {
          console.log(chalk.black.bgRed(`The model ${args.m} is not exist.`));
        }
      }

      await connection.close();
      // exit process if no errors
      process.exit(0);
    } catch (err) {
      if (connection) await (connection as Connection).close();

      console.log(chalk.black.bgRed("Error during seed run:"));
      console.error(err);
      process.exit(1);
    }
  }
}
