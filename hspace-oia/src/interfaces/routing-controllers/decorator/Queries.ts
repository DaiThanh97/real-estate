import { getMetadataArgsStorage } from "../index";

export function Queries(options?: any) {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "queries",
      object,
      method: methodName,
      index,
      parse: false,
      required: options ? options.required : undefined,
      explicitType: options ? options.type : undefined,
    });
  };
}
