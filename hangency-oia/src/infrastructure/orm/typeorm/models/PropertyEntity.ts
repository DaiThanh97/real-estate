import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";

@Entity({
  name: "properties",
  orderBy: {
    createdAt: "ASC",
  },
})
export class PropertyEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    nullable: true,
  })
  name: string | null;

  @ManyToOne(() => AccountEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "created_by",
    referencedColumnName: "id",
  })
  createdBy: AccountEntity | null;

  @ManyToOne(() => AccountEntity, {
    lazy: true,
  })
  @JoinColumn({
    name: "updated_by",
    referencedColumnName: "id",
  })
  updatedBy: AccountEntity | null;

  constructor(input: Pick<PropertyEntity, "id" | "name">) {
    super(input);
    if (input) {
      this.name = input.name;
    }
  }
}
