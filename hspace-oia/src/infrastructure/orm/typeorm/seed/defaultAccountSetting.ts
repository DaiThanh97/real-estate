import { ILike, QueryRunner } from "typeorm";
import _ from "lodash";
import {
  AccountSetting,
  DefaultAccountSetting,
  IAccountSetting,
  IDefaultAccountSetting
} from "../models/AccountSetting";
import { Account, IAccount } from "../models/Account";

export default class DefaultAccountSettingSeed {
  public static run = async (queryRunner: QueryRunner) => {
    const jsonData = require("./data/default_account_settings.json");
    const defaultSettings = _.map(jsonData, (el) => {
      return {
        ..._.mapKeys(el, (_value, key) => _.camelCase(key)),
        data: JSON.parse(el.data),
      };
    }) as Readonly<IDefaultAccountSetting>[];

    const defaultAccountSettingRepository = queryRunner.manager.getRepository<IDefaultAccountSetting>(DefaultAccountSetting);
    const accountSettingRepository = queryRunner.manager.getRepository<IAccountSetting>(AccountSetting);
    const accountRepository = queryRunner.manager.getRepository<IAccount>(Account);
    const accounts = await accountRepository.find({
      select: ["id"]
    });

    for (const setting of defaultSettings) {
      if (!setting.isActive) {
        await accountSettingRepository.update({
          key: ILike(setting.key),
          folder: ILike(setting.folder),
          isActive: true,
        }, { isActive: false });
      }

      const result = await defaultAccountSettingRepository.findOne({
        where: {
          key: ILike(setting.key),
          folder: ILike(setting.folder),
        }
      });

      if (!result) {
        for (const account of accounts) {
          await accountSettingRepository.save({
            key: setting.key,
            folder: setting.folder,
            description: setting.description,
            isActive: setting.isActive,
            data: setting.data,
            accountId: account.id,
          });
        }
      } else {
        if (result.isActive !== setting.isActive) {
          await accountSettingRepository.update({
            key: ILike(setting.key),
            folder: ILike(setting.folder),
            isActive: !result.isActive,
          }, { isActive: result.isActive });
        }
      }
    }

    await defaultAccountSettingRepository.save(defaultSettings);
  };
}
