import { IsNumber } from "class-validator";

export class CreateAccountAccountGroupBody {
  @IsNumber()
  accountGroupId: number;
}
