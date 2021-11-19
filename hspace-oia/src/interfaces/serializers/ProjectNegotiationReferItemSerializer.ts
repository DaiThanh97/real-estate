import { Expose, Type } from "class-transformer";
import { baseSerializerMixin } from "./Base";
import MasterValueSerializer from "./MasterValueSerializer";
import AccountSerializer from "./AccountSerializer";

export class ChangeableProjectNegotiationReferItemSerializer {
  @Expose()
  negotiationReferId: number;
  @Expose()
  explain: string;
  @Expose()
  referAt: Date;
  @Expose()
  referSourceId: number;
}

@baseSerializerMixin
export class ProjectNegotiationReferItemSerializer extends ChangeableProjectNegotiationReferItemSerializer {
  
  @Expose()
  id: number;

  @Expose()
  isActive: boolean;

  @Expose()
  projectNegotiationId: number;

  @Expose()
  @Type(() => MasterValueSerializer)
  negotiationRefer: MasterValueSerializer | undefined;

  @Expose()
  @Type(() => AccountSerializer)
  referSource: AccountSerializer | undefined;
}
