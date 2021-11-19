import { BaseSerializer } from "./Base";
import { Expose, Type } from "class-transformer";
import { IsDefined, IsNotEmpty, IsString } from "class-validator";

export class AccountSettingDataSerializer {
  @Expose()
  value: string | boolean | number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  type: string;
}


export class AccountSettingSerializer extends BaseSerializer {
  @Expose()
  @IsString()
  @IsNotEmpty()
  key: string;

  @Expose()
  @IsDefined()
  @Type(() => AccountSettingDataSerializer)
  data: AccountSettingDataSerializer;

  @Expose()
  description: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  folder: string;
}
