import { getMetadataArgsStorage } from "../index";


export function Body(name: string, options?: any) {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "body",
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
