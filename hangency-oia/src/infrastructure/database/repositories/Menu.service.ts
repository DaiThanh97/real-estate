import { Service } from "typedi";

import { BaseRepository } from "./BaseRepository";
import { TransformMenu } from "./transforms/menu/TransformMenu";
import { IMenuRepository } from "../../../domain/repositories/IMenuRepository";
import { Menu } from "../../../domain/models/Menu";
import { MenuEntity } from "../../orm/typeorm/models/MenuEntity";
import { TYPES } from "../../IoC/types";
import { Repository as TypeORMRepo } from "typeorm/repository/Repository";
import { dBConnectionHolder } from "../../IoC/typeDi.config";

@Service({ id: TYPES.menuRepository })
export class MenuRepository extends BaseRepository<Menu, MenuEntity> implements IMenuRepository {
  constructor() {
    super();
  }
  async findById(id: string): Promise<Menu | undefined> {
    const repo = this.getTypeORMRepository();
    const result = await repo.findOne({
      where: {
        id,
      },
    });
    return result ? this.transformEntityToDomain(result) : undefined;
  }

  transformUpdateEntityFromDomain(d: Menu): Partial<MenuEntity> {
    return TransformMenu.transformUpdateEntityFromDomain(d);
  }
  transformEntityToDomain(e: MenuEntity): Menu {
    return TransformMenu.transformEntityToDomain(e);
  }
  transformCreateEntityFromDomain(d: Menu): MenuEntity {
    return TransformMenu.transformCreateEntityFromDomain(d);
  }

  getTypeORMRepository(): TypeORMRepo<MenuEntity> {
    const db = dBConnectionHolder.getInstance();
    return db.getRepository(MenuEntity);
  }
}
