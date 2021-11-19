import { Expose, Type } from "class-transformer";
import { EAccountType } from "../../domain/models/Account";

export class IdSerializer {
  @Expose()
  id: number;
}

export class BasicAccountSerializer {
  @Expose()
  id: number;

  @Expose()
  type: EAccountType;

  @Expose()
  identityName: string;

  @Expose()
  code: string;

  @Expose()
  displayName: string;

  @Expose()
  isActive: boolean;
}

export class BasicMasterValueSerializer {
  @Expose()
  id: number;

  @Expose()
  valueCode: string;

  @Expose()
  valueName: string;

  @Expose()
  isActive: boolean;
}

export class BaseSerializer {
  @Expose()
  id: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  @Type(() => BasicAccountSerializer)
  createdBy: BasicAccountSerializer | undefined;

  @Expose()
  @Type(() => BasicAccountSerializer)
  updatedBy: BasicAccountSerializer | undefined;
}

export function baseSerializerMixin<T extends new(...args: any[]) => {/**/ }>(constructor: T) {
  const fields = ["id", "createdAt", "updatedAt", "createdBy", "updatedBy"];
  const RelationMixinClass = class extends constructor {
    id: number;
    createdAt: Date;
    updatedAt: Date;
    createdBy: BasicAccountSerializer | undefined;
    updatedBy: BasicAccountSerializer | undefined;
  };
  for (const field of fields) {
    Expose()(RelationMixinClass.prototype, field);
  }
  Type(() => BasicAccountSerializer)(RelationMixinClass.prototype, "createdBy");
  Type(() => BasicAccountSerializer)(RelationMixinClass.prototype, "updatedBy");

  return RelationMixinClass;
}

export function accountCredentialMixin<T extends new(...args: any[]) => {/**/ }>(constructor: T) {
  const fields = ["identityName", "displayName"];
  const RelationMixinClass = class extends constructor {
    identityName: string;
    displayName: string;
  };
  for (const field of fields) {
    Expose()(RelationMixinClass.prototype, field);
  }
  return RelationMixinClass;
}

export class ChangeStatusNoteSerializer {
  @Expose()
  id: number;

  @Expose()
  status: string;

  @Expose()
  rejectionNote: string;
}

export class LicenseRequestSerializer {
  @Expose()
  id: number;

  @Expose()
  api: string;

  @Expose()
  method: string;

  @Expose()
  resourceId: number;
}
