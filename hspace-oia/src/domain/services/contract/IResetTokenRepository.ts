export interface IResetTokenRepository {
 
  save(entity: any): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;

  update(value: any, condition: any): Promise<any>;

  createQueryBuilder(name: string): any;

  findAndCount(options?: any): Promise<[any[], number]>;

}
