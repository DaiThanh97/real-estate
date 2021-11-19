import { Expose } from "class-transformer";
import { BaseSerializer } from "./Base";

export default class FeatureSerializer extends BaseSerializer {
  @Expose()
  name: string;

  @Expose()
  action: string;

  @Expose()
  description: string;

  @Expose()
  isActive: boolean;

  @Expose()
  resourceId: number;

  @Expose()
  seq: number;
}
