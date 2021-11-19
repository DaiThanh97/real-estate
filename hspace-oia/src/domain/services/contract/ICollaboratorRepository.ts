export interface ICollaboratorRepository {
  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  findAndCount(options?: any): Promise<[any[], number]>;

  findOneOrFail(condition: any | number): Promise<any>;
}
