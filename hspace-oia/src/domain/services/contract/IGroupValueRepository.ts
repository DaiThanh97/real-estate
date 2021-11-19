export interface IGroupValueRepository {
  insert(entity: any): Promise<any>;

  find(conditions: any): Promise<any>;

  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findAndCount(options?: any): Promise<[any[], number]>;

  findOneOrFail(options?: any): Promise<any>;

  remove(options?: any): Promise<any>;
}
