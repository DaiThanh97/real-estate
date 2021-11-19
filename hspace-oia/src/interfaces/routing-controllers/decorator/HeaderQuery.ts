import { getMetadataArgsStorage } from "../index";

export function HeaderQuery(name: string, options?: any) {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "header-query",
      object,
      method: methodName,
      index,
      name,
      parse: options ? options.parse : false,
      required: options ? options.required : undefined,
      explicitType: options ? options.type : undefined,
    });
  };
}
