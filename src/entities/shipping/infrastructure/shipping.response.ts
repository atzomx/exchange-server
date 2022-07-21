import { PaginateResponse } from "@core/infrastructure/responses";
import { ObjectType } from "type-graphql";
import Shipping from "../domain/shipping.entity";

@ObjectType()
export class ShippingPaginateResponse extends PaginateResponse(Shipping) {}
