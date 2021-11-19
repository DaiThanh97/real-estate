import { Property } from "../../domain/models/Property";

export const createPropertyTest = () => {
  return Property.create("PropertyId", { name: "name" }, new Date());
};
