export interface IEmployeeRepository {
  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findAndCount(options?: any): Promise<[any[], number]>;

  createQueryBuilder(name: string): any;

  findOneOrFail(condition: any | number): Promise<any>;
}
