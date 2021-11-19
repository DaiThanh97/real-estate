import { getMetadataArgsStorage } from "../index";

export function ServiceLocator() {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "service-locator",
      object,
      method: methodName,
      index,
      parse: false,
      required: true,
    });
  };
}
