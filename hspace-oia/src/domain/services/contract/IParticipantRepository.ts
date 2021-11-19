export interface IParticipantRepository {
  findOneOrFail(condition: any | number): Promise<any>;

  save(entity: any): Promise<any>;

  update(id: number, columns: any): Promise<any>;
}
