import { QueryRunner } from "typeorm";
import _ from "lodash";
import { EndpointPermission, IEndpointPermission } from "../models/EndpointPermission";

export default class EndpointPermissionSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/endpoint_permissions.json");
    const endpointPermissions = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<IEndpointPermission>[];
    const repo = queryRunner.manager.getRepository(EndpointPermission);
    await repo.save(endpointPermissions);
  };
}
