import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import ShippingController from "../application/shipping.controller";
import Shipping from "../domain/shipping.entity";
import { ShippingPaginationArgs } from "./shipping.args";
import { ShippingInputCreate, ShippingInputUpdate } from "./shipping.inputs";
import { ShippingPaginateResponse } from "./shipping.response";

const NAMES = NamerUtils.get("shipping");

@Resolver(Shipping)
class ShippingResolver {
  private controller: ShippingController;

  constructor() {
    this.controller = new ShippingController();
  }

  @Query(() => Shipping, {
    description: "Returns one Shipping by id",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<Shipping> {
    const user = await this.controller.findById(id);
    return user;
  }

  @Query(() => ShippingPaginateResponse, {
    description: "Returns an array of Shipping",
    name: NAMES.paginate,
  })
  async paginate(@Args() data: ShippingPaginationArgs) {
    const results = await this.controller.paginate(data);
    return results;
  }

  @Mutation(() => Shipping, {
    name: NAMES.create,
    description: "Register a new Shipping.",
  })
  @ValidateArgs(ShippingInputCreate, "data")
  async create(@Arg("data") shipping: ShippingInputCreate) {
    const result = await this.controller.create(shipping);
    return result;
  }

  @Mutation(() => Shipping, { description: NAMES.update })
  @ValidateIdentifier(ShippingInputUpdate, "id")
  @ValidateArgs(ShippingInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") shipping: ShippingInputUpdate,
  ) {
    const result = await this.controller.update(id.toString(), shipping);
    return result;
  }
}

export default ShippingResolver;
