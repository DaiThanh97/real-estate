import { getMetadataArgsStorage } from "../index";

export function Controller(baseRoute?: string, tags?: string[], options?: any) {
  return (object: any) => {
    getMetadataArgsStorage().controllers.push({
      type: "default",
      target: object,
      route: baseRoute,
      options,
      tags,
    });
  };
}
