export interface IAccountGroupRepository {
  find(conditions?: any): Promise<any>;

  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;

  findAndCount(options: any): Promise<any>;

  update(id: number, columns: any): Promise<any>;
}
