import { ControllerMetadata } from "./ControllerMetadata";
import { ActionType } from "./types/ActionType";
import { ActionMetadataArgs } from "./args/ActionMetadataArgs";
import { ParamMetadata } from "./ParamMetadata";
import { RouteOptionsAccess } from "@hapi/hapi";

export class ActionMetadata {
  controllerMetadata: ControllerMetadata;


  params: ParamMetadata[];


  target: any;


  method: string;


  options: any;


  type: ActionType;


  route: string | RegExp;


  responseSchema: any;


  auth: false | string | RouteOptionsAccess;


  validateSchemas: any;


  description: string;

  policy: {
    res: string,
    act: string,
  } | undefined;

  platforms?: string[];

  secure?: boolean | undefined;

  constructor(controllerMetadata: ControllerMetadata, args: ActionMetadataArgs) {
    this.controllerMetadata = controllerMetadata;
    this.route = args.route;
    this.target = args.target;
    this.method = args.method;
    this.options = args.options;
    this.type = args.type;
    this.responseSchema = args.responseSchema;
    this.auth = args.auth;
    this.validateSchemas = args.validateSchemas;
    this.description = args.description;
    this.policy = args.policy;
    this.platforms = args.platforms;
    this.secure = args.secure;
  }
}
