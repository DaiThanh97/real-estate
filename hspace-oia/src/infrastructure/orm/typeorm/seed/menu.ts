import { QueryRunner } from "typeorm";
import _ from "lodash";
import { Menu, IMenu } from "../models/Menu";

export default class MenuSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/menus.json");
    const menus = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<IMenu>[];
    const menuRepo = queryRunner.manager.getRepository(Menu);
    await menuRepo.save(menus);
  };
}
