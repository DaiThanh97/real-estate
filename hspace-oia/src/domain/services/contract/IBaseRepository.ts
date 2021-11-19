import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  InsertResult,
  QueryRunner,
  RemoveOptions,
  SaveOptions,
  SelectQueryBuilder,
  UpdateResult
} from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";

export interface IBaseRepository {
  insert(entity: QueryDeepPartialEntity<unknown> | (QueryDeepPartialEntity<unknown>[])): Promise<InsertResult>;

  find(optionsOrConditions?: FindManyOptions<unknown> | FindConditions<unknown>): Promise<any[]>

  save(entityOrEntities: any, options?: SaveOptions): Promise<any>;

  findOne(
    optionsOrConditions?: number | FindOneOptions<unknown> | FindConditions<unknown>,
    maybeOptions?: FindOneOptions<unknown>,
  ): Promise<any | undefined>;

  findAndCount(optionsOrConditions?: FindManyOptions<unknown> | FindConditions<unknown>): Promise<[any[], number]>;

  findOneOrFail(condition: number | FindOneOptions<unknown> | FindConditions<unknown>): Promise<any>;

  delete(
    criteria: number | number[] | FindConditions<unknown>
  ): Promise<DeleteResult>;

  remove(entityOrEntities: any, options?: RemoveOptions): Promise<any>;

  createQueryBuilder(alias?: string, queryRunner?: QueryRunner): SelectQueryBuilder<unknown>;

  update(
    criteria: number | number[] | FindConditions<unknown>,
    partialEntity: QueryDeepPartialEntity<unknown>,
  ): Promise<UpdateResult>;
}
