import { Controller } from "../routing-controllers/decorator/Controller";
import { Post } from "../routing-controllers/decorator/Methods";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { Account } from "../../domain/models/Account";
import AccountDeviceTokenAppUseCases from "../../application/AccountDeviceTokenAppUseCases";
import { msgResponse } from "../schemas/response";
import { registerAccountDeviceTokenSchema, removeAccountDeviceTokenSchema, } from "../schemas/accountDeviceToken";
import {
  RegisterAccountDeviceTokenSerializer,
  RemoveAccountDeviceTokenSerializer
} from "../serializers/AccountDeviceTokenSerializer";
import { Payload } from "../routing-controllers/decorator/Payload";
import Beans from "../../infrastructure/config/beans";

@Controller("account_device_tokens", ["account_device_token"])
export default class NotificationController {
  @Post({
    route: "/_register",
    description: "Register a account with device token",
    validateSchemas: {
      payload: registerAccountDeviceTokenSchema,
    },
    responseSchema: msgResponse,
  })
  public async register(
    @CurrentAccount() account: Account,
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: RegisterAccountDeviceTokenSerializer,
    }) dto: RegisterAccountDeviceTokenSerializer
  ): Promise<any> {
    await AccountDeviceTokenAppUseCases.register(
      dto,
      account,
      serviceLocator
    );
    return {
      msg: "The account has been successfully register device token.",
      success: true,
    };
  }

  @Post({
    route: "/_remove",
    description: "Remove a account with device token",
    validateSchemas: {
      payload: removeAccountDeviceTokenSchema,
    },
    responseSchema: msgResponse,
  })
  public async remove(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: RemoveAccountDeviceTokenSerializer,
    }) dto: RemoveAccountDeviceTokenSerializer
  ) {
    await AccountDeviceTokenAppUseCases.remove(
      dto,
      account,
      serviceLocator
    );
    return {
      msg: "The account has been successfully remove device token.",
      success: true,
    };
  }
}
