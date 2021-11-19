export interface IMessageRepository {
  find(conditions: any): Promise<any>;

  save(entity: any): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;

  createQueryBuilder(name: string): any;
}
