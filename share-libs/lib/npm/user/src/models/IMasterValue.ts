import { IGroupValue } from "./IGroupValue";

export interface IMasterValue {
  isUsed?: boolean;
  groupId?: number | string;
  groupCode?: string;
  groupName?: string;
  valueCode?: string;
  valueName?: string;

  groupValue?: IGroupValue;

  parent?: IMasterValue;

  children?: IMasterValue[];

  parentId: number | string;
  isActive: boolean;
  customData?: any;
}
