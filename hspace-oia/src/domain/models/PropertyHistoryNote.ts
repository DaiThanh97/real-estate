import { BaseModel } from "./Base";
import { MasterValue } from "./MasterValue";
import { BusinessStatus, PropertyStatus } from "../../infrastructure/orm/typeorm/models/Property";
import {  Type } from "class-transformer";

export enum HistoryNoteType {
  DELETED = "Deleted",
  APPROVE = "Approve",
  REJECT = "Reject",
  ONSUBMIT = "OnSubmit",
  SUBMITTED = "Submitted",
  OTHER = "Other",
}

export class PropertyHistoryNote extends BaseModel {
  public propertyId: number;
  public type: HistoryNoteType;
  public reasonId: number;
  public notes: string;
  public isActive: boolean;

  @Type(() => MasterValue)
  public reason: MasterValue;

  constructor(propertyId: number,reasonId: number,reason: any, notes: string) {
    super();
    this.propertyId = propertyId;
    this.reasonId = reasonId;
    this.reason = reason;
    this.notes = notes;
  }

  static analyzeUpdateTypeFromStatus(data: any, status: string): PropertyHistoryNote {
    switch (status){
      case PropertyStatus.Approved:
        data.type = HistoryNoteType.APPROVE;
        break;
      case PropertyStatus.Rejected:
        data.type = HistoryNoteType.REJECT;
        break;  
      case PropertyStatus.Deleted:
        data.type = HistoryNoteType.DELETED;
        break; 
      default:
        data.type = HistoryNoteType.OTHER;
        break;     
    }
    return data;
  }

  static analyzeUpdateTypeFromBusinessStatus(data: any, businessStatus: string): PropertyHistoryNote {
    switch (businessStatus){
      case BusinessStatus.OnSubmit:
        data.type = HistoryNoteType.ONSUBMIT;
        break;
      case BusinessStatus.Submitted:
        data.type = HistoryNoteType.SUBMITTED;
        break;  
    }
    return data;
  }
}

