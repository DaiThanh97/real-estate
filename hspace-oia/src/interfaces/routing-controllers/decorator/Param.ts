import { getMetadataArgsStorage } from "../index";

export function Param(name: string) {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "param",
      object,
      method: methodName,
      index,
      name,
      parse: false,
      required: true,
    });
  };
}
