import { ICustomError } from "@core/domain/interfaces";
import { UserInputError } from "apollo-server-core";

export class MeetingNotFoundError extends UserInputError {
  constructor() {
    const errors: Array<ICustomError> = [
      { constrains: "Meeting not found", property: "id" },
    ];
    super("Meeting not found", { errors });
  }
}
