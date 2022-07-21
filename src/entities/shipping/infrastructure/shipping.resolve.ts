import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import ShippingController from "../application/shipping.controller";
import Shipping from "../domain/shipping.entity";
import { ShippingPaginateArgs } from "./shipping.args";
import { ShippingInputCreate, ShippingInputUpdate } from "./shipping.inputs";
import { ShippingPaginateResponse } from "./shipping.response";

@Resolver(Shipping)
class ShippingResolver {
  private controller: ShippingController;

  constructor() {
    this.controller = new ShippingController();
  }

  @Query(() => Shipping, { description: "Returns one Shipping by id" })
  async shippingById(@Arg("id") id: string): Promise<Shipping> {
    const user = await this.controller.shippingById(id);
    return user;
  }

  @Query(() => ShippingPaginateResponse, {
    description: "Returns an array of Shipping",
  })
  async shippingPaginate(@Args() data: ShippingPaginateArgs) {
    const results = await this.controller.shippingPaginate(data);
    return results;
  }

  @Mutation(() => Shipping)
  @ValidateArgs(ShippingInputCreate, "data")
  async shippingCreate(@Arg("data") shipping: ShippingInputCreate) {
    const result = await this.controller.shippingCreate(shipping);
    return result;
  }

  @Mutation(() => Shipping)
  @ValidateIdentifier(ShippingInputUpdate, "id")
  @ValidateArgs(ShippingInputUpdate, "data")
  async shippingUpdate(
    @Arg("id") id: string,
    @Arg("data") shipping: ShippingInputUpdate,
  ) {
    const result = await this.controller.shippingUpdate(
      id.toString(),
      shipping,
    );
    return result;
  }
}

export default ShippingResolver;
