export interface IChatSocketRepository {
  save(entity: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;

  delete(condition: any): Promise<any>;

  findOneOrFail(condition: any | number): Promise<any>;
}
