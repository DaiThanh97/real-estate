import { IAccount } from "./Account";
import { IMasterValue } from "./MasterValue";
import { IProperty } from "./Property";
import { ITopic } from "./Topic";

export interface INote {
  id: number;
  noteId: string;
  noteType: string;
  executionDate: Date;
  assigneeId: number;
  companyId: number;
  company: IMasterValue;

  instructorId: number;
  instructor: IMasterValue;

  status: string;
  isDeleted: boolean;
  approvedAt: Date;
  approvedBy: IAccount | number;
  rejectionNote: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: IAccount | number;
  updatedBy: IAccount | number;
  rejectedAt: Date;
  rejectedBy: IAccount | number;

  streetNumber: string;
  cityId: number;
  wardId: number;
  districtId: number;
  streetId: number;

  city: IMasterValue;
  ward: IMasterValue;
  district: IMasterValue;
  street: IMasterValue;

  propertyId: number;
  property: IProperty;

  topicId: number;
  topic: ITopic;

  changedStatusTime: Date;
  classes: string[];
  version: string;
}
