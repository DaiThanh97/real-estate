import { Entity, Column, ManyToOne, JoinColumn, OneToMany, PrimaryColumn } from "typeorm";

import { BaseEntity } from "./BaseEntity";
import { IBaseEntity } from "./IBaseEntity";
import { IBaseAssigned } from "./IBaseAssigned";
import { AccountEntity } from "./AccountEntity";
import { FeatureEntity } from "./FeatureEntity";

@Entity({
  name: "resources",
  orderBy: {
    createdAt: "ASC",
  },
})
export class ResourceEntity extends BaseEntity implements IBaseEntity, IBaseAssigned {
  @PrimaryColumn({
    nullable: false,
    unique: true,
    type: "text",
  })
  id: string;

  @Column({
    type: "text",
    nullable: false,
  })
  path: string;

  @Column({
    type: "text",
    nullable: false,
  })
  name: string;

  @Column({
    type: "text",
    nullable: true,
    default: "",
  })
  description: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  model: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  group: string | null;

  @Column({
    type: "text",
    nullable: true,
  })
  api: string | null;

  @Column({
    type: "int",
    nullable: true,
  })
  seq: number | null;

  @Column({
    type: "boolean",
    name: "is_active",
    nullable: false,
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => FeatureEntity, (type) => type.resource, {
    cascade: true,
  })
  features: FeatureEntity[] | null;

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

  constructor(
    input: Pick<
      ResourceEntity,
      "id" | "path" | "name" | "description" | "model" | "group" | "api" | "seq" | "isActive" | "features"
    >,
  ) {
    super(input);
    if (input) {
      this.path = input.path;
      this.name = input.name;
      this.description = input.description;
      this.model = input.model;
      this.group = input.group;
      this.api = input.api;
      this.seq = input.seq;
      this.isActive = input.isActive;
      this.features = input.features;
    }
  }
}
