import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class ExchangeNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Exchange not found", property: "id" },
    ];
    super("Exchange not found", { errors });
  }
}
