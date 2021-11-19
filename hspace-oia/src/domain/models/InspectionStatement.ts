import {
  Contains,
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  ValidateNested,
  validateOrReject
} from "class-validator";
import constants from "../../infrastructure/config/constants";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { plainToClass, Type } from "class-transformer";
import logger from "../../infrastructure/logger";

class InspectionStatementLevel {
  @IsPositive()
  groupId: number;

  @IsPositive()
  typeId: number;

  @IsNumber()
  level: number;

  note: string;
}

export class InspectionStatement {
  id: number;

  @Contains(constants.PropertyNoteIdPrefix.InspectionStatement)
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

  @IsPositive()
  streetGroupId: number;

  @IsPositive()
  positionGroupId: number;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  streetNumber: string;

  @IsPositive()
  assigneeId: string;

  @IsNotEmpty()
  status: string;

  @IsNotEmpty()
  noteType: string;

  executionDate: Date;

  @IsBoolean()
  otherAddress: boolean;

  property: any;

  @IsPositive()
  instructorId: number;

  @ValidateNested()
  @Type(() => InspectionStatementLevel)
  advantageLevels: InspectionStatementLevel[];

  @ValidateNested()
  @Type(() => InspectionStatementLevel)
  disadvantageLevels: InspectionStatementLevel[];

  public static async validate(note: any) {
    try {
      const data = plainToClass(InspectionStatement, note);
      return await validateOrReject(data);
    } catch (err) {
      logger.error("Inspection Statement Validation: ", err);
      throw new BadRequestError("Inspection statement error fields.", ErrorCode.InspectionStatement.InvalidFields);
    }
  }
}
