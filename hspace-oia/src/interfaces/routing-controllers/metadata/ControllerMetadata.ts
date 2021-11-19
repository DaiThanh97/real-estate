import { ActionMetadata } from "./ActionMetadata";
import { ControllerMetadataArgs } from "./args/ControllerMetadataArgs";
import { getFromContainer } from "../container";

export class ControllerMetadata {
  actions: ActionMetadata[];

  target: any;

  route: string;

  type: "default" | "json";

  options: any;

  tags: string[];

  constructor(args: ControllerMetadataArgs) {
    this.target = args.target;
    this.route = args.route;
    this.type = args.type;
    this.options = args.options;
    this.tags = args.tags;
  }

  getInstance(): any {
    return getFromContainer(this.target);
  }
}
