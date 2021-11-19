import { IsString } from "class-validator";

export class CreatePropertyBody {
  @IsString()
  name: string | null;
}
