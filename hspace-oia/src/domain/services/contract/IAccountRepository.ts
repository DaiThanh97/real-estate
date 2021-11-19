export interface IAccountRepository {
  insert(entity: any): Promise<any>;

  find(conditions: any): Promise<any>;

  save(entity: any): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findAndCount(options: any): Promise<any>;

  createQueryBuilder(name: string): any;

  update(id: number, columns: any): Promise<any>;
}
