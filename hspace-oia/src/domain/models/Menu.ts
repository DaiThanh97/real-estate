import { Type } from "class-transformer";
import { BaseModel } from "./Base";
import { Resource } from "./Resource";

export class Menu extends BaseModel {
  public name: string;
  public description: string;
  public path: string;
  public isActive: boolean;
  public resourceId: number;
  public parentId: number;

  @Type(() => Resource)
  public resource: Resource;

  @Type(() => Menu)
  public parent?: Menu;

}
