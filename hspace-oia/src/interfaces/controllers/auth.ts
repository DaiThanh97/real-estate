import * as Hapi from "@hapi/hapi";
import AccountAppUseCases from "../../application/AccountAppUseCases";
import SessionAppUseCases from "../../application/SessionAppUseCases";
import { BadImplementationError, ForbiddenError, UnauthorizedError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import Beans from "../../infrastructure/config/beans";
import { Account, EAccountType } from "../../domain/models/Account";
import {
  AccountForgotPasswordConfirmSerializer,
  AccountForgotPasswordRequestSerializer
} from "../serializers/AccountSerializer";
import logger from "../../infrastructure/logger";
import constants from "../../infrastructure/config/constants";
import { Post, Put } from "../routing-controllers/decorator/Methods";
import {
  accountForgotPasswordResponse,
  accountLoginResponse,
  licenseTokenResponse,
  msgResponse
} from "../schemas/response";
import {
  accountForgotPasswordConfirmSchema,
  accountForgotPasswordRequestSchema,
  accountLogin,
  licenseRequest
} from "../schemas/account";
import { Controller } from "../routing-controllers/decorator/Controller";
import { Body } from "../routing-controllers/decorator/Body";
import { HeaderQuery } from "../routing-controllers/decorator/HeaderQuery";
import { ServiceLocator } from "../routing-controllers/decorator/ServiceLocator";
import { Request } from "../routing-controllers/decorator/Request";
import { RequestAuth } from "../routing-controllers/decorator/RequestAuth";
import { Payload } from "../routing-controllers/decorator/Payload";
import { CurrentAccount } from "../routing-controllers/decorator/CurrentAccount";
import { LicenseRequestSerializer } from "../serializers/Base";

@Controller("auth", ["auth"])
export default class AuthController {
  public async checkAPIPermission(
    request: Hapi.Request,
    routeApp: any, serviceLocator: Beans,
    id: number
  ): Promise<void> {
    const config = await serviceLocator.systemConfigRepository.findOne({
      where: {
        name: constants.System.Config.API.CHECK_PERMISSION,
      }
    });
    if (!config || !config.data.value) {
      return;
    }

    const secure: {
      api: string,
      method: string,
    } = (routeApp as any).secure;

    if (secure) {
      const token = request.headers[constants.Headers.LicenseHeader.toLowerCase()];
      if (!token) {
        throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
      }
      let ctxLicense: any;
      try {
        ctxLicense = serviceLocator.accessTokenManager.decodeLicense(token);
      } catch (err) {
        logger.error(err);
        throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
      }
      if (secure.api !== ctxLicense["custom:api"] || secure.method !== ctxLicense["custom:method"]) {
        throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
      }
      if (ctxLicense["custom:id"].toString() !== id) {
        throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
      }
    }
  }

  public async checkPolicy(
    account: Account,
    routeApp: any,
    serviceLocator: Beans,
    id: number,
  ): Promise<any> {
    const config = await serviceLocator.systemConfigRepository.findOne({
      where: {
        name: constants.System.Config.API.CHECK_POLICY,
      }
    });
    if (!config || !config.data.value) {
      return;
    }

    // abac
    const rule: { res: string, act: string, platforms: string[] } = (routeApp as any).rule;
    if (rule) {
      const subject = account;
      const resource = {
        name: rule.res,
        id,
      };
      const action = rule.act;

      await serviceLocator.enforcer.loadPolicy();
      const res = await serviceLocator.enforcer.enforce(subject, resource, action);
      if (!res) {
        throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
      }
    }
  }

  public validateToken = async (decoded: any, request: Hapi.Request): Promise<any> => {
    const serviceLocator: Beans = (request.server.app as any).serviceLocator;
    const routeApp = request.route.settings.app;

    const isUserWeb = await this.isUserWeb(request.headers[constants.Headers.CorsUserHeader.toLowerCase()]);
    const { isValid, account } = await serviceLocator.tokenManager.validate(decoded, isUserWeb);
    (request.app as any).currentAccount = account;
    if (routeApp) {
      const { id } = request.params as { id: number | undefined };
      // platform support
      const platforms: string[] = (routeApp as any).platforms;
      if (platforms) {
        if (isUserWeb && !platforms.includes("web")) {
          throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
        }

        if (!isUserWeb && !platforms.includes("mobile")) {
          throw new ForbiddenError("Permission Denied", ErrorCode.PermissionDenied);
        }
      }

      if (account.type !== EAccountType.ADMIN) {
        await this.checkAPIPermission(request, routeApp, serviceLocator, id);
        await this.checkPolicy(account, routeApp, serviceLocator, id);
      }
    }

    return { isValid };
  };


  @Post({
    route: "/login",
    description: "Account login",
    auth: false,
    responseSchema: accountLoginResponse,
    validateSchemas: {
      payload: accountLogin,
    },
    platforms: ["web", "mobile"]
  })
  public async login(
    @Request() request: Hapi.Request,
    @Body("identityName") identityName: string,
    @Body("password") password: string,
    @HeaderQuery(constants.Headers.CorsUserHeader) userMode: string,
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const isUserWeb = await this.isUserWeb(userMode);
    const account = await AccountAppUseCases.login(identityName, password, isUserWeb, serviceLocator);
    if (account === undefined) {
      logger.info("[User login] failed headers => ", request.headers);
      throw new UnauthorizedError("Wrong identity name or password", ErrorCode.InvalidIdentity);
    }

    const session = await SessionAppUseCases.generateSession(account, serviceLocator);
    const accessToken = await SessionAppUseCases.generateAccessToken(session, serviceLocator);

    return {
      accessToken,
    };
  }

  @Post({
    route: "/logout",
    description: "Account logout",
    responseSchema: msgResponse,
  })
  public async logout(
    @RequestAuth() auth: { credentials: any },
    @ServiceLocator() serviceLocator: Beans,
  ): Promise<any> {
    const sessionId: number = auth.credentials["custom:session"] as number;
    const result = await SessionAppUseCases.terminate(sessionId, serviceLocator);
    if (!result) {
      throw new BadImplementationError();
    }

    return { msg: "The account has been successfully logout.", success: true };
  }

  @Post({
    route: "/forgotPasswordEmployee/_request",
    description: "Account Employee create request forgot password",
    auth: false,
    validateSchemas: {
      payload: accountForgotPasswordRequestSchema,
    },
    responseSchema: accountForgotPasswordResponse,
  })
  public async forgotPasswordEmployee(
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: AccountForgotPasswordRequestSerializer
    }) dto: AccountForgotPasswordRequestSerializer,
  ): Promise<any> {
    return this.postForgotPassword(EAccountType.EMPLOYEE, dto, serviceLocator);
  }

  @Put({
    route: "/forgotPasswordEmployee/_confirm",
    description: "Account Employee confirm update forgot password",
    auth: false,
    validateSchemas: {
      payload: accountForgotPasswordConfirmSchema,
    },
    responseSchema: msgResponse,
  })
  public async forgotPasswordConfirmEmployee(
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: AccountForgotPasswordConfirmSerializer
    }) dto: AccountForgotPasswordConfirmSerializer,
  ): Promise<any> {
    return this.putForgotPasswordConfirm(EAccountType.EMPLOYEE, dto, serviceLocator);
  }

  @Post({
    route: "/forgotPasswordCollaborator/_request",
    description: "Account Collaborator create request forgot password",
    auth: false,
    validateSchemas: {
      payload: accountForgotPasswordRequestSchema,
    },
    responseSchema: accountForgotPasswordResponse,
  })
  public async forgotPasswordCollaborator(
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: AccountForgotPasswordRequestSerializer
    }) dto: AccountForgotPasswordRequestSerializer,
  ): Promise<any> {
    return this.postForgotPassword(EAccountType.COLLABORATOR, dto, serviceLocator);
  }

  @Put({
    route: "/forgotPasswordCollaborator/_confirm",
    description: "Account Collaborator confirm update forgot password",
    auth: false,
    validateSchemas: {
      payload: accountForgotPasswordConfirmSchema,
    },
    responseSchema: msgResponse,
  })
  public async forgotPasswordConfirmCollaborator(
    @ServiceLocator() serviceLocator: Beans,
    @Payload({
      type: AccountForgotPasswordConfirmSerializer
    }) dto: AccountForgotPasswordConfirmSerializer,
  ): Promise<any> {
    return this.putForgotPasswordConfirm(EAccountType.COLLABORATOR, dto, serviceLocator);
  }

  @Post({
    route: "/_license",
    description: "Get access license",
    responseSchema: licenseTokenResponse,
    validateSchemas: {
      payload: licenseRequest,
    },
    platforms: ["web"]
  })
  public async getLicense(
    @ServiceLocator() serviceLocator: Beans,
    @CurrentAccount() account: Account,
    @Payload({
      type: LicenseRequestSerializer
    }) dto: LicenseRequestSerializer,
  ): Promise<any> {
    const licenseToken = await AccountAppUseCases.getLicense(dto, account, serviceLocator);

    return {
      licenseToken,
    };
  }

  private isUserWeb = async (userMode: string): Promise<boolean> => {
    return userMode === constants.Headers.CorsWebValue;
  };

  private postForgotPassword = async (
    accountType: EAccountType,
    dto: AccountForgotPasswordRequestSerializer,
    serviceLocator: Beans,
  ): Promise<any> => {
    const result = await AccountAppUseCases.forgotPasswordRequest(dto, accountType, serviceLocator);
    if (!result) {
      throw new BadImplementationError();
    }
    return {
      sign: result,
    };
  };

  private putForgotPasswordConfirm = async (
    accountType: EAccountType,
    dto: AccountForgotPasswordConfirmSerializer,
    serviceLocator: Beans,
  ): Promise<any> => {
    const result = await AccountAppUseCases.forgotPasswordConfirm(dto, accountType, serviceLocator);
    if (!result) {
      throw new BadImplementationError();
    }
    return { msg: "The account has been forgot password successfully.", success: true };
  };

}
