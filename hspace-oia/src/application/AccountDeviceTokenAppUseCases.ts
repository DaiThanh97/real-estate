import { IAccountDeviceTokenRepository } from "../domain/services/contract";
import { Account, EAccountType } from "../domain/models/Account";
import {
  RegisterAccountDeviceTokenSerializer,
  RemoveAccountDeviceTokenSerializer
} from "../interfaces/serializers/AccountDeviceTokenSerializer";
import { BadRequestError } from "../infrastructure/error";
import ErrorCode from "../infrastructure/config/constants/errorCode";

export default class AccountDeviceTokenAppUseCases {
  public static async register(
    dto: RegisterAccountDeviceTokenSerializer,
    account: Account,
    beans: {
      accountDeviceTokenRepository: IAccountDeviceTokenRepository;
    }
  ): Promise<any> {
    if(account.type !== EAccountType.COLLABORATOR){
      throw new BadRequestError( "Account must is collaboration.", ErrorCode.Account.AccountInvalidType);
    }
    const existedAccountDeviceToken = await beans.accountDeviceTokenRepository.findOne(
      { where: { deviceToken: dto.deviceToken } }
    ) as Readonly<any>;

    const commonData = {
      deviceToken: dto.deviceToken,
      deviceName: dto.deviceName,
      deviceType: dto.deviceType,
      accountId: account.id,
      updatedBy: account.id,
    };
    if (existedAccountDeviceToken) {
      return await beans.accountDeviceTokenRepository.update(
        existedAccountDeviceToken.id,
        {
          ...commonData,
          isActive: true,
        }
      );
    } else {
      await beans.accountDeviceTokenRepository.save({
        ...commonData,
        createdBy: account.id,
      });
    }
    return true;
  }

  public static async remove(
    dto: RemoveAccountDeviceTokenSerializer,
    account: Account,
    beans: {
      accountDeviceTokenRepository: IAccountDeviceTokenRepository;
    }
  ): Promise<any> {
    const existedAccountDeviceToken = await beans.accountDeviceTokenRepository.findOne(
      { where: { deviceToken: dto.deviceToken } }
    ) as Readonly<any>;
    
    if (existedAccountDeviceToken) {
      await beans.accountDeviceTokenRepository.update(existedAccountDeviceToken.id, {
        isActive: false,
        updatedBy: account.id,
      });
    }
    return true;
  }
}
