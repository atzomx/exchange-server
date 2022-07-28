import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Exchange from "../domain/exchange.entity";

@ObjectType()
export class ExchangePaginateResponse extends PaginateResponse(Exchange) {}
