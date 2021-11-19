import { BaseSerializer , accountCredentialMixin } from "./Base";
import { Expose, Type } from "class-transformer";
import MasterValueSerializer from "./MasterValueSerializer";
import { PagingSerializer } from "./PagingSerializer";

export class CollaboratorSerializer extends BaseSerializer {

  @Expose()
  fullName: string;

  @Expose()
  birthday: Date;

  @Expose()
  joinedDate: Date;

  @Expose()
  phone?: string;

  @Expose()
  email?: string;

  @Expose()
  companyId: number;

  @Expose()
  @Type(() => MasterValueSerializer)
  company: MasterValueSerializer | undefined;

  @Expose()
  collaboratorTypeId: number;

  @Expose()
  @Type(() => MasterValueSerializer)
  collaboratorType: MasterValueSerializer | undefined;
}

export class CollaboratorGroupQuery extends PagingSerializer {
  @Expose()
  fullName: string | undefined;

  @Expose()
  phone: string | undefined;

  @Expose()
  email: string | undefined;

  @Expose()
  companyId: number | undefined;

  @Expose()
  collaboratorTypeId: number | undefined;

  @Expose()
  accountId: number | undefined;
}

@accountCredentialMixin
export class CollaboratorCurrentSerializer extends CollaboratorSerializer {
}

export class CollaboratorChangeBasicInfoSerializer {
  @Expose()
  birthday: Date;
}
