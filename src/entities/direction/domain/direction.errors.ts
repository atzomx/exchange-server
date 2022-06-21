import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class DirectionNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Direction not found", property: "id" },
    ];
    super("Direction not found", { errors });
  }
}
