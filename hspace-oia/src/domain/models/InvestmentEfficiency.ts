import { Contains, IsNotEmpty, IsNumber, IsPositive, ValidateNested, validateOrReject } from "class-validator";
import constants from "../../infrastructure/config/constants";
import { plainToClass, Type } from "class-transformer";
import logger from "../../infrastructure/logger";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";

class PlanLand {
  @IsNumber()
  index: number;

  investmentCosts: string;

  purchasePriceAnalysis: string;
}

class PlanItem {
  @IsNumber()
  index: number;

  name: string;

  planTypeId: number;

  constructionTypeId: number;

  description: string;

  investmentTime: number;

  price: number;

  @ValidateNested()
  @Type(() => PlanLand)
  lands: PlanLand[];
}

export class InvestmentEfficiency {
  id: number;
  
  @Contains(constants.PropertyNoteIdPrefix.InvestmentEfficiency)
  noteId: string;

  version: string;

  @IsPositive()
  propertyId: number;

  @IsPositive()
  cityId: number;

  @IsPositive()
  wardId: number;

  @IsPositive()
  districtId: number;

  @IsPositive()
  streetId: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  streetNumber: string;

  assigneeId: number;

  @IsNotEmpty()
  status: string;

  executionDate: Date;

  property: any;

  @IsPositive()
  appraisalExpectationId: number;

  @ValidateNested()
  @Type(() => PlanItem)
  planItems: PlanItem[];

  public static async validate(note: any) {
    try {
      const data = plainToClass(InvestmentEfficiency, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Investment Efficiency Validation: ", err);
      throw new BadRequestError("Investment plan error fields.", ErrorCode.InvestmentEfficiency.InvalidFields);
    }
  }
}
