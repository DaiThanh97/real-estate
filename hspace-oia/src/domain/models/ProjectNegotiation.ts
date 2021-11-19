import { Contains, IsNotEmpty, IsPositive, validateOrReject } from "class-validator";
import constants from "../../infrastructure/config/constants";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass } from "class-transformer";
import logger from "../../infrastructure/logger";

export class ProjectNegotiation {
  id: number;

  @Contains(constants.PropertyNoteIdPrefix.ProjectNegotiation)
  noteId: string;

  version: string;

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

  @IsNotEmpty()
  status: string;

  executionDate: Date;

  property: any;

  @IsPositive()
  investmentEfficiencyId: number;

  price: number;
  priceUpdate: number;
  priceAppraisalStatement: number;
  priceApproved: number;
  priority: string;

  public static async validate(note: any) {
    try {
      const data = plainToClass(ProjectNegotiation, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Project Negotiation Validation: ", err);
      throw new BadRequestError("Project Negotiation error fields.", ErrorCode.ProjectNegotiation.InvalidFields);
    }
  }
}
