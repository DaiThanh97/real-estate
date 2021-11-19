import { QueryRunner } from "typeorm";
import _ from "lodash";
import { CasbinRule, ICasbinRule } from "../models/CasbinRule";

export default class PolicySeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/policies.json");
    const policies = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<ICasbinRule>[];
    const repo = queryRunner.manager.getRepository(CasbinRule);
    await repo.save(policies);
  };
}
