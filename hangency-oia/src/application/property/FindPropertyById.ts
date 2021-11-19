import { IPropertyRepository } from "../../domain/repositories/IPropertyRepository";
import { Property } from "../../domain/models/Property";
import { NotFoundError } from "../../domain/exceptions/error";

export class FindPropertyById {
  constructor(private readonly propertyRepository: IPropertyRepository) {}

  async execute(id: string): Promise<Property> {
    const result = await this.propertyRepository.findById(id);
    if (!result) {
      throw new NotFoundError("Property is not found");
    }
    return result;
  }
}
