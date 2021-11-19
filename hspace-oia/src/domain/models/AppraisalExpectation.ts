import { Contains, IsDate, IsNotEmpty, IsNumber, IsPositive, ValidateNested, validateOrReject } from "class-validator";
import constants from "../../infrastructure/config/constants";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass, Type } from "class-transformer";
import logger from "../../infrastructure/logger";

class AppraisalExpectationPlanLand {
  @IsNumber()
  index: number;
  
  @IsNotEmpty()
  expectationInfo: string;

  landUseRights: string;
  construction: string;
}

class AppraisalExpectationPlanItem {
  @IsNumber()
  index: number;

  sourceId: number;

  name: string;

  planTypeId: number;

  constructionTypeId: number;

  description: string;

  investmentTime: number;

  investmentAt: Date;

  price: number;

  @ValidateNested()
  @Type(() => AppraisalExpectationPlanLand)
  lands: AppraisalExpectationPlanLand[];
}

export class AppraisalExpectation {
  id: number;

  @Contains(constants.PropertyNoteIdPrefix.AppraisalExpectation)
  noteId: string;

  version: string;

  @IsNotEmpty()
  noteType: string;

  @IsPositive()
  propertyId: number;

  cityId: number;

  wardId: number;

  districtId: number;

  streetId: number;

  address: string;
  streetNumber: string;

  assigneeId: number;

  completedAt: Date;
  completedBy: Account;

  @IsNotEmpty()
  status: string;

  @IsDate()
  executionDate: Date;

  property: any;

  @IsPositive()
  inspectionExpectationId: number;

  @ValidateNested()
  @Type(() => AppraisalExpectationPlanItem)
  planItems: AppraisalExpectationPlanItem[];

  public static async validate(note: any) {
    try {
      const data = plainToClass(AppraisalExpectation, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Appraisal expectation Validation: ", err);
      throw new BadRequestError("Appraisal expectation error fields.", ErrorCode.AppraisalExpectation.InvalidFields);
    }
  }
}
