export interface IFeatureRepository {
  save(entity: any): Promise<any>;

  find(conditions: any): Promise<any>;

  findOne(condition: any | number): Promise<any>;
}
