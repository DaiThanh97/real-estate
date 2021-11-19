import { ActionType } from "../types/ActionType";
import { RouteOptionsAccess } from "@hapi/hapi";

export interface ActionMetadataArgs {
  route: string;

  target: any;

  method: string;

  options: any;

  type?: ActionType;

  responseSchema: any;

  auth: false | string | RouteOptionsAccess;

  validateSchemas: any;

  description: string;

  policy?: {
    res: string,
    act: string,
  } | undefined;

  platforms?: string[];

  secure?: boolean | undefined;
}
