export interface IMasterValueRepository {
  insert(entity: any): Promise<any>;

  find(conditions?: any): Promise<any>;

  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findAndCount(options?: any): Promise<[any[], number]>;

  findOneOrFail(condition: any | number): Promise<any>;

  findUsedItems(): Promise<any>;

  createQueryBuilder(name: string): any;
}
