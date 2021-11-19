import { ActionType } from "../metadata/types/ActionType";
import { RouteOptionsAccess } from "@hapi/hapi";
import { getMetadataArgsStorage } from "../index";

export interface ActionRequestArgs {
  route?: string;

  options?: any;

  responseSchema?: any;

  auth?: false | string | RouteOptionsAccess;

  validateSchemas?: any;

  description?: string;

  policy?: {
    res: string,
    act: string,
  } | undefined;

  platforms?: string[];

  secure?: boolean | undefined;
}


function pushRequestAction(args: ActionRequestArgs, type: ActionType) {
  const {
    route, description, responseSchema, validateSchemas, auth, options, policy, platforms, secure,
  } = args;

  return (object: any, methodName: string) => {
    getMetadataArgsStorage().actions.push({
      type,
      target: object.constructor,
      method: methodName,
      options,
      route: route || "",
      description: description || "",
      auth: (auth !== undefined ? auth : "jwt"),
      responseSchema,
      validateSchemas,
      policy,
      platforms,
      secure,
    });
  };
}

export function Post(args: ActionRequestArgs) {
  return pushRequestAction(args, "post");
}

export function Get(args: ActionRequestArgs) {
  return pushRequestAction(args, "get");
}

export function Put(args: ActionRequestArgs) {
  return pushRequestAction(args, "put");
}

export function Delete(args: ActionRequestArgs) {
  return pushRequestAction(args, "delete");
}

export function Patch(args: ActionRequestArgs) {
  return pushRequestAction(args, "patch");
}

