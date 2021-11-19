export interface ControllerMetadataArgs {
  target: any;

  route: string;

  type: "default" | "json";

  options: any;

  tags: string[];
}
