import { getMetadataArgsStorage } from "../index";

export function CurrentAccount() {
  return (object: any, methodName: string, index: number) => {
    getMetadataArgsStorage().params.push({
      type: "current-account",
      object,
      method: methodName,
      index,
      parse: false,
      required: true,
    });
  };
}
