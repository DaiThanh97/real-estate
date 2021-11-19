import { Contains, IsNotEmpty, IsNumber, IsPositive, ValidateNested, validateOrReject } from "class-validator";
import constants from "../../infrastructure/config/constants";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass, Type } from "class-transformer";
import logger from "../../infrastructure/logger";

class InvestmentPlanLand {
  @IsNumber()
  index: number;

  address: string;
  description: string;
  planTypeId: number;
  constructionType: string;
  general: string;
  attachments: string;
  landUseRights: string;
  construction: string;
  time: string;
}

class InvestmentPlanItem {
  @IsNumber()
  index: number;

  name: string;

  planTypeId: number;

  constructionTypeId: number;

  description: string;

  investmentTime: number;

  price: number;

  @ValidateNested()
  @Type(() => InvestmentPlanLand)
  lands: InvestmentPlanLand[];

  refConstructionInfo: string;
}

export class InvestmentPlan {
  id: number;

  @Contains(constants.PropertyNoteIdPrefix.InvestmentPlan)
  noteId: string;

  version: string;

  @IsPositive()
  propertyId: number;

  cityId: number;

  wardId: number;

  districtId: number;

  streetId: number;

  address: string;
  streetNumber: string;

  assigneeId: number;

  @IsNotEmpty()
  status: string;

  executionDate: Date;

  property: any;

  @IsPositive()
  appraisalStatementId: number;

  @ValidateNested()
  @Type(() => InvestmentPlanItem)
  planItems: InvestmentPlanItem[];

  public static async validate(note: any) {
    try {
      const data = plainToClass(InvestmentPlan, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Investment Plan Validation: ", err);
      throw new BadRequestError("Investment plan error fields.", ErrorCode.InvestmentPlan.InvalidFields);
    }
  }
}
