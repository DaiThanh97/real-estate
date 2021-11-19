import { QueryRunner } from "typeorm";
import _ from "lodash";
import { ActivityTemplate, IActivityTemplate } from "../models/ActivityTemplate";

export default class ActivityTemplateSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/activity_templates.json");
    const templates = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<IActivityTemplate>[];
    const repo = queryRunner.manager.getRepository(ActivityTemplate);
    await repo.save(templates);
  };
}
