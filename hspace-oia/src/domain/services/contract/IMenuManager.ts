import { Menu } from "../../models/Menu";
import { AccountMenu } from "../../models/Account";

export interface IMenuManager {
  getChildrenMenu(id: number, menu: Menu[], childrenAccumulation: AccountMenu[]): void;
  menuIsHaveNoResourceChild(id: number, menu: Menu[]): boolean;
}
