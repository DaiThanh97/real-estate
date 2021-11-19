import { BaseDTO } from "../BaseDTO";
import { Property } from "../../../domain/models/Property";

export class PropertyDTO extends BaseDTO {
  name: string | null;

  constructor(input: Pick<PropertyDTO, "id" | "createdAt" | "updatedAt" | "name">) {
    super(input);
    this.name = input.name;
  }

  static toDTO(d: Property): PropertyDTO {
    return new PropertyDTO({
      id: d.id,
      createdAt: d.createdAt,
      updatedAt: d.updatedAt,
      name: d.name,
    });
  }
}
