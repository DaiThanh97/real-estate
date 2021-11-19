import { getMetadataArgsStorage } from "../index";

export function RequestAuth() {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "request-auth",
      object,
      method: methodName,
      index,
      parse: false,
      required: true,
    });
  };
}
