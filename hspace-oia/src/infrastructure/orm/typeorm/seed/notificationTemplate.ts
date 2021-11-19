import { QueryRunner } from "typeorm";
import _ from "lodash";
import { INotificationTemplate, NotificationTemplate } from "../models/NotificatonTemplate";

export default class NotificationTemplateSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/notification_templates.json");
    const templates = _.map(jsonData, (el) => {
      return _.mapKeys(el, (_value, key) => _.camelCase(key));
    }) as Readonly<INotificationTemplate>[];
    const repo = queryRunner.manager.getRepository(NotificationTemplate);
    await repo.save(templates);
  };
}
