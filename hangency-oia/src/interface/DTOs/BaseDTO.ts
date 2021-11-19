import { Expose } from "class-transformer";

export abstract class BaseDTO {
  @Expose()
  id: string | number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  constructor(input: Pick<BaseDTO, "id" | "createdAt" | "updatedAt">) {
    this.id = input.id;
    this.createdAt = input.createdAt;
    this.updatedAt = input.updatedAt;
  }
}
