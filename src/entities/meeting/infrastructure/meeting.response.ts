import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Meeting from "../domain/meeting.entity";

@ObjectType()
export class MeetingPaginateResponse extends PaginateResponse(Meeting) {}
