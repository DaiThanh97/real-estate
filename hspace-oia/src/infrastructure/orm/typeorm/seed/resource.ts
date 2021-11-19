import { QueryRunner } from "typeorm";
import _ from "lodash";
import { IResource, Resource } from "../models/Resource";

export default class ResourceSeed {
  public static async run(queryRunner: QueryRunner) {
    const jsonData = require("./data/resources.json");
    const resources = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<IResource>[];
    const resourceRepo = queryRunner.manager.getRepository(Resource);
    await resourceRepo.save(resources);
  }
}
