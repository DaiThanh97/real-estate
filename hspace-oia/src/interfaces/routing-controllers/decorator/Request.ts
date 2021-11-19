import { getMetadataArgsStorage } from "../index";

export function Request() {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "request",
      object,
      method: methodName,
      index,
      parse: false,
      required: true,
    });
  };
}
