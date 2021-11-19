import { IsBoolean, IsDate, IsNumber, IsString } from "class-validator";
import { Type } from "class-transformer";
import { CreateAccountAccountGroupBody } from "../accountAccountGroup/CreateAccountAccountGroupBody";

export class CreateCollaboratorBody {
  @IsString()
  fullName: string;

  @IsDate()
  birthday: Date;

  @IsDate()
  joinedDate: Date;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsNumber()
  companyId: number;

  @IsNumber()
  collaboratorTypeId: number;

  // for create account
  accountAccountGroups: { accountGroupId: string }[];

  @IsBoolean()
  isActive: boolean;
}
