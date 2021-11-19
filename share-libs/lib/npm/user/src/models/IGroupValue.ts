export interface IGroupValue {
  code: string;
  name: string;
  parentId: number | string;
  parent?: IGroupValue;
  isActive: boolean;
}
