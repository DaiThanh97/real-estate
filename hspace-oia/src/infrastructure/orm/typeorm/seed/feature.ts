import { QueryRunner } from "typeorm";
import _ from "lodash";
import { Feature, IFeature } from "../models/Feature";

export default class FeatureSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/features.json");
    const features = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<IFeature>[];
    const featureRepo = queryRunner.manager.getRepository(Feature);
    await featureRepo.save(features);
  };
}
