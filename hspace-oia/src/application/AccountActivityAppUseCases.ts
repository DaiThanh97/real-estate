import * as nunjucks from "nunjucks";
import { IAccountActivityRepository, IActivityTemplateRepository } from "../domain/services/contract";
import { PagingSerializer } from "../interfaces/serializers/PagingSerializer";

export default class AccountActivityAppUseCases {
  public static async create(
    activity: { group: string; action: string; data: any; },
    beans: {
      activityTemplateRepository: IActivityTemplateRepository,
      accountActivityRepository: IAccountActivityRepository,
    }): Promise<any> {
    const { group, action, data } = activity;
    const template = await beans.activityTemplateRepository.findOneOrFail({
      where: {
        group,
        action,
        isActive: true,
      },
    });

    const content = nunjucks.renderString(template.raw, data);
    await beans.accountActivityRepository.save({
      ...activity,
      content,
    });
  }

  public static async getActivities(
    refId: number,
    group: string,
    queryOptions: PagingSerializer,
    beans: {
      accountActivityRepository: IAccountActivityRepository,
    }
  ): Promise<any> {
    const order = {} as any;
    order[queryOptions.orderField] = queryOptions.order;

    const [result, total] = await beans.accountActivityRepository.findAndCount({
      take: queryOptions.take,
      skip: queryOptions.skip,
      order,
      where: {
        refId,
        group,
      }
    }) as [Readonly<any[]>, number];

    return {
      items: result,
      total
    };
  }
}
