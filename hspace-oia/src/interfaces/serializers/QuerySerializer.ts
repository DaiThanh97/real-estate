import {
  IsDefined,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from "class-validator";
import { Expose, Transform, Type } from "class-transformer";
import Joi from "joi";
import { BadRequestError } from "../../infrastructure/error";
import ErrorCode from "../../infrastructure/config/constants/errorCode";
import { TransformFnParams } from "class-transformer/types/interfaces";

enum RangeType {
  DATE = "date",
  NUMBER = "number"
}

function transformDateOrNumber(value: any, key: string, hours: number, min: number, sec: number): any {
  if (!value || typeof value === "number") {
    return value;
  }
  const result = Joi.date().validate(value);
  if (result.error) {
    throw new BadRequestError(
      `The ${key} value must be a valid date`,
      ErrorCode.ValidationError,
    );
  }

  const date = result.value;
  date.setHours(hours, min, sec);

  return date;
}

export function transformStartDateOrNumber({ value, key }: TransformFnParams) {
  return transformDateOrNumber(value, key, 0, 0, 0);
}

export function transformEndDateOrNumber({ value, key }: TransformFnParams) {
  return transformDateOrNumber(value, key, 23, 59, 59);
}

export interface IQuerySerializer {
  match: MatchQuerySerializer[];

  queryString: StringQuerySerializer[];

  range: RangeQuerySerializer[];
}

interface IQuery {
  field: string;

  query: any;
}

@ValidatorConstraint()
export class IsFieldQuery implements ValidatorConstraintInterface {
  validate(obj: IQuery, validationArguments: ValidationArguments) {
    if (!obj) {
      return true;
    }
    return validationArguments.constraints.includes(obj.field);
  }
}

export class MatchQuerySerializer implements IQuery {
  @IsString()
  @IsNotEmpty()
  @Expose()
  field: string;

  @Expose()
  @IsOptional()
  query: string | number | null;
}

export class StringQuerySerializer implements IQuery {
  @IsString()
  @IsNotEmpty()
  @Expose()
  field: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  query: string;
}

class RangeSerializer {
  @Expose()
  @Transform(transformStartDateOrNumber)
  gt?: Date | number | undefined;

  @Expose()
  @Transform(transformStartDateOrNumber)
  gte?: Date | number | undefined;

  @Expose()
  @Transform(transformEndDateOrNumber)
  lt?: Date | number | undefined;

  @Expose()
  @Transform(transformEndDateOrNumber)
  lte?: Date | number | undefined;

  @Expose()
  @IsEnum(RangeType)
  type: string;
}

export class RangeQuerySerializer implements IQuery {
  @IsString()
  @IsNotEmpty()
  @Expose()
  field: string;

  @Expose()
  @IsDefined()
  @Type(() => RangeSerializer)
  query: RangeSerializer;
}
