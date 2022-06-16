import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Direction from "../domain/direction.entity";

@ObjectType()
export class DirectionPaginateResponse extends PaginateResponse(Direction) {}
