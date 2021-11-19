import { getMetadataArgsStorage } from "../index";

interface IQueryOption {
  parse?: boolean;
  required?: any;
  type?: any;
}

export function Query(name: string, options?: IQueryOption) {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "query",
      object,
      method: methodName,
      index,
      name,
      parse: options?.parse ? options.parse : false,
      required: options?.required ? options.required : undefined,
      explicitType: options?.type ? options.type : undefined,
    });
  };
}
