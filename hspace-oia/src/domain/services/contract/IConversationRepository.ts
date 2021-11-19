export interface IConversationRepository {
  find(conditions: any): Promise<any>;

  save(entity: any): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;

  createQueryBuilder(name: string): any;

  findAndCount(options?: any): Promise<[any[], number]>;

  getConversationByAccountIds(accountIds: number[]): Promise<any>;

  update(id: number, columns: any): Promise<any>;
}
