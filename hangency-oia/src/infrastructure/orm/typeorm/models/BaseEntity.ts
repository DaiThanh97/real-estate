import { CreateDateColumn, UpdateDateColumn } from "typeorm";

import { IBaseEntity } from "./IBaseEntity";

export abstract class BaseEntity implements IBaseEntity {
  protected constructor(input: Pick<BaseEntity, "id">) {
    if (input) {
      this.id = input.id;
    }
  }

  id: string | number;

  @CreateDateColumn({
    type: "timestamp",
    name: "created_at",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  public createdAt: Date;

  @UpdateDateColumn({
    type: "timestamp",
    name: "updated_at",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  public updatedAt: Date;
}
