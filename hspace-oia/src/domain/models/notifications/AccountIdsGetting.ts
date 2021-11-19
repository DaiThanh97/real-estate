import { IAccountEventRepository, INotificationManager } from "../../services/contract";
import { Container } from "typedi";
import ContainerTokens from "../../services/contract/ContainerTokens";
import _ from "lodash";

export interface IAccountIdsGetting {
  getIds(): Promise<number[]>;
}

export interface IAccountIdsGettingList {
  getAccountIds(): Promise<number[]>;
}

export class AccountIdsGettingList implements IAccountIdsGettingList {
  constructor(
    public accountIdsGettingList: IAccountIdsGetting[],
  ) {
  }

  async getAccountIds(): Promise<number[]> {
    let result: number[] = [];
    for (const accountIdsGetting of this.accountIdsGettingList) {
      const accountIds = await accountIdsGetting.getIds();
      if (accountIds.length > 0) {
        result = _.union(result, accountIds);
      }
    }

    return result;
  }
}

export class AccountIdsHasAction implements IAccountIdsGetting {
  constructor(
    public action: string,
    public manager: INotificationManager = Container.get<INotificationManager>(ContainerTokens.NotificationManager)
  ) {
  }

  async getIds(): Promise<number[]> {
    const result = await this.manager.getAccountIdsByNotificationAction(this.action);
    if (result && result.length > 0) {
      return result;
    }

    return [];
  }
}

export class AccountIdsHasEvent implements IAccountIdsGetting {
  constructor(
    public referenceId: number,
    public type: string,
    public model: string,
    public accountEventRepository: IAccountEventRepository = Container.get<IAccountEventRepository>(
      ContainerTokens.AccountEventRepository
    ),
  ) {
  }

  async getIds(): Promise<number[]> {
    const res = await this.accountEventRepository.findOne({
      referenceId: this.referenceId,
      type: this.type,
      model: this.model,
    });
    if (res && res.accountId) {
      return [res.accountId];
    }

    return [];
  }
}

export class AccountIdsInObject implements IAccountIdsGetting {
  constructor(
    public obj: any,
    public fields: string[],
  ) {
  }

  async getIds(): Promise<number[]> {
    const result: number[] = [];
    for (const field of this.fields) {
      if (this.obj[field]) {
        if (typeof this.obj[field] === "number") {
          result.push(this.obj[field]);
        } else if (this.obj[field].id) {
          result.push(this.obj[field].id);
        }
      }
    }

    return result;
  }
}
