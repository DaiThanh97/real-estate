import { QueryRunner } from "typeorm";
import _ from "lodash";
import { ISystemConfig, SystemConfig } from "../models/SystemConfig";

export default class SystemConfigSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/system_config.json");
    const features = _.map(jsonData, (el) => {
      return {
        ..._.mapKeys(el, (_value, key) => _.camelCase(key)),
        data: JSON.parse(el.data),
      };
    }) as Readonly<ISystemConfig>[];
    const repo = queryRunner.manager.getRepository(SystemConfig);
    await repo.save(features);
  };
}
