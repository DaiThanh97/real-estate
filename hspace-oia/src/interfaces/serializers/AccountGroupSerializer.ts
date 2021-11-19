import { Expose, Type } from "class-transformer";
import { BaseSerializer } from "./Base";
import { PagingSerializer } from "./PagingSerializer";
import FeatureSerializer from "./FeatureSerializer";
import ResourceSerializer from "./ResourceSerializer";


export class AccountGroupFeatureSerializer extends BaseSerializer {
  @Expose()
  featureId: number;

  @Expose()
  accountGroupId: number;

  @Expose()
  @Type(() => FeatureSerializer)
  feature: FeatureSerializer;
}

export class AccountGroupResourceSerializer extends BaseSerializer {
  @Expose()
  resourceId: number;

  @Expose()
  accountGroupId: number;

  @Expose()
  @Type(() => ResourceSerializer)
  resource: ResourceSerializer;
}


export class AccountGroupSerializer extends BaseSerializer {
  @Expose()
  name: string;

  @Expose()
  code: string;

  @Expose()
  isActive: boolean;

  @Expose()
  description?: string | undefined;

  @Expose()
  @Type(() => AccountGroupResourceSerializer)
  accountGroupResources: AccountGroupResourceSerializer[];

  @Expose()
  @Type(() => AccountGroupFeatureSerializer)
  accountGroupFeatures: AccountGroupFeatureSerializer[];

  @Expose()
  haveAccounts: boolean;
}

export class AccountGroupQuery extends PagingSerializer {
  @Expose()
  code: string;

  @Expose()
  name: string;

  @Expose()
  description: string;
}
