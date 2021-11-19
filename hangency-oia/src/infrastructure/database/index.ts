import { Connection, createConnection } from "typeorm";

export default async function createDbConnection(): Promise<Connection> {
  return await createConnection();
}
