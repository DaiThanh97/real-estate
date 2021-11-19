import { ParamType } from "../types/ParamType";

export interface ParamMetadataArgs {
  object: any;

  method: string;

  index: number;

  type: ParamType;

  name?: string;

  required: boolean;

  explicitType?: any;

  parse: boolean;
}
