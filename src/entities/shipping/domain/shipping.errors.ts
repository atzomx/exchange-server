import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class ShippingNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Shipping not found", property: "id" },
    ];
    super("Shipping not found", { errors });
  }
}
