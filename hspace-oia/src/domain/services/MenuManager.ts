import { IMenuManager } from "./contract";
import { Menu } from "../models/Menu";
import { Service } from "typedi";
import ContainerTokens from "./contract/ContainerTokens";
import { AccountMenu } from "../models/Account";
import { plainToClass } from "class-transformer";

@Service(ContainerTokens.MenuManager)
export class MenuManager implements IMenuManager {
  public getChildrenMenu(id: number, menu: Menu[], childrenAccumulation: AccountMenu[]): void {
    const children: Menu[] = menu.filter(item => item.parentId === id);
    if (children?.length) {
      children.forEach(item => {
        const childrenObject: AccountMenu = plainToClass(AccountMenu, { ...item, children: [], hasChild: false });
        this.getChildrenMenu(item.id, menu, childrenObject.children);
        childrenObject.hasChild = !!childrenObject.children.length;
        childrenAccumulation.push(childrenObject);
      });
    }
  }

  menuIsHaveNoResourceChild(id: number, menu: Menu[]): boolean {
    const menuObject = menu.find(item => item.id === id);
    const children = menu.filter(item => item.parentId === id);
    if (menuObject && !children.length && menuObject.resourceId) {
      return false;
    }
    if (menuObject && !children.length && !menuObject.resourceId) {
      return true;
    }
    let isEmpty = true;
    children.forEach(item => {
      isEmpty = isEmpty && this.menuIsHaveNoResourceChild(item.id, menu);
    });
    return isEmpty;
  }

}
