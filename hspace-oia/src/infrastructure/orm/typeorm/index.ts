import { Connection, ConnectionOptionsReader, createConnection } from "typeorm";
import * as yargs from "yargs";
import process from "process";

export default async function (): Promise<Connection> {
  return await createConnection();
}

export async function getConnectionWithArgs(args: yargs.Arguments) {
  const connectionOptionsReader = new ConnectionOptionsReader({
    root: process.cwd(),
    configName: args.config as any
  });
  const connectionOptions = await connectionOptionsReader.get(args.connection as any);
  Object.assign(connectionOptions, {
    subscribers: [],
    synchronize: false,
    migrationsRun: false,
    dropSchema: false,
    logging: ["query", "error", "schema"]
  });

  return await createConnection(connectionOptions);
}
