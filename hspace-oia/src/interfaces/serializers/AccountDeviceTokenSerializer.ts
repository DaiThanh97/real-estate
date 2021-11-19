import { BaseSerializer } from "./Base";
import { Expose } from "class-transformer";

export class RegisterAccountDeviceTokenSerializer extends BaseSerializer {

  @Expose()
  deviceToken: string;

  @Expose()
  deviceType: string;

  @Expose()
  deviceName: string;
}

export class RemoveAccountDeviceTokenSerializer extends BaseSerializer {
  @Expose()
  deviceToken: string;
}
