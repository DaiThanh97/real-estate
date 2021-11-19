import { Contains, IsNotEmpty, IsNumber, IsPositive, ValidateNested, validateOrReject } from "class-validator";
import constants from "../../infrastructure/config/constants";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass, Type } from "class-transformer";
import logger from "../../infrastructure/logger";

export const InspectionExpectationStatus = {
  Drafting: "Nháp",
  Pending: "Chờ duyệt",
  Approved: "Đã duyệt",
  Rejected: "Từ chối",
  Deleted: "Đã xoá",
} as const;

export const InspectionExpectationType = {
  Current: "Hiện trạng",
  Estimate: "Ước tính",
} as const;

class InspectionExpectationLevel {
  groupId: number;
  typeId: number;
  level: number;
  note: string;
}

class InspectionExpectationPlanLand {
  
  @IsNumber()
  index: number;
  
  planItemId: number;

  address: string;

  cityId: number;

  districtId: number;

  wardId: number;

  streetId: number;

  streetGroupId: number;

  streetNumber: string;

  locationDescription: string;

  positionGroupId: number;

  landUseRights: string;

  construction: string;

  totalAdvantageLevel: number;
  
  totalDisadvantageLevel: number;

  @ValidateNested()
  @Type(() => InspectionExpectationLevel)
  advantageLevels: InspectionExpectationLevel[];

  @ValidateNested()
  @Type(() => InspectionExpectationLevel)
  disadvantageLevels: InspectionExpectationLevel[];

  totalAdjustment: number;
}

class InspectionExpectationPlanItem {
  @IsNumber()
  index: number;

  sourceId: number;

  inspectionExpectationId: number;

  name: string;

  typeId: number;

  constructionType: number;

  description: string;

  investmentTime: number;

  investmentAt: Date;

  totalAdjustment: number;
  
  @ValidateNested()
  @Type(() => InspectionExpectationPlanLand)
  lands: InspectionExpectationPlanLand[];
}

export class InspectionExpectation {
  id: number;

  @Contains(constants.PropertyNoteIdPrefix.InspectionExpectation)
  noteId: string;

  version: string;

  assigneeId: number;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  noteType: string;

  executionDate: Date;

  instructorId: number;

  @IsPositive()
  propertyId: number;
  
  property: any;

  @IsPositive()
  investmentPlanId: number;

  address: string;
  streetNumber: string;

  cityId: number;
  districtId: number;
  wardId: number;
  streetId: number;

  @ValidateNested()
  @Type(() => InspectionExpectationPlanItem)
  planItems: InspectionExpectationPlanItem[];
  
  public static async validate(note: any) {
    try {
      const data = plainToClass(InspectionExpectation, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Inspection expectation validation: ", err);
      throw new BadRequestError("Inspection expectation error fields.", ErrorCode.InspectionExpectation.InvalidFields);
    }
  }
}
