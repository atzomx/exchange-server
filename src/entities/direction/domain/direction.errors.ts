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

export class DirectionAlreadyExistsError extends UserInputError {
  constructor(name: string) {
    const errors: Array<ICustomError> = [
      {
        constrains: `Direction ${name} already exists for this user`,
        property: "name",
      },
    ];
    super("Direction name already exists", { errors });
  }
}
