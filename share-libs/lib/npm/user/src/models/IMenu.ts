import { IResource } from "./IResource";

export interface IMenu {
  name: string;
  description: string;
  path: string;
  isActive: boolean;
  resourceId: number | string;
  parentId: number | string;

  resource: IResource;

  parent?: IMenu;
}
