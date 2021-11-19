export interface IMenuRepository {
  save(entity: any): Promise<any>;

  find(conditions: any): Promise<any>;

  findAndCount(options: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;
}
