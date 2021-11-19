import { IBaseRepository } from "./IBaseRepository";
import { UpdateResult } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { IProperty } from "../../../infrastructure/orm/typeorm/models/Property";

export interface IPropertyRepository extends IBaseRepository {
  getNoteList(propertyId: number): Promise<any>;

  update(
    propertyId: number,
    partialEntity: QueryDeepPartialEntity<IProperty>,
  ): Promise<UpdateResult>;
}
