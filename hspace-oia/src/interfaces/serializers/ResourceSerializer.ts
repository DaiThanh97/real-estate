import { Expose, Type } from "class-transformer";
import FeatureSerializer from "./FeatureSerializer";
import { BaseSerializer } from "./Base";

export default class ResourceSerializer extends BaseSerializer {
  @Expose()
  path: string;

  @Expose()
  name: string;

  @Expose()
  description: string;

  @Expose()
  isActive: boolean;

  @Expose()
  seq: number;

  @Expose()
  @Type(() => FeatureSerializer)
  features: FeatureSerializer[];
}
