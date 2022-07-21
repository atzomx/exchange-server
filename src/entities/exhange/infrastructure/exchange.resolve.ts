import {
  ValidateArgs,
  ValidateIdentifier,
} from "@core/infrastructure/decorators";
import { PaginateArgs } from "@core/infrastructure/responses";
import NamerUtils from "@core/infrastructure/utils/namer.utils";
import { Arg, Args, Mutation, Query, Resolver } from "type-graphql";
import ExchangeController from "../application/exchange.controller";
import Exchange from "../domain/exchange.entity";
import { ExchangeInputCreate, ExchangeInputUpdate } from "./exchange.input";
import { ExchangePaginateResponse } from "./exchange.response";

const NAMES = NamerUtils.get("exchange");

@Resolver(Exchange)
class ExchangeResolver {
  private controller: ExchangeController;

  constructor() {
    this.controller = new ExchangeController();
  }

  @Query(() => Exchange, {
    description: "Returns one exchange by id",
    name: NAMES.find,
  })
  async findById(@Arg("id") id: string): Promise<Exchange> {
    const exchange = await this.controller.findById(id);
    return exchange;
  }

  @Query(() => ExchangePaginateResponse, {
    description: "Returns an array of exchanges",
    name: NAMES.paginate,
  })
  async paginate(@Args() data: PaginateArgs) {
    const results = await this.controller.paginate(data);
    return results;
  }

  @Mutation(() => Exchange, {
    description: "Register a new exchange.",
    name: NAMES.create,
  })
  @ValidateArgs(ExchangeInputCreate, "data")
  async create(@Arg("data") echange: ExchangeInputCreate) {
    const result = await this.controller.create(echange);
    return result;
  }

  @Mutation(() => Exchange, {
    description: "Update an existing exchange by id.",
    name: NAMES.update,
  })
  @ValidateIdentifier(ExchangeInputUpdate, "id")
  @ValidateArgs(ExchangeInputUpdate, "data")
  async update(
    @Arg("id") id: string,
    @Arg("data") exchange: ExchangeInputUpdate,
  ) {
    const result = await this.controller.update(id, exchange);
    return result;
  }
}

export default ExchangeResolver;
