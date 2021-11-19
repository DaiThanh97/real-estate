import { createConnection, Connection } from "typeorm";
import { Service } from "typedi";
import { IDatabaseConnectionHolder } from "./IDatabaseConnectionHolder";

@Service()
export class TypeOrmDBConnectionHolder implements IDatabaseConnectionHolder<Connection> {
  private databaseClient: Connection | null = null;

  async initialize(): Promise<void> {
    if (this.databaseClient !== null) return;

    this.databaseClient = await this.generateConnection();
  }

  private async generateConnection(): Promise<Connection> {
    const result = await createConnection();
    return result;
  }

  getInstance(): Connection {
    // throw error when we have no prisma client after initialization.
    if (this.databaseClient === null) {
      throw new Error("Please call initialize() once before calling this method if you can.");
    }

    return this.databaseClient;
  }

  async close() {
    // do nothing when we have no Prisma instance.
    if (this.databaseClient === null) return;
    await this.databaseClient.close();
    this.databaseClient = null;
  }
}
