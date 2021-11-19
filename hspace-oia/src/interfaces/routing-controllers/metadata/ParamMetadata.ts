import { ActionMetadata } from "./ActionMetadata";
import { ParamType } from "./types/ParamType";
import { ParamMetadataArgs } from "./args/ParamMetadataArgs";
import { ValidatorOptions } from "class-validator";
import { ClassTransformOptions } from "class-transformer";

export class ParamMetadata {
  actionMetadata: ActionMetadata;

  object: any;

  method: string;

  index: number;

  type: ParamType;

  name: string;

  targetType?: any;

  targetName = "";

  isTargetObject = false;

  target: any;

  parse: boolean;

  required: boolean;

  extraOptions: any;

  classTransform?: ClassTransformOptions;

  validate?: boolean | ValidatorOptions;


  constructor(actionMetadata: ActionMetadata, args: ParamMetadataArgs) {
    this.actionMetadata = actionMetadata;

    this.target = args.object.constructor;
    this.method = args.method;
    this.index = args.index;
    this.type = args.type;
    this.name = args.name;
    this.required = args.required;

    if (args.explicitType) {
      this.targetType = args.explicitType;
    } else {
      const ParamTypes = (Reflect as any).getMetadata("design:paramtypes", args.object, args.method);
      if (typeof ParamTypes !== "undefined") {
        this.targetType = ParamTypes[args.index];
      }
    }

    if (this.targetType) {
      if (this.targetType instanceof Function && this.targetType.name) {
        this.targetName = this.targetType.name.toLowerCase();

      } else if (typeof this.targetType === "string") {
        this.targetName = this.targetType.toLowerCase();
      }
      this.isTargetObject = this.targetType instanceof Function || this.targetType.toLowerCase() === "object";
    }
  }
}
