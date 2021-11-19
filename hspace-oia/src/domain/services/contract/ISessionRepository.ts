export interface ISessionRepository {
  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;
}
