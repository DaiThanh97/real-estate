import { getMetadataArgsStorage } from "../index";

export function Toolkit() {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "toolkit",
      object,
      method: methodName,
      index,
      parse: false,
      required: true,
    });
  };
}
